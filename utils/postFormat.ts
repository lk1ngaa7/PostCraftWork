export interface PostFormatOptions {
  addDenseParagraphSpacing?: boolean
  normalizeBullets?: boolean
  removeDuplicateHashtags?: boolean
  moveHashtagsToEnd?: boolean
}

export interface PostFormatChanges {
  trimmedOuterWhitespace: boolean
  removedTrailingSpaces: number
  normalizedLineBreaks: number
  reducedExtraBlankLines: number
  collapsedInlineSpaces: number
  normalizedBulletLines: number
  addedParagraphBreaks: number
  removedDuplicateHashtags: number
  movedHashtags: number
}

export interface PostFormatResult {
  text: string
  changes: PostFormatChanges
  summary: string[]
}

const emptyChanges = (): PostFormatChanges => ({
  trimmedOuterWhitespace: false,
  removedTrailingSpaces: 0,
  normalizedLineBreaks: 0,
  reducedExtraBlankLines: 0,
  collapsedInlineSpaces: 0,
  normalizedBulletLines: 0,
  addedParagraphBreaks: 0,
  removedDuplicateHashtags: 0,
  movedHashtags: 0
})

export function normalizeLineBreaks(text: string) {
  return text.replace(/\r\n?/g, '\n')
}

export function removeTrailingSpaces(text: string) {
  return normalizeLineBreaks(text)
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
}

export function normalizeBulletLine(line: string) {
  const match = line.match(/^(\s*)[-*•]\s+(.+)$/)
  if (!match) {
    return line
  }

  const [, indent = '', content = ''] = match
  return `${indent}• ${content.trim()}`
}

function countLineBreakNormalizations(text: string) {
  return (text.match(/\r\n?|\r/g) ?? []).length
}

function countTrailingSpaceLines(text: string) {
  return normalizeLineBreaks(text).split('\n').filter((line) => /[ \t]+$/.test(line)).length
}

function countExtraBlankLineGroups(text: string) {
  return (normalizeLineBreaks(text).match(/\n{3,}/g) ?? []).reduce((total, group) => total + group.length - 2, 0)
}

function collapseInlineSpacesOutsideUrls(line: string) {
  const leading = line.match(/^[ \t]*/)?.[0] ?? ''
  const body = line.slice(leading.length)
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g
  let collapsed = 0
  const parts: string[] = []
  let lastIndex = 0

  for (const match of body.matchAll(urlPattern)) {
    const index = match.index ?? 0
    const before = body.slice(lastIndex, index)
    const collapsedBefore = before.replace(/[ \t]{2,}/g, (spaces) => {
      collapsed += spaces.length - 1
      return ' '
    })
    parts.push(collapsedBefore, match[0])
    lastIndex = index + match[0].length
  }

  const after = body.slice(lastIndex).replace(/[ \t]{2,}/g, (spaces) => {
    collapsed += spaces.length - 1
    return ' '
  })
  parts.push(after)

  return {
    line: `${leading}${parts.join('')}`,
    collapsed
  }
}

function normalizeBullets(text: string, changes: PostFormatChanges) {
  return text
    .split('\n')
    .map((line) => {
      const normalized = normalizeBulletLine(line)
      if (normalized !== line) {
        changes.normalizedBulletLines += 1
      }
      return normalized
    })
    .join('\n')
}

function addSpacingBetweenDenseParagraphs(text: string, changes: PostFormatChanges) {
  const lines = text.split('\n')
  const output: string[] = []

  lines.forEach((line, index) => {
    output.push(line)
    const next = lines[index + 1]
    const currentTrimmed = line.trim()
    const nextTrimmed = next?.trim() ?? ''

    if (!currentTrimmed || !nextTrimmed) {
      return
    }

    const currentIsBullet = /^[-*•]\s+/.test(currentTrimmed)
    const nextIsBullet = /^[-*•]\s+/.test(nextTrimmed)
    const isShortHeading = currentTrimmed.length <= 72 && !/[.!?。！？]$/.test(currentTrimmed)

    if (!currentIsBullet && !nextIsBullet && !isShortHeading) {
      output.push('')
      changes.addedParagraphBreaks += 1
    }
  })

  return output.join('\n')
}

