import {
  addReadableParagraphBreaks,
  cleanPostSpacing,
  formatPost,
  formatPostWithChanges,
  normalizeBulletLine,
  normalizeLineBreaks,
  normalizePostBullets,
  removeTrailingSpaces
} from '~/utils/postFormat'

export function usePostFormatter() {
  return {
    addReadableParagraphBreaks,
    cleanPostSpacing,
    formatPost,
    formatPostWithChanges,
    normalizeBulletLine,
    normalizeLineBreaks,
    normalizePostBullets,
    removeTrailingSpaces
  }
}
