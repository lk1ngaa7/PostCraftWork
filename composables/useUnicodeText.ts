import {
  convertUnicodeText,
  restorePlainText,
  toBold,
  toBoldItalic,
  toItalic,
  toMonospace,
  toSansBold,
  toSansItalic
} from '~/utils/unicodeText'

export function useUnicodeText() {
  return {
    convertUnicodeText,
    restorePlainText,
    toBold,
    toItalic,
    toBoldItalic,
    toSansBold,
    toSansItalic,
    toMonospace
  }
}
