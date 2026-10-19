<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string, title: string, text?: string, center?: boolean, light?: boolean }>(), { center: true })
</script>

<template>
  <div class="reveal mb-14 max-w-3xl" :class="center ? 'mx-auto text-center' : ''">
    <span v-if="eyebrow" :class="light ? 'eyebrow-dark' : 'eyebrow'">
      <span class="size-1.5 rounded-full" :class="light ? 'bg-brand-300' : 'bg-brand-500'" />{{ eyebrow }}
    </span>
    <h2 class="text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]" :class="light ? 'text-white' : ''">{{ title }}</h2>
    <p v-if="text" class="mt-5 text-lg leading-8" :class="light ? 'text-slate-300' : 'text-slate-600'">{{ text }}</p>
  </div>
</template>
