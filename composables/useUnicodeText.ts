import { toBold, toBoldItalic, toItalic } from '~/utils/unicodeText'

export function useUnicodeText() {
  return {
    toBold,
    toItalic,
    toBoldItalic
  }
}
