<script setup lang="ts">
const { data } = useSite()
const featured = computed(() => data.value?.services.filter(s => s.featured) ?? [])
</script>

<template>
  <section id="solutions" class="section relative scroll-mt-20 bg-slate-50/60">
    <div class="bg-grid-light mask-fade absolute inset-0" />
    <div class="container-x relative">
      <UiSectionTitle :eyebrow="$t('solutions.eyebrow')" :title="$t('solutions.title')" :text="$t('solutions.text')" />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UiServiceCard
          v-for="(s, i) in featured"
          :key="s.id"
          :service="s"
          :index="i"
          class="reveal"
          :style="{ transitionDelay: `${(i % 3) * 80}ms` }"
        />
      </div>
    </div>
  </section>
</template>
