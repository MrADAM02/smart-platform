<script setup lang="ts">
const { data } = useSite()
const featured = computed(() => data.value?.services.filter(s => s.featured) ?? [])
</script>

<template>
  <section id="solutions" class="section scroll-mt-20 bg-white">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('solutions.eyebrow')" :title="$t('solutions.title')" :text="$t('solutions.text')" />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UiServiceCard v-for="s in featured" :key="s.id" :service="s" class="reveal" />
      </div>
    </div>
  </section>
</template>
