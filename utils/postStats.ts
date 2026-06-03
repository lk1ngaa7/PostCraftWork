export interface PostStats {
  characters: number
  words: number
  lines: number
  paragraphs: number
  hashtags: number
  links: number
  emojis: number
  estimatedReadTimeMinutes: number
  firstTwoHundredChars: string
}

const hashtagPattern = /(^|\s)#[\p{L}\p{N}_]+/gu
const linkPattern = /https?:\/\/[^\s]+/gi
const emojiPattern = /\p{Extended_Pictographic}/gu

export function getPostStats(text: string): PostStats {
  const normalized = text.replace(/\r\n/g, '\n')
  const trimmed = normalized.trim()
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
  const lines = normalized.length ? normalized.split('\n').length : 0
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).length : 0
  const hashtags = [...normalized.matchAll(hashtagPattern)].length
  const links = [...normalized.matchAll(linkPattern)].length
  const emojis = [...normalized.matchAll(emojiPattern)].length

  return {
    characters: normalized.length,
    words,
    lines,
    paragraphs,
    hashtags,
    links,
    emojis,
    estimatedReadTimeMinutes: words ? Math.max(1, Math.ceil(words / 200)) : 0,
    firstTwoHundredChars: normalized.slice(0, 200)
  }
}
