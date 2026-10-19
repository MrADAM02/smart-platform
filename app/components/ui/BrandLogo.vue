<script setup lang="ts">
defineProps<{ light?: boolean }>()
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="0 0 64 64" class="h-10 w-10 shrink-0" aria-hidden="true">
      <rect width="64" height="64" rx="14" :fill="light ? '#ffffff' : '#168170'" />
      <path d="M18 22h28v6H18zM18 32h20v6H18zM18 42h28v6H18z" :fill="light ? '#168170' : '#ffffff'" />
      <circle cx="46" cy="35" r="4" fill="#f5a524" />
    </svg>
    <span class="flex flex-col leading-tight">
      <span class="text-base font-bold" :class="light ? 'text-white' : 'text-ink-900'">المنصة الذكية</span>
      <span class="text-[11px] font-semibold tracking-[0.2em]" :class="light ? 'text-brand-200' : 'text-brand-600'">SMART PLATFORM</span>
    </span>
  </span>
</template>
