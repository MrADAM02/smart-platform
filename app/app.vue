<script setup lang="ts">
const head = useLocaleHead({ seo: true })
const { t, locale } = useI18n()
const site = useSiteConfig()
const { data } = useSite()
const { setting } = useLocalized()

const siteUrl = computed(() => String(site.url).replace(/\/$/, ''))
const ogImage = computed(() => `${siteUrl.value}/og-${locale.value === 'en' ? 'en' : 'ar'}.png`)

const route = useRoute()
// Canonical URL ignores query strings (e.g. /contact?type=quote → /contact)
const canonical = computed(() => siteUrl.value + (route.path.replace(/\/$/, '') || '/'))

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang, dir: () => head.value.htmlAttrs?.dir },
  link: () => [...(head.value.link ?? []), { rel: 'canonical', href: canonical.value, key: 'canonical' }],
  meta: () => head.value.meta ?? [],
  titleTemplate: (title?: string) => {
    const brand = `${t('brand.name')} - ${t('brand.latin')}`
    return title ? `${title} | ${brand}` : brand
  },
})

// Defaults for every page; pages override title/description with their own useSeoMeta
useSeoMeta({
  description: () => t('brand.tagline'),
  ogType: 'website',
  ogUrl: () => canonical.value,
  ogSiteName: 'المنصة الذكية - SMART PLATFORM',
  ogImage: () => ogImage.value,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => `${t('brand.name')} - ${t('brand.tagline')}`,
  twitterCard: 'summary_large_image',
  twitterImage: () => ogImage.value,
  themeColor: '#0a1628',
})

// Google structured data: the organization and the website
useHead({
  script: [{
    type: 'application/ld+json',
    key: 'ld-org',
    innerHTML: () => {
      const s = data.value?.settings ?? {}
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl.value}/#organization`,
            'name': 'المنصة الذكية',
            'alternateName': 'SMART PLATFORM',
            'url': siteUrl.value,
            'logo': `${siteUrl.value}/logo-512.png`,
            'image': `${siteUrl.value}/og-ar.png`,
            'description': t('brand.tagline'),
            'foundingDate': s.sinceYear || undefined,
            'email': s.email || undefined,
            'telephone': s.phone || undefined,
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': setting(s, 'address') || undefined,
              'addressCountry': 'SA',
            },
            'contactPoint': s.phone
              ? [{ '@type': 'ContactPoint', 'telephone': s.phone, 'contactType': 'sales', 'availableLanguage': ['Arabic', 'English'] }]
              : undefined,
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl.value}/#website`,
            'url': siteUrl.value,
            'name': 'المنصة الذكية - SMART PLATFORM',
            'inLanguage': ['ar-SA', 'en-US'],
            'publisher': { '@id': `${siteUrl.value}/#organization` },
          },
        ],
      })
    },
  }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
