<template>
  <section class="mx-auto my-8 w-[calc(100vw-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#FFFDF8] p-4 shadow-soft sm:w-[calc(100%-2rem)] sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <div class="min-w-0 space-y-5">
        <div>
          <p class="text-xs font-semibold uppercase text-professional">Mobile preview studio</p>
          <h1 class="mt-4 max-w-[21rem] text-balance text-3xl font-bold leading-tight text-ink sm:max-w-3xl sm:text-5xl">LinkedIn Post Preview</h1>
          <p class="mt-5 max-w-[20.5rem] break-words text-pretty text-base leading-7 text-slate-600 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg">
            See how your post may look in a professional mobile feed preview before publishing.
          </p>
        </div>

        <section class="max-w-full overflow-hidden rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Preview post input">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0 max-w-[18.5rem] sm:max-w-none">
              <label for="preview-post" class="block text-base font-bold text-ink">Post text</label>
              <p class="mt-1 break-words text-pretty text-sm text-muted [overflow-wrap:anywhere]">
                Update the draft and inspect the approximate mobile preview.
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!postText" @click="postText = ''">Clear</button>
            </div>
          </div>
          <textarea
            id="preview-post"
            v-model="postText"
            class="mt-4 min-h-[190px] w-full max-w-full resize-y overflow-x-hidden whitespace-pre-wrap break-words rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition [overflow-wrap:anywhere] placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100 lg:min-h-[330px]"
            placeholder="Paste your post to preview it..."
            wrap="soft"
          />
        </section>

        <ToolsPreviewStage
          class="lg:hidden"
          :post-text="postText"
          :stats="stats"
          :author="author"
          :preview-mode="previewMode"
          :preview-theme="previewTheme"
          :device-mode="deviceMode"
          :active-link-preview="activeLinkPreview"
          :active-image-preview="activeImagePreview"
          :first-screen-cards="firstScreenCards"
          :preview-mode-label="previewModeLabel"
        >
          <template #controls>
            <div class="grid min-w-0 max-w-full gap-3 sm:grid-cols-3">
              <ToolsPreviewSegmentedControl v-model="previewMode" tone="dark" legend="Preview mode" :options="previewModeOptions" />
              <ToolsPreviewSegmentedControl v-model="previewTheme" tone="dark" legend="Preview theme" :options="previewThemeOptions" />
              <ToolsPreviewSegmentedControl v-model="deviceMode" tone="dark" legend="Device width" :options="deviceModeOptions" />
            </div>
          </template>
        </ToolsPreviewStage>

        <section class="rounded-2xl border border-border bg-white p-4 shadow-subtle" aria-label="Preview settings">
          <h2 class="text-base font-bold text-ink">Author settings</h2>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <label class="block">
              <span class="text-xs font-semibold text-muted">Name</span>
              <input v-model="author.name" class="field-input" type="text">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-muted">Avatar initials</span>
              <input v-model="author.initials" class="field-input" maxlength="3" type="text">
            </label>
            <label class="block sm:col-span-2">
              <span class="text-xs font-semibold text-muted">Headline</span>
              <input v-model="author.headline" class="field-input" type="text">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-muted">Timestamp</span>
              <input v-model="author.timestamp" class="field-input" type="text">
            </label>
          </div>

        </section>

        <section class="rounded-2xl border border-border bg-white p-4 shadow-subtle" aria-label="Link and image preview settings">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-ink">Link and image preview</h2>
              <p class="mt-1 text-sm text-muted">{{ detectedUrl ? `Detected link: ${detectedDomain}` : 'No URL detected in the post.' }}</p>
            </div>
            <button class="tool-button-light" type="button" :disabled="!detectedUrl || ogStatus === 'loading'" @click="fetchOgPreview">
              {{ ogStatus === 'loading' ? 'Fetching...' : 'Fetch OG' }}
            </button>
          </div>
          <p v-if="urlMatches.length > 1" class="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Multiple links detected. The preview uses the first URL.
          </p>
          <p v-if="ogError" class="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            We could not fetch a link preview. You can still edit the preview manually.
          </p>

          <div v-if="detectedUrl" class="mt-4 grid gap-3">
            <label class="block">
              <span class="text-xs font-semibold text-muted">Manual link title</span>
              <input v-model="linkForm.title" class="field-input" type="text">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-muted">Manual link description</span>
              <textarea v-model="linkForm.description" class="field-input min-h-20 resize-y" />
            </label>
          </div>

          <div class="mt-4 rounded-xl border border-soft bg-[#FBFCFE] p-3">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm font-bold text-ink">Local image preview</p>
                <p class="mt-1 text-xs text-muted">Selected images stay in your browser and are not uploaded.</p>
              </div>
              <label class="tool-button-light cursor-pointer">
                Choose image
                <input class="sr-only" type="file" accept="image/*" @change="onImageSelected">
              </label>
            </div>
            <div v-if="imagePreviewUrl" class="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p class="text-sm font-semibold text-slate-700">{{ imageName }}</p>
              <button class="tool-button-light" type="button" @click="removeImage">Remove image</button>
            </div>
            <div class="mt-3">
              <ToolsPreviewSegmentedControl v-model="imageRatio" legend="Image ratio" :options="imageRatioOptions" />
            </div>
          </div>
        </section>
      </div>

      <ToolsPreviewStage
        class="hidden lg:block"
        :post-text="postText"
        :stats="stats"
        :author="author"
        :preview-mode="previewMode"
        :preview-theme="previewTheme"
        :device-mode="deviceMode"
        :active-link-preview="activeLinkPreview"
        :active-image-preview="activeImagePreview"
        :first-screen-cards="firstScreenCards"
        :preview-mode-label="previewModeLabel"
      >
        <template #controls>
            <div class="grid min-w-0 max-w-full gap-3 sm:grid-cols-3">
            <ToolsPreviewSegmentedControl v-model="previewMode" tone="dark" legend="Preview mode" :options="previewModeOptions" />
            <ToolsPreviewSegmentedControl v-model="previewTheme" tone="dark" legend="Preview theme" :options="previewThemeOptions" />
            <ToolsPreviewSegmentedControl v-model="deviceMode" tone="dark" legend="Device width" :options="deviceModeOptions" />
          </div>
        </template>
      </ToolsPreviewStage>
    </div>
  </section>
