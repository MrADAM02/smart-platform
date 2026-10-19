<script setup lang="ts">
const { t } = useI18n()
await useSite()
useReveal()

useSeoMeta({
  description: () => t('brand.tagline'),
  ogTitle: () => `${t('brand.name')} - SMART PLATFORM`,
  ogDescription: () => t('brand.tagline'),
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeSolutionsSection />
    <HomeAboutTeaser />
    <HomeWhyUs />
    <HomeStatsSection />
    <HomeProductsSection />
    <HomeMethodSection />
    <HomeSectorsSection />
    <HomeFaqSection />
    <HomeCtaBanner />
  </div>
</template>
