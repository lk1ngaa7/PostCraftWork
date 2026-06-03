<template>
  <section class="rounded-xl border border-soft bg-white p-4" aria-label="Post statistics">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-ink">Post stats</p>
        <p class="mt-1 text-xs text-muted">Updates as you type.</p>
      </div>
      <span class="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">
        {{ stats.estimatedReadTimeMinutes }} min read
      </span>
    </div>

    <dl class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <div v-for="item in statItems" :key="item.label" class="rounded-lg border border-soft bg-[#FBFCFE] p-3">
        <dt class="text-xs font-medium text-muted">{{ item.label }}</dt>
        <dd class="mt-1 text-xl font-bold text-ink">{{ item.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import type { PostStats } from '~/utils/postStats'

const props = defineProps<{
  stats: PostStats
}>()

const statItems = computed(() => [
  { label: 'Characters', value: props.stats.characters },
  { label: 'Words', value: props.stats.words },
  { label: 'Lines', value: props.stats.lines },
  { label: 'Paragraphs', value: props.stats.paragraphs },
  { label: 'Hashtags', value: props.stats.hashtags },
  { label: 'Links', value: props.stats.links },
  { label: 'Emojis', value: props.stats.emojis },
  { label: 'Read time', value: `${props.stats.estimatedReadTimeMinutes}m` }
])
</script>
