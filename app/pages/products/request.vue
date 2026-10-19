<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { data } = await useSite()

const product = computed(() => {
  const q = String(route.query.product ?? '')
  return data.value?.products.some(p => p.slug === q) ? q : data.value?.products[0]?.slug
})

useSeoMeta({ title: () => t('products.requestTitle') })
</script>

<template>
  <div>
    <UiPageHeader :title="$t('products.requestTitle')" :text="$t('products.requestText')" icon="lucide:monitor-play" />
    <section class="section">
      <div class="container-x max-w-3xl">
        <div class="card hover:translate-y-0">
          <UiRequestForm type="product" :product="product" show-product />
        </div>
      </div>
    </section>
  </div>
</template>
