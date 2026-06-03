<template>
  <fieldset>
    <legend class="text-xs font-semibold" :class="tone === 'dark' ? 'text-slate-200' : 'text-muted'">{{ legend }}</legend>
    <div class="mt-2 flex max-w-full flex-wrap gap-2 overflow-hidden">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="min-h-11 max-w-full rounded-lg border px-2.5 py-2 text-sm font-semibold transition [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional sm:px-3"
        :class="buttonClasses(option.value)"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  legend: string
  options: Array<{ label: string, value: string }>
  tone?: 'light' | 'dark'
}>(), {
  tone: 'light'
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

function buttonClasses(value: string) {
  if (props.modelValue === value) return 'border-professional bg-professional text-white'
  if (props.tone === 'dark') return 'border-white/15 bg-white/10 text-slate-100 hover:border-[#F8D49B] hover:text-[#F8D49B]'
  return 'border-border bg-white text-slate-700 hover:border-professional hover:text-professional'
}
</script>
