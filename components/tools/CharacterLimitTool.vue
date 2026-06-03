<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#F8F5EF] p-5 shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-professional">Limit dashboard</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-5xl">
          LinkedIn Post Character Limit Checker
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Count characters, words, hashtags, links, and paragraphs in your LinkedIn post.
        </p>

        <section class="mt-7 rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Character checker input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="limit-post" class="block text-base font-bold text-ink">Post body</label>
              <p class="mt-1 text-sm text-muted">Paste a draft to measure length and readability signals.</p>
            </div>
            <button class="tool-button-light" type="button" @click="useExample">Use example</button>
          </div>
          <textarea
            id="limit-post"
            v-model="postText"
            class="mt-4 min-h-[340px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Paste your post to count it..."
          />
        </section>
      </div>

      <aside class="min-w-0 rounded-[26px] border border-white bg-white p-4 shadow-soft sm:p-6" aria-label="Character limit dashboard">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-ink">Stats dashboard</h2>
            <p class="mt-1 text-sm text-muted">Post body progress and live writing counts.</p>
          </div>
          <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="limitBadgeClass">{{ limitStatus }}</span>
        </div>

        <section class="mt-5 rounded-2xl border border-soft bg-[#FBFCFE] p-4" aria-label="Post body character progress">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-muted">Characters</p>
              <p class="mt-1 text-4xl font-bold text-ink">{{ stats.characters }}</p>
            </div>
            <p class="text-right text-sm font-semibold text-muted">{{ remainingLabel }}</p>
          </div>
          <div class="mt-4 h-3 overflow-hidden rounded-full bg-slate-200" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
            <div class="h-full rounded-full transition-all" :class="progressClass" :style="{ width: `${Math.min(progressPercent, 100)}%` }" />
          </div>
          <p class="mt-3 text-xs leading-5 text-muted">Limits may vary by LinkedIn surface and account state. Use this as a live draft checker.</p>
        </section>

        <dl class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div v-for="item in statCards" :key="item.label" class="rounded-xl border border-soft bg-[#FBFCFE] p-4">
            <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{{ item.label }}</dt>
            <dd class="mt-2 text-2xl font-bold text-ink">{{ item.value }}</dd>
          </div>
        </dl>

        <section class="mt-5 rounded-2xl border border-soft bg-[#FFFDF8] p-4" aria-label="Length suggestions">
          <h2 class="text-sm font-bold text-ink">Length suggestions</h2>
          <ul class="mt-3 space-y-2 text-sm leading-6 text-muted">
            <li v-for="suggestion in suggestions" :key="suggestion" class="rounded-lg bg-white px-3 py-2">{{ suggestion }}</li>
          </ul>
        </section>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const postLimit = 3000
const examplePost = `A readable post is not just short.

It has a clear opening line, enough paragraph breaks, and a simple next step.

Before publishing, I check characters, paragraphs, hashtags, links, emojis, and read time.

What do you measure before a post goes live?

#LinkedIn #ContentStrategy`

const postText = ref(examplePost)
const stats = usePostStats(postText)
const progressPercent = computed(() => Math.ceil((stats.value.characters / postLimit) * 100))
const remaining = computed(() => postLimit - stats.value.characters)
const limitStatus = computed(() => remaining.value < 0 ? 'Over limit' : progressPercent.value >= 80 ? 'Near limit' : 'Safe')
const remainingLabel = computed(() => remaining.value >= 0 ? `${remaining.value} remaining` : `${Math.abs(remaining.value)} over`)
const limitBadgeClass = computed(() => remaining.value < 0 ? 'bg-red-50 text-red-700' : progressPercent.value >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700')
const progressClass = computed(() => remaining.value < 0 ? 'bg-red-600' : progressPercent.value >= 80 ? 'bg-amber-600' : 'bg-green-700')

const statCards = computed(() => [
  { label: 'Words', value: stats.value.words },
  { label: 'Lines', value: stats.value.lines },
  { label: 'Paragraphs', value: stats.value.paragraphs },
  { label: 'Hashtags', value: stats.value.hashtags },
  { label: 'Links', value: stats.value.links },
  { label: 'Emojis', value: stats.value.emojis },
  { label: 'Read time', value: `${stats.value.estimatedReadTimeMinutes}m` },
  { label: 'First screen', value: `${Math.min(stats.value.characters, 200)}` }
])

const suggestions = computed(() => {
  const items = []
  items.push(remaining.value < 0 ? `Your post is over by ${Math.abs(remaining.value)} characters.` : 'Your post is within the post body limit.')
  if (stats.value.hashtags > 5) items.push('Hashtag count is high; consider a smaller set.')
  if (stats.value.links > 0) items.push('Links are counted and may affect first-screen readability.')
  if (stats.value.paragraphs <= 1 && stats.value.characters > 400) items.push('Add paragraph breaks for mobile readability.')
  if (stats.value.emojis > 6) items.push('Emoji count is high for a professional post.')
  return items
})

function useExample() {
  postText.value = examplePost
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional;
}
</style>
