<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLayout>
    <section class="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p class="text-7xl font-bold text-brand-600">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-2xl">{{ $t('pages.notFound') }}</h1>
      <button class="btn-primary mt-8" @click="clearError({ redirect: localePath('/') })">
        {{ $t('pages.backHome') }}
      </button>
    </section>
  </NuxtLayout>
</template>
