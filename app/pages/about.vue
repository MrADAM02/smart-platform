<script setup lang="ts">
const { t, tm, rt } = useI18n()
await useSite()
useReveal()
useSeoMeta({ title: () => t('nav.about'), description: () => t('about.text') })

const values = computed(() => (tm('about.values') as unknown[]).map(v => rt(v as never)))
const blocks = computed(() => [
  { icon: 'lucide:target', title: t('about.missionTitle'), text: t('about.mission') },
  { icon: 'lucide:eye', title: t('about.visionTitle'), text: t('about.vision') },
])
</script>

<template>
  <div>
    <UiPageHeader :title="$t('about.title')" :text="$t('about.text')" icon="lucide:building-2" />

    <section class="section">
      <div class="container-x grid gap-6 md:grid-cols-3">
        <div v-for="b in blocks" :key="b.title" class="card reveal">
          <Icon :name="b.icon" class="size-10 text-brand-600" />
          <h2 class="mt-4 text-xl">{{ b.title }}</h2>
          <p class="mt-2 leading-7 text-slate-600">{{ b.text }}</p>
        </div>
        <div class="card reveal">
          <Icon name="lucide:gem" class="size-10 text-brand-600" />
          <h2 class="mt-4 text-xl">{{ $t('about.valuesTitle') }}</h2>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li v-for="v in values" :key="v" class="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{{ v }}</li>
          </ul>
        </div>
      </div>
    </section>

    <HomeWhyUs />
    <HomeStatsSection />
    <HomeSectorsSection />
    <div class="pt-16 sm:pt-24"><HomeCtaBanner /></div>
  </div>
</template>
