<script setup lang="ts">
const { data } = useSite()
const { t } = useI18n()
const localePath = useLocalePath()
const wa = computed(() => whatsappHref(data.value?.settings.whatsapp, t('cta.whatsappMessage')))
</script>

<template>
  <section class="pb-20 sm:pb-28">
    <div class="container-x">
      <div class="reveal relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-20">
        <div class="bg-grid-dark mask-fade absolute inset-0 -z-10" />
        <div class="absolute -top-24 start-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
        <span class="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg">
          <Icon name="lucide:clipboard-check" class="size-7" />
        </span>
        <h2 class="mx-auto max-w-2xl text-3xl text-white sm:text-4xl lg:text-5xl">{{ $t('cta.title') }}</h2>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{{ $t('cta.text') }}</p>
        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <NuxtLink :to="localePath({ path: '/contact', query: { type: 'quote' } })" class="btn-accent px-7 py-3.5 text-base">
            {{ $t('cta.quote') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
          </NuxtLink>
          <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="btn-ghost-light px-7 py-3.5 text-base">
            <Icon name="lucide:message-circle" class="size-4" />{{ $t('cta.whatsapp') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
