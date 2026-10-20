<script setup lang="ts">
withDefaults(defineProps<{ light?: boolean, compact?: boolean }>(), {})
const id = useId()
</script>

<template>
  <span class="inline-flex items-center gap-3">
    <!-- Original mark: an "S" path connecting data nodes -->
    <svg viewBox="0 0 48 48" class="size-11 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient :id="`lg-${id}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#10b394" />
          <stop offset="1" stop-color="#0a5c50" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" :fill="`url(#lg-${id})`" />
      <path d="M33 15.5H20.5a6 6 0 0 0 0 12h7a6 6 0 0 1 0 12H15" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round" />
      <circle cx="33" cy="15.5" r="3.4" fill="#f5a524" />
      <circle cx="15" cy="39.5" r="2.4" fill="#fff" opacity=".7" />
    </svg>
    <span v-if="!compact" class="flex flex-col leading-none">
      <span class="text-[17px] font-bold" :class="light ? 'text-white' : 'text-ink-900'">المنصة الذكية</span>
      <span class="mt-1 text-[10px] font-semibold tracking-[0.28em]" :class="light ? 'text-brand-300' : 'text-brand-700'">SMART PLATFORM</span>
    </span>
  </span>
</template>
