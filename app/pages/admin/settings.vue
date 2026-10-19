<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.settings'), robots: 'noindex' })

const fields = [
  { key: 'phone', label: 'Phone', dir: 'ltr' },
  { key: 'email', label: 'Email', dir: 'ltr' },
  { key: 'whatsapp', label: 'WhatsApp number (digits only, e.g. 9665XXXXXXXX)', dir: 'ltr' },
  { key: 'sinceYear', label: 'Founded year', dir: 'ltr' },
  { key: 'addressAr', label: 'Address (AR)', dir: 'rtl' },
  { key: 'addressEn', label: 'Address (EN)', dir: 'ltr' },
  { key: 'hoursAr', label: 'Working hours (AR)', dir: 'rtl' },
  { key: 'hoursEn', label: 'Working hours (EN)', dir: 'ltr' },
  { key: 'mapUrl', label: 'Google Maps link', dir: 'ltr' },
] as const

const { data } = await useFetch<Record<string, string>>('/api/admin/settings')
const form = reactive<Record<string, string>>({})
watchEffect(() => {
  for (const f of fields) form[f.key] = data.value?.[f.key] ?? ''
})

const saved = ref(false)
async function save() {
  await $fetch('/api/admin/settings', { method: 'PUT', body: form })
  await refreshNuxtData('site')
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl">{{ $t('admin.settings') }}</h1>
    <form class="max-w-3xl rounded-2xl bg-white p-6 shadow-sm" @submit.prevent="save">
      <div class="grid gap-4 sm:grid-cols-2">
        <div v-for="f in fields" :key="f.key">
          <label class="label" :for="`s-${f.key}`">{{ f.label }}</label>
          <input :id="`s-${f.key}`" v-model="form[f.key]" class="input" :dir="f.dir">
        </div>
      </div>
      <div class="mt-6 flex items-center gap-4">
        <button type="submit" class="btn-primary">{{ $t('admin.save') }}</button>
        <span v-if="saved" role="status" class="text-sm text-brand-700">{{ $t('admin.saved') }} ✓</span>
      </div>
    </form>
  </div>
</template>
