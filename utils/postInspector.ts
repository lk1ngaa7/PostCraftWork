import { getPostStats } from '~/utils/postStats'

export type InspectorSeverity = 'good' | 'info' | 'warning' | 'fix'
export type InspectorCategory = 'hook' | 'structure' | 'cta' | 'hashtags' | 'links' | 'readability' | 'length' | 'formatting'

export interface InspectionItem {
  id: string
  severity: InspectorSeverity
  type: 'good' | 'warning' | 'fix'
  category: InspectorCategory
  title: string
  message: string
  suggestion?: string
}

export interface ReadabilityMetrics {
  mode: 'english' | 'structural'
  fleschReadingEase: number | null
  fleschKincaidGrade: number | null
  averageSentenceWords: number
  averageWordsPerParagraph: number
  estimatedReadTimeMinutes: number
  label: string
}

export interface InspectorResult {
  score: number
  items: InspectionItem[]
  priorityFixes: InspectionItem[]
  readability: ReadabilityMetrics
}

const ctaPattern = /\b(comment|reply|share|save|follow|connect|what do you think|what would you add|drop your thoughts|learn more|try it|download|check it out|tell me|dm me|send me)\b/gi
const urlPattern = /https?:\/\/[^\s]+/gi
const emojiPattern = /\p{Extended_Pictographic}/gu
const emojiRunPattern = /\p{Extended_Pictographic}(?:\s*\p{Extended_Pictographic}){2,}/u
const sentencePattern = /[^.!?]+[.!?]+|[^.!?]+$/g
const englishWordPattern = /[A-Za-z]+(?:'[A-Za-z]+)?/g
const vowelGroupPattern = /[aeiouy]+/gi

export function inspectPost(text: string): InspectorResult {
  const stats = getPostStats(text)
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const trimmed = normalized.trim()
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean) : []
  const paragraphWordCounts = paragraphs.map((paragraph) => countEnglishWords(paragraph))
  const lines = normalized.split('\n')
  const firstNonEmptyLine = lines.find((line) => line.trim())?.trim() ?? ''
  const urls = [...normalized.matchAll(urlPattern)]
  const ctas = [...trimmed.matchAll(ctaPattern)]
  const readability = getReadabilityMetrics(trimmed, paragraphs, paragraphWordCounts, stats.estimatedReadTimeMinutes)
  const items: InspectionItem[] = []

  pushItem(items, emptyDraftRule(trimmed))
  pushItem(items, hookLengthRule(firstNonEmptyLine, trimmed))
  pushItem(items, hookQuestionRule(firstNonEmptyLine, trimmed))
  pushItem(items, hookSignalRule(firstNonEmptyLine, trimmed))
  pushItem(items, paragraphCountRule(stats.paragraphs, stats.characters, trimmed))
  pushItem(items, paragraphDensityRule(paragraphs, trimmed))
  pushItem(items, ctaRule(ctas.length, trimmed))
  pushItem(items, hashtagCountRule(stats.hashtags, trimmed))
  pushItem(items, hashtagPlacementRule(normalized, stats.hashtags))
  pushItem(items, linkPlacementRule(urls, normalized))
  pushItem(items, multipleLinksRule(urls.length, trimmed))
  pushItem(items, lengthRule(stats.characters, trimmed))
  pushItem(items, readabilityRule(readability, trimmed))
  pushItem(items, formattingRule(normalized, trimmed))
  pushItem(items, emojiDensityRule(stats.emojis, normalized))

  const penalty = items.reduce((total, item) => {
    if (item.severity === 'fix') return total + 14
    if (item.severity === 'warning') return total + 7
    if (item.severity === 'info') return total + 2
    return total
  }, 0)
  const score = trimmed ? Math.max(0, Math.min(100, 100 - penalty)) : 0
  const priorityFixes = items
    .filter((item) => item.severity === 'fix' || item.severity === 'warning')
    .sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity))
    .slice(0, 5)

  return {
    score,
    items,
    priorityFixes,
    readability
  }
}

function emptyDraftRule(trimmed: string): InspectionItem | null {
  if (trimmed) return null
  return {
    id: 'empty-draft',
    severity: 'fix',
    type: 'fix',
    category: 'structure',
    title: 'Add a draft',
    message: 'Paste or write a LinkedIn post before running publishing readiness checks.',
    suggestion: 'Start with a short opening line, then add a few readable paragraphs.'
  }
}

