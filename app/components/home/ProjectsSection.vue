<script setup lang="ts">
const { data } = useSite()
const localePath = useLocalePath()
// Only shown once at least one project is published and featured
const featured = computed(() => data.value?.projects.filter(p => p.featured).slice(0, 3) ?? [])
</script>

<template>
  <section v-if="featured.length" class="section bg-slate-50/60">
    <div class="container-x">
      <div class="mb-14 flex flex-wrap items-end justify-between gap-6">
        <UiSectionTitle :eyebrow="$t('projects.eyebrow')" :title="$t('projects.title')" :center="false" class="mb-0" />
        <NuxtLink :to="localePath('/projects')" class="btn-outline reveal">
          {{ $t('projects.all') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
        </NuxtLink>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UiProjectCard v-for="p in featured" :key="p.id" :project="p" class="reveal" />
      </div>
    </div>
  </section>
</template>
