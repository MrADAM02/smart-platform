<script setup lang="ts">
const { t } = useI18n()
const { data } = await useSite()
const localePath = useLocalePath()
useReveal()
useSeoMeta({ title: () => t('nav.projects'), description: () => t('projects.text') })
</script>

<template>
  <div>
    <UiPageHeader :title="$t('projects.title')" :text="$t('projects.text')" icon="lucide:briefcase" />

    <section class="section">
      <div class="container-x">
        <div v-if="data?.projects.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UiProjectCard v-for="p in data.projects" :key="p.id" :project="p" class="reveal" />
        </div>

        <div v-else class="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <span class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
            <Icon name="lucide:folder-clock" class="size-8" />
          </span>
          <h2 class="mt-6 text-2xl">{{ $t('projects.emptyTitle') }}</h2>
          <p class="mt-3 leading-7 text-slate-600">{{ $t('projects.emptyText') }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-8">{{ $t('nav.contact') }}</NuxtLink>
        </div>
      </div>
    </section>

    <HomeCtaBanner />
  </div>
</template>
