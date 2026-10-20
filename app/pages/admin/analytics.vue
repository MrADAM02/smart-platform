<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.analytics'), robots: 'noindex' })

interface Row { key: string | null, views: number, visitors?: number }
interface Analytics {
  days: number
  totals: { views: number, visitors: number }
  previous: { views: number, visitors: number }
  series: { day: string, views: number, visitors: number }[]
  pages: Row[]
  referrers: Row[]
  countries: Row[]
  devices: Row[]
  locales: Row[]
}

const days = ref(30)
const { data, pending, refresh } = await useFetch<Analytics>('/api/admin/analytics', { query: { days } })
const fmt = new Intl.NumberFormat('en-US')

function change(cur: number, prev: number) {
  if (!prev) return null
  return Math.round(((cur - prev) / prev) * 100)
}
const kpis = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { label: t('admin.visitors'), value: d.totals.visitors, delta: change(d.totals.visitors, d.previous.visitors), icon: 'lucide:users' },
    { label: t('admin.pageViews'), value: d.totals.views, delta: change(d.totals.views, d.previous.views), icon: 'lucide:eye' },
    {
      label: t('admin.viewsPerVisitor'),
      value: d.totals.visitors ? +(d.totals.views / d.totals.visitors).toFixed(1) : 0,
      delta: null,
      icon: 'lucide:layers',
    },
  ]
})

function share(rows: Row[] | undefined) {
  const total = (rows ?? []).reduce((s, r) => s + r.views, 0) || 1
  return (rows ?? []).map(r => ({ ...r, pct: Math.round((r.views / total) * 100) }))
}
const maxOf = (rows: Row[] | undefined) => Math.max(1, ...(rows ?? []).map(r => r.views))

const deviceIcon: Record<string, string> = { mobile: 'lucide:smartphone', tablet: 'lucide:tablet', desktop: 'lucide:monitor' }
const regionNames = computed(() => {
  try {
    return new Intl.DisplayNames([useI18n().locale.value], { type: 'region' })
  }
  catch {
    return null
  }
})
const countryName = (code: string | null) => (code && regionNames.value?.of(code)) || code || '—'

