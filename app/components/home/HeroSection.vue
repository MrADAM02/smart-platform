<script setup lang="ts">
const { data } = useSite()
const { tm, rt } = useI18n()
const localePath = useLocalePath()

const words = computed(() => (tm('hero.words') as unknown[]).map(w => rt(w as never)))
const compliance = computed(() => (tm('hero.compliance') as unknown[]).map(w => rt(w as never)))

// Rotate the highlighted word
const index = ref(0)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const id = setInterval(() => (index.value = (index.value + 1) % words.value.length), 2600)
  onBeforeUnmount(() => clearInterval(id))
})
</script>

<template>
  <section class="relative isolate overflow-hidden bg-ink-900">
    <div class="bg-grid-dark mask-fade absolute inset-0 -z-10" />
    <div class="absolute -top-40 start-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />
    <div class="absolute -bottom-40 end-0 -z-10 size-[28rem] rounded-full bg-accent-500/10 blur-3xl" />

    <div class="container-x grid items-center gap-16 pt-16 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-32">
      <div>
        <span class="eyebrow-dark">
          <span class="relative flex size-2">
            <span class="animate-pulse-ring absolute inline-flex size-full rounded-full bg-brand-400" />
            <span class="relative inline-flex size-2 rounded-full bg-brand-400" />
          </span>
          {{ $t('hero.since', { year: data?.settings.sinceYear ?? '' }) }}
        </span>

        <h1 class="text-4xl leading-[1.2] text-white sm:text-5xl lg:text-[3.6rem]">
          {{ $t('hero.titleStart') }}
          <span class="relative mt-1 block h-[1.3em] overflow-hidden">
            <Transition
              mode="out-in"
              enter-from-class="translate-y-full opacity-0"
              leave-to-class="-translate-y-full opacity-0"
              enter-active-class="transition duration-500 ease-out"
              leave-active-class="transition duration-300 ease-in"
            >
              <span :key="index" class="text-gradient block pb-2">{{ words[index] }}</span>
            </Transition>
          </span>
        </h1>

        <p class="mt-6 max-w-xl text-lg leading-8 text-slate-300">{{ $t('hero.text') }}</p>

        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLink :to="localePath({ path: '/contact', query: { type: 'demo' } })" class="btn-primary px-6 py-3.5 text-base">
            {{ $t('hero.ctaDemo') }}
            <Icon name="lucide:arrow-right" class="flip-rtl size-4" />
          </NuxtLink>
          <a href="#solutions" class="btn-ghost-light px-6 py-3.5 text-base">
            <Icon name="lucide:layers" class="size-4" />{{ $t('hero.ctaSolutions') }}
          </a>
        </div>

        <ul class="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-8">
          <li v-for="item in compliance" :key="item" class="flex items-center gap-2 text-sm text-slate-300">
            <Icon name="lucide:shield-check" class="size-5 shrink-0 text-brand-400" />{{ item }}
          </li>
        </ul>
      </div>

      <HomeHeroIllustration class="mx-auto w-full max-w-xl lg:max-w-none" />
    </div>

    <!-- soft transition into the next section -->
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
  </section>
</template>
