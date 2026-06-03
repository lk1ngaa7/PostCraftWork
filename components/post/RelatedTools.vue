<template>
  <section class="mt-10">
    <h2 class="text-2xl font-bold text-ink">Related tools</h2>
    <div class="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.to"
        :to="tool.to"
        class="rounded-xl border border-border bg-white p-4 shadow-subtle transition hover:border-professional hover:shadow-soft"
      >
        <p class="font-semibold text-ink">{{ tool.title }}</p>
        <p class="mt-2 text-sm leading-6 text-muted">{{ tool.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface RelatedTool {
  title: string
  description: string
  to: string
}

defineProps<{
  tools: RelatedTool[]
}>()
</script>
