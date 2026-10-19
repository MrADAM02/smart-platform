<script setup lang="ts">
const { data } = useSite()
const { tm, rt } = useI18n()
const localePath = useLocalePath()

const words = computed(() => (tm('hero.words') as unknown[]).map(w => rt(w as never)))
const compliance = computed(() => (tm('hero.compliance') as unknown[]).map(w => rt(w as never)))

// Rotate the highlighted word
const index = ref(0)
onMounted(() => {
  const id = setInterval(() => (index.value = (index.value + 1) % words.value.length), 2400)
  onBeforeUnmount(() => clearInterval(id))
})
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
    <div class="pointer-events-none absolute -top-32 end-[-10rem] size-[32rem] rounded-full bg-brand-200/40 blur-3xl" />
    <div class="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <span class="eyebrow inline-flex items-center gap-1.5">
          <Icon name="lucide:badge-check" class="size-4" />
          {{ $t('hero.since', { year: data?.settings.sinceYear ?? '' }) }}
        </span>
        <h1 class="mt-2 text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {{ $t('hero.titleStart') }}
          <span class="relative block h-[1.25em] overflow-hidden text-brand-600">
            <Transition mode="out-in" enter-from-class="translate-y-full opacity-0" leave-to-class="-translate-y-full opacity-0" enter-active-class="transition duration-500" leave-active-class="transition duration-300">
              <span :key="index" class="block">{{ words[index] }}</span>
            </Transition>
          </span>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-slate-600">{{ $t('hero.text') }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink :to="localePath({ path: '/contact', query: { type: 'demo' } })" class="btn-primary">
            {{ $t('hero.ctaDemo') }}
            <Icon name="lucide:arrow-right" class="flip-rtl size-4" />
          </NuxtLink>
          <a href="#solutions" class="btn-outline">{{ $t('hero.ctaSolutions') }}</a>
        </div>

        <ul class="mt-10 grid gap-3 sm:grid-cols-3">
          <li v-for="item in compliance" :key="item" class="flex items-start gap-2 text-sm text-slate-600">
            <Icon name="lucide:shield-check" class="mt-0.5 size-5 shrink-0 text-brand-600" />{{ item }}
          </li>
        </ul>
      </div>

      <HomeHeroIllustration class="mx-auto w-full max-w-lg" />
    </div>
  </section>
</template>
