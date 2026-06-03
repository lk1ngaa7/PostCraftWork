<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-navy p-5 text-white shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase text-[#F8D49B]">Formatter workbench</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight text-balance sm:text-5xl">LinkedIn Post Formatter</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-pretty text-slate-200 sm:text-lg">
          Clean up spacing, paragraphs, bullets, and line breaks before copying your post into LinkedIn.
        </p>

        <section class="mt-7 rounded-2xl border border-white/15 bg-white/8 p-4" aria-label="Formatter controls">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 class="text-base font-bold text-white">Format controls</h2>
              <p class="mt-1 text-sm leading-6 text-slate-300">Safe formatting keeps your original wording intact.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-dark" type="button" @click="useExample">Use example</button>
              <button class="tool-button-dark" type="button" :disabled="!hasAnyText" @click="clearAll">Clear</button>
            </div>
          </div>

          <div class="mt-4 grid gap-2 sm:grid-cols-2">
            <button class="tool-action-primary" type="button" :disabled="!rawText.trim()" @click="applySafeFormat">Format post</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText.trim()" @click="applyCleanSpacing">Clean spacing</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyNormalizeBullets">Normalize bullets</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyRemoveTrailingSpaces">Remove trailing spaces</button>
            <button class="tool-action-secondary" type="button" :disabled="!rawText" @click="applyNormalizeLineBreaks">Normalize line breaks</button>
            <CopyButton :text="formattedText" label="Copy formatted post" copied-label="Formatted post copied" />
          </div>

          <fieldset class="mt-5 rounded-xl border border-white/15 bg-black/10 p-3">
            <legend class="px-1 text-sm font-bold text-white">Advanced format options</legend>
            <div class="mt-2 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              <label class="toggle-row">
                <input v-model="advancedOptions.addDenseParagraphSpacing" type="checkbox" class="size-4 accent-professional" />
                <span>Add spacing between dense paragraphs</span>
              </label>
              <label class="toggle-row">
                <input v-model="advancedOptions.normalizeBullets" type="checkbox" class="size-4 accent-professional" />
                <span>Normalize bullet style</span>
              </label>
              <label class="toggle-row">
                <input v-model="advancedOptions.removeDuplicateHashtags" type="checkbox" class="size-4 accent-professional" />
                <span>Remove duplicate hashtags</span>
              </label>
              <label class="toggle-row">
                <input v-model="advancedOptions.moveHashtagsToEnd" type="checkbox" class="size-4 accent-professional" />
                <span>Move hashtags to the end</span>
              </label>
            </div>
          </fieldset>
        </section>

        <section class="mt-4 rounded-2xl border border-white/15 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Raw post input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="formatter-raw" class="block text-base font-bold">Paste your draft post</label>
              <p class="mt-1 text-sm leading-6 text-muted">Paste messy spacing, markdown bullets, URLs, hashtags, or emoji.</p>
            </div>
            <p class="text-sm font-semibold tabular-nums text-slate-500">{{ rawText.length }} chars</p>
          </div>
          <textarea
            id="formatter-raw"
            v-model="rawText"
            class="mt-4 min-h-[300px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            placeholder="Paste your post here..."
          />
        </section>

        <section class="mt-4 rounded-2xl border border-white/15 bg-white p-4 text-ink shadow-subtle" aria-label="Format change summary">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold">Change summary</h2>
              <p class="mt-1 text-sm text-muted">A transparent log of formatting-only changes.</p>
            </div>
            <span class="rounded-full bg-craftSoft px-3 py-1 text-xs font-bold text-[#7A4D00]">No rewrite</span>
          </div>
          <ul class="mt-3 grid gap-2 sm:grid-cols-2">
            <li v-for="item in changeSummary" :key="item" class="rounded-lg border border-soft bg-[#FBFCFE] px-3 py-2 text-sm leading-6 text-muted">
              {{ item }}
            </li>
          </ul>
        </section>
      </div>

      <aside class="min-w-0 space-y-4">
        <section class="rounded-2xl border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Formatted output">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold">Formatted output</h2>
              <p class="mt-1 text-sm leading-6 text-muted">Editable result, ready to copy.</p>
            </div>
            <CopyButton :text="formattedText" label="Copy formatted" copied-label="Copied formatted post" />
          </div>
          <textarea
            id="formatter-output"
            v-model="formattedText"
            class="mt-4 min-h-[360px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            aria-label="Formatted LinkedIn post output"
            placeholder="Formatted post appears here after you run an action."
          />
          <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
            <span class="tabular-nums">{{ formattedText.length }} formatted characters</span>
            <span>Preview updates from this editable output.</span>
          </div>
        </section>

        <section class="rounded-2xl border border-white/70 bg-white p-4 text-ink shadow-subtle" aria-label="Formatter preview">
          <div class="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold">Auxiliary preview</h2>
              <p class="mt-1 text-sm text-muted">Check spacing after formatting.</p>
            </div>
            <span class="rounded-full border border-soft px-3 py-1 text-xs font-bold text-muted">Secondary</span>
          </div>
          <PostPreview :text="previewText" :stats="stats" />
        </section>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const examplePost = `  I used to write LinkedIn drafts like this.   



- one idea   with too many spaces
* copied markdown bullet
• mixed bullet style   

Here is a dense paragraph that should be easier to scan before publishing. It has a useful point but the spacing makes it harder to read.
Here is the next thought sitting too close to the previous one.

https://example.com/launch?ref=postcraft

#LinkedIn #Writing #linkedin #Writing

What would you clean before posting?   `

const {
  cleanPostSpacing,
  formatPostWithChanges,
  normalizeLineBreaks,
  normalizePostBullets,
  removeTrailingSpaces
} = usePostFormatter()

const rawText = ref(examplePost)
const formattedText = ref('')
const changeSummary = ref<string[]>(['Run a format action to see what changed.', 'Your original wording stays unchanged.'])
const advancedOptions = reactive({
  addDenseParagraphSpacing: false,
  normalizeBullets: false,
  removeDuplicateHashtags: false,
  moveHashtagsToEnd: false
})

const hasAnyText = computed(() => Boolean(rawText.value || formattedText.value))
const previewText = computed(() => formattedText.value || rawText.value)
const stats = usePostStats(previewText)

function setResult(text: string, summary: string[]) {
  formattedText.value = text
  changeSummary.value = summary
}

function summarizeManualAction(action: string, before: string, after: string, details: string[]) {
  setResult(after, [
    `${action} applied`,
    ...details,
    before === after ? 'No matching formatting issue found' : 'Updated formatting only',
    'Kept your original wording unchanged'
  ])
}

function applySafeFormat() {
  if (!rawText.value.trim()) {
    setResult('', ['Paste your post to format it.', 'Your original wording stays unchanged.'])
    return
  }

  const result = formatPostWithChanges(rawText.value, {
    ...advancedOptions,
    normalizeBullets: true
  })
  setResult(result.text, result.summary)
}

function applyCleanSpacing() {
  const before = rawText.value
  const after = cleanPostSpacing(before)
  summarizeManualAction('Clean spacing', before, after, ['Trimmed outer spacing, trailing spaces, and extra blank lines'])
}

function applyNormalizeBullets() {
  const before = rawText.value
  const after = normalizePostBullets(before)
  const beforeLines = cleanPostSpacing(before).split('\n')
  const afterLines = after.split('\n')
  const changedLines = beforeLines.filter((line, index) => line !== afterLines[index]).length
  summarizeManualAction('Normalize bullets', before, after, [`Normalized ${changedLines} bullet line${changedLines === 1 ? '' : 's'}`])
}

function applyRemoveTrailingSpaces() {
  const before = rawText.value
  const trailingLines = normalizeLineBreaks(before).split('\n').filter((line) => /[ \t]+$/.test(line)).length
  const after = removeTrailingSpaces(before).trim()
  summarizeManualAction('Remove trailing spaces', before, after, [`Removed trailing spaces on ${trailingLines} line${trailingLines === 1 ? '' : 's'}`])
}

function applyNormalizeLineBreaks() {
  const before = rawText.value
  const normalizedCount = (before.match(/\r\n?|\r/g) ?? []).length
  const after = normalizeLineBreaks(before).trim()
  summarizeManualAction('Normalize line breaks', before, after, [`Normalized ${normalizedCount} line break${normalizedCount === 1 ? '' : 's'}`])
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

.tool-button-dark {
  @apply min-h-11 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-45;
}

.toggle-row {
  @apply flex min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 leading-5;
}
</style>
