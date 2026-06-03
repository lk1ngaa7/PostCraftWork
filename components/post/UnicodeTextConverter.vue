<template>
  <section class="rounded-2xl border border-[#D6E6F7] bg-white p-4 text-ink shadow-subtle sm:p-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="mb-2 inline-flex rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">
          Unicode text
        </p>
        <h2 class="text-base font-bold text-ink">Bold and italic converter</h2>
        <p class="mt-1 text-sm text-muted">Convert short phrases into Unicode characters you can copy.</p>
      </div>
      <CopyButton :text="convertedText" />
    </div>

    <label for="unicode-input" class="mt-4 block text-sm font-semibold text-ink">Text to convert</label>
    <input
      id="unicode-input"
      v-model="sourceText"
      class="mt-2 h-11 w-full rounded-lg border border-[#DCE6F2] bg-[#FBFCFE] px-3 text-sm outline-none transition focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100"
      placeholder="Type a headline or short phrase"
    >

    <div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Unicode text style">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional"
        :class="styleMode === option.value ? 'border-professional bg-professional text-white' : 'border-border bg-white text-slate-700 hover:border-professional hover:text-professional'"
        @click="styleMode = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <output class="mt-4 block min-h-12 rounded-xl border border-soft bg-[#FBFCFE] p-3 text-base leading-7 text-ink">
      {{ convertedText || 'Converted text appears here.' }}
    </output>

    <p class="mt-3 text-xs leading-5 text-muted">
      Accessibility note: this uses Unicode characters, not native rich text. Use it sparingly because some screen readers and devices may read or display these characters differently.
    </p>
  </section>
</template>

<script setup lang="ts">
const { toBold, toItalic, toBoldItalic } = useUnicodeText()

type StyleMode = 'bold' | 'italic' | 'boldItalic'

const sourceText = ref('Strong hook')
const styleMode = ref<StyleMode>('bold')

const options: Array<{ label: string, value: StyleMode }> = [
  { label: 'Bold', value: 'bold' },
  { label: 'Italic', value: 'italic' },
  { label: 'Bold italic', value: 'boldItalic' }
]

const convertedText = computed(() => {
  if (styleMode.value === 'italic') {
    return toItalic(sourceText.value)
  }
  if (styleMode.value === 'boldItalic') {
    return toBoldItalic(sourceText.value)
  }
  return toBold(sourceText.value)
})
</script>
