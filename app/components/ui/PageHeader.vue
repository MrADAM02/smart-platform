<script setup lang="ts">
defineProps<{ title: string, text?: string, icon?: string }>()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-ink-900 pt-14 pb-16 sm:pt-20 sm:pb-24">
    <div class="bg-grid-dark mask-fade absolute inset-0 -z-10" />
    <div class="absolute -top-40 inset-e-0 -z-10 size-120 rounded-full bg-brand-600/25 blur-3xl" />
    <div class="container-x">
      <nav class="mb-8 flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
        <NuxtLink :to="localePath('/')" class="hover:text-white">{{ $t('nav.home') }}</NuxtLink>
        <Icon name="lucide:chevron-right" class="flip-rtl size-4" />
        <span class="text-slate-200">{{ title }}</span>
      </nav>
      <div class="flex items-start gap-5">
        <span v-if="icon" class="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-900/50 sm:flex">
          <Icon :name="icon" class="size-8" />
        </span>
        <div>
          <h1 class="text-3xl leading-tight text-white sm:text-5xl">{{ title }}</h1>
          <p v-if="text" class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{{ text }}</p>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-500/50 to-transparent" />
  </section>
</template>
