<script setup lang="ts">
defineProps<{ title: string, text?: string, icon?: string }>()
</script>

<template>
  <section class="relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20">
    <div class="hero-glow pointer-events-none absolute inset-0 opacity-30" />
    <div class="container-x relative">
      <Icon v-if="icon" :name="icon" class="mb-4 size-12 text-brand-300" />
      <h1 class="text-3xl text-white sm:text-5xl">{{ title }}</h1>
      <p v-if="text" class="mt-4 max-w-2xl text-lg text-brand-100">{{ text }}</p>
    </div>
  </section>
</template>
