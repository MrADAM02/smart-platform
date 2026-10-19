<script setup lang="ts">
const { t } = useI18n()
const { data } = await useSite()
useSeoMeta({ title: () => t('nav.products'), description: () => t('products.title') })
</script>

<template>
  <div>
    <UiPageHeader :title="$t('products.title')" :text="$t('products.requestText')" icon="lucide:boxes" />
    <section class="section">
      <div class="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UiProductCard v-for="p in data?.products" :key="p.id" :product="p" />
      </div>
    </section>
    <HomeCtaBanner />
  </div>
</template>
