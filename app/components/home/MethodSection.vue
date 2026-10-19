<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
const icons = ['lucide:search-check', 'lucide:pencil-ruler', 'lucide:hard-hat', 'lucide:rocket']
</script>

<template>
  <section class="section">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('method.eyebrow')" :title="$t('method.title')" />
      <ol class="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <!-- connecting line (desktop) -->
        <div class="absolute inset-x-[12%] top-8 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block" aria-hidden="true" />
        <li
          v-for="(step, i) in data?.steps"
          :key="step.id"
          class="reveal relative text-center"
          :style="{ transitionDelay: `${i * 120}ms` }"
        >
          <div class="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            <Icon :name="icons[i % icons.length]!" class="size-7 text-brand-600" />
            <span class="absolute -end-2 -top-2 flex size-7 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white ring-4 ring-white">{{ i + 1 }}</span>
          </div>
          <h3 class="mt-6 text-lg">{{ tr(step, 'title') }}</h3>
          <p class="mx-auto mt-2 max-w-xs leading-7 text-slate-600">{{ tr(step, 'description') }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
