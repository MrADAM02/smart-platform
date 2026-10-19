<script setup lang="ts">
const { data } = useSite()
const { t } = useI18n()
const localePath = useLocalePath()
const wa = computed(() => whatsappHref(data.value?.settings.whatsapp, t('cta.whatsappMessage')))
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <div class="container-x">
      <div class="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 px-6 py-14 text-center sm:px-16">
        <div class="hero-glow pointer-events-none absolute inset-0 opacity-20" />
        <div class="relative">
          <h2 class="text-3xl text-white sm:text-4xl">{{ $t('cta.title') }}</h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-brand-100">{{ $t('cta.text') }}</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <NuxtLink :to="localePath({ path: '/contact', query: { type: 'quote' } })" class="btn-accent">{{ $t('cta.quote') }}</NuxtLink>
            <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="btn-ghost-light">
              <Icon name="lucide:message-circle" class="size-4" />{{ $t('cta.whatsapp') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
