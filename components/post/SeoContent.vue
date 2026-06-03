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
  faq: FaqItem[]
  relatedTools: RelatedTool[]
}>()
</script>
