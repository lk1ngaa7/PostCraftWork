<template>
  <section class="w-full max-w-full overflow-hidden rounded-xl border p-4 shadow-subtle" :class="shellClasses" aria-label="Professional post preview">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold" :class="theme === 'dark' ? 'text-white' : 'text-ink'">Post preview</p>
        <p class="mt-1 text-xs" :class="theme === 'dark' ? 'text-slate-300' : 'text-muted'">
          {{ mode === 'collapsed' ? 'Collapsed feed view.' : 'Expanded feed view.' }}
        </p>
      </div>
      <span v-if="hasSeeMoreHint" class="rounded-full px-3 py-1 text-xs font-semibold" :class="theme === 'dark' ? 'bg-amber-300 text-navy' : 'bg-amber-50 text-amber-700'">
        see more likely
      </span>
    </div>

    <article class="mx-auto mt-4 w-full overflow-hidden rounded-2xl border p-4 shadow-subtle" :class="[cardClasses, deviceClass]">
      <header class="flex items-start gap-3">
        <div class="grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold" :class="theme === 'dark' ? 'bg-white text-navy' : 'bg-navy text-white'">
          {{ resolvedAuthor.initials }}
        </div>
        <div class="min-w-0">
          <p class="font-semibold leading-5" :class="theme === 'dark' ? 'text-white' : 'text-ink'">{{ resolvedAuthor.name }}</p>
          <p class="mt-0.5 text-xs leading-5" :class="mutedTextClass">{{ resolvedAuthor.headline }}</p>
          <p class="text-xs" :class="mutedTextClass">{{ resolvedAuthor.timestamp }} · Public</p>
        </div>
      </header>

      <div class="mt-4 max-w-full overflow-hidden break-words text-[15px] leading-6 [overflow-wrap:anywhere]" :class="theme === 'dark' ? 'text-slate-100' : 'text-slate-800'">
        <template v-if="paragraphs.length">
          <div v-if="mode === 'collapsed'" class="line-clamp-3 whitespace-pre-wrap break-words">
            {{ collapsedText }}
          </div>
          <template v-else>
            <p v-for="paragraph in paragraphs" :key="paragraph" class="mb-4 whitespace-pre-wrap break-words last:mb-0">
              {{ paragraph }}
            </p>
          </template>
        </template>
        <p v-else :class="mutedTextClass">
          Your post preview will appear here as you type.
        </p>
      </div>

      <button
        v-if="hasSeeMoreHint && mode === 'collapsed'"
        type="button"
        class="mt-3 text-sm font-semibold"
        :class="theme === 'dark' ? 'text-[#F8D49B]' : 'text-professional'"
        aria-label="See-more preview hint"
      >
        ...see more
      </button>

      <div v-if="imagePreview?.url" class="mt-4 overflow-hidden rounded-xl border" :class="theme === 'dark' ? 'border-white/15 bg-white/10' : 'border-soft bg-white'">
        <img
          :src="imagePreview.url"
          :alt="imagePreview.alt || 'Local preview image'"
          class="h-full w-full object-cover"
          :class="imageRatioClass"
        >
      </div>

      <a
        v-if="linkPreview"
        :href="linkPreview.url"
        target="_blank"
        rel="noreferrer"
        class="mt-4 block overflow-hidden rounded-xl border text-left transition hover:border-professional"
        :class="theme === 'dark' ? 'border-white/15 bg-white/10' : 'border-soft bg-white'"
      >
        <div v-if="linkPreview.image" class="aspect-video overflow-hidden bg-slate-100">
          <img :src="linkPreview.image" :alt="linkPreview.title || linkPreview.domain" class="h-full w-full object-cover">
        </div>
        <div v-else class="grid aspect-video place-items-center" :class="theme === 'dark' ? 'bg-white/10 text-slate-300' : 'bg-[#EAF3FF] text-professional'">
          <span class="text-sm font-semibold">{{ linkPreview.domain }}</span>
        </div>
        <div class="p-3">
          <p class="text-xs font-semibold uppercase" :class="mutedTextClass">{{ linkPreview.domain }}</p>
          <p class="mt-1 line-clamp-2 break-words text-sm font-bold [overflow-wrap:anywhere]" :class="theme === 'dark' ? 'text-white' : 'text-ink'">
            {{ linkPreview.title || 'Link title preview' }}
          </p>
          <p class="mt-1 line-clamp-2 break-words text-xs leading-5 [overflow-wrap:anywhere]" :class="mutedTextClass">
            {{ linkPreview.description || 'Link description preview.' }}
          </p>
        </div>
      </a>

      <footer class="mt-4 border-t pt-3" :class="theme === 'dark' ? 'border-white/15' : 'border-soft'">
        <div class="flex items-center justify-between text-xs font-medium" :class="mutedTextClass">
          <span>{{ stats.characters }} characters</span>
          <span>{{ stats.estimatedReadTimeMinutes }} min read</span>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-2 text-center text-xs font-semibold" :class="mutedTextClass">
          <span>React</span>
          <span>Comment</span>
          <span>Repost</span>
          <span>Send</span>
        </div>
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { PostStats } from '~/utils/postStats'