</template>

<script setup lang="ts">
type PreviewMode = 'collapsed' | 'expanded'
type PreviewTheme = 'light' | 'dark'
type DeviceMode = 'compact' | 'wide' | 'desktop'
type ImageRatio = '1:1' | '4:5' | '16:9'

interface SegmentOption<T extends string> {
  label: string
  value: T
}

interface OgResponse {
  title?: string
  description?: string
  image?: string
  canonical?: string
  domain?: string
  error?: string
}

const examplePost = `Most content problems show up on the first screen.

If the opening is too dense,
people miss the useful part.

I check three things before publishing:
- Is the first line clear?
- Does the preview breathe?
- Does the see-more point arrive too early?

https://example.com

What do you check before posting?`

const postText = ref(examplePost)
const author = reactive({
  name: 'Alex Morgan',
  headline: 'Founder · B2B Creator',
  initials: 'AM',
  timestamp: 'Now'
})
const previewMode = ref<PreviewMode>('collapsed')
const previewTheme = ref<PreviewTheme>('light')
const deviceMode = ref<DeviceMode>('wide')
const imageRatio = ref<ImageRatio>('4:5')
const imagePreviewUrl = ref('')
const imageName = ref('')
const ogStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const ogError = ref('')
const linkForm = reactive({
  title: '',
  description: '',
  image: '',
  domain: ''
})

