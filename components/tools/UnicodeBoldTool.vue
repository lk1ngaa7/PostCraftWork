<template>
  <section class="my-8 w-full max-w-6xl overflow-hidden bg-navy p-5 text-white shadow-soft sm:mx-auto sm:w-[calc(100%-2rem)] sm:rounded-[28px] sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase text-[#F8D49B]">Unicode text converter</p>
        <h1 class="mt-4 max-w-[20rem] text-balance text-3xl font-bold leading-tight sm:max-w-3xl sm:text-5xl">How to Bold Text in a LinkedIn Post</h1>
        <p class="mt-5 max-w-[19.5rem] break-words text-base leading-7 text-slate-200 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg">
          Convert plain text into Unicode bold, italic, bold italic, sans, and monospace styles you can copy into LinkedIn.
        </p>

        <section class="mt-7 w-full max-w-full overflow-hidden rounded-2xl border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle" aria-label="Plain text input">
          <div class="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div class="min-w-0 max-w-[17.5rem] sm:max-w-none">
              <label for="unicode-plain" class="block text-base font-bold">Plain text input</label>
              <p class="mt-1 max-w-full break-words text-sm text-muted [overflow-wrap:anywhere]">Type a short hook, label, keyword, or multiline draft fragment.</p>
            </div>
            <button class="tool-button-light" type="button" @click="useExample">Use example</button>
          </div>

          <textarea
            id="unicode-plain"
            ref="plainInput"
            v-model="plainText"
            class="mt-4 min-h-[230px] w-full max-w-full resize-y rounded-xl border border-[#DCE6F2] bg-white p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:ring-4 focus:ring-blue-100"
            placeholder="Type plain text to convert..."
            @select="syncSelection"
            @keyup="syncSelection"
            @mouseup="syncSelection"
            @keydown="handleShortcut"
          />

          <div class="mt-4 w-full max-w-full overflow-hidden rounded-xl border border-soft bg-white p-3">
            <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div class="min-w-0 max-w-[17.5rem] sm:max-w-none">
                <p class="text-sm font-bold text-ink">Selection replacement</p>
                <p class="mt-1 max-w-full break-words text-xs leading-5 text-muted [overflow-wrap:anywhere]">
                  Select text, then apply a style. With no selection, the whole input is converted.
                </p>
              </div>
              <p class="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">
                {{ selectionLabel }}
              </p>
            </div>

            <div class="mt-3 grid gap-2 sm:grid-cols-3">
              <button
                v-for="style in primaryStyles"
                :key="style.value"
                type="button"
                class="tool-button-primary"
                @click="applyStyle(style.value)"
              >
                {{ style.actionLabel }}
              </button>
            </div>

            <div class="mt-3 flex max-w-full flex-wrap gap-2 overflow-hidden text-xs leading-5 text-muted">
              <span class="max-w-full rounded-full bg-[#F6F8FB] px-3 py-1 text-center">Cmd/Ctrl + B</span>
              <span class="max-w-full rounded-full bg-[#F6F8FB] px-3 py-1 text-center">Cmd/Ctrl + I</span>
              <span class="max-w-full rounded-full bg-[#F6F8FB] px-3 py-1 text-center">Cmd/Ctrl + Shift + B</span>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button class="tool-button-light" type="button" @click="plainText = restorePlainText(plainText)">Restore plain text</button>
            <button class="tool-button-light" type="button" @click="plainText = ''">Clear</button>
            <CopyButton :text="selectedOutput" label="Copy selected style" copied-label="Copied style" />
            <CopyButton :text="allOutputsText" label="Copy all" copied-label="Copied all" />
          </div>
        </section>

        <p class="mt-4 max-w-full rounded-2xl border border-[#F8D49B]/30 bg-white/8 p-4 text-sm leading-6 text-slate-200 [overflow-wrap:anywhere]">
          This tool uses Unicode characters to simulate bold or italic text. LinkedIn regular posts do not support native rich text formatting. Use Unicode styling sparingly because it may reduce readability or accessibility for some users.
        </p>
      </div>

      <aside class="min-w-0 rounded-[26px] border border-white/70 bg-[#FFFDF8] p-4 text-ink shadow-subtle sm:p-6" aria-label="Unicode text outputs">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 class="text-balance text-xl font-bold">Copy-ready Unicode outputs</h2>
            <p class="mt-1 text-pretty text-sm text-muted">Six browser-local styles update instantly from the plain text input.</p>
          </div>
          <select
            v-model="selectedStyle"
            class="min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-professional focus:ring-4 focus:ring-blue-100"
            aria-label="Selected Unicode style"
          >
            <option v-for="output in outputs" :key="output.value" :value="output.value">{{ output.label }}</option>
          </select>
        </div>

        <div class="mt-5 grid gap-3 md:grid-cols-2">
          <section
            v-for="output in outputs"
            :key="output.value"
            class="rounded-2xl border bg-white p-4"
            :class="selectedStyle === output.value ? 'border-professional shadow-subtle' : 'border-soft'"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-sm font-bold text-ink">{{ output.label }}</h3>
                <p class="mt-1 text-xs leading-5 text-muted">{{ output.note }}</p>
              </div>
              <CopyButton :text="output.text" :label="`Copy ${output.label}`" copied-label="Copied" />
            </div>
            <button
              type="button"
              class="mt-3 block min-h-20 w-full rounded-xl border border-soft bg-[#FBFCFE] p-3 text-left text-base leading-7 text-ink transition hover:border-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional"
              @click="selectedStyle = output.value"
            >
              <span class="whitespace-pre-wrap break-words">{{ output.text || 'Converted text appears here.' }}</span>
            </button>
          </section>
        </div>

        <section class="mt-5 rounded-2xl border border-[#DCE6F2] bg-white p-4" aria-label="Styled post preview">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-ink">Styled text preview</h2>
              <p class="mt-1 text-pretty text-sm text-muted">Use styled text for a hook or keyword, not an entire paragraph.</p>
            </div>
            <p class="rounded-full px-3 py-1 text-xs font-semibold" :class="styledWholeParagraph ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'">
              {{ styledWholeParagraph ? 'Use sparingly' : 'Short emphasis' }}
            </p>
          </div>
          <div class="mt-4 rounded-xl border border-soft bg-[#FBFCFE] p-4">
            <p class="whitespace-pre-wrap break-words text-pretty text-base leading-7 text-ink">{{ selectedOutput || 'Choose a style to preview the converted text.' }}</p>
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UnicodeStyle } from '~/utils/unicodeText'

