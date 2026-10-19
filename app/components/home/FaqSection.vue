<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <section class="section">
    <div class="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
      <div class="reveal lg:sticky lg:top-28 lg:self-start">
        <UiSectionTitle :eyebrow="$t('faq.eyebrow')" :title="$t('faq.title')" :center="false" class="mb-6" />
        <p class="leading-7 text-slate-600">{{ $t('form.contactText') }}</p>
        <NuxtLink :to="localePath('/contact')" class="btn-outline mt-6">
          <Icon name="lucide:message-square-text" class="size-4" />{{ $t('nav.contact') }}
        </NuxtLink>
      </div>
      <div class="space-y-3">
        <details
          v-for="(f, i) in data?.faqs"
          :key="f.id"
          class="group reveal rounded-2xl border border-slate-200 bg-white px-6 py-5 transition open:border-brand-200 open:bg-brand-50/40 open:shadow-sm"
          :open="i === 0"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
            {{ tr(f, 'question') }}
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-ink-800 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              <Icon name="lucide:plus" class="size-4" />
            </span>
          </summary>
          <p class="mt-4 leading-8 text-slate-600">{{ tr(f, 'answer') }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
