<template>
  <section class="mt-10">
    <h2 class="text-2xl font-bold text-ink">FAQ</h2>
    <div class="mt-4 divide-y divide-border rounded-2xl border border-border bg-white">
      <details v-for="item in items" :key="item.question" class="group p-5">
        <summary class="cursor-pointer list-none text-base font-semibold text-ink">
          {{ item.question }}
        </summary>
        <p class="mt-3 text-sm leading-6 text-muted">{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface FaqItem {
  question: string
  answer: string
}

const props = defineProps<{
  items: FaqItem[]
}>()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      })
    }
  ]
})
</script>
