<script setup lang="ts">
const { data } = useSite()
const { tm, rt } = useI18n()
const localePath = useLocalePath()
const points = computed(() => (tm('about.points') as unknown[]).map(p => rt(p as never)))
const years = computed(() => {
  const since = Number(data.value?.settings.sinceYear)
  return since ? new Date().getFullYear() - since : 0
})
</script>

<template>
  <section class="section bg-slate-50">
    <div class="container-x grid items-center gap-12 lg:grid-cols-2">
      <div class="reveal relative">
        <div class="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 p-10">
          <div class="grid h-full grid-cols-3 gap-3 opacity-90">
            <div v-for="i in 9" :key="i" class="rounded-xl bg-white/10" :class="i % 4 === 1 && 'bg-accent-500/70'" />
          </div>
        </div>
        <div v-if="years" class="absolute -bottom-6 start-6 rounded-2xl bg-white px-6 py-4 shadow-xl">
          <p class="text-3xl font-bold text-brand-600">+{{ years }}</p>
          <p class="text-sm text-slate-500">{{ $t('about.years') }}</p>
        </div>
      </div>

      <div class="reveal">
        <span class="eyebrow">{{ $t('about.eyebrow') }}</span>
        <h2 class="text-3xl leading-snug sm:text-4xl">{{ $t('about.title') }}</h2>
        <p class="mt-5 text-lg leading-8 text-slate-600">{{ $t('about.text') }}</p>
        <ul class="mt-6 space-y-3">
          <li v-for="p in points" :key="p" class="flex items-center gap-3 font-medium text-ink-800">
            <Icon name="lucide:circle-check" class="size-5 text-brand-600" />{{ p }}
          </li>
        </ul>
        <NuxtLink :to="localePath('/about')" class="btn-outline mt-8">
          {{ $t('about.more') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
