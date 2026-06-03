<template>
  <section class="my-8 w-full max-w-6xl overflow-hidden bg-[#FFFDF8] p-4 shadow-soft sm:mx-auto sm:w-[calc(100%-2rem)] sm:rounded-[28px] sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <div class="min-w-0 space-y-5">
        <div>
          <p class="text-xs font-semibold uppercase text-professional">Publishing readiness</p>
          <h1 class="mt-4 max-w-[21rem] text-balance text-3xl font-bold leading-tight text-ink sm:max-w-3xl sm:text-5xl">LinkedIn Post Inspector</h1>
          <p class="mt-5 max-w-[20.5rem] break-words text-pretty text-base leading-7 text-slate-600 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg">
            Check hook length, readability, hashtags, links, CTA, and publishing readiness before posting.
          </p>
        </div>

        <section class="max-w-full overflow-hidden rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Inspector post input">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0 max-w-[18.5rem] sm:max-w-none">
              <label for="inspector-post" class="block text-base font-bold text-ink">Post to inspect</label>
              <p class="mt-1 break-words text-pretty text-sm text-muted [overflow-wrap:anywhere]">
                Local structural checks. No AI score, no engagement promises.
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!postText" @click="postText = ''">Clear</button>
            </div>
          </div>
          <textarea
            id="inspector-post"
            v-model="postText"
            class="mt-4 min-h-[300px] w-full max-w-full resize-y overflow-x-hidden break-words rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition [overflow-wrap:anywhere] placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100 lg:min-h-[430px]"
            placeholder="Paste your post to inspect it..."
            wrap="soft"
          />
        </section>

        <section class="rounded-2xl border border-border bg-white p-4 shadow-subtle" aria-label="Inspector quick metrics">
          <h2 class="text-base font-bold text-ink">Draft metrics</h2>
          <dl class="mt-4 grid grid-cols-2 gap-3">
            <div v-for="metric in draftMetrics" :key="metric.label" class="rounded-xl border border-soft bg-[#FBFCFE] p-3">
              <dt class="text-xs font-semibold uppercase text-muted">{{ metric.label }}</dt>
              <dd class="mt-1 text-2xl font-bold tabular-nums text-ink">{{ metric.value }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <aside class="min-w-0 max-w-full overflow-hidden rounded-[26px] border border-[#D6E6F7] bg-navy p-4 text-white shadow-soft sm:p-6" aria-label="Publishing readiness results">
        <div class="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <div class="grid size-36 place-items-center rounded-full border border-[#F8D49B]/30 bg-white/10">
            <div class="text-center">
              <p class="text-5xl font-bold tabular-nums">{{ inspection.score }}</p>
              <p class="mt-1 text-xs font-semibold uppercase text-[#F8D49B]">Readiness</p>
            </div>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-[#F8D49B]">Publishing readiness</p>
            <h2 class="mt-1 text-balance text-2xl font-bold">Structure and readability check</h2>
            <p class="mt-2 text-pretty text-sm leading-6 text-slate-300">
              Checks hook length, mobile readability, paragraphs, CTA, hashtags, links, post length, formatting, and readability.
            </p>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-3 gap-3">
          <div v-for="group in resultGroups" :key="group.label" class="rounded-xl border border-white/15 bg-white/10 p-3">
            <p class="text-xs font-semibold uppercase text-slate-300">{{ group.label }}</p>
            <p class="mt-2 text-2xl font-bold tabular-nums">{{ group.count }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <section class="rounded-2xl border border-white/15 bg-white/10 p-4" aria-label="Priority fix list">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-sm font-bold">Priority fix list</h2>
              <span class="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{{ inspection.priorityFixes.length || 0 }} items</span>
            </div>
            <ol v-if="inspection.priorityFixes.length" class="mt-3 space-y-2 text-sm leading-6 text-slate-200">
              <li v-for="(item, index) in inspection.priorityFixes" :key="item.id" class="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                <span class="font-semibold text-white">{{ index + 1 }}. {{ item.suggestion || item.title }}</span>
                <span class="mt-1 block text-slate-300">{{ item.message }}</span>
              </li>
            </ol>
            <p v-else class="mt-3 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm leading-6 text-slate-200">
              No priority fixes detected. Review the good checks before publishing.
            </p>
          </section>

          <section class="rounded-2xl border border-white/15 bg-white p-4 text-ink" aria-label="Readability metrics">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 class="text-sm font-bold">Readability</h2>
                <p class="mt-1 text-xs text-muted">{{ inspection.readability.mode === 'english' ? 'Approximate English metrics' : 'Structural readability' }}</p>
              </div>
              <span class="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">
                {{ inspection.readability.label }}
              </span>
            </div>
            <dl class="mt-4 grid grid-cols-2 gap-3">
              <div v-for="metric in readabilityMetrics" :key="metric.label" class="rounded-xl border border-soft bg-[#FBFCFE] p-3">
                <dt class="text-xs font-semibold text-muted">{{ metric.label }}</dt>
                <dd class="mt-1 text-xl font-bold tabular-nums text-ink">{{ metric.value }}</dd>
              </div>
            </dl>
            <p class="mt-3 text-xs leading-5 text-muted">
              Readability is approximate and works best for English text.
            </p>
          </section>
        </div>

        <div class="mt-5 grid gap-4 lg:grid-cols-3">
          <section v-for="panel in checklistPanels" :key="panel.label" class="rounded-2xl border border-white/15 bg-white/10 p-4" :aria-label="panel.label">
            <h2 class="text-sm font-bold">{{ panel.label }}</h2>
            <ul class="mt-3 space-y-2 text-sm leading-6">
              <li v-for="item in panel.items" :key="item.id" class="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                <p class="font-semibold text-white">{{ item.title }}</p>
                <p class="mt-1 text-slate-300">{{ item.suggestion || item.message }}</p>
              </li>
              <li v-if="!panel.items.length" class="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-slate-300">
                None detected.
              </li>
            </ul>
          </section>
        </div>

        <PostInspector :result="inspection" class="mt-5" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InspectionItem } from '~/utils/postInspector'

const examplePost = `I spent 18 months fixing onboarding.
Then I noticed the real problem.

The product was not confusing.

The first message was.

We had one long paragraph.
It explained every feature.
The link appeared too early.
https://example.com

Now I check the first line,
paragraph spacing,
links,
CTA,
and hashtags before publishing.

What would you check before a post goes live?

#LinkedIn #Writing #Content #Marketing #Creator #SaaS`

const postText = ref(examplePost)
const stats = usePostStats(postText)
const inspection = usePostInspector(postText)

const resultGroups = computed(() => [
  { label: 'Good', count: itemsBySeverity('good').length },
  { label: 'Warnings', count: itemsBySeverity('warning').length },
  { label: 'Fixes', count: itemsBySeverity('fix').length }
])

const draftMetrics = computed(() => [
  { label: 'Characters', value: formatNumber(stats.value.characters) },
  { label: 'Words', value: formatNumber(stats.value.words) },
  { label: 'Paragraphs', value: formatNumber(stats.value.paragraphs) },
  { label: 'Read time', value: `${stats.value.estimatedReadTimeMinutes}m` }
])

const readabilityMetrics = computed(() => [
  { label: 'Flesch ease', value: inspection.value.readability.fleschReadingEase ?? 'N/A' },
  { label: 'Grade', value: inspection.value.readability.fleschKincaidGrade ?? 'N/A' },
  { label: 'Sentence avg', value: `${inspection.value.readability.averageSentenceWords}w` },
  { label: 'Paragraph avg', value: `${inspection.value.readability.averageWordsPerParagraph}w` }
])

const checklistPanels = computed(() => [
  { label: 'Critical fixes', items: itemsBySeverity('fix') },
  { label: 'Warnings', items: itemsBySeverity('warning') },
  { label: 'Good checks', items: itemsBySeverity('good').slice(0, 5) }
])

function itemsBySeverity(severity: InspectionItem['severity']) {
  return inspection.value.items.filter((item) => item.severity === severity)
}

function useExample() {
  postText.value = examplePost
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}
</style>
