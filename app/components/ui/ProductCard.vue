<script setup lang="ts">
import type { Product } from '~~/server/db/schema'

defineProps<{ product: Product }>()
const { tr, lines } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <article class="card flex flex-col overflow-hidden p-0">
    <div class="flex h-36 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
      <Icon :name="product.icon" class="size-14 text-brand-600" />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-lg">{{ tr(product, 'name') }}</h3>
      <p class="mt-2 text-sm leading-7 text-slate-600">{{ tr(product, 'summary') }}</p>
      <ul class="mt-4 flex-1 space-y-1.5">
        <li v-for="f in lines(product, 'features').slice(0, 3)" :key="f" class="flex items-center gap-2 text-sm text-slate-600">
          <Icon name="lucide:check" class="size-4 text-brand-600" />{{ f }}
        </li>
      </ul>
      <div class="mt-6 flex flex-wrap gap-2">
        <NuxtLink :to="localePath(`/products/${product.slug}`)" class="btn-outline px-4 py-2">{{ $t('products.details') }}</NuxtLink>
        <NuxtLink :to="localePath({ path: '/products/request', query: { product: product.slug } })" class="btn-primary px-4 py-2">{{ $t('products.demo') }}</NuxtLink>
      </div>
    </div>
  </article>
</template>
