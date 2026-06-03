<template>
  <aside class="min-w-0 w-full max-w-full overflow-hidden rounded-[26px] border border-[#D6E6F7] bg-navy p-3 shadow-soft sm:p-6" aria-label="Dominant mobile post preview">
    <div class="mb-4 flex flex-wrap items-start justify-between gap-3 text-white">
      <div class="min-w-0 max-w-full">
        <p class="text-sm font-semibold text-[#F8D49B]">Preview first</p>
        <h2 class="mt-1 max-w-full break-words text-balance text-2xl font-bold [overflow-wrap:anywhere]">Large mobile feed preview</h2>
        <p class="mt-1 max-w-full break-words text-pretty text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
          Approximate truncation point. LinkedIn may render posts differently by device.
        </p>
      </div>
      <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-professional">{{ previewModeLabel }}</span>
    </div>

    <div v-if="$slots.controls" class="mb-4 min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2.5 sm:p-3" aria-label="Preview display controls">
      <slot name="controls" />
    </div>

    <div class="grid min-w-0 max-w-full gap-3 sm:grid-cols-3" aria-label="First-screen preview">
      <div v-for="item in firstScreenCards" :key="item.label" class="rounded-xl border border-white/15 bg-white/10 p-3 text-white">
        <p class="text-xs font-semibold uppercase text-slate-300">{{ item.label }}</p>
        <p class="mt-2 text-2xl font-bold tabular-nums">{{ item.value }}</p>
        <p class="mt-1 text-xs leading-5 text-slate-300">{{ item.note }}</p>
      </div>
    </div>

    <PostPreview
      :text="postText"
      :stats="stats"
      :author="author"
      :mode="previewMode"
      :theme="previewTheme"
      :device="deviceMode"
      :link-preview="activeLinkPreview"
      :image-preview="activeImagePreview"
      class="mx-auto mt-5 max-w-[620px]"
    />
  </aside>
</template>

<script setup lang="ts">
import type { PostStats } from '~/utils/postStats'

type PreviewMode = 'collapsed' | 'expanded'
type PreviewTheme = 'light' | 'dark'
type DeviceMode = 'compact' | 'wide' | 'desktop'
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

defineProps<{
  postText: string
  stats: PostStats
  author: PreviewAuthor
  previewMode: PreviewMode
  previewTheme: PreviewTheme
  deviceMode: DeviceMode
  activeLinkPreview: LinkPreview | null
  activeImagePreview: ImagePreview | null
  firstScreenCards: Array<{ label: string, value: string | number, note: string }>
  previewModeLabel: string
}>()
</script>
