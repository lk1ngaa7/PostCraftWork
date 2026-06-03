import { cleanPostSpacing, formatPost } from '~/utils/postFormat'

export function usePostFormatter() {
  return {
    cleanPostSpacing,
    formatPost
  }
}
