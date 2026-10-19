<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
</script>

<template>
  <section class="section bg-ink-900">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('sectors.eyebrow')" :title="$t('sectors.title')" light />
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div v-for="s in data?.sectors" :key="s.id" class="reveal rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:bg-white/10">
          <Icon :name="s.icon" class="mx-auto size-8 text-brand-300" />
          <p class="mt-3 text-sm font-medium text-white">{{ tr(s, 'title') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
