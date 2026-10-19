<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
</script>

<template>
  <section class="section">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('method.eyebrow')" :title="$t('method.title')" />
      <ol class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <li v-for="(step, i) in data?.steps" :key="step.id" class="reveal relative rounded-2xl border border-slate-200 p-6">
          <span class="flex size-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">{{ i + 1 }}</span>
          <h3 class="mt-5 text-lg">{{ tr(step, 'title') }}</h3>
          <p class="mt-2 text-sm leading-7 text-slate-600">{{ tr(step, 'description') }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
