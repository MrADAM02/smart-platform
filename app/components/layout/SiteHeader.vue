<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
const localePath = useLocalePath()
const route = useRoute()

const mobileOpen = ref(false)
const dropdownOpen = ref(false)
const scrolled = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  dropdownOpen.value = false
})

onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})

const links = [
  { to: '/products', key: 'nav.products' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]
const quoteLink = computed(() => localePath({ path: '/contact', query: { type: 'quote' } }))
const navItem = 'rounded-lg px-3 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700'
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition" :class="scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'">
    <div class="container-x flex h-18 items-center justify-between gap-6">
      <NuxtLink :to="localePath('/')" aria-label="المنصة الذكية - SMART PLATFORM">
        <UiBrandLogo />
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" :aria-label="$t('nav.menu')">
        <NuxtLink :to="localePath('/')" :class="navItem" exact-active-class="text-brand-700">{{ $t('nav.home') }}</NuxtLink>

        <div class="relative" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
          <button
            type="button"
            class="flex items-center gap-1"
            :class="navItem"
            :aria-expanded="dropdownOpen"
            aria-haspopup="true"
            @click="dropdownOpen = !dropdownOpen"
          >
            {{ $t('nav.solutions') }}
            <Icon name="lucide:chevron-down" class="size-4 transition" :class="dropdownOpen && 'rotate-180'" />
          </button>
          <Transition enter-from-class="opacity-0 translate-y-1" leave-to-class="opacity-0 translate-y-1" enter-active-class="transition" leave-active-class="transition">
            <div v-show="dropdownOpen" class="absolute start-0 top-full w-[34rem] pt-2">
              <div class="grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                <NuxtLink
                  v-for="s in data?.services"
                  :key="s.slug"
                  :to="localePath(`/solutions/${s.slug}`)"
                  class="flex items-start gap-3 rounded-xl p-3 hover:bg-brand-50"
                >
                  <Icon :name="s.icon" class="mt-0.5 size-5 shrink-0 text-brand-600" />
                  <span>
                    <span class="block text-sm font-semibold text-ink-900">{{ tr(s, 'title') }}</span>
                    <span class="line-clamp-1 text-xs text-slate-500">{{ tr(s, 'highlight') }}</span>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink v-for="l in links" :key="l.to" :to="localePath(l.to)" :class="navItem" active-class="text-brand-700">
          {{ $t(l.key) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink :to="quoteLink" class="btn-primary hidden sm:inline-flex">{{ $t('nav.quote') }}</NuxtLink>
        <button type="button" class="rounded-lg p-2 lg:hidden" :aria-expanded="mobileOpen" :aria-label="$t('nav.menu')" @click="mobileOpen = !mobileOpen">
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="size-6" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileOpen" class="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
      <nav class="container-x flex flex-col gap-1 py-4">
        <NuxtLink :to="localePath('/')" class="rounded-lg px-3 py-2.5 font-medium hover:bg-brand-50">{{ $t('nav.home') }}</NuxtLink>
        <p class="px-3 pt-3 text-xs font-semibold text-slate-400">{{ $t('nav.solutions') }}</p>
        <NuxtLink v-for="s in data?.services" :key="s.slug" :to="localePath(`/solutions/${s.slug}`)" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50">
          <Icon :name="s.icon" class="size-4 text-brand-600" />{{ tr(s, 'title') }}
        </NuxtLink>
        <hr class="my-2 border-slate-100">
        <NuxtLink v-for="l in links" :key="l.to" :to="localePath(l.to)" class="rounded-lg px-3 py-2.5 font-medium hover:bg-brand-50">{{ $t(l.key) }}</NuxtLink>
        <div class="mt-3 flex items-center justify-between gap-3 px-3">
          <LayoutLangSwitch class="text-sm text-brand-700" />
          <NuxtLink :to="quoteLink" class="btn-primary">{{ $t('nav.quote') }}</NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