const { convertUnicodeText, restorePlainText } = useUnicodeText()

type StyleOption = {
  label: string
  actionLabel: string
  value: UnicodeStyle
  note: string
}

const exampleText = 'Strong opening line\nProof beats polish\n2026 launch notes'
const plainText = ref(exampleText)
const plainInput = ref<HTMLTextAreaElement | null>(null)
const selectedStyle = ref<UnicodeStyle>('bold')
const selectionStart = ref(0)
const selectionEnd = ref(0)

const styleOptions: StyleOption[] = [
  { label: 'Bold', actionLabel: 'Apply bold', value: 'bold', note: 'Best for hooks and short labels.' },
  { label: 'Italic', actionLabel: 'Apply italic', value: 'italic', note: 'Useful for subtle emphasis.' },
  { label: 'Bold Italic', actionLabel: 'Apply bold italic', value: 'boldItalic', note: 'Use for rare emphasis only.' },
  { label: 'Sans Bold', actionLabel: 'Apply sans bold', value: 'sansBold', note: 'Clean, modern emphasis.' },
  { label: 'Sans Italic', actionLabel: 'Apply sans italic', value: 'sansItalic', note: 'A lighter styled option.' },
  { label: 'Monospace', actionLabel: 'Apply monospace', value: 'monospace', note: 'Good for snippets or labels.' }
]

const primaryStyles = styleOptions.slice(0, 3)

const outputs = computed(() => styleOptions.map((option) => ({
  ...option,
  text: convertUnicodeText(plainText.value, option.value)
})))

const selectedOutput = computed(() => outputs.value.find((output) => output.value === selectedStyle.value)?.text ?? '')

const allOutputsText = computed(() => outputs.value
  .map((output) => `${output.label}\n${output.text}`)
  .join('\n\n'))

const selectionLabel = computed(() => {
  const selectedLength = Math.max(selectionEnd.value - selectionStart.value, 0)
  return selectedLength > 0 ? `${selectedLength} selected` : 'Whole input'
})

const styledWholeParagraph = computed(() => {
  const plain = restorePlainText(selectedOutput.value).trim()
  return plain.length > 90 || plain.includes('\n')
})

function syncSelection() {
  const input = plainInput.value
  if (!input) {
    return
  }

  selectionStart.value = input.selectionStart
  selectionEnd.value = input.selectionEnd
}

function useExample() {
  plainText.value = exampleText
  nextTick(() => {
    plainInput.value?.focus()
    syncSelection()
  })
}

function applyStyle(style: UnicodeStyle) {
  selectedStyle.value = style
  const input = plainInput.value
  if (!input) {
    plainText.value = convertUnicodeText(plainText.value, style)
    return
  }

  const start = input.selectionStart
  const end = input.selectionEnd
  const source = plainText.value
  const hasSelection = end > start
  const targetStart = hasSelection ? start : 0
  const targetEnd = hasSelection ? end : source.length
  const targetText = source.slice(targetStart, targetEnd)
  const converted = convertUnicodeText(targetText, style)

  plainText.value = `${source.slice(0, targetStart)}${converted}${source.slice(targetEnd)}`

  nextTick(() => {
    input.focus()
    const newEnd = targetStart + converted.length
    input.setSelectionRange(targetStart, newEnd)
    syncSelection()
  })
}

function handleShortcut(event: KeyboardEvent) {
  if (!event.metaKey && !event.ctrlKey) {
    return
  }

  const key = event.key.toLowerCase()
  if (key === 'b' && event.shiftKey) {
    event.preventDefault()
    applyStyle('boldItalic')
    return
  }

  if (key === 'b') {
    event.preventDefault()
    applyStyle('bold')
    return
  }

  if (key === 'i') {
    event.preventDefault()
    applyStyle('italic')
  }
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional;
}

.tool-button-primary {
  @apply min-h-11 rounded-lg border border-professional bg-professional px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#07569F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional;
}
</style>
