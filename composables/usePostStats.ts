import { getPostStats } from '~/utils/postStats'

export function usePostStats(input: MaybeRefOrGetter<string>) {
  return computed(() => getPostStats(toValue(input)))
}
