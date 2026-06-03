<template>
  <section class="rounded-2xl border border-white/15 bg-white/8 p-3" aria-label="Post formatting actions">
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-lg bg-professional px-3 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-action disabled:cursor-not-allowed disabled:opacity-45"
        :disabled="!text"
        @click="$emit('format')"
      >
        Format post
      </button>
      <button
        type="button"
        class="rounded-lg border border-white/20 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional disabled:cursor-not-allowed disabled:opacity-45"
        :disabled="!text"
        @click="$emit('cleanSpacing')"
      >
        Clean spacing
      </button>
      <CopyButton :text="text" />
      <button
        type="button"
        class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
        :disabled="!text"
        @click="$emit('clear')"
      >
        Clear
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()

defineEmits<{
  format: []
  cleanSpacing: []
  clear: []
}>()
</script>
