<template>
  <main>
    <section class="my-8 ml-5 mr-auto grid w-[350px] max-w-[calc(100vw-40px)] gap-8 overflow-hidden rounded-[28px] bg-navy px-5 py-10 shadow-soft sm:mx-auto sm:w-full sm:max-w-6xl sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
      <div class="min-w-0 flex flex-col justify-center">
        <p class="max-w-full text-xs font-semibold uppercase tracking-[0.08em] text-[#7DD3FC] sm:text-sm sm:tracking-[0.18em]">
          Browser-based LinkedIn writing tools
        </p>
        <h1 class="mt-5 max-w-[310px] text-3xl font-bold leading-tight text-white sm:max-w-3xl sm:text-5xl lg:text-6xl">
          Free LinkedIn Post Tools
        </h1>
        <p class="mt-6 max-w-[310px] text-base leading-7 text-slate-200 sm:max-w-2xl sm:text-lg sm:leading-8">
          Format, preview, inspect, and polish your LinkedIn posts before publishing.
        </p>
        <div class="mt-8 flex max-w-[310px] flex-wrap gap-3 text-sm font-medium text-slate-700 sm:max-w-none">
          <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">No sign-up required</span>
          <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">Local browser processing</span>
          <span class="rounded-full border border-white/15 bg-white px-4 py-2 shadow-subtle">Copy-ready formatting</span>
        </div>
      </div>

      <div id="formatter" class="min-w-0 rounded-2xl border border-white/70 bg-[#FFFDF8] p-5 shadow-soft">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-soft pb-4">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-ink">Creator workspace</p>
            <p class="mt-1 text-sm text-muted">Editor, preview, stats, and inspector</p>
          </div>
          <span class="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-professional">MVP setup</span>
        </div>
        <div id="preview" class="mt-5 min-w-0 rounded-xl border border-soft bg-white p-4">
          <div class="h-3 w-2/3 rounded-full bg-slate-200" />
          <div class="mt-4 space-y-2">
            <div class="h-2.5 rounded-full bg-slate-200" />
            <div class="h-2.5 w-11/12 rounded-full bg-slate-200" />
            <div class="h-2.5 w-4/5 rounded-full bg-slate-200" />
          </div>
          <div id="character-limit" class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="rounded-lg bg-white p-3 shadow-subtle">
              <p class="text-xl font-bold text-ink">0</p>
              <p class="text-xs text-muted">Characters</p>
            </div>
            <div class="rounded-lg bg-white p-3 shadow-subtle">
              <p class="text-xl font-bold text-ink">0</p>
              <p class="text-xs text-muted">Words</p>
            </div>
            <div id="inspector" class="rounded-lg bg-white p-3 shadow-subtle">
              <p class="text-xl font-bold text-ink">0</p>
              <p class="text-xs text-muted">Checks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
