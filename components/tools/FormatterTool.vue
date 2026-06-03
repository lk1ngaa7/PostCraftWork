<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-navy p-5 text-white shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#F8D49B]">Formatter workbench</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">LinkedIn Post Formatter</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
          Clean up spacing, paragraphs, bullets, and line breaks before you publish on LinkedIn.
        </p>

        <section class="mt-7 rounded-2xl border border-white/15 bg-white/8 p-4" aria-label="Formatter actions">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-white">Format actions</h2>
              <p class="mt-1 text-sm text-slate-300">Format without rewriting your message.</p>
            </div>
            <CopyButton :text="formattedText || rawText" />
          </div>
          <div class="mt-4 grid gap-2 sm:grid-cols-2">
            <button class="tool-action-primary" type="button" :disabled="!rawText" @click="applyFormat">Format post</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyCleanSpacing">Clean spacing</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyNormalize">Normalize line breaks</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyParagraphBreaks">Add readable paragraph breaks</button>
          </div>
        </section>

        <section class="mt-4 rounded-2xl border border-white/15 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Raw post input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="formatter-raw" class="block text-base font-bold">Paste your draft post</label>
              <p class="mt-1 text-sm text-muted">Messy spacing, copied bullets, and pasted drafts are fine.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!rawText" @click="clearAll">Clear</button>
            </div>
          </div>
          <textarea
            id="formatter-raw"
            v-model="rawText"
            class="mt-4 min-h-[280px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            placeholder="Paste your post here..."
          />
        </section>
      </div>

      <aside class="min-w-0 space-y-4">
        <section class="rounded-2xl border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Formatted output">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold">Formatted output</h2>
              <p class="mt-1 text-sm text-muted">Editable result, ready to copy.</p>
            </div>
            <CopyButton :text="formattedText || rawText" />
          </div>
          <textarea
            id="formatter-output"
            v-model="formattedText"
            class="mt-4 min-h-[220px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            aria-label="Formatted LinkedIn post output"
            placeholder="Formatted post appears here after you run an action."
          />
        </section>

        <section class="rounded-2xl border border-white/70 bg-white p-4 text-ink shadow-subtle" aria-label="Format change summary">
          <h2 class="text-sm font-bold">Change summary</h2>
          <ul class="mt-3 space-y-2 text-sm leading-6 text-muted">
            <li v-for="item in changeSummary" :key="item" class="rounded-lg border border-soft bg-[#FBFCFE] px-3 py-2">
              {{ item }}
            </li>
          </ul>
        </section>

        <PostPreview :text="previewText" :stats="stats" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cleanPostSpacing, formatPost, normalizeLineBreaks } from '~/utils/postFormat'

const examplePost = `  I used to write LinkedIn drafts like this.   


- one idea
- too much spacing
- copied bullets

https://example.com

What would you clean before posting?   `

const rawText = ref(examplePost)
const formattedText = ref('')
const changeSummary = ref<string[]>(['Run a format action to see what changed.', 'Your original wording stays unchanged.'])
const previewText = computed(() => formattedText.value || rawText.value)
const stats = usePostStats(previewText)

function summarize(before: string, after: string, action: string) {
  const beforeLines = before.split('\n').length
  const afterLines = after.split('\n').length
  const removedCharacters = Math.max(0, before.length - after.length)
  changeSummary.value = [
    `${action} applied.`,
    removedCharacters ? `Removed ${removedCharacters} spacing characters.` : 'No unnecessary spacing characters found.',
    beforeLines !== afterLines ? `Line count changed from ${beforeLines} to ${afterLines}.` : 'Line count stayed the same.',
    'Kept your original wording unchanged.'
  ]
}

function applyFormat() {
  const before = rawText.value
  formattedText.value = formatPost(before)
  summarize(before, formattedText.value, 'Safe format')
}

function applyCleanSpacing() {
  const before = rawText.value
  formattedText.value = cleanPostSpacing(before)
  summarize(before, formattedText.value, 'Clean spacing')
}

function applyNormalize() {
  const before = rawText.value
  formattedText.value = normalizeLineBreaks(before).trim()
  summarize(before, formattedText.value, 'Normalize line breaks')
}

function applyParagraphBreaks() {
  const before = rawText.value
  formattedText.value = cleanPostSpacing(before).replace(/\n(?!\n)/g, '\n\n').replace(/\n{3,}/g, '\n\n')
  summarize(before, formattedText.value, 'Readable paragraph breaks')
}

function useExample() {
  rawText.value = examplePost
  formattedText.value = ''
  changeSummary.value = ['Run a format action to see what changed.', 'Your original wording stays unchanged.']
}

function clearAll() {
  rawText.value = ''
  formattedText.value = ''
  changeSummary.value = ['Paste your post to format it.', 'Your original wording stays unchanged.']
}
</script>

<style scoped>
.tool-action-primary {
  @apply min-h-11 rounded-lg bg-professional px-4 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-45;
}

.tool-action-secondary {
  @apply min-h-11 rounded-lg border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-45;
}

.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}
</style>
