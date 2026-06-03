<template>
  <section class="mx-auto my-8 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#FFFDF8] p-5 shadow-soft sm:p-8 lg:p-10">
    <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-professional">Publishing readiness</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-5xl">LinkedIn Post Inspector</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Check hook length, paragraph spacing, CTA, hashtags, links, and readability before publishing.
        </p>

        <section class="mt-7 rounded-2xl border border-[#D6E6F7] bg-white p-4 shadow-subtle" aria-label="Inspector post input">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label for="inspector-post" class="block text-base font-bold text-ink">Post to inspect</label>
              <p class="mt-1 text-sm text-muted">The checks run locally and focus on structure, not content quality promises.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="tool-button-light" type="button" @click="useExample">Use example</button>
              <button class="tool-button-light" type="button" :disabled="!postText" @click="postText = ''">Clear</button>
            </div>
          </div>
          <textarea
            id="inspector-post"
            v-model="postText"
            class="mt-4 min-h-[340px] w-full resize-y rounded-xl border border-[#DCE6F2] bg-[#FBFCFE] p-4 text-base leading-7 text-ink outline-none transition placeholder:text-slate-400 focus:border-professional focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Paste your post to inspect it..."
          />
        </section>

        <PostPreview :text="postText" :stats="stats" class="mt-4" />
      </div>

      <aside class="min-w-0 rounded-[26px] border border-[#D6E6F7] bg-navy p-4 text-white shadow-soft sm:p-6" aria-label="Publishing readiness results">
        <div class="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <div class="grid h-32 w-32 place-items-center rounded-full border border-[#F8D49B]/30 bg-white/10">
            <div class="text-center">
              <p class="text-4xl font-bold">{{ inspection.score }}</p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#F8D49B]">Readiness</p>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold">Publishing readiness</h2>
            <p class="mt-2 text-sm leading-6 text-slate-300">
              Structure checks for hook length, paragraph density, CTA, hashtags, links, emoji density, and post length.
            </p>
          </div>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-3">
          <div v-for="group in resultGroups" :key="group.label" class="rounded-xl border border-white/15 bg-white/8 p-3">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">{{ group.label }}</p>
            <p class="mt-2 text-2xl font-bold">{{ group.count }}</p>
          </div>
        </div>

        <section class="mt-5 rounded-2xl border border-white/15 bg-white/8 p-4" aria-label="Priority fix suggestions">
          <h2 class="text-sm font-bold">Priority fix suggestions</h2>
          <ul class="mt-3 space-y-2 text-sm leading-6 text-slate-200">
            <li v-for="item in priorityItems" :key="item.id" class="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
              <span class="font-semibold text-white">{{ item.title }}:</span> {{ item.message }}
            </li>
          </ul>
        </section>

        <PostInspector :result="inspection" class="mt-5" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const examplePost = `This is a very long opening line that tries to explain too many things before the reader gets a clean reason to continue reading the rest of the post.
I packed several ideas into one block and did not give the mobile preview much breathing room because I want to see what the inspector catches before publishing. https://example.com
#LinkedIn #Writing #Content #Marketing #Creator #SaaS`

const postText = ref(examplePost)
const stats = usePostStats(postText)
const inspection = usePostInspector(postText)

const resultGroups = computed(() => [
  { label: 'Good', count: inspection.value.items.filter((item) => item.type === 'good').length },
  { label: 'Warnings', count: inspection.value.items.filter((item) => item.type === 'warning').length },
  { label: 'Fixes', count: inspection.value.items.filter((item) => item.type === 'fix').length }
])

const priorityItems = computed(() => {
  const actionable = inspection.value.items.filter((item) => item.type !== 'good')
  return actionable.length ? actionable.slice(0, 4) : inspection.value.items.slice(0, 3)
})

function useExample() {
  postText.value = examplePost
}
</script>

<style scoped>
.tool-button-light {
  @apply min-h-11 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-professional hover:text-professional focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-professional disabled:cursor-not-allowed disabled:opacity-45;
}
</style>