function hookLengthRule(hook: string, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (!hook) {
    return {
      id: 'missing-hook',
      severity: 'fix',
      type: 'fix',
      category: 'hook',
      title: 'Opening line is empty',
      message: 'The first visible line is blank, so readers may not see a clear hook immediately.',
      suggestion: 'Move your strongest opening sentence to the first line.'
    }
  }
  if (hook.length <= 80) {
    return {
      id: 'hook-length-good',
      severity: 'good',
      type: 'good',
      category: 'hook',
      title: 'Opening line is easy to scan',
      message: 'The first line is within the short hook range for mobile reading.'
    }
  }
  if (hook.length <= 140) {
    return {
      id: 'hook-length-warning',
      severity: 'warning',
      type: 'warning',
      category: 'hook',
      title: 'Opening line may be long',
      message: 'Your opening line may be easier to scan if it is shorter.',
      suggestion: 'Trim the first line toward 80 characters or split it into two lines.'
    }
  }
  return {
    id: 'hook-length-fix',
    severity: 'fix',
    type: 'fix',
    category: 'hook',
    title: 'Opening line is too long',
    message: 'A long first line can hide the point of the post on mobile screens.',
    suggestion: 'Shorten your opening line before publishing.'
  }
}

function hookQuestionRule(hook: string, trimmed: string): InspectionItem | null {
  if (!trimmed || !hook) return null
  if (hook.includes('?')) {
    return {
      id: 'hook-question',
      severity: 'good',
      type: 'good',
      category: 'hook',
      title: 'Question-style opening detected',
      message: 'A question can make the opening line feel direct and easy to parse.'
    }
  }
  return {
    id: 'hook-no-question',
    severity: 'info',
    type: 'warning',
    category: 'hook',
    title: 'Opening is declarative',
    message: 'This can work, but a question-style hook may be easier to scan for some posts.',
    suggestion: 'Consider whether the opening would be stronger as a short question.'
  }
}

function hookSignalRule(hook: string, trimmed: string): InspectionItem | null {
  if (!trimmed || !hook) return null
  if (/\d/.test(hook)) {
    return {
      id: 'hook-number',
      severity: 'good',
      type: 'good',
      category: 'hook',
      title: 'Specific opening signal detected',
      message: 'The first line includes a number, which can help readers understand the post shape quickly.'
    }
  }
  return {
    id: 'hook-specificity',
    severity: 'info',
    type: 'warning',
    category: 'hook',
    title: 'Opening could be more specific',
    message: 'The first line does not include a clear numeric or concrete signal.',
    suggestion: 'Add a specific result, count, timeframe, or contrast if it fits the post.'
  }
}

function paragraphCountRule(paragraphs: number, characters: number, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (characters > 400 && paragraphs <= 1) {
    return {
      id: 'no-paragraph-breaks',
      severity: 'fix',
      type: 'fix',
      category: 'structure',
      title: 'Post reads as one dense block',
      message: 'Long single-block posts are harder to scan in a mobile feed.',
      suggestion: 'Break the draft into 3-6 short paragraphs.'
    }
  }
  if (paragraphs >= 2) {
    return {
      id: 'paragraph-count-good',
      severity: 'good',
      type: 'good',
      category: 'structure',
      title: 'Paragraph breaks are present',
      message: 'The draft gives readers visual pauses while scrolling.'
    }
  }
  return {
    id: 'short-single-paragraph',
    severity: 'info',
    type: 'warning',
    category: 'structure',
    title: 'Single paragraph format',
    message: 'A short single paragraph can work, but longer posts usually benefit from spacing.',
    suggestion: 'Add paragraph breaks if this post grows longer.'
  }
}

