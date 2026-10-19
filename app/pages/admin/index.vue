<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.dashboard'), robots: 'noindex' })
const localePath = useLocalePath()

const { data } = await useFetch('/api/admin/stats')
const cards = computed(() => [
  { key: 'total', label: t('admin.total'), icon: 'lucide:inbox', color: 'bg-ink-800' },
  { key: 'new', label: t('admin.status.new'), icon: 'lucide:bell', color: 'bg-accent-500' },
  { key: 'in_progress', label: t('admin.status.in_progress'), icon: 'lucide:loader', color: 'bg-brand-500' },
  { key: 'done', label: t('admin.status.done'), icon: 'lucide:circle-check', color: 'bg-brand-800' },
] as const)
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl">{{ $t('admin.dashboard') }}</h1>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <NuxtLink
        v-for="c in cards"
        :key="c.key"
        :to="localePath({ path: '/admin/requests', query: c.key === 'total' ? {} : { status: c.key } })"
        class="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md"
      >
        <span class="flex size-12 items-center justify-center rounded-xl text-white" :class="c.color">
          <Icon :name="c.icon" class="size-6" />
        </span>
        <span>
          <span class="block text-3xl font-bold text-ink-900">{{ data?.[c.key] ?? 0 }}</span>
          <span class="text-sm text-slate-500">{{ c.label }}</span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
