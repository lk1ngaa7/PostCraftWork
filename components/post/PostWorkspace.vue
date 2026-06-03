<template>
  <section class="my-8 ml-5 mr-auto grid w-[350px] max-w-[calc(100vw-40px)] gap-8 overflow-hidden rounded-[28px] bg-navy px-5 py-10 shadow-soft sm:mx-auto sm:w-full sm:max-w-6xl sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:p-10">
    <div class="min-w-0">
      <p class="max-w-full text-xs font-semibold uppercase tracking-[0.08em] text-[#F8D49B] sm:text-sm sm:tracking-[0.18em]">
        Browser-based LinkedIn writing tools
      </p>
      <h1 class="mt-5 max-w-[310px] text-3xl font-bold leading-tight text-white sm:max-w-3xl sm:text-5xl lg:text-6xl">
        {{ title }}
      </h1>
      <p class="mt-6 max-w-[310px] text-base leading-7 text-slate-200 sm:max-w-2xl sm:text-lg sm:leading-8">
        {{ subtitle }}
      </p>
      <div class="mt-8 flex max-w-[310px] flex-wrap gap-3 text-sm font-medium text-slate-700 sm:max-w-none">
        <span class="rounded-full border border-[#F8D49B]/40 bg-white px-4 py-2 shadow-subtle">No sign-up required</span>
        <span class="rounded-full border border-[#F8D49B]/40 bg-white px-4 py-2 shadow-subtle">Local browser processing</span>
        <span class="rounded-full border border-[#F8D49B]/40 bg-white px-4 py-2 shadow-subtle">Copy-ready formatting</span>
      </div>

      <FormatToolbar
        class="mt-8"
        :text="postText"
        @format="applyFormat"
        @clean-spacing="applyCleanSpacing"
        @clear="clearPost"
      />
      <PostEditor v-model="postText" class="mt-3" @use-example="useExample" @clear="clearPost" />
      <UnicodeTextConverter class="mt-3" />
    </div>

    <aside class="min-w-0 rounded-2xl border border-white/70 bg-[#FFFDF8] p-5 shadow-subtle" aria-label="Workspace preview and stats">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-soft pb-4">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-ink">Preview workspace</p>
          <p class="mt-1 text-sm text-muted">Preview the post structure before publishing.</p>
        </div>
        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-professional shadow-subtle">{{ modeLabel }}</span>
      </div>

      <PostPreview :text="postText" :stats="stats" class="mt-5" />
      <PostStats :stats="stats" class="mt-5" />
      <PostInspector :result="inspection" class="mt-5" />
    </aside>
  </section>
</template>

<script setup lang="ts">
export type WorkspaceMode = 'format' | 'preview' | 'stats' | 'bold' | 'inspector'

const props = withDefaults(
  defineProps<{
    mode?: WorkspaceMode
    initialText?: string
    title?: string
    subtitle?: string
  }>(),
  {
    mode: 'format',
    initialText: '',
    title: 'Free LinkedIn Post Tools',
    subtitle: 'Format, preview, inspect, and polish your LinkedIn posts before publishing.'
  }
)

const examplePost = `Strong LinkedIn posts are easier to read before they are easier to publish.

Start with one clear idea.
Keep paragraphs short.
Preview the first screen before you copy.

What would you improve before posting?`

const postText = ref(props.initialText || examplePost)
const stats = usePostStats(postText)
const inspection = usePostInspector(postText)
const { cleanPostSpacing, formatPost } = usePostFormatter()

const modeLabel = computed(() => {
  const labels: Record<WorkspaceMode, string> = {
    format: 'Format',
    preview: 'Preview',
    stats: 'Stats',
    bold: 'Bold text',
    inspector: 'Inspector'
  }
  return labels[props.mode]
})

function useExample() {
  postText.value = examplePost
}

function clearPost() {
  postText.value = ''
}

function applyFormat() {
  postText.value = formatPost(postText.value)
}

function applyCleanSpacing() {
  postText.value = cleanPostSpacing(postText.value)
}
</script>
