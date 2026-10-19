<script setup lang="ts">
const { tm, rt } = useI18n()
const items = computed(() => (tm('trust.items') as unknown[]).map(i => rt(i as never)))
const icons = ['lucide:scan-text', 'lucide:user-cog', 'lucide:history', 'lucide:cloud', 'lucide:calendar-days', 'lucide:plug-zap', 'lucide:database-backup', 'lucide:lock', 'lucide:smartphone', 'lucide:chart-pie']
</script>

<template>
  <section class="border-b border-slate-200 bg-white py-10">
    <p class="container-x mb-6 text-center text-sm font-medium text-slate-500">{{ $t('trust.title') }}</p>
    <div class="mask-fade-x overflow-hidden">
      <!-- Two copies so the loop is seamless -->
      <ul class="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
        <li
          v-for="(item, i) in [...items, ...items]"
          :key="i"
          class="flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-ink-800"
          :aria-hidden="i >= items.length"
        >
          <Icon :name="icons[i % icons.length]!" class="size-4 text-brand-600" />{{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
