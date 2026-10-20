<script setup lang="ts">
const { t } = useI18n()
const { data } = await useSite()
const { tr } = useLocalized()
useReveal()

// FAQ rich results in Google
useHead({
  script: [{
    type: 'application/ld+json',
    key: 'ld-faq',
    innerHTML: () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': (data.value?.faqs ?? []).map(f => ({
        '@type': 'Question',
        'name': tr(f, 'question'),
        'acceptedAnswer': { '@type': 'Answer', 'text': tr(f, 'answer') },
      })),
    }),
  }],
})

useSeoMeta({
  description: () => t('brand.tagline'),
  ogTitle: 'المنصة الذكية - SMART PLATFORM',
  ogDescription: () => t('brand.tagline'),
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeTrustStrip />
    <HomeSolutionsSection />
    <HomeAboutTeaser />
    <HomeWhyUs />
    <HomeStatsSection />
    <HomeProductsSection />
    <HomeProjectsSection />
    <HomeMethodSection />
    <HomeSectorsSection />
    <HomeFaqSection />
    <HomeCtaBanner />
  </div>
</template>
