<template>
  <main>
    <section class="overflow-hidden bg-navy text-white">
      <div class="mx-auto grid w-full max-w-6xl gap-7 px-5 py-9 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-12">
        <div class="min-w-0 self-center">
          <p class="text-sm font-semibold text-[#F8D49B]">Browser-based LinkedIn writing tools</p>
          <h1 class="mt-4 max-w-3xl text-balance text-[2.35rem] font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span class="block">Free LinkedIn</span>
            <span class="block">Post Tools</span>
          </h1>
          <p class="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Format, preview, inspect, and polish your LinkedIn posts before publishing.
          </p>

          <div class="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-slate-800 sm:gap-3 sm:text-sm">
            <span class="rounded-full border border-[#F8D49B]/40 bg-white px-3 py-2 shadow-subtle sm:px-4">No sign-up required</span>
            <span class="rounded-full border border-[#F8D49B]/40 bg-white px-3 py-2 shadow-subtle sm:px-4">Local text processing</span>
            <span class="rounded-full border border-[#F8D49B]/40 bg-white px-3 py-2 shadow-subtle sm:px-4">Copy-ready workflow</span>
          </div>

          <nav class="mt-6 grid grid-cols-2 gap-2 sm:hidden" aria-label="Homepage tool shortcuts">
            <NuxtLink
              v-for="tool in toolCards"
              :key="`mobile-${tool.to}`"
              :to="tool.to"
              class="min-h-11 rounded-lg border border-white/12 bg-white/[0.08] px-3 py-2 text-sm font-semibold text-white transition hover:border-[#F8D49B]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              :class="{ 'col-span-2': tool.title === 'Inspector' }"
            >
              {{ tool.title }}
            </NuxtLink>
          </nav>
        </div>

        <aside class="min-w-0 overflow-hidden rounded-2xl border border-white/15 border-t-4 border-t-craft bg-white p-5 text-ink shadow-soft sm:p-6" aria-label="Quick start workspace">
          <div class="flex flex-wrap items-start justify-between gap-3 border-b border-soft pb-4">
            <div class="min-w-0">
              <p class="text-sm font-bold text-ink">Quick start workspace</p>
              <p class="mt-1 text-pretty text-sm leading-6 text-muted">Paste a draft, clean spacing, check the basics, then copy.</p>
            </div>
            <span class="rounded-full bg-craftSoft px-3 py-1 text-xs font-bold text-navy">
              Mini tool
            </span>
          </div>

          <div class="mt-5">
            <label for="home-quick-post" class="text-sm font-semibold text-ink">Your draft</label>
            <textarea
              id="home-quick-post"
              v-model="quickText"
              class="mt-2 min-h-[190px] w-full max-w-full resize-y rounded-xl border border-border bg-[#FBFCFE] p-4 text-base leading-7 text-ink shadow-inner outline-none transition focus:border-professional focus:ring-2 focus:ring-professional/15"
              placeholder="Paste your LinkedIn post here..."
            />
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              class="min-h-11 rounded-lg bg-professional px-4 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45"
              :disabled="!quickText"
              @click="formatQuickPost"
            >
              Format draft
            </button>
            <button
              type="button"
              class="min-h-11 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45"
              :disabled="!quickText"
              @click="cleanQuickPost"
            >
              Clean spacing
            </button>
            <CopyButton :text="quickText" label="Copy draft" copied-label="Draft copied" />
          </div>

          <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-soft pt-4 sm:grid-cols-4">
            <div v-for="item in quickStats" :key="item.label">
              <dt class="text-xs font-semibold text-muted">{{ item.label }}</dt>
              <dd class="mt-1 text-2xl font-bold tabular-nums text-ink">{{ item.value }}</dd>
            </div>
          </dl>

          <div class="mt-5 rounded-xl border border-soft bg-[#FBFCFE] p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-sm font-semibold text-ink">First-screen signal</p>
              <span class="shrink-0 rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-professional">
                {{ quickStatus }}
              </span>
            </div>
            <p class="mt-3 line-clamp-3 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
              {{ firstScreenText }}
            </p>
          </div>
        </aside>
      </div>

      <div class="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-6 lg:pb-12">
        <div class="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-7">
          <div>
            <h2 class="text-balance text-2xl font-bold">Choose a focused tool</h2>
            <p class="mt-2 max-w-2xl text-pretty text-sm leading-6 text-slate-300">
              Each page has a dedicated first-screen workflow for one publishing task.
            </p>
          </div>
          <NuxtLink
            to="/linkedin-post-formatter"
            class="inline-flex min-h-11 items-center rounded-lg border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-subtle transition hover:border-[#F8D49B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start with formatter
          </NuxtLink>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <NuxtLink
            v-for="tool in toolCards"
            :key="tool.to"
            :to="tool.to"
            class="group min-h-[154px] rounded-xl border border-white/12 bg-white/[0.07] p-4 transition hover:border-[#F8D49B]/70 hover:bg-white/[0.11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span class="inline-grid size-10 place-items-center rounded-lg bg-white text-sm font-bold text-navy shadow-subtle">
              {{ tool.shortLabel }}
            </span>
            <h3 class="mt-4 text-base font-bold text-white">{{ tool.title }}</h3>
            <p class="mt-2 text-pretty text-sm leading-6 text-slate-300">{{ tool.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <SeoContent
      heading="Why use PostCraft before publishing?"
      intro="PostCraft.work gives LinkedIn creators a calm browser workspace for the checks that usually happen right before a post goes live."
      :sections="sections"
      :how-to-steps="howToSteps"
      :tips="tips"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { allRelatedTools, defaultFaq } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'PostCraft.work - Free LinkedIn Post Tools',
  description: 'Format, preview, inspect, and polish your LinkedIn posts before publishing. Free professional LinkedIn post tools with no sign-up required.',
  path: '/'
})

