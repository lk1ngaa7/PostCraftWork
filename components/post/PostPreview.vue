<template>
  <section class="rounded-xl border border-soft bg-white p-4" aria-label="Professional post preview">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-ink">Post preview</p>
        <p class="mt-1 text-xs text-muted">Feed-style mobile read-through.</p>
      </div>
      <span v-if="hasSeeMoreHint" class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        see more likely
      </span>
    </div>

    <article class="mt-4 rounded-2xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 shadow-subtle">
      <header class="flex items-start gap-3">
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
          AM
        </div>
        <div class="min-w-0">
          <p class="font-semibold leading-5 text-ink">Alex Morgan</p>
          <p class="mt-0.5 text-xs leading-5 text-muted">Founder · B2B Creator</p>
          <p class="text-xs text-muted">Now · Public</p>
        </div>
      </header>

      <div class="mt-4 max-h-[320px] overflow-hidden text-[15px] leading-6 text-slate-800">
        <template v-if="paragraphs.length">
          <p v-for="paragraph in paragraphs" :key="paragraph" class="mb-4 whitespace-pre-wrap last:mb-0">
            {{ paragraph }}
          </p>
        </template>
        <p v-else class="text-muted">
          Your post preview will appear here as you type.
        </p>
      </div>

      <button
        v-if="hasSeeMoreHint"
        type="button"
        class="mt-3 text-sm font-semibold text-professional"
        aria-label="See-more preview hint"
      >
        ...see more
      </button>

      <footer class="mt-4 border-t border-soft pt-3">
        <div class="flex items-center justify-between text-xs font-medium text-muted">
          <span>Preview only</span>
          <span>{{ stats.characters }} characters</span>
        </div>
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { PostStats } from '~/utils/postStats'

const props = defineProps<{
  text: string
  stats: PostStats
}>()

const paragraphs = computed(() =>
  props.text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
)

const hasSeeMoreHint = computed(() => props.stats.characters > 280 || paragraphs.value.length > 3)
</script>