const stats = usePostStats(postText)
const urlMatches = computed(() => [...postText.value.matchAll(/https?:\/\/[^\s]+/gi)].map((match) => match[0]))
const detectedUrl = computed(() => urlMatches.value[0] || '')
const detectedDomain = computed(() => detectedUrl.value ? getDomain(detectedUrl.value) : '')
const previewModeLabel = computed(() => previewMode.value === 'collapsed' ? 'Collapsed' : 'Expanded')
const firstLine = computed(() => postText.value.split('\n').find((line) => line.trim())?.trim() ?? '')
const firstParagraph = computed(() => postText.value.trim().split(/\n\s*\n/)[0] ?? '')
const firstVisibleCharacters = computed(() => Math.min(stats.value.characters, visibleCharacterLimit.value))
const visibleLineEstimate = computed(() => {
  if (deviceMode.value === 'compact') return previewMode.value === 'collapsed' ? 3 : 6
  if (deviceMode.value === 'desktop') return previewMode.value === 'collapsed' ? 5 : 10
  return previewMode.value === 'collapsed' ? 4 : 8
})
const visibleCharacterLimit = computed(() => {
  if (deviceMode.value === 'compact') return 220
  if (deviceMode.value === 'desktop') return 520
  return 300
})
const hookSignal = computed(() => {
  const linkIndex = detectedUrl.value ? postText.value.indexOf(detectedUrl.value) : -1
  if (linkIndex >= 0 && linkIndex < Math.max(firstLine.value.length, 80)) return 'link appears before hook'
  if (firstLine.value.length > 140) return 'opening too long'
  if (firstParagraph.value.length > 320) return 'first paragraph too dense'
  return 'hook visible'
})
const hasSeeMoreHint = computed(() => stats.value.characters > visibleCharacterLimit.value || stats.value.paragraphs > 3)
const firstScreenCards = computed(() => [
  { label: 'Visible chars', value: firstVisibleCharacters.value, note: `${visibleCharacterLimit.value} char estimate` },
  { label: 'Visible lines', value: visibleLineEstimate.value, note: `${deviceLabel.value} view` },
  { label: 'See more hint', value: hasSeeMoreHint.value ? 'Likely' : 'Clear', note: hookSignal.value }
])
const deviceLabel = computed(() => {
  if (deviceMode.value === 'compact') return 'Compact mobile'
  if (deviceMode.value === 'desktop') return 'Desktop feed'
  return 'Wide mobile'
})
const activeLinkPreview = computed(() => {
  if (!detectedUrl.value) return null
  return {
    url: detectedUrl.value,
    domain: linkForm.domain || detectedDomain.value,
    title: linkForm.title || `${detectedDomain.value} preview`,
    description: linkForm.description || 'Edit this preview manually or fetch Open Graph metadata.',
    image: linkForm.image || undefined
  }
})
const activeImagePreview = computed(() => imagePreviewUrl.value ? {
  url: imagePreviewUrl.value,
  ratio: imageRatio.value,
  alt: imageName.value || 'Local preview image'
} : null)

const previewModeOptions: SegmentOption<PreviewMode>[] = [
  { label: 'Collapsed', value: 'collapsed' },
  { label: 'Expanded', value: 'expanded' }
]
const previewThemeOptions: SegmentOption<PreviewTheme>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]
const deviceModeOptions: SegmentOption<DeviceMode>[] = [
  { label: 'Compact', value: 'compact' },
  { label: 'Wide', value: 'wide' },
  { label: 'Desktop', value: 'desktop' }
]
const imageRatioOptions: SegmentOption<ImageRatio>[] = [
  { label: '1:1', value: '1:1' },
  { label: '4:5', value: '4:5' },
  { label: '16:9', value: '16:9' }
]

watch(detectedUrl, (url) => {
  ogStatus.value = 'idle'
  ogError.value = ''
  linkForm.domain = url ? getDomain(url) : ''
  linkForm.title = url ? `${getDomain(url)} preview` : ''
  linkForm.description = url ? 'Edit this preview manually or fetch Open Graph metadata.' : ''
  linkForm.image = ''
}, { immediate: true })

onBeforeUnmount(() => {
  if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
})

function useExample() {
  postText.value = examplePost
}

async function fetchOgPreview() {
  if (!detectedUrl.value) return
  ogStatus.value = 'loading'
  ogError.value = ''
  try {
    const response = await fetch(`/api/og?url=${encodeURIComponent(detectedUrl.value)}`)
    const data = await response.json() as OgResponse
    if (!response.ok || data.error) throw new Error(data.error || 'Unable to fetch link preview')
    linkForm.domain = data.domain || detectedDomain.value
    linkForm.title = data.title || linkForm.title
    linkForm.description = data.description || linkForm.description
    linkForm.image = data.image || ''
    ogStatus.value = 'success'
  } catch (error) {
    ogError.value = error instanceof Error ? error.message : 'Unable to fetch link preview'
    ogStatus.value = 'error'
  }
}

function onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
  imagePreviewUrl.value = URL.createObjectURL(file)
  imageName.value = file.name
  input.value = ''
}

function removeImage() {
  if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
  imagePreviewUrl.value = ''
  imageName.value = ''
}

function getDomain(rawUrl: string) {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, '')
  } catch {
    return 'detected link'
  }
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}

.field-input {
  @apply mt-2 w-full rounded-lg border border-[#DCE6F2] bg-[#FBFCFE] px-3 py-2 text-sm text-ink outline-none transition focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100;
}
</style>
