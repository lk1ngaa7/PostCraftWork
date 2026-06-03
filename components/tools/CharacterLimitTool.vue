<template>
  <section class="my-8 w-full max-w-6xl overflow-hidden bg-[#FFFDF8] p-4 shadow-soft sm:mx-auto sm:w-[calc(100%-2rem)] sm:rounded-[28px] sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <div class="min-w-0 space-y-5">
        <div>
          <p class="text-xs font-semibold uppercase text-professional">Limit dashboard</p>
          <h1 class="mt-4 max-w-[21rem] text-balance text-3xl font-bold leading-tight text-ink sm:max-w-3xl sm:text-5xl">
            LinkedIn Post Character Limit Checker
          </h1>
          <p class="mt-5 max-w-[20.5rem] break-words text-pretty text-base leading-7 text-slate-600 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg">
            Check post length, article fields, profile fields, hashtags, mentions, links, and reading time before publishing.
          </p>
        </div>

        <section class="max-w-full overflow-hidden rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Character checker input">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0 max-w-[18.5rem] sm:max-w-none">
              <label for="limit-text" class="block text-base font-bold text-ink">{{ activeLimit.label }}</label>
              <p class="mt-1 break-words text-pretty text-sm text-muted [overflow-wrap:anywhere]">{{ activeLimit.notes }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!draftText" @click="draftText = ''">Clear</button>
            </div>
          </div>

          <textarea
            id="limit-text"
            v-model="draftText"
            class="mt-4 min-h-[280px] w-full max-w-full resize-y overflow-x-hidden rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition [overflow-wrap:anywhere] placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100 lg:min-h-[390px]"
            wrap="soft"
            :placeholder="placeholderText"
          />
        </section>

        <section class="max-w-full overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-subtle" aria-label="Field limit selector">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-base font-bold text-ink">Field limits</h2>
            <span class="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">Sources</span>
          </div>

          <div class="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Limit groups">
            <button
              v-for="group in linkedinLimitGroups"
              :key="group.id"
              type="button"
              class="min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional"
              :class="activeGroup === group.id ? 'border-professional bg-professional text-white' : 'border-border bg-white text-slate-700 hover:border-professional hover:text-professional'"
              @click="selectGroup(group.id)"
            >
              {{ group.label }}
            </button>
          </div>

          <div class="mt-4 grid gap-2">
            <button
              v-for="limit in visibleLimits"
              :key="limit.id"
              type="button"
              class="min-w-0 rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional"
              :class="limit.id === activeLimitId ? 'border-professional bg-[#EAF3FF]' : 'border-soft bg-[#FBFCFE] hover:border-professional'"
              @click="activeLimitId = limit.id"
            >
              <span class="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <span class="min-w-0 break-words font-semibold text-ink [overflow-wrap:anywhere]">{{ limit.label }}</span>
                <span class="text-sm font-semibold tabular-nums text-slate-600">{{ formatNumber(limit.max) }} chars</span>
              </span>
              <span class="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span class="rounded-full px-2 py-1 font-semibold" :class="sourceBadgeClass(limit.sourceType)">
                  {{ sourceLabel(limit.sourceType) }}
                </span>
                <span v-if="limit.lastVerified">Verified {{ limit.lastVerified }}</span>
              </span>
            </button>
          </div>
        </section>
      </div>

      <aside class="min-w-0 max-w-full overflow-hidden rounded-[26px] border border-[#D6E6F7] bg-white p-4 shadow-soft sm:p-6" aria-label="Character limit dashboard">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-professional">Current field</p>
            <h2 class="mt-1 text-balance text-2xl font-bold text-ink sm:text-3xl">{{ activeLimit.label }}</h2>
            <p class="mt-2 text-pretty text-sm leading-6 text-muted">
              Limits may vary by surface, device, account state, and future LinkedIn changes.
            </p>
          </div>
          <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="limitBadgeClass">{{ limitStatus }}</span>
        </div>

        <section class="mt-6 rounded-2xl border border-soft bg-[#FBFCFE] p-5" aria-label="Character progress">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-muted">Characters</p>
              <p class="mt-1 text-5xl font-bold tabular-nums text-ink sm:text-6xl">{{ formatNumber(stats.characters) }}</p>
            </div>
            <div class="text-left sm:text-right">
              <p class="text-sm font-semibold text-muted">Limit</p>
              <p class="mt-1 text-2xl font-bold tabular-nums text-ink">{{ formatNumber(activeLimit.max) }}</p>
              <p class="mt-1 text-sm font-semibold tabular-nums" :class="remaining < 0 ? 'text-red-700' : 'text-green-700'">
                {{ remainingLabel }}
              </p>
            </div>
          </div>

          <div
            class="mt-5 h-4 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            :aria-label="`${activeLimit.label} character progress`"
            :aria-valuenow="Math.min(progressPercent, 100)"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="h-full rounded-full transition" :class="progressClass" :style="{ width: `${Math.min(progressPercent, 100)}%` }" />
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-3">
            <div class="rounded-xl bg-white p-3">
              <p class="text-xs font-semibold text-muted">Progress</p>
              <p class="mt-1 text-2xl font-bold tabular-nums text-ink">{{ progressPercent }}%</p>
            </div>
            <div class="rounded-xl bg-white p-3">
              <p class="text-xs font-semibold text-muted">Source type</p>
              <p class="mt-1 text-sm font-bold text-ink">{{ sourceLabel(activeLimit.sourceType) }}</p>
            </div>
            <div class="rounded-xl bg-white p-3">
              <p class="text-xs font-semibold text-muted">Read time</p>
              <p class="mt-1 text-2xl font-bold tabular-nums text-ink">{{ stats.estimatedReadTimeMinutes }}m</p>
            </div>
          </div>
        </section>

        <dl class="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div v-for="item in statCards" :key="item.label" class="rounded-xl border border-soft bg-[#FBFCFE] p-4">
            <dt class="text-xs font-semibold uppercase text-muted">{{ item.label }}</dt>
            <dd class="mt-2 text-2xl font-bold tabular-nums text-ink">{{ item.value }}</dd>
          </div>
        </dl>

        <div class="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <section class="rounded-2xl border border-soft bg-[#FFFDF8] p-4" aria-label="Length suggestions">
            <h2 class="text-sm font-bold text-ink">Warnings and suggestions</h2>
            <ul class="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li v-for="suggestion in suggestions" :key="suggestion" class="rounded-lg bg-white px-3 py-2">
                {{ suggestion }}
              </li>
            </ul>
          </section>

          <section class="rounded-2xl border border-soft bg-navy p-4 text-white" aria-label="First screen estimate">
            <p class="text-sm font-semibold text-[#F8D49B]">First-screen estimate</p>
            <div class="mt-3 grid grid-cols-2 gap-3">
              <div class="rounded-xl bg-white/10 p-3">
                <p class="text-xs text-slate-300">Visible chars</p>
                <p class="mt-1 text-2xl font-bold tabular-nums">{{ stats.firstVisibleCharacters }}</p>
              </div>
              <div class="rounded-xl bg-white/10 p-3">
                <p class="text-xs text-slate-300">Visible lines</p>
                <p class="mt-1 text-2xl font-bold tabular-nums">{{ stats.firstVisibleLines }}</p>
              </div>
            </div>
            <p class="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-200">
              {{ stats.firstTwoHundredChars || 'Paste text to preview the opening section.' }}
            </p>
          </section>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { linkedinLimitGroups, linkedinLimits, type LinkedInLimitSourceType } from '~/utils/linkedinLimits.config'

type LimitGroupId = (typeof linkedinLimitGroups)[number]['id']

const examples: Record<string, string> = {
  'post-body': `A readable post is not just short.

It has a clear opening line,
short paragraph breaks,
and a simple next step.

Before publishing, I check:
characters
paragraphs
hashtags
mentions like @alex
links
emojis
read time

https://postcraft.work

What do you measure before a post goes live?

#LinkedIn #ContentStrategy`,
  'article-body': `Long-form articles need a different length check.

Paste the article body here to compare it against the article body limit and see read time, paragraphs, links, and opening visibility.`,
  default: 'Paste the field text here to check characters, remaining space, and source confidence.'
}

const defaultLimit = linkedinLimits[0]!
const defaultExample = examples['post-body']!
const fallbackExample = examples.default!

const draftText = ref<string>(defaultExample)
const activeGroup = ref<LimitGroupId>('post')
const activeLimitId = ref('post-body')

const stats = usePostStats(draftText)

const activeLimit = computed(() => linkedinLimits.find((limit) => limit.id === activeLimitId.value) ?? defaultLimit)
const visibleLimits = computed(() => linkedinLimits.filter((limit) => limit.group === activeGroup.value))
const remaining = computed(() => activeLimit.value.max - stats.value.characters)
const progressPercent = computed(() => activeLimit.value.max ? Math.ceil((stats.value.characters / activeLimit.value.max) * 100) : 0)
const limitStatus = computed(() => remaining.value < 0 ? 'Over limit' : progressPercent.value >= 80 ? 'Near limit' : 'Safe')
const remainingLabel = computed(() => remaining.value >= 0 ? `${formatNumber(remaining.value)} remaining` : `${formatNumber(Math.abs(remaining.value))} over`)
const placeholderText = computed(() => `Paste ${activeLimit.value.label.toLowerCase()} text to check it...`)

const limitBadgeClass = computed(() => remaining.value < 0 ? 'bg-red-50 text-red-700' : progressPercent.value >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700')
const progressClass = computed(() => remaining.value < 0 ? 'bg-red-600' : progressPercent.value >= 80 ? 'bg-amber-600' : 'bg-green-700')

const statCards = computed(() => [
  { label: 'Words', value: formatNumber(stats.value.words) },
  { label: 'Lines', value: formatNumber(stats.value.lines) },
  { label: 'Paragraphs', value: formatNumber(stats.value.paragraphs) },
  { label: 'Hashtags', value: formatNumber(stats.value.hashtags) },
  { label: 'Mentions', value: formatNumber(stats.value.mentions) },
  { label: 'Links', value: formatNumber(stats.value.links) },
  { label: 'Emojis', value: formatNumber(stats.value.emojis) },
  { label: 'Read time', value: `${stats.value.estimatedReadTimeMinutes}m` }
])

const suggestions = computed(() => {
  const items: string[] = []

  if (!draftText.value.trim()) {
    return ['Paste text to check this field.', 'Empty input is currently 0 characters.']
  }

  if (remaining.value < 0) {
    items.push(`Your ${activeLimit.value.label.toLowerCase()} is over the limit by ${formatNumber(Math.abs(remaining.value))} characters.`)
  } else if (progressPercent.value >= 80) {
    items.push(`You are close to the limit with ${remainingLabel.value}.`)
  } else {
    items.push(`${activeLimit.value.label} is within the configured limit.`)
  }

  if (activeLimit.value.id === 'post-body' && stats.value.characters > 2600) {
    items.push('Consider moving long-form content into an article if the draft keeps growing.')
  }
  if (stats.value.firstVisibleCharacters > 220) {
    items.push('Your opening section is long; check the preview before publishing.')
  }
  if (stats.value.hashtags === 0 && activeLimit.value.group === 'post') {
    items.push('You can add 1-3 relevant hashtags if discovery matters for this post.')
  } else if (stats.value.hashtags > 5) {
    items.push('Hashtag count is high and may make the post feel crowded.')
  }
  if (stats.value.links > 0) {
    items.push(linkAppearsEarly(draftText.value) ? 'A link appears early in the post and may reduce first-screen readability.' : 'Links detected; verify the final preview before publishing.')
  }
  if (stats.value.mentions > 0) {
    items.push('Mentions detected. This checker counts them but does not validate real accounts.')
  }
  if (activeLimit.value.sourceType !== 'official') {
    items.push('This field is not marked official here; verify the limit in the current LinkedIn editor.')
  }

  return items
})

function selectGroup(groupId: LimitGroupId) {
  activeGroup.value = groupId
  const firstLimit = linkedinLimits.find((limit) => limit.group === groupId)
  if (firstLimit) activeLimitId.value = firstLimit.id
}

function useExample() {
  draftText.value = examples[activeLimit.value.id] ?? fallbackExample
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function sourceLabel(sourceType: LinkedInLimitSourceType) {
  if (sourceType === 'official') return 'Official'
  if (sourceType === 'community-observed') return 'Community observed'
  return 'Needs verification'
}

function sourceBadgeClass(sourceType: LinkedInLimitSourceType) {
  if (sourceType === 'official') return 'bg-green-50 text-green-700'
  if (sourceType === 'community-observed') return 'bg-amber-50 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}

function linkAppearsEarly(text: string) {
  const linkIndex = text.search(/https?:\/\/[^\s]+/i)
  return linkIndex >= 0 && linkIndex < 260
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}
</style>
