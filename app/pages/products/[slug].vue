<script setup lang="ts">
import type { Product } from '~~/server/db/schema'

const route = useRoute()
const localePath = useLocalePath()
const { tr, lines } = useLocalized()
const { data: product } = await useFetch<Product>(() => `/api/public/products/${route.params.slug}`)

if (!product.value) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

useSeoMeta({ title: () => tr(product.value, 'name'), description: () => tr(product.value, 'summary') })
</script>

<template>
  <div v-if="product">
    <UiPageHeader :title="tr(product, 'name')" :text="tr(product, 'summary')" :icon="product.icon" />
    <section class="section">
      <div class="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 class="mb-6 text-2xl">{{ $t('products.features') }}</h2>
          <ul class="grid gap-3 sm:grid-cols-2">
            <li v-for="f in lines(product, 'features')" :key="f" class="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <Icon name="lucide:circle-check" class="size-5 shrink-0 text-brand-600" />{{ f }}
            </li>
          </ul>
          <NuxtLink :to="localePath({ path: '/products/request', query: { product: product.slug } })" class="btn-primary mt-8">
            {{ $t('products.demo') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
          </NuxtLink>
        </div>
        <div class="flex aspect-video items-center justify-center rounded-3xl bg-gradient-to-br from-brand-50 to-brand-200">
          <Icon :name="product.icon" class="size-28 text-brand-600" />
        </div>
      </div>
    </section>
  </div>
</template>
