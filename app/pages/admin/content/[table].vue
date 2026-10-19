<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

type Row = Record<string, unknown> & { id: number }

const route = useRoute()
const { t } = useI18n()
const tableName = computed(() => String(route.params.table))
const def = computed(() => adminTables[tableName.value])
if (!def.value) throw createError({ statusCode: 404, statusMessage: 'Unknown table', fatal: true })

useSeoMeta({ title: () => t(def.value!.titleKey), robots: 'noindex' })

const { data: rows, refresh } = await useFetch<Row[]>(() => `/api/admin/content/${tableName.value}`)
const listFields = computed(() => def.value!.fields.filter(f => f.list))

const editing = ref<Record<string, unknown> | null>(null)
const saving = ref(false)
const error = ref('')

function openNew() {
  editing.value = { ...def.value!.defaults }
  error.value = ''
}
function openEdit(row: Row) {
  editing.value = { ...row }
  error.value = ''
}

async function save() {
  if (!editing.value) return
  saving.value = true
  error.value = ''
  const id = editing.value.id as number | undefined
  try {
    await $fetch(id ? `/api/admin/content/${tableName.value}/${id}` : `/api/admin/content/${tableName.value}`, {
      method: id ? 'PUT' : 'POST',
      body: editing.value,
    })
    editing.value = null
    await refresh()
    // Public pages read the shared "site" payload — refetch so the header/footer update too
    await refreshNuxtData('site')
  }
  catch (e) {
    error.value = (e as { statusMessage?: string }).statusMessage || 'Error'
  }
  finally {
    saving.value = false
  }
}

async function remove(row: Row) {
  if (!confirm(t('admin.confirmDelete'))) return
  await $fetch(`/api/admin/content/${tableName.value}/${row.id}`, { method: 'DELETE' })
  await refresh()
}

function display(v: unknown) {
  if (typeof v === 'boolean') return v ? '✓' : '—'
  return String(v ?? '')
}
</script>

<template>
  <div v-if="def">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h1 class="text-2xl">{{ $t(def.titleKey) }}</h1>
      <button type="button" class="btn-primary" @click="openNew">
        <Icon name="lucide:plus" class="size-4" />{{ $t('admin.add') }}
      </button>
    </div>

    <div class="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th v-for="f in listFields" :key="f.key" class="p-3 text-start">{{ f.label }}</th>
            <th class="p-3 text-start">{{ $t('admin.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!rows?.length"><td :colspan="listFields.length + 1" class="p-8 text-center text-slate-400">{{ $t('admin.empty') }}</td></tr>
          <tr v-for="r in rows" :key="r.id" class="border-t border-slate-100 hover:bg-slate-50">
            <td v-for="f in listFields" :key="f.key" class="max-w-xs truncate p-3" :dir="f.dir">{{ display(r[f.key]) }}</td>
            <td class="p-3">
              <div class="flex gap-3">
                <button type="button" class="text-brand-700 hover:underline" @click="openEdit(r)">{{ $t('admin.edit') }}</button>
                <button type="button" class="text-red-600 hover:underline" @click="remove(r)">{{ $t('admin.delete') }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit drawer -->
    <div v-if="editing" class="fixed inset-0 z-50 flex justify-end bg-black/40" @click.self="editing = null">
      <form class="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl" @submit.prevent="save">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl">{{ editing.id ? $t('admin.edit') : $t('admin.add') }}</h2>
          <button type="button" :aria-label="$t('admin.cancel')" @click="editing = null"><Icon name="lucide:x" class="size-6" /></button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="f in def.fields" :key="f.key" :class="f.type === 'textarea' || f.type === 'icon' ? 'sm:col-span-2' : ''">
            <label v-if="f.type === 'checkbox'" class="flex items-center gap-2 pt-6 text-sm font-medium">
              <input v-model="editing[f.key]" type="checkbox" class="size-4 accent-brand-600">{{ f.label }}
            </label>
            <template v-else>
              <label class="label" :for="`f-${f.key}`">{{ f.label }}</label>
              <textarea v-if="f.type === 'textarea'" :id="`f-${f.key}`" v-model="editing[f.key] as string" rows="4" class="input" :dir="f.dir" />
              <div v-else-if="f.type === 'icon'" class="flex items-center gap-3">
                <input :id="`f-${f.key}`" v-model="editing[f.key] as string" class="input" dir="ltr" placeholder="lucide:layers">
                <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <Icon v-if="editing[f.key]" :name="String(editing[f.key])" class="size-6 text-brand-600" />
                </span>
              </div>
              <input v-else :id="`f-${f.key}`" v-model="editing[f.key]" :type="f.type === 'number' ? 'number' : 'text'" class="input" :dir="f.dir">
            </template>
          </div>
        </div>
        <p class="mt-2 text-xs text-slate-400">Icons: <a href="https://lucide.dev/icons" target="_blank" rel="noopener" class="underline">lucide.dev/icons</a> → lucide:&lt;name&gt;</p>

        <p v-if="error" role="alert" class="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
        <div class="mt-6 flex gap-3">
          <button type="submit" class="btn-primary" :disabled="saving">{{ $t('admin.save') }}</button>
          <button type="button" class="btn-outline" @click="editing = null">{{ $t('admin.cancel') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
