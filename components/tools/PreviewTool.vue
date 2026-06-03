<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#FFFDF8] p-5 shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-professional">Mobile preview studio</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-5xl">LinkedIn Post Preview</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          See how your post may look in a professional mobile feed preview before publishing.
        </p>

        <section class="mt-7 rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Preview post input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="preview-post" class="block text-base font-bold text-ink">Post text</label>
              <p class="mt-1 text-sm text-muted">Update the draft and watch the mobile preview change.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!postText" @click="postText = ''">Clear</button>
            </div>
          </div>
          <textarea
            id="preview-post"
            v-model="postText"
            class="mt-4 min-h-[320px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Paste your post to preview it..."
          />
        </section>

        <div class="mt-4 grid gap-3 sm:grid-cols-3" aria-label="Preview hints">
          <div class="rounded-xl border border-soft bg-white p-3">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Mobile preview</p>
            <p class="mt-2 text-xl font-bold text-ink">{{ stats.lines }} lines</p>
          </div>
          <div class="rounded-xl border border-soft bg-white p-3">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">First screen</p>
            <p class="mt-2 text-xl font-bold text-ink">{{ firstScreenLabel }}</p>
          </div>
          <div class="rounded-xl border border-soft bg-white p-3">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">See more hint</p>
            <p class="mt-2 text-xl font-bold" :class="hasSeeMoreHint ? 'text-amber-700' : 'text-green-700'">
              {{ hasSeeMoreHint ? 'Likely' : 'Clear' }}
            </p>
          </div>
        </div>
      </div>

      <aside class="min-w-0 rounded-[26px] border border-[#D6E6F7] bg-navy p-4 shadow-soft sm:p-6" aria-label="Dominant mobile post preview">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3 text-white">
          <div>
            <h2 class="text-base font-bold">Large mobile preview</h2>
            <p class="mt-1 text-sm text-slate-300">Approximate feed-style preview. LinkedIn may render differently.</p>
          </div>
          <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-professional">Preview first</span>
        </div>
        <PostPreview :text="postText" :stats="stats" class="mx-auto max-w-[460px]" />
        <PostStats :stats="stats" class="mx-auto mt-4 max-w-[460px]" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const examplePost = `Most content problems show up on the first screen.

If the opening is too dense, people never reach the useful part.

I check three things before publishing:
- Is the first line clear?
- Does the preview breathe?
- Does the see-more point arrive too early?

https://example.com

What do you check before posting?`

const postText = ref(examplePost)
const stats = usePostStats(postText)
const hasSeeMoreHint = computed(() => stats.value.characters > 280 || stats.value.paragraphs > 3)
const firstScreenLabel = computed(() => `${Math.min(stats.value.characters, 200)} chars`)

function useExample() {
  postText.value = examplePost
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}
</style>
