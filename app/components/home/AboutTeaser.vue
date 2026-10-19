<script setup lang="ts">
const { data } = useSite()
const { tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const points = computed(() => (tm('about.points') as unknown[]).map(p => rt(p as never)))
const years = computed(() => {
  const since = Number(data.value?.settings.sinceYear)
  return since ? new Date().getFullYear() - since : 0
})
const ar = computed(() => locale.value === 'ar')
const pointIcons = ['lucide:scale', 'lucide:code-xml', 'lucide:headset']
</script>

<template>
  <section class="section overflow-hidden">
    <div class="container-x grid items-center gap-16 lg:grid-cols-2">
      <!-- Composition: layered cards illustrating an organized archive -->
      <div class="reveal relative mx-auto w-full max-w-lg" aria-hidden="true">
        <div class="absolute inset-6 -z-10 rotate-6 rounded-[2rem] bg-gradient-to-br from-brand-200 to-brand-50" />
        <div class="relative rounded-[2rem] bg-gradient-to-br from-brand-700 to-ink-900 p-8 shadow-2xl">
          <div class="bg-grid-dark absolute inset-0 rounded-[2rem] opacity-60" />
          <div class="relative grid grid-cols-2 gap-4">
            <div v-for="(f, i) in (ar ? ['الموارد البشرية', 'المالية', 'العقود', 'المشتريات'] : ['HR', 'Finance', 'Contracts', 'Procurement'])" :key="f" class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <Icon :name="['lucide:folder-heart', 'lucide:folder-kanban', 'lucide:folder-lock', 'lucide:folder-cog'][i]!" class="size-7 text-brand-200" />
              <p class="mt-3 text-sm font-semibold text-white">{{ f }}</p>
              <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div class="h-full rounded-full bg-brand-300" :style="{ width: `${[86, 64, 92, 71][i]}%` }" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="years" class="animate-float absolute -bottom-8 -end-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-xl sm:-end-8">
          <p class="text-4xl font-bold text-gradient-dark" dir="ltr">+{{ years }}</p>
          <p class="mt-1 text-sm font-medium text-slate-500">{{ $t('about.years') }}</p>
        </div>
      </div>

      <div class="reveal">
        <span class="eyebrow"><span class="size-1.5 rounded-full bg-brand-500" />{{ $t('about.eyebrow') }}</span>
        <h2 class="text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]">{{ $t('about.title') }}</h2>
        <p class="mt-6 text-lg leading-8 text-slate-600">{{ $t('about.text') }}</p>
        <ul class="mt-8 space-y-4">
          <li v-for="(p, i) in points" :key="p" class="flex items-center gap-4">
            <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <Icon :name="pointIcons[i % pointIcons.length]!" class="size-5" />
            </span>
            <span class="font-semibold text-ink-900">{{ p }}</span>
          </li>
        </ul>
        <NuxtLink :to="localePath('/about')" class="btn-outline mt-10">
          {{ $t('about.more') }}<Icon name="lucide:arrow-right" class="flip-rtl size-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
