<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string, title: string, text?: string, center?: boolean, light?: boolean }>(), { center: true })
</script>

<template>
  <div class="reveal mb-12 max-w-3xl" :class="center ? 'mx-auto text-center' : ''">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="text-3xl leading-snug sm:text-4xl" :class="light ? 'text-white' : ''">{{ title }}</h2>
    <p v-if="text" class="mt-4 text-lg" :class="light ? 'text-brand-100' : 'text-slate-600'">{{ text }}</p>
  </div>
</template>
