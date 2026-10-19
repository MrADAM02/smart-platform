<script setup lang="ts">
const { data } = useSite()
const localePath = useLocalePath()
</script>

<template>
  <section class="section bg-slate-50/60">
    <div class="container-x">
      <div class="mb-14 flex flex-wrap items-end justify-between gap-6">
        <UiSectionTitle :eyebrow="$t('products.eyebrow')" :title="$t('products.title')" :center="false" class="mb-0" />
        <NuxtLink :to="localePath('/products')" class="btn-outline reveal">
          {{ $t('products.all') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
        </NuxtLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UiProductCard
          v-for="(p, i) in data?.products.slice(0, 4)"
          :key="p.id"
          :product="p"
          class="reveal"
          :style="{ transitionDelay: `${i * 80}ms` }"
        />
      </div>
    </div>
  </section>
</template>
