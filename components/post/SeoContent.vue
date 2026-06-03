<template>
  <section class="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-6">
    <div class="rounded-2xl border border-border bg-white p-6 shadow-subtle md:p-8">
      <div class="max-w-3xl">
        <h2 class="text-2xl font-bold text-ink">{{ heading }}</h2>
        <p class="mt-3 text-base leading-7 text-muted">{{ intro }}</p>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <article v-for="section in sections" :key="section.title" class="rounded-xl border border-soft bg-[#FBFCFE] p-4">
          <h3 class="font-semibold text-ink">{{ section.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-muted">{{ section.body }}</p>
        </article>
      </div>

      <div v-if="howToSteps?.length || tips?.length" class="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section v-if="howToSteps?.length" class="rounded-2xl border border-border bg-white p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-xl font-bold text-ink">How to use this tool</h2>
            <span class="rounded-full bg-craftSoft px-3 py-1 text-xs font-bold text-[#7A4D00]">
              Browser-based
            </span>
          </div>
          <ol class="mt-4 space-y-3">
            <li v-for="(step, index) in howToSteps" :key="step.title" class="grid gap-3 rounded-xl border border-soft bg-[#FBFCFE] p-4 sm:grid-cols-[auto_1fr]">
              <span class="grid size-8 place-items-center rounded-lg bg-navy text-sm font-bold text-white">
                {{ index + 1 }}
              </span>
              <span>
                <span class="block font-semibold text-ink">{{ step.title }}</span>
                <span class="mt-1 block text-sm leading-6 text-muted">{{ step.body }}</span>
              </span>
            </li>
          </ol>
        </section>

        <section v-if="tips?.length" class="rounded-2xl border border-border bg-[#FFFDF8] p-5">
          <h2 class="text-xl font-bold text-ink">Practical tips</h2>
          <ul class="mt-4 space-y-3">
            <li v-for="tip in tips" :key="tip" class="rounded-xl border border-soft bg-white px-4 py-3 text-sm leading-6 text-muted">
              {{ tip }}
            </li>
          </ul>
        </section>
      </div>

      <FaqBlock :items="faq" />
      <RelatedTools :tools="relatedTools" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/components/post/FaqBlock.vue'
import type { RelatedTool } from '~/components/post/RelatedTools.vue'

defineProps<{
  heading: string
  intro: string
  sections: Array<{ title: string, body: string }>
  howToSteps?: Array<{ title: string, body: string }>
  tips?: string[]
  faq: FaqItem[]
  relatedTools: RelatedTool[]
}>()
</script>
