<script setup lang="ts">
import arDefaults from '~~/i18n/locales/ar.json'
import enDefaults from '~~/i18n/locales/en.json'

definePageMeta({ layout: 'admin', middleware: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.texts'), robots: 'noindex' })

type Locale = 'ar' | 'en'

/** Flattens nested messages into dotted keys: { "hero.text": "...", "hero.words.0": "..." } */
function flatten(obj: unknown, prefix = '', out: Record<string, string> = {}) {
  if (typeof obj === 'string') out[prefix] = obj
  else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

// Admin UI labels are not site content — leave them out
const HIDDEN_SECTIONS = new Set(['admin'])
const defaults: Record<Locale, Record<string, string>> = { ar: flatten(arDefaults), en: flatten(enDefaults) }
const keys = Object.keys(defaults.ar).filter(k => !HIDDEN_SECTIONS.has(k.split('.')[0]!))
const sections = [...new Set(keys.map(k => k.split('.')[0]!))]

const { data: overrides, refresh } = await useFetch<Record<Locale, Record<string, string>>>('/api/public/texts', {
  key: 'admin-texts',
  default: () => ({ ar: {}, en: {} }),
})

// Working copy of all values (override if set, otherwise default)
const form = reactive<Record<Locale, Record<string, string>>>({ ar: {}, en: {} })
watchEffect(() => {
  for (const l of ['ar', 'en'] as const) {
    for (const k of keys) form[l][k] = overrides.value?.[l]?.[k] ?? defaults[l][k] ?? ''
  }
})

const active = ref(sections[0]!)
const search = ref('')
const visibleKeys = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (q) {
    return keys.filter(k => k.toLowerCase().includes(q)
      || form.ar[k]?.toLowerCase().includes(q) || form.en[k]?.toLowerCase().includes(q))
  }
  return keys.filter(k => k.split('.')[0] === active.value)
})

const isOverridden = (l: Locale, k: string) => overrides.value?.[l]?.[k] != null
const isDirty = (l: Locale, k: string) => form[l][k] !== (overrides.value?.[l]?.[k] ?? defaults[l][k])
const status = ref<Record<string, 'saving' | 'saved' | 'error'>>({})

async function save(l: Locale, k: string, reset = false) {
  const id = `${l}:${k}`
  status.value[id] = 'saving'
  // Saving the default text again is the same as having no override
  const value = reset || form[l][k] === defaults[l][k] ? '' : form[l][k]!
  try {
    await $fetch('/api/admin/texts', { method: 'PUT', body: { locale: l, key: k, value } })
    await refresh()
    await refreshNuxtData('page-texts')
    if (reset) form[l][k] = defaults[l][k]!
    status.value[id] = 'saved'
    setTimeout(() => delete status.value[id], 2000)
  }
  catch {
    status.value[id] = 'error'
  }
}

const isLong = (k: string) => (defaults.ar[k]?.length ?? 0) > 70 || (defaults.en[k]?.length ?? 0) > 70
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl">{{ $t('admin.texts') }}</h1>
        <p class="mt-1 text-sm text-slate-500">{{ $t('admin.textsHelp') }}</p>
      </div>
      <div class="relative w-full sm:w-72">
        <Icon name="lucide:search" class="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input v-model="search" class="input ps-9" :placeholder="$t('admin.search')">
      </div>
    </div>

    <div class="mb-6 flex flex-wrap gap-1.5" :class="search && 'opacity-40'">
      <button
        v-for="s in sections"
        :key="s"
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-medium"
        :class="active === s && !search ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'"
        @click="active = s; search = ''"
      >
        {{ s }}
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="k in visibleKeys" :key="k" class="rounded-2xl bg-white p-4 shadow-sm">
        <p class="mb-3 font-mono text-xs text-slate-400" dir="ltr">{{ k }}</p>
        <div class="grid gap-4 lg:grid-cols-2">
          <div v-for="l in (['ar', 'en'] as const)" :key="l">
            <div class="mb-1 flex items-center justify-between text-xs">
              <span class="font-semibold text-slate-500">{{ l.toUpperCase() }}</span>
              <span class="flex items-center gap-2">
                <span v-if="status[`${l}:${k}`] === 'saved'" class="text-brand-600">{{ $t('admin.saved') }} ✓</span>
                <span v-else-if="status[`${l}:${k}`] === 'error'" class="text-red-600">Error</span>
                <span v-if="isOverridden(l, k)" class="rounded bg-accent-500/15 px-1.5 py-0.5 text-accent-600">{{ $t('admin.edited') }}</span>
              </span>
            </div>
            <div class="flex items-start gap-2">
              <textarea
                v-if="isLong(k)"
                v-model="form[l][k]"
                rows="3"
                class="input text-sm"
                :dir="l === 'ar' ? 'rtl' : 'ltr'"
              />
              <input v-else v-model="form[l][k]" class="input text-sm" :dir="l === 'ar' ? 'rtl' : 'ltr'" @keydown.enter="isDirty(l, k) && save(l, k)">
              <button
                v-if="isDirty(l, k)"
                type="button"
                class="btn-primary shrink-0 px-3 py-2.5"
                :disabled="status[`${l}:${k}`] === 'saving'"
                :aria-label="$t('admin.save')"
                @click="save(l, k)"
              >
                <Icon name="lucide:check" class="size-4" />
              </button>
              <button
                v-else-if="isOverridden(l, k)"
                type="button"
                class="btn-outline shrink-0 px-3 py-2.5"
                :title="$t('admin.reset')"
                :aria-label="$t('admin.reset')"
                @click="save(l, k, true)"
              >
                <Icon name="lucide:rotate-ccw" class="size-4" />
              </button>
            </div>
            <p v-if="isOverridden(l, k)" class="mt-1 line-clamp-1 text-xs text-slate-400">
              {{ $t('admin.default') }}: {{ defaults[l][k] }}
            </p>
          </div>
        </div>
      </div>
      <p v-if="!visibleKeys.length" class="rounded-2xl bg-white p-8 text-center text-slate-400">{{ $t('admin.empty') }}</p>
    </div>
  </div>
</template>
