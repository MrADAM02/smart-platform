<script setup lang="ts">
const head = useLocaleHead({ seo: true })
const { t } = useI18n()

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang, dir: () => head.value.htmlAttrs?.dir },
  link: () => head.value.link ?? [],
  meta: () => head.value.meta ?? [],
  titleTemplate: (title?: string) => {
    const brand = `${t('brand.name')} - ${t('brand.latin')}`
    return title ? `${title} | ${brand}` : brand
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
