<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-navy p-5 text-white shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#F8D49B]">Unicode text converter</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">How to Bold Text in a LinkedIn Post</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
          Convert plain text into Unicode bold, italic, and bold italic text you can copy into LinkedIn.
        </p>

        <section class="mt-7 rounded-2xl border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Plain text input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="unicode-plain" class="block text-base font-bold">Plain text input</label>
              <p class="mt-1 text-sm text-muted">Use short hooks, labels, or keywords rather than full paragraphs.</p>
            </div>
            <button class="tool-button-light" type="button" @click="plainText = exampleText">Use example</button>
          </div>
          <textarea
            id="unicode-plain"
            v-model="plainText"
            class="mt-4 min-h-[260px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            placeholder="Type plain text to convert..."
          />
        </section>

        <p class="mt-4 rounded-2xl border border-[#F8D49B]/30 bg-white/8 p-4 text-sm leading-6 text-slate-200">
          This tool uses Unicode characters to simulate bold or italic text. LinkedIn regular posts do not support native rich text formatting. Use Unicode styling sparingly because it may reduce readability or accessibility for some users.
        </p>
      </div>

      <aside class="min-w-0 rounded-[26px] border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle sm:p-6" aria-label="Unicode text outputs">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold">Copy-ready outputs</h2>
            <p class="mt-1 text-sm text-muted">Each style updates instantly from the plain text input.</p>
          </div>
          <CopyButton :text="plainText" />
        </div>

        <div class="mt-5 space-y-4">
          <section v-for="output in outputs" :key="output.label" class="rounded-2xl border border-soft bg-white p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-sm font-bold text-ink">{{ output.label }} output</h3>
              <CopyButton :text="output.value" />
            </div>
            <output class="mt-3 block min-h-16 whitespace-pre-wrap rounded-xl border border-soft bg-[#FBFCFE] p-3 text-lg leading-7 text-ink">
              {{ output.value || 'Converted text appears here.' }}
            </output>
          </section>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const { toBold, toItalic, toBoldItalic } = useUnicodeText()

const exampleText = 'Strong opening line'
const plainText = ref(exampleText)

const outputs = computed(() => [
  { label: 'Bold', value: toBold(plainText.value) },
  { label: 'Italic', value: toItalic(plainText.value) },
  { label: 'Bold italic', value: toBoldItalic(plainText.value) }
])
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional;
}
</style>
