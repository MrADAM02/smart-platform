<script setup lang="ts">
import type { Service } from '~~/server/db/schema'

defineProps<{ service: Service, index?: number }>()
const { tr } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath(`/solutions/${service.slug}`)" class="card group relative flex flex-col overflow-hidden">
    <!-- hover glow -->
    <div class="pointer-events-none absolute -inset-e-16 -top-16 size-40 rounded-full bg-brand-100 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

    <div class="relative flex items-start justify-between">
      <span class="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-200/60 transition duration-300 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:ring-transparent">
        <Icon :name="service.icon" class="size-7" />
      </span>
      <span v-if="index != null" class="font-mono text-sm font-semibold text-slate-300 transition group-hover:text-brand-400" dir="ltr">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
    </div>

    <h3 class="relative mt-6 text-xl">{{ tr(service, 'title') }}</h3>
    <p class="relative mt-3 flex-1 leading-7 text-slate-600">{{ tr(service, 'summary') }}</p>

    <p v-if="tr(service, 'highlight')" class="relative mt-5 flex items-center gap-2 border-t border-dashed border-slate-200 pt-4 text-sm font-medium text-ink-800">
      <Icon name="lucide:sparkles" class="size-4 shrink-0 text-accent-500" />
      <span><span class="sr-only">{{ $t('solutions.smart') }}: </span>{{ tr(service, 'highlight') }}</span>
    </p>

    <span class="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
      {{ $t('solutions.details') }}
      <Icon name="lucide:arrow-right" class="flip-rtl size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </span>
  </NuxtLink>
</template>