function paragraphDensityRule(paragraphs: string[], trimmed: string): InspectionItem | null {
  if (!trimmed || !paragraphs.length) return null
  const longest = Math.max(...paragraphs.map((paragraph) => paragraph.length))
  const denseParagraphs = paragraphs.filter((paragraph) => paragraph.length > 420).length
  if (longest > 700 || denseParagraphs >= 2) {
    return {
      id: 'dense-paragraphs-fix',
      severity: 'fix',
      type: 'fix',
      category: 'structure',
      title: 'Paragraphs are too dense',
      message: 'One or more paragraphs are long enough to feel heavy on mobile.',
      suggestion: 'Break the longest paragraph into 2-3 shorter paragraphs.'
    }
  }
  if (longest > 420) {
    return {
      id: 'dense-paragraph-warning',
      severity: 'warning',
      type: 'warning',
      category: 'structure',
      title: 'One paragraph is getting long',
      message: 'The longest paragraph may be harder to read in a narrow feed.',
      suggestion: 'Split the longest paragraph before publishing.'
    }
  }
  return {
    id: 'paragraph-density-good',
    severity: 'good',
    type: 'good',
    category: 'structure',
    title: 'Paragraph density looks readable',
    message: 'The longest paragraph stays within a mobile-friendly range.'
  }
}

function ctaRule(ctaCount: number, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (ctaCount === 0) {
    return {
      id: 'missing-cta',
      severity: 'warning',
      type: 'warning',
      category: 'cta',
      title: 'CTA is not obvious',
      message: 'The draft does not include a clear reader prompt or next step.',
      suggestion: 'Add one simple question or action at the end.'
    }
  }
  if (ctaCount > 2) {
    return {
      id: 'too-many-ctas',
      severity: 'warning',
      type: 'warning',
      category: 'cta',
      title: 'Multiple CTAs detected',
      message: 'Too many reader prompts can make the ending feel unfocused.',
      suggestion: 'Keep one primary CTA.'
    }
  }
  return {
    id: 'cta-present',
    severity: 'good',
    type: 'good',
    category: 'cta',
    title: 'CTA detected',
    message: 'The post includes a clear reader prompt or next step.'
  }
}

function hashtagCountRule(count: number, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (count === 0) {
    return {
      id: 'no-hashtags',
      severity: 'info',
      type: 'warning',
      category: 'hashtags',
      title: 'No hashtags detected',
      message: 'This is not always a problem, but 1-3 relevant hashtags can support discovery.',
      suggestion: 'Add a small hashtag set only if it fits the post.'
    }
  }
  if (count <= 5) {
    return {
      id: 'hashtag-count-good',
      severity: 'good',
      type: 'good',
      category: 'hashtags',
      title: 'Hashtag count looks reasonable',
      message: 'The draft avoids an overloaded hashtag block.'
    }
  }
  if (count <= 10) {
    return {
      id: 'hashtag-count-warning',
      severity: 'warning',
      type: 'warning',
      category: 'hashtags',
      title: 'Hashtag count is high',
      message: 'A large hashtag set can make the post feel crowded.',
      suggestion: 'Trim hashtags to the few most relevant tags.'
    }
  }
  return {
    id: 'hashtag-count-fix',
    severity: 'fix',
    type: 'fix',
    category: 'hashtags',
    title: 'Hashtag block is overloaded',
    message: 'More than 10 hashtags can dominate the post ending.',
    suggestion: 'Reduce the hashtag block before publishing.'
  }
}