const examplePost = `Strong LinkedIn posts are easier to read before they are easier to publish.

Start with one clear idea.
Keep paragraphs short.
Preview the first screen before you copy.

What would you improve before posting?`

const quickText = ref(examplePost)
const stats = usePostStats(quickText)
const { cleanPostSpacing, formatPost } = usePostFormatter()

const toolCards = [
  {
    shortLabel: 'Fmt',
    title: 'Formatter',
    description: 'Clean spacing, line breaks, paragraph flow, and copy-ready text.',
    to: '/linkedin-post-formatter'
  },
  {
    shortLabel: 'Prv',
    title: 'Preview',
    description: 'Check a mobile-style preview, first screen, and see-more hint.',
    to: '/linkedin-post-preview'
  },
  {
    shortLabel: 'Lim',
    title: 'Character Limit',
    description: 'Track characters, words, lines, links, hashtags, emojis, and read time.',
    to: '/linkedin-post-character-limit'
  },
  {
    shortLabel: 'Aa',
    title: 'Bold Text',
    description: 'Convert plain text into Unicode bold, italic, and bold italic styles.',
    to: '/how-to-bold-text-in-linkedin-post'
  },
  {
    shortLabel: 'Chk',
    title: 'Inspector',
    description: 'Review publishing readiness, warnings, and priority fixes.',
    to: '/linkedin-post-inspector'
  }
]

const quickStats = computed(() => [
  { label: 'Characters', value: stats.value.characters },
  { label: 'Words', value: stats.value.words },
  { label: 'Hashtags', value: stats.value.hashtags },
  { label: 'Read time', value: `${stats.value.estimatedReadTimeMinutes}m` }
])

const quickStatus = computed(() => {
  if (!quickText.value.trim()) {
    return 'Paste a draft'
  }
  if (stats.value.characters > 3000) {
    return 'Trim needed'
  }
  if (stats.value.words < 30) {
    return 'Short draft'
  }
  return 'Ready to review'
})

const firstScreenText = computed(() => quickText.value.trim() || 'Your opening lines will appear here as you type.')

function formatQuickPost() {
  quickText.value = formatPost(quickText.value)
}

function cleanQuickPost() {
  quickText.value = cleanPostSpacing(quickText.value)
}

const sections = [
  { title: 'One hub, five workflows', body: 'Use the home page for quick cleanup, then move into the dedicated formatter, preview, limit checker, Unicode converter, or inspector when you need a deeper pass.' },
  { title: 'Built for publishing checks', body: 'The tools focus on spacing, first-screen readability, post length, links, hashtags, emojis, and copy-ready output instead of generic content generation.' },
  { title: 'Independent and local-first', body: 'PostCraft.work does not ask for LinkedIn credentials, does not publish on your behalf, and keeps the core text workflow in your browser.' }
]

const howToSteps = [
  { title: 'Start with a quick cleanup', body: 'Paste a draft into the home workspace to clean spacing and check basic post stats.' },
  { title: 'Open the focused tool', body: 'Choose Formatter, Preview, Character Limit, Bold Text, or Inspector when you need a deeper workflow.' },
  { title: 'Review before copying', body: 'Use the dedicated page results to adjust spacing, first-screen readability, length, Unicode emphasis, or publishing readiness.' },
  { title: 'Publish from your own account', body: 'Copy the prepared text and paste it into LinkedIn yourself. PostCraft.work does not post directly.' }
]

const tips = [
  'Use Formatter first when the draft came from another editor and spacing looks uneven.',
  'Use Preview before publishing longer posts where the see-more point matters.',
  'Use Character Limit for post, profile, article, or ad fields that need a hard count.',
  'Use Inspector last when you want a structural checklist before copying the final draft.'
]

const faq = [
  { question: 'What is PostCraft.work for?', answer: 'PostCraft.work is a browser-based set of LinkedIn post tools for formatting, previewing, checking length, converting Unicode emphasis, and inspecting readability before publishing.' },
  { question: 'Do I need an account?', answer: 'No. The tools are free to use without sign-up and do not require LinkedIn credentials.' },
  { question: 'Which tool should I use first?', answer: 'If your draft is messy, start with the formatter. If the opening is your main concern, use the preview or inspector.' },
  ...defaultFaq
]
const relatedTools = allRelatedTools
</script>
