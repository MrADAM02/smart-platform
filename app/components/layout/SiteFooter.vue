<script setup lang="ts">
const { data } = useSite()
const { tr, setting } = useLocalized()
const localePath = useLocalePath()
const s = computed(() => data.value?.settings ?? {})
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative bg-ink-950 text-slate-400">
    <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-500/60 to-transparent" />
    <div class="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <UiBrandLogo light />
        <p class="mt-4 text-sm leading-7">{{ $t('footer.about') }}</p>
      </div>

      <div>
        <h3 class="mb-4 text-sm text-white">{{ $t('nav.solutions') }}</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="svc in data?.services" :key="svc.slug">
            <NuxtLink :to="localePath(`/solutions/${svc.slug}`)" class="hover:text-white">{{ tr(svc, 'title') }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm text-white">{{ $t('footer.company') }}</h3>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink :to="localePath('/about')" class="hover:text-white">{{ $t('nav.about') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/products')" class="hover:text-white">{{ $t('nav.products') }}</NuxtLink></li>
          <li v-if="data?.projects.length"><NuxtLink :to="localePath('/projects')" class="hover:text-white">{{ $t('nav.projects') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white">{{ $t('nav.contact') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath({ path: '/contact', query: { type: 'quote' } })" class="hover:text-white">{{ $t('nav.quote') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm text-white">{{ $t('footer.contact') }}</h3>
        <ul class="space-y-3 text-sm">
          <li v-if="s.phone" class="flex items-center gap-2">
            <Icon name="lucide:phone" class="size-4 text-brand-400" />
            <a :href="telHref(s.phone)" dir="ltr" class="hover:text-white">{{ s.phone }}</a>
          </li>
          <li v-if="s.email" class="flex items-center gap-2">
            <Icon name="lucide:mail" class="size-4 text-brand-400" />
            <a :href="`mailto:${s.email}`" class="hover:text-white">{{ s.email }}</a>
          </li>
          <li class="flex items-center gap-2">
            <Icon name="lucide:map-pin" class="size-4 text-brand-400" />{{ setting(s, 'address') }}
          </li>
          <li class="flex items-start gap-2">
            <Icon name="lucide:clock" class="mt-0.5 size-4 text-brand-400" />
            <span>{{ $t('footer.hours') }}: {{ setting(s, 'hours') }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
        <p>© {{ year }} {{ $t('brand.name') }} - SMART PLATFORM. {{ $t('footer.rights') }}.</p>
        <div class="flex items-center gap-5">
          <NuxtLink :to="localePath('/privacy')" class="hover:text-white">{{ $t('footer.privacy') }}</NuxtLink>
          <NuxtLink :to="localePath('/compliance')" class="hover:text-white">{{ $t('footer.compliance') }}</NuxtLink>
          <LayoutLangSwitch class="hover:text-white" />
        </div>
      </div>
    </div>
  </footer>
</template>