function hashtagPlacementRule(text: string, count: number): InspectionItem | null {
  if (!text.trim() || count === 0) return null
  const hashtagMatches = [...text.matchAll(/(^|\s)#[\p{L}\p{N}_]+/gu)]
  const lastNonEmptyLine = text.split('\n').map((line) => line.trim()).filter(Boolean).at(-1) ?? ''
  const allNearEnd = hashtagMatches.every((match) => match.index !== undefined && match.index > Math.max(0, text.length - 220))
  if (lastNonEmptyLine.includes('#') || allNearEnd) {
    return {
      id: 'hashtag-placement-good',
      severity: 'good',
      type: 'good',
      category: 'hashtags',
      title: 'Hashtags are near the end',
      message: 'The hashtag block is separated from the main opening.'
    }
  }
  return {
    id: 'hashtag-placement-warning',
    severity: 'warning',
    type: 'warning',
    category: 'hashtags',
    title: 'Hashtags appear inside the body',
    message: 'Hashtags in the middle can interrupt reading flow.',
    suggestion: 'Move hashtags to the end if they are not part of the sentence.'
  }
}

function linkPlacementRule(urls: RegExpMatchArray[], text: string): InspectionItem | null {
  if (!text.trim()) return null
  if (!urls.length) {
    return {
      id: 'no-early-link-good',
      severity: 'good',
      type: 'good',
      category: 'links',
      title: 'No early link distraction',
      message: 'The opening section keeps attention on the post text.'
    }
  }
  const firstUrlIndex = urls[0]?.index ?? -1
  if (firstUrlIndex >= 0 && firstUrlIndex < 200) {
    return {
      id: 'early-link',
      severity: 'warning',
      type: 'warning',
      category: 'links',
      title: 'Link appears near the opening',
      message: 'Links near the opening may distract from the hook.',
      suggestion: 'Consider placing links later if appropriate for your publishing strategy.'
    }
  }
  return {
    id: 'link-placement-good',
    severity: 'good',
    type: 'good',
    category: 'links',
    title: 'Link placement looks restrained',
    message: 'The first visible section is not led by a URL.'
  }
}

function multipleLinksRule(count: number, trimmed: string): InspectionItem | null {
  if (!trimmed || count <= 1) return null
  if (count > 2) {
    return {
      id: 'many-links',
      severity: 'warning',
      type: 'warning',
      category: 'links',
      title: 'Multiple links detected',
      message: 'Several URLs can make a post feel less focused.',
      suggestion: 'Keep the most important link and remove the rest if possible.'
    }
  }
  return {
    id: 'two-links-info',
    severity: 'info',
    type: 'warning',
    category: 'links',
    title: 'Two links detected',
    message: 'This may be fine, but review whether both links are needed.'
  }
}

function lengthRule(characters: number, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (characters > 3000) {
    return {
      id: 'over-post-limit',
      severity: 'fix',
      type: 'fix',
      category: 'length',
      title: 'Post is over 3,000 characters',
      message: 'The draft is longer than the commonly used LinkedIn post body limit.',
      suggestion: 'Trim the post or move long-form detail into an article.'
    }
  }
  if (characters > 2500) {
    return {
      id: 'near-post-limit',
      severity: 'warning',
      type: 'warning',
      category: 'length',
      title: 'Post is close to the limit',
      message: 'A very long post may require extra scanning effort.',
      suggestion: 'Trim repeated points or move detail into a follow-up section.'
    }
  }
  return {
    id: 'length-good',
    severity: 'good',
    type: 'good',
    category: 'length',
    title: 'Post length is controlled',
    message: 'The draft is comfortably within the post body limit.'
  }
}

function readabilityRule(metrics: ReadabilityMetrics, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (metrics.mode === 'structural') {
    return {
      id: 'structural-readability',
      severity: metrics.averageWordsPerParagraph > 90 ? 'warning' : 'info',
      type: metrics.averageWordsPerParagraph > 90 ? 'warning' : 'warning',
      category: 'readability',
      title: 'Structural readability only',
      message: 'Flesch readability works best for English text, so this draft is checked by sentence and paragraph structure.',
      suggestion: metrics.averageWordsPerParagraph > 90 ? 'Reduce paragraph length for easier scanning.' : undefined
    }
  }
  if ((metrics.fleschReadingEase ?? 0) < 45 || metrics.averageSentenceWords > 28) {
    return {
      id: 'readability-warning',
      severity: 'warning',
      type: 'warning',
      category: 'readability',
      title: 'Readability may be heavy',
      message: 'Long sentences or low reading ease can slow down a feed reader.',
      suggestion: 'Shorten the longest sentence or split it into two lines.'
    }
  }
  return {
    id: 'readability-good',
    severity: 'good',
    type: 'good',
    category: 'readability',
    title: 'Readability looks approachable',
    message: 'Sentence length and reading ease are within a practical range for English text.'
  }
}

function formattingRule(text: string, trimmed: string): InspectionItem | null {
  if (!trimmed) return null
  if (/\n{4,}/.test(text)) {
    return {
      id: 'too-many-blank-lines',
      severity: 'warning',
      type: 'warning',
      category: 'formatting',
      title: 'Extra blank lines detected',
      message: 'Large spacing gaps can make the post feel fragmented.',
      suggestion: 'Reduce long blank-line runs to one clean paragraph break.'
    }
  }
  if (/[ \t]+$/m.test(text)) {
    return {
      id: 'trailing-spaces',
      severity: 'info',
      type: 'warning',
      category: 'formatting',
      title: 'Trailing spaces detected',
      message: 'Line-end spaces can make copied formatting less predictable.',
      suggestion: 'Clean spacing before copying the post.'
    }
  }
  return {
    id: 'formatting-good',
    severity: 'good',
    type: 'good',
    category: 'formatting',
    title: 'Spacing looks clean',
    message: 'No excessive blank lines or trailing spaces were detected.'
  }
}

function emojiDensityRule(count: number, text: string): InspectionItem | null {
  if (!text.trim()) return null
  if (emojiRunPattern.test(text)) {
    return {
      id: 'emoji-run',
      severity: 'warning',
      type: 'warning',
      category: 'formatting',
      title: 'Consecutive emojis detected',
      message: 'Three or more consecutive emojis can make a professional post feel noisy.',
      suggestion: 'Keep emojis purposeful and separated from key text.'
    }
  }
  if (count > 8) {
    return {
      id: 'emoji-density-warning',
      severity: 'warning',
      type: 'warning',
      category: 'formatting',
      title: 'Emoji count is high',
      message: 'A dense emoji style can reduce readability for some readers.',
      suggestion: 'Reduce emoji use if the post should feel more professional.'
    }
  }
  return {
    id: 'emoji-density-good',
    severity: 'good',
    type: 'good',
    category: 'formatting',
    title: 'Emoji density is restrained',
    message: count ? 'Emoji use is present but not dense.' : 'No emoji density issue detected.'
  }
}

function getReadabilityMetrics(
  text: string,
  paragraphs: string[],
  paragraphWordCounts: number[],
  estimatedReadTimeMinutes: number
): ReadabilityMetrics {
  const englishWords = text.match(englishWordPattern) ?? []
  const totalWords = englishWords.length
  const nonAsciiCharacters = [...text].filter((char) => char.charCodeAt(0) > 127 && !emojiPattern.test(char)).length
  const englishShare = text.length ? englishWords.join('').length / text.length : 0
  const isEnglish = totalWords >= 20 && englishShare >= 0.45 && nonAsciiCharacters / Math.max(text.length, 1) < 0.2
  const sentences = (text.match(sentencePattern) ?? []).map((sentence) => sentence.trim()).filter(Boolean)
  const sentenceCount = Math.max(sentences.length, 1)
  const paragraphCount = Math.max(paragraphs.length, 1)
  const averageSentenceWords = totalWords ? round(totalWords / sentenceCount, 1) : 0
  const averageWordsPerParagraph = paragraphWordCounts.length ? round(sum(paragraphWordCounts) / paragraphCount, 1) : 0

  if (!isEnglish) {
    return {
      mode: 'structural',
      fleschReadingEase: null,
      fleschKincaidGrade: null,
      averageSentenceWords,
      averageWordsPerParagraph,
      estimatedReadTimeMinutes,
      label: 'Structural readability'
    }
  }

  const syllables = englishWords.reduce((total, word) => total + countSyllables(word), 0)
  const fleschReadingEase = round(206.835 - 1.015 * (totalWords / sentenceCount) - 84.6 * (syllables / Math.max(totalWords, 1)), 1)
  const fleschKincaidGrade = round(0.39 * (totalWords / sentenceCount) + 11.8 * (syllables / Math.max(totalWords, 1)) - 15.59, 1)

  return {
    mode: 'english',
    fleschReadingEase,
    fleschKincaidGrade,
    averageSentenceWords,
    averageWordsPerParagraph,
    estimatedReadTimeMinutes,
    label: readingEaseLabel(fleschReadingEase)
  }
}

function pushItem(items: InspectionItem[], item: InspectionItem | null) {
  if (item) items.push(item)
}

function countEnglishWords(text: string) {
  return (text.match(englishWordPattern) ?? []).length
}

function countSyllables(word: string) {
  const normalized = word.toLowerCase().replace(/(?:e|es|ed)$/, '')
  const groups = normalized.match(vowelGroupPattern)
  return Math.max(1, groups?.length ?? 1)
}

function readingEaseLabel(score: number) {
  if (score >= 70) return 'Easy to read'
  if (score >= 50) return 'Moderate'
  return 'Harder to read'
}

function severityWeight(severity: InspectorSeverity) {
  if (severity === 'fix') return 3
  if (severity === 'warning') return 2
  if (severity === 'info') return 1
  return 0
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0)
}

function round(value: number, digits: number) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}
