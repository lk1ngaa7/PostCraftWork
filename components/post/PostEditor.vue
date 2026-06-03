<template>
  <section class="rounded-2xl border border-[#D6E6F7] bg-[#FFFDF8] p-4 text-ink shadow-soft sm:p-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="mb-2 inline-flex rounded-full bg-craftSoft px-3 py-1 text-xs font-semibold text-[#8B5E12]">
          Compose
        </p>
        <label for="post-editor" class="block text-base font-bold text-ink">Your post</label>
        <p class="mt-1 text-sm text-muted">Paste or draft your LinkedIn post locally in the browser.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="min-h-11 rounded-lg bg-professional px-3 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-action focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional"
          @click="$emit('useExample')"
        >
          Use example
        </button>
        <button
          type="button"
          class="min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45"
          :disabled="!model"
          @click="$emit('clear')"
        >
          Clear
        </button>
      </div>
    </div>

    <textarea
      id="post-editor"
      v-model="model"
      class="mt-4 min-h-[260px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100 lg:min-h-[360px]"
      placeholder="Paste your LinkedIn post here...

Start with a strong hook.
Keep paragraphs short.
Preview how it looks before publishing."
    />
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  clear: []
  useExample: []
}>()

const model = defineModel<string>({ required: true })
</script>
