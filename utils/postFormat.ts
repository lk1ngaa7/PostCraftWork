export function normalizeLineBreaks(text: string) {
  return text.replace(/\r\n?/g, '\n')
}

export function cleanPostSpacing(text: string) {
  return normalizeLineBreaks(text)
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function formatPost(text: string) {
  return cleanPostSpacing(text)
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()
      if (/^-\s+/.test(trimmed)) {
        return `• ${trimmed.replace(/^-\s+/, '')}`
      }
      return trimmed
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}
