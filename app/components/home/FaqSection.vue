<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
</script>

<template>
  <section class="section">
    <div class="container-x max-w-3xl">
      <UiSectionTitle :eyebrow="$t('faq.eyebrow')" :title="$t('faq.title')" />
      <div class="space-y-3">
        <details v-for="(f, i) in data?.faqs" :key="f.id" class="group reveal rounded-2xl border border-slate-200 bg-white p-5 open:shadow-md" :open="i === 0">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900">
            {{ tr(f, 'question') }}
            <Icon name="lucide:plus" class="size-5 shrink-0 text-brand-600 transition group-open:rotate-45" />
          </summary>
          <p class="mt-3 leading-7 text-slate-600">{{ tr(f, 'answer') }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
