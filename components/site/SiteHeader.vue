<template>
  <header class="sticky top-0 z-40 border-b border-border/80 bg-white/90 backdrop-blur">
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-3" aria-label="PostCraft.work home">
        <span class="grid h-9 w-9 place-items-center rounded-lg bg-navy text-sm font-bold text-white shadow-subtle ring-1 ring-craft/30">PC</span>
        <span class="text-base font-bold tracking-normal text-ink">PostCraft.work</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <NuxtLink
        to="/linkedin-post-formatter"
        class="hidden rounded-lg bg-professional px-4 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-action sm:inline-flex"
      >
        Open formatter
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Formatter', to: '/linkedin-post-formatter' },
  { label: 'Preview', to: '/linkedin-post-preview' },
  { label: 'Character Limit', to: '/linkedin-post-character-limit' },
  { label: 'Bold Text', to: '/how-to-bold-text-in-linkedin-post' },
  { label: 'Inspector', to: '/linkedin-post-inspector' }
]
</script>
