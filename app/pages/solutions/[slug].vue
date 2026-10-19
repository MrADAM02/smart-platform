<script setup lang="ts">
import type { Service } from '~~/server/db/schema'

const route = useRoute()
const localePath = useLocalePath()
const { tr } = useLocalized()
const { data: site } = await useSite()
const { data: service } = await useFetch<Service>(() => `/api/public/services/${route.params.slug}`)

if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

const paragraphs = computed(() => tr(service.value, 'body').split('\n').filter(Boolean))
const others = computed(() => site.value?.services.filter(s => s.slug !== route.params.slug).slice(0, 3) ?? [])

useSeoMeta({ title: () => tr(service.value, 'title'), description: () => tr(service.value, 'summary') })
</script>

<template>
  <div v-if="service">
    <UiPageHeader :title="tr(service, 'title')" :text="tr(service, 'summary')" :icon="service.icon" />

    <section class="section">
      <div class="container-x grid gap-10 lg:grid-cols-3">
        <article class="lg:col-span-2">
          <p v-for="p in paragraphs" :key="p" class="mb-5 text-lg leading-9 text-slate-700">{{ p }}</p>
          <div v-if="tr(service, 'highlight')" class="mt-8 flex items-start gap-3 rounded-2xl bg-accent-500/10 p-5">
            <Icon name="lucide:sparkles" class="size-6 shrink-0 text-accent-600" />
            <div>
              <p class="text-sm font-semibold text-accent-600">{{ $t('solutions.smart') }}</p>
              <p class="mt-1 text-ink-900">{{ tr(service, 'highlight') }}</p>
            </div>
          </div>
        </article>

        <aside class="h-fit rounded-2xl bg-brand-700 p-8 text-white lg:sticky lg:top-28">
          <h2 class="text-xl text-white">{{ $t('pages.solutionCta') }}</h2>
          <p class="mt-3 text-brand-100">{{ $t('cta.text') }}</p>
          <NuxtLink :to="localePath({ path: '/contact', query: { type: 'quote' } })" class="btn-accent mt-6 w-full">{{ $t('cta.quote') }}</NuxtLink>
        </aside>
      </div>
    </section>

    <section v-if="others.length" class="section bg-slate-50">
      <div class="container-x">
        <h2 class="mb-8 text-2xl">{{ $t('pages.otherSolutions') }}</h2>
        <div class="grid gap-6 md:grid-cols-3">
          <UiServiceCard v-for="s in others" :key="s.id" :service="s" />
        </div>
      </div>
    </section>
  </div>
</template>