type PreviewMode = 'collapsed' | 'expanded'
type PreviewTheme = 'light' | 'dark'
type PreviewDevice = 'compact' | 'wide' | 'desktop'
type ImageRatio = '1:1' | '4:5' | '16:9'

interface PreviewAuthor {
  name: string
  headline: string
  initials: string
  timestamp: string
}

interface LinkPreview {
  url: string
  domain: string
  title: string
  description: string
  image?: string
}

interface ImagePreview {
  url: string
  ratio: ImageRatio
  alt?: string
}

const props = withDefaults(defineProps<{
  text: string
  stats: PostStats
  author?: Partial<PreviewAuthor>
  mode?: PreviewMode
  theme?: PreviewTheme
  device?: PreviewDevice
  linkPreview?: LinkPreview | null
  imagePreview?: ImagePreview | null
}>(), {
  mode: 'expanded',
  theme: 'light',
  device: 'wide',
  linkPreview: null,
  imagePreview: null
})

const defaultAuthor: PreviewAuthor = {
  name: 'Alex Morgan',
  headline: 'Founder · B2B Creator',
  initials: 'AM',
  timestamp: 'Now'
}

const resolvedAuthor = computed<PreviewAuthor>(() => ({
  ...defaultAuthor,
  ...props.author
}))

const paragraphs = computed(() =>
  props.text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
)

const collapsedText = computed(() => paragraphs.value.join('\n\n'))
const hasSeeMoreHint = computed(() => props.stats.characters > seeMoreThreshold.value || paragraphs.value.length > 3)
const seeMoreThreshold = computed(() => {
  if (props.device === 'compact') return 220
  if (props.device === 'desktop') return 520
  return 300
})

const shellClasses = computed(() => props.theme === 'dark'
  ? 'border-white/10 bg-[#111827] text-white'
  : 'border-soft bg-white text-ink'
)
const cardClasses = computed(() => props.theme === 'dark'
  ? 'border-white/15 bg-[#0B1220]'
  : 'border-[#DCE6F2] bg-[#FBFCFE]'
)
const mutedTextClass = computed(() => props.theme === 'dark' ? 'text-slate-300' : 'text-muted')
const deviceClass = computed(() => {
  if (props.device === 'compact') return 'max-w-[340px]'
  if (props.device === 'desktop') return 'max-w-[560px]'
  return 'max-w-[460px]'
})
const imageRatioClass = computed(() => {
  if (props.imagePreview?.ratio === '1:1') return 'aspect-square'
  if (props.imagePreview?.ratio === '16:9') return 'aspect-video'
  return 'aspect-[4/5]'
})
</script>
