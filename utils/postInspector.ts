import { getPostStats } from '~/utils/postStats'

export interface InspectionItem {
  id: string
  type: 'good' | 'warning' | 'fix'
  title: string
  message: string
}

export interface InspectorResult {
  score: number
  items: InspectionItem[]
}

const ctaPattern = /\b(comment|share|follow|connect|reply|tell me|what do you think|what would you|dm me|send me|learn more)\b/i
const emojiRunPattern = /\p{Extended_Pictographic}(?:\s*\p{Extended_Pictographic}){2,}/u

export function inspectPost(text: string): InspectorResult {
  const stats = getPostStats(text)
  const trimmed = text.trim()
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean) : []
  const firstParagraph = paragraphs[0] || ''
  const hook = firstParagraph.split('\n')[0] || ''
  const items: InspectionItem[] = []

  if (!trimmed) {
    items.push({
      id: 'empty',
      type: 'fix',
      title: 'Add a draft',
      message: 'Paste or write a LinkedIn post before running structural checks.'
    })
  }

  if (hook.length > 180) {
    items.push({
      id: 'long-hook',
      type: 'warning',
      title: 'Opening hook is long',
      message: 'Keep the first line under about 180 characters so it is easier to scan.'
    })
  } else if (trimmed) {
    items.push({
      id: 'hook-length',
      type: 'good',
      title: 'Hook length is readable',
      message: 'The opening line is short enough for a first-screen read.'
    })
  }

  if (firstParagraph.length > 300) {
    items.push({
      id: 'long-first-paragraph',
      type: 'warning',
      title: 'First paragraph is dense',
      message: 'Consider splitting the first paragraph before readers hit see-more.'
    })
  }

  if (stats.characters > 400 && stats.paragraphs <= 1) {
    items.push({
      id: 'no-breaks',
      type: 'warning',
      title: 'Add paragraph breaks',
      message: 'Long single-block posts are harder to read in a mobile feed.'
    })
  } else if (trimmed) {
    items.push({
      id: 'paragraph-spacing',
      type: 'good',
      title: 'Paragraph spacing is clear',
      message: 'The draft uses readable paragraph separation.'
    })
  }

  if (stats.hashtags > 5) {
    items.push({
      id: 'too-many-hashtags',
      type: 'warning',
      title: 'Hashtag count is high',
      message: 'Use a smaller hashtag set to keep the post focused.'
    })
  } else if (trimmed) {
    items.push({
      id: 'hashtag-count',
      type: 'good',
      title: 'Hashtag count is restrained',
      message: 'The draft avoids an overloaded hashtag block.'
    })
  }

  if (/https?:\/\/[^\s]+/i.test(text.slice(0, 200))) {
    items.push({
      id: 'early-link',
      type: 'warning',
      title: 'Link appears early',
      message: 'Links in the first 200 characters can distract from the hook.'
    })
  }

  if (trimmed && !ctaPattern.test(trimmed)) {
    items.push({
      id: 'missing-cta',
      type: 'warning',
      title: 'CTA is not obvious',
      message: 'Add a simple question or next step if you want reader interaction.'
    })
  } else if (trimmed) {
    items.push({
      id: 'cta-present',
      type: 'good',
      title: 'CTA is present',
      message: 'The draft includes a clear prompt for reader response.'
    })
  }

  if (paragraphs.some((paragraph) => paragraph.length > 700)) {
    items.push({
      id: 'very-long-paragraph',
      type: 'warning',
      title: 'Paragraph is very long',
      message: 'Break long paragraphs into shorter blocks for mobile readability.'
    })
  }

  if (emojiRunPattern.test(text)) {
    items.push({
      id: 'emoji-run',
      type: 'warning',
      title: 'Emoji run detected',
      message: 'Three or more consecutive emojis can make a professional post feel noisy.'
    })
  }

  if (stats.characters > 2500) {
    items.push({
      id: 'very-long-post',
      type: 'warning',
      title: 'Post is very long',
      message: 'Consider trimming or moving detail into comments if the post feels hard to scan.'
    })
  }

  const penalty = items.reduce((total, item) => total + (item.type === 'fix' ? 24 : item.type === 'warning' ? 10 : 0), 0)

  return {
    score: Math.max(0, 100 - penalty),
    items
  }
}
