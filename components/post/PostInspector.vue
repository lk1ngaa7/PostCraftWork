<template>
  <section class="rounded-xl border border-soft bg-white p-4" aria-label="Post inspector">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-ink">Inspector</p>
        <p class="mt-1 text-xs text-muted">Structure and readability checks.</p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-ink">{{ result.score }}</p>
        <p class="text-xs text-muted">Score</p>
      </div>
    </div>

    <ul class="mt-4 space-y-2">
      <li
        v-for="item in result.items"
        :key="item.id"
        class="rounded-lg border p-3"
        :class="itemClasses[item.type]"
      >
        <div class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full" :class="dotClasses[item.type]" />
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-sm font-semibold text-ink">{{ item.title }}</p>
              <span class="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold uppercase text-slate-500">{{ item.category }}</span>
            </div>
            <p class="mt-1 text-xs leading-5 text-muted">{{ item.message }}</p>
            <p v-if="item.suggestion" class="mt-2 text-xs font-semibold leading-5 text-slate-700">{{ item.suggestion }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { InspectorResult, InspectionItem } from '~/utils/postInspector'

defineProps<{
  result: InspectorResult
}>()

const itemClasses: Record<InspectionItem['type'], string> = {
  good: 'border-green-100 bg-green-50/60',
  warning: 'border-amber-100 bg-amber-50/70',
  fix: 'border-red-100 bg-red-50/70'
}

const dotClasses: Record<InspectionItem['type'], string> = {
  good: 'bg-green-700',
  warning: 'bg-amber-700',
  fix: 'bg-red-600'
}
</script>
