<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const other = computed(() => locales.value.find(l => l.code !== locale.value)!)
</script>

<template>
  <NuxtLink :to="switchLocalePath(other.code)" :lang="other.language" class="inline-flex items-center gap-1.5 font-semibold">
    <Icon name="lucide:globe" class="size-4" />{{ other.name }}
  </NuxtLink>
</template>
