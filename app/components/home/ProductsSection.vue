<script setup lang="ts">
const { data } = useSite()
const localePath = useLocalePath()
</script>

<template>
  <section class="section bg-slate-50">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('products.eyebrow')" :title="$t('products.title')" />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UiProductCard v-for="p in data?.products.slice(0, 4)" :key="p.id" :product="p" class="reveal" />
      </div>
      <div class="mt-10 text-center">
        <NuxtLink :to="localePath('/products')" class="btn-outline">
          {{ $t('products.all') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
