<script setup lang="ts">
import type { Service } from '~~/server/db/schema'

defineProps<{ service: Service }>()
const { tr } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <article class="card group flex flex-col">
    <div class="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
      <Icon :name="service.icon" class="size-6" />
    </div>
    <h3 class="text-lg">{{ tr(service, 'title') }}</h3>
    <p class="mt-2 flex-1 text-sm leading-7 text-slate-600">{{ tr(service, 'summary') }}</p>
    <p v-if="tr(service, 'highlight')" class="mt-4 flex items-center gap-2 rounded-lg bg-accent-500/10 px-3 py-2 text-xs font-medium text-accent-600">
      <Icon name="lucide:sparkles" class="size-4 shrink-0" />
      <span><span class="sr-only">{{ $t('solutions.smart') }}: </span>{{ tr(service, 'highlight') }}</span>
    </p>
    <NuxtLink :to="localePath(`/solutions/${service.slug}`)" class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2 transition-all">
      {{ $t('solutions.details') }}
      <Icon name="lucide:arrow-right" class="flip-rtl size-4" />
    </NuxtLink>
  </article>
</template>