const lists = computed(() => [
  { title: t('admin.topPages'), icon: 'lucide:file-text', rows: data.value?.pages, fmtKey: (k: string | null) => k ?? '—', ltr: true },
  { title: t('admin.topReferrers'), icon: 'lucide:link', rows: data.value?.referrers, fmtKey: (k: string | null) => k ?? '—', ltr: true },
  { title: t('admin.countries'), icon: 'lucide:globe', rows: data.value?.countries, fmtKey: countryName, ltr: false },
])
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl">{{ $t('admin.analytics') }}</h1>
        <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <Icon name="lucide:shield-check" class="size-4 text-brand-600" />{{ $t('admin.analyticsPrivacy') }}
        </p>
      </div>
      <!-- filters in one row above the charts -->
      <div class="flex items-center gap-2">
        <div class="flex gap-1 rounded-xl bg-white p-1 shadow-sm">
          <button
            v-for="d in [7, 30, 90]"
            :key="d"
            type="button"
            class="rounded-lg px-3 py-1.5 text-sm"
            :class="days === d ? 'bg-brand-600 text-white' : 'hover:bg-slate-100'"
            @click="days = d"
          >
            {{ $t('admin.lastDays', { n: d }) }}
          </button>
        </div>
        <button type="button" class="rounded-xl bg-white p-2.5 shadow-sm hover:bg-slate-50" :aria-label="$t('admin.refresh')" @click="refresh()">
          <Icon name="lucide:refresh-cw" class="size-4" :class="pending && 'animate-spin'" />
        </button>
      </div>
    </div>

    <!-- KPI tiles -->
    <div class="mb-6 grid gap-4 sm:grid-cols-3">
      <div v-for="k in kpis" :key="k.label" class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="flex items-center gap-2 text-sm text-slate-500"><Icon :name="k.icon" class="size-4" />{{ k.label }}</p>
        <p class="mt-2 text-3xl font-bold tabular-nums text-ink-900" dir="ltr">{{ fmt.format(k.value) }}</p>
        <p v-if="k.delta != null" class="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <Icon :name="k.delta >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'" class="size-4" :class="k.delta >= 0 ? 'text-brand-600' : 'text-red-600'" />
          <span dir="ltr" class="font-semibold" :class="k.delta >= 0 ? 'text-brand-700' : 'text-red-700'">{{ k.delta > 0 ? '+' : '' }}{{ k.delta }}%</span>
          {{ $t('admin.vsPrevious') }}
        </p>
      </div>
    </div>

    <!-- Traffic over time -->
    <div class="mb-6 rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-lg">{{ $t('admin.traffic') }}</h2>
      <AdminTrafficChart
        v-if="data && data.totals.views"
        :series="data.series"
        :labels="{ views: $t('admin.pageViews'), visitors: $t('admin.visitors') }"
      />
      <p v-else class="py-16 text-center text-slate-400">{{ $t('admin.noTraffic') }}</p>
      <!-- table view of the same data -->
      <details v-if="data && data.totals.views" class="mt-4 text-sm">
        <summary class="cursor-pointer text-brand-700">{{ $t('admin.showTable') }}</summary>
        <div class="mt-3 max-h-72 overflow-y-auto">
          <table class="w-full">
            <thead class="sticky top-0 bg-white text-xs text-slate-500">
              <tr><th class="p-2 text-start">{{ $t('admin.date') }}</th><th class="p-2 text-end">{{ $t('admin.visitors') }}</th><th class="p-2 text-end">{{ $t('admin.pageViews') }}</th></tr>
            </thead>
            <tbody>
              <tr v-for="s in [...data.series].reverse()" :key="s.day" class="border-t border-slate-100">
                <td class="p-2" dir="ltr">{{ s.day }}</td>
                <td class="p-2 text-end tabular-nums">{{ fmt.format(s.visitors) }}</td>
                <td class="p-2 text-end tabular-nums">{{ fmt.format(s.views) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>

    <!-- Top lists -->
    <div class="mb-6 grid gap-6 lg:grid-cols-3">
      <div v-for="list in lists" :key="list.title" class="rounded-2xl bg-white p-5 shadow-sm">
        <h2 class="mb-4 flex items-center gap-2 text-base"><Icon :name="list.icon" class="size-4 text-slate-400" />{{ list.title }}</h2>
        <ul v-if="list.rows?.length" class="space-y-1.5">
          <li v-for="r in list.rows" :key="String(r.key)" class="relative overflow-hidden rounded-lg px-3 py-2 text-sm">
            <!-- magnitude bar: single hue -->
            <span class="absolute inset-y-0 inset-s-0 rounded-lg bg-brand-50" :style="{ width: `${(r.views / maxOf(list.rows)) * 100}%` }" />
            <span class="relative flex items-center justify-between gap-3">
              <span class="truncate text-ink-800" :dir="list.ltr ? 'ltr' : undefined">{{ list.fmtKey(r.key) }}</span>
              <span class="shrink-0 font-semibold tabular-nums text-ink-900">{{ fmt.format(r.views) }}</span>
            </span>
          </li>
        </ul>
        <p v-else class="py-6 text-center text-sm text-slate-400">{{ $t('admin.empty') }}</p>
      </div>
    </div>

    <!-- Splits -->
    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <h2 class="mb-4 text-base">{{ $t('admin.devices') }}</h2>
        <ul class="space-y-3">
          <li v-for="d in share(data?.devices)" :key="String(d.key)">
            <div class="mb-1 flex items-center justify-between text-sm">
              <span class="flex items-center gap-2 text-ink-800"><Icon :name="deviceIcon[d.key ?? ''] ?? 'lucide:monitor'" class="size-4 text-slate-400" />{{ $t(`admin.device.${d.key}`) }}</span>
              <span class="tabular-nums text-slate-500" dir="ltr">{{ d.pct }}% · {{ fmt.format(d.views) }}</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-brand-600" :style="{ width: `${d.pct}%` }" /></div>
          </li>
        </ul>
        <p v-if="!data?.devices.length" class="py-6 text-center text-sm text-slate-400">{{ $t('admin.empty') }}</p>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <h2 class="mb-4 text-base">{{ $t('admin.languages') }}</h2>
        <ul class="space-y-3">
          <li v-for="l in share(data?.locales)" :key="String(l.key)">
            <div class="mb-1 flex items-center justify-between text-sm">
              <span class="text-ink-800">{{ l.key === 'en' ? 'English' : 'العربية' }}</span>
              <span class="tabular-nums text-slate-500" dir="ltr">{{ l.pct }}% · {{ fmt.format(l.views) }}</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-brand-600" :style="{ width: `${l.pct}%` }" /></div>
          </li>
        </ul>
        <p v-if="!data?.locales.length" class="py-6 text-center text-sm text-slate-400">{{ $t('admin.empty') }}</p>
      </div>
    </div>
  </div>
</template>
