<template>
  <section class="my-8 ml-5 mr-auto grid w-[350px] max-w-[calc(100vw-40px)] gap-8 overflow-hidden rounded-[28px] bg-navy px-5 py-10 shadow-soft sm:mx-auto sm:w-full sm:max-w-6xl sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
    <div class="min-w-0">
      <p class="max-w-full text-xs font-semibold uppercase tracking-[0.08em] text-[#7DD3FC] sm:text-sm sm:tracking-[0.18em]">
        Browser-based LinkedIn writing tools
      </p>
      <h1 class="mt-5 max-w-[310px] text-3xl font-bold leading-tight text-white sm:max-w-3xl sm:text-5xl lg:text-6xl">
        Free LinkedIn Post Tools
      </h1>
      <p class="mt-6 max-w-[310px] text-base leading-7 text-slate-200 sm:max-w-2xl sm:text-lg sm:leading-8">
        Format, preview, inspect, and polish your LinkedIn posts before publishing.
      </p>
      <div class="mt-8 flex max-w-[310px] flex-wrap gap-3 text-sm font-medium text-slate-700 sm:max-w-none">
        <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">No sign-up required</span>
        <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">Local browser processing</span>
        <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">Copy-ready formatting</span>
      </div>

      <PostEditor v-model="postText" class="mt-8" @use-example="useExample" @clear="clearPost" />
    </div>

    <aside class="min-w-0 rounded-2xl border border-white/70 bg-[#FFFDF8] p-5 shadow-soft" aria-label="Workspace draft mirror">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-soft pb-4">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-ink">Draft mirror</p>
          <p class="mt-1 text-sm text-muted">A clean read-through of the text currently in the editor.</p>
        </div>
        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-professional shadow-subtle">Editor active</span>
      </div>

      <div class="mt-5 min-w-0 rounded-xl border border-soft bg-white p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Current draft</p>
        <p class="mt-4 text-3xl font-bold text-ink">{{ postText.length }}</p>
        <p class="mt-1 text-sm text-muted">Characters in editor</p>
        <div class="mt-6 max-h-[360px] overflow-hidden rounded-lg bg-[#FBFCFE] p-4 text-sm leading-6 text-slate-700">
          <template v-if="draftParagraphs.length">
            <p v-for="paragraph in draftParagraphs" :key="paragraph" class="mb-4 last:mb-0">
              {{ paragraph }}
            </p>
          </template>
          <p v-else class="text-muted">
            Your draft mirror will appear here as soon as you type.
          </p>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
export type WorkspaceMode = 'format' | 'preview' | 'stats' | 'bold' | 'inspector'

const props = withDefaults(
  defineProps<{
    mode?: WorkspaceMode
    initialText?: string
  }>(),
  {
    mode: 'format',
    initialText: ''
  }
)

const examplePost = `Strong LinkedIn posts are easier to read before they are easier to publish.

Start with one clear idea.
Keep paragraphs short.
Preview the first screen before you copy.

What would you improve before posting?`

const postText = ref(props.initialText || examplePost)

const draftParagraphs = computed(() =>
  postText.value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
)

function useExample() {
  postText.value = examplePost
}

function clearPost() {
  postText.value = ''
}
</script>