function removeDuplicateHashtags(text: string, changes: PostFormatChanges) {
  const seen = new Set<string>()

  return text
    .replace(/(^|[\s([{])#([\p{L}\p{N}_-]+)/gu, (full, prefix: string, tag: string) => {
      const key = tag.toLowerCase()
      if (seen.has(key)) {
        changes.removedDuplicateHashtags += 1
        return prefix.trimEnd() ? prefix : ''
      }

      seen.add(key)
      return full
    })
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
}

function moveHashtagsToEnd(text: string, changes: PostFormatChanges) {
  const tags: string[] = []
  const seen = new Set<string>()
  const withoutTags = text.replace(/(^|[\s([{])#([\p{L}\p{N}_-]+)/gu, (full, prefix: string, tag: string) => {
    const key = tag.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      tags.push(`#${tag}`)
    }
    changes.movedHashtags += 1
    return prefix.trimEnd() ? prefix : ''
  })

  const cleaned = cleanPostSpacing(withoutTags)

  if (!tags.length) {
    return cleaned
  }

  return `${cleaned}\n\n${tags.join(' ')}`.trim()
}

function buildSummary(changes: PostFormatChanges, emptyInput: boolean) {
  if (emptyInput) {
    return ['Paste your post to format it.', 'Your original wording stays unchanged.']
  }

  const summary: string[] = []

  if (changes.trimmedOuterWhitespace) {
    summary.push('Trimmed leading and trailing whitespace')
  }
  if (changes.removedTrailingSpaces) {
    summary.push(`Removed trailing spaces on ${changes.removedTrailingSpaces} line${changes.removedTrailingSpaces === 1 ? '' : 's'}`)
  }
  if (changes.normalizedLineBreaks) {
    summary.push(`Normalized ${changes.normalizedLineBreaks} line break${changes.normalizedLineBreaks === 1 ? '' : 's'}`)
  }
  if (changes.reducedExtraBlankLines) {
    summary.push(`Reduced ${changes.reducedExtraBlankLines} extra blank line${changes.reducedExtraBlankLines === 1 ? '' : 's'}`)
  }
  if (changes.collapsedInlineSpaces) {
    summary.push(`Collapsed ${changes.collapsedInlineSpaces} extra inline space${changes.collapsedInlineSpaces === 1 ? '' : 's'}`)
  }
  if (changes.normalizedBulletLines) {
    summary.push(`Normalized ${changes.normalizedBulletLines} bullet line${changes.normalizedBulletLines === 1 ? '' : 's'}`)
  }
  if (changes.addedParagraphBreaks) {
    summary.push(`Added ${changes.addedParagraphBreaks} readable paragraph break${changes.addedParagraphBreaks === 1 ? '' : 's'}`)
  }
  if (changes.removedDuplicateHashtags) {
    summary.push(`Removed ${changes.removedDuplicateHashtags} duplicate hashtag${changes.removedDuplicateHashtags === 1 ? '' : 's'}`)
  }
  if (changes.movedHashtags) {
    summary.push(`Moved ${changes.movedHashtags} hashtag${changes.movedHashtags === 1 ? '' : 's'} to the end`)
  }

  if (!summary.length) {
    summary.push('No formatting issues found')
  }

  summary.push('Kept your original wording unchanged')
  return summary
}

export function formatPostWithChanges(text: string, options: PostFormatOptions = {}): PostFormatResult {
  const changes = emptyChanges()
  const emptyInput = !text.trim()

  changes.normalizedLineBreaks = countLineBreakNormalizations(text)
  changes.removedTrailingSpaces = countTrailingSpaceLines(text)
  changes.reducedExtraBlankLines = countExtraBlankLineGroups(text)
  changes.trimmedOuterWhitespace = text.length !== text.trim().length

  let formatted = removeTrailingSpaces(normalizeLineBreaks(text)).trim()
  formatted = formatted.replace(/\n{3,}/g, '\n\n')

  formatted = formatted
    .split('\n')
    .map((line) => {
      const result = collapseInlineSpacesOutsideUrls(line)
      changes.collapsedInlineSpaces += result.collapsed
      return result.line
    })
    .join('\n')

  if (options.normalizeBullets) {
    formatted = normalizeBullets(formatted, changes)
  }

  if (options.addDenseParagraphSpacing) {
    formatted = addSpacingBetweenDenseParagraphs(formatted, changes).replace(/\n{3,}/g, '\n\n')
  }

  if (options.removeDuplicateHashtags) {
    formatted = removeDuplicateHashtags(formatted, changes)
  }

  if (options.moveHashtagsToEnd) {
    formatted = moveHashtagsToEnd(formatted, changes)
  }

  return {
    text: formatted,
    changes,
    summary: buildSummary(changes, emptyInput)
  }
}

export function cleanPostSpacing(text: string) {
  return formatPostWithChanges(text).text
}

export function normalizePostBullets(text: string) {
  const changes = emptyChanges()
  return normalizeBullets(cleanPostSpacing(text), changes)
}

export function addReadableParagraphBreaks(text: string) {
  const changes = emptyChanges()
  return addSpacingBetweenDenseParagraphs(cleanPostSpacing(text), changes).replace(/\n{3,}/g, '\n\n')
}

export function formatPost(text: string) {
  return formatPostWithChanges(text, { normalizeBullets: true }).text
}
