<script setup lang="ts">
import type { Product } from '~~/server/db/schema'

defineProps<{ product: Product }>()
const { tr, lines } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <article class="card group flex flex-col overflow-hidden p-0">
    <!-- Product "screen" header -->
    <div class="relative flex h-44 items-center justify-center overflow-hidden bg-ink-900">
      <div class="bg-grid-dark absolute inset-0" />
      <div class="absolute -bottom-10 inset-s-1/2 size-40 -translate-x-1/2 rounded-full bg-brand-500/40 blur-2xl transition duration-500 group-hover:bg-brand-400/60" />
      <span class="relative flex size-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-white backdrop-blur transition duration-500 group-hover:scale-110">
        <Icon :name="product.icon" class="size-10" />
      </span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="text-xl">{{ tr(product, 'name') }}</h3>
      <p class="mt-2 text-sm leading-7 text-slate-600">{{ tr(product, 'summary') }}</p>
      <ul class="mt-5 flex-1 space-y-2">
        <li v-for="f in lines(product, 'features').slice(0, 3)" :key="f" class="flex items-center gap-2 text-sm text-ink-800">
          <Icon name="lucide:circle-check" class="size-4 shrink-0 text-brand-600" />{{ f }}
        </li>
      </ul>
      <div class="mt-6 grid grid-cols-2 gap-2 border-t border-slate-100 pt-5">
        <NuxtLink :to="localePath(`/products/${product.slug}`)" class="btn-outline px-3 py-2">{{ $t('products.details') }}</NuxtLink>
        <NuxtLink :to="localePath({ path: '/products/request', query: { product: product.slug } })" class="btn-primary px-3 py-2 shadow-none">{{ $t('products.demo') }}</NuxtLink>
      </div>
    </div>
  </article>
</template>
