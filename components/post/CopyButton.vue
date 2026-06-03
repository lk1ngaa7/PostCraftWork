<template>
  <button
    type="button"
    class="min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45"
    :disabled="!text"
    @click="copy"
  >
    <span aria-live="polite">{{ copied ? 'Copied' : 'Copy post' }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  if (!props.text) {
    return
  }

  await navigator.clipboard.writeText(props.text)
  copied.value = true
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
  resetTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>
