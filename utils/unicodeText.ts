export type UnicodeStyle = 'bold' | 'italic' | 'boldItalic' | 'sansBold' | 'sansItalic' | 'monospace'

type UnicodeRange = {
  upper: number
  lower: number
  digit?: number
  lowerOverrides?: Record<number, number>
}

const ranges: Record<UnicodeStyle, UnicodeRange> = {
  bold: { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
  italic: { upper: 0x1d434, lower: 0x1d44e, lowerOverrides: { 104: 0x210e } },
  boldItalic: { upper: 0x1d468, lower: 0x1d482, digit: 0x1d7ce },
  sansBold: { upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec },
  sansItalic: { upper: 0x1d608, lower: 0x1d622 },
  monospace: { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 }
}

const reverseMap = buildReverseMap()

function convertChar(char: string, style: UnicodeStyle) {
  const plainChar = restorePlainText(char)
  const code = plainChar.codePointAt(0)
  if (!code) {
    return char
  }

  const range = ranges[style]

  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(range.upper + code - 65)
  }

  if (code >= 97 && code <= 122) {
    const override = range.lowerOverrides?.[code]
    if (override) {
      return String.fromCodePoint(override)
    }
    return String.fromCodePoint(range.lower + code - 97)
  }

  if (code >= 48 && code <= 57 && range.digit) {
    return String.fromCodePoint(range.digit + code - 48)
  }

  return plainChar
}

function buildReverseMap() {
  const map = new Map<string, string>()

  for (const range of Object.values(ranges)) {
    for (let index = 0; index < 26; index += 1) {
      map.set(String.fromCodePoint(range.upper + index), String.fromCharCode(65 + index))
      map.set(String.fromCodePoint(range.lower + index), String.fromCharCode(97 + index))
    }

    for (const [asciiCode, unicodeCode] of Object.entries(range.lowerOverrides ?? {})) {
      map.set(String.fromCodePoint(unicodeCode), String.fromCharCode(Number(asciiCode)))
    }

    if (range.digit) {
      for (let index = 0; index < 10; index += 1) {
        map.set(String.fromCodePoint(range.digit + index), String.fromCharCode(48 + index))
      }
    }
  }

  return map
}

export function convertUnicodeText(input: string, style: UnicodeStyle) {
  return [...input].map((char) => convertChar(char, style)).join('')
}

export function toBold(input: string) {
  return convertUnicodeText(input, 'bold')
}

export function toItalic(input: string) {
  return convertUnicodeText(input, 'italic')
}

export function toBoldItalic(input: string) {
  return convertUnicodeText(input, 'boldItalic')
}

export function toSansBold(input: string) {
  return convertUnicodeText(input, 'sansBold')
}

export function toSansItalic(input: string) {
  return convertUnicodeText(input, 'sansItalic')
}

export function toMonospace(input: string) {
  return convertUnicodeText(input, 'monospace')
}

export function restorePlainText(input: string) {
  return [...input].map((char) => reverseMap.get(char) ?? char).join('')
}
