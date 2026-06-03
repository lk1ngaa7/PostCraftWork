type UnicodeStyle = 'bold' | 'italic' | 'boldItalic'

const ranges: Record<UnicodeStyle, { upper: number, lower: number }> = {
  bold: { upper: 0x1d400, lower: 0x1d41a },
  italic: { upper: 0x1d434, lower: 0x1d44e },
  boldItalic: { upper: 0x1d468, lower: 0x1d482 }
}

const digitStart = 0x1d7ce

function convertChar(char: string, style: UnicodeStyle) {
  const code = char.codePointAt(0)
  if (!code) {
    return char
  }

  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(ranges[style].upper + code - 65)
  }

  if (code >= 97 && code <= 122) {
    return String.fromCodePoint(ranges[style].lower + code - 97)
  }

  if (code >= 48 && code <= 57) {
    return String.fromCodePoint(digitStart + code - 48)
  }

  return char
}

export function toBold(input: string) {
  return [...input].map((char) => convertChar(char, 'bold')).join('')
}

export function toItalic(input: string) {
  return [...input].map((char) => convertChar(char, 'italic')).join('')
}

export function toBoldItalic(input: string) {
  return [...input].map((char) => convertChar(char, 'boldItalic')).join('')
}
