<template>
  <button
    type="button"
    class="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional disabled:cursor-not-allowed disabled:opacity-45"
    :disabled="!text"
    @click="copy"
  >
    {{ copied ? 'Copied' : 'Copy post' }}
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
