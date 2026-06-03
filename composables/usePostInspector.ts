import { inspectPost } from '~/utils/postInspector'

export function usePostInspector(input: MaybeRefOrGetter<string>) {
  return computed(() => inspectPost(toValue(input)))
}
