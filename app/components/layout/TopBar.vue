<script setup lang="ts">
const { data } = useSite()
const s = computed(() => data.value?.settings ?? {})
const localePath = useLocalePath()
const { setting } = useLocalized()
</script>

<template>
  <div class="hidden bg-ink-950 text-xs text-slate-400 md:block">
    <div class="container-x flex h-10 items-center justify-between">
      <div class="flex items-center gap-6">
        <a v-if="s.phone" :href="telHref(s.phone)" class="flex items-center gap-1.5 hover:text-white">
          <Icon name="lucide:phone" class="size-3.5" /><span dir="ltr">{{ s.phone }}</span>
        </a>
        <a v-if="s.email" :href="`mailto:${s.email}`" class="flex items-center gap-1.5 hover:text-white">
          <Icon name="lucide:mail" class="size-3.5" />{{ s.email }}
        </a>
        <NuxtLink :to="localePath('/contact') + '#map'" class="flex items-center gap-1.5 hover:text-white">
          <Icon name="lucide:map-pin" class="size-3.5" />{{ setting(s, 'address') }}
        </NuxtLink>
      </div>
      <LayoutLangSwitch class="hover:text-white" />
    </div>
  </div>
</template>
