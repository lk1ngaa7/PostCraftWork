<template>
  <footer class="border-t border-border bg-white">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="font-semibold text-ink">PostCraft.work</p>
        <p class="mt-2 max-w-2xl">
          PostCraft.work is an independent tool and is not affiliated with LinkedIn.
        </p>
      </div>
      <nav class="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer navigation">
        <NuxtLink class="hover:text-ink" to="/linkedin-post-formatter">Formatter</NuxtLink>
        <NuxtLink class="hover:text-ink" to="/linkedin-post-preview">Preview</NuxtLink>
        <NuxtLink class="hover:text-ink" to="/linkedin-post-character-limit">Character Limit</NuxtLink>
        <NuxtLink class="hover:text-ink" to="/linkedin-post-inspector">Inspector</NuxtLink>
      </nav>
    </div>
  </footer>
</template>
