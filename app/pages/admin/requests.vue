<script setup lang="ts">
import type { RequestRow } from '~~/server/db/schema'

definePageMeta({ layout: 'admin', middleware: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.requests'), robots: 'noindex' })

const route = useRoute()
const router = useRouter()
const status = computed({
  get: () => String(route.query.status ?? ''),
  set: v => router.replace({ query: v ? { status: v } : {} }),
})

const { data: rows, refresh } = await useFetch<RequestRow[]>('/api/admin/requests', { query: { status } })
const expanded = ref<number | null>(null)
const statuses = ['new', 'in_progress', 'done'] as const

async function setStatus(row: RequestRow, value: RequestRow['status']) {
  await $fetch(`/api/admin/requests/${row.id}`, { method: 'PATCH', body: { status: value } })
  row.status = value
}

async function remove(row: RequestRow) {
  if (!confirm(t('admin.confirmDelete'))) return
  await $fetch(`/api/admin/requests/${row.id}`, { method: 'DELETE' })
  await refresh()
}

const badge: Record<RequestRow['status'], string> = {
  new: 'bg-accent-500/15 text-accent-600',
  in_progress: 'bg-brand-100 text-brand-700',
  done: 'bg-slate-200 text-slate-600',
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-2xl">{{ $t('admin.requests') }}</h1>
      <div class="flex gap-1 rounded-xl bg-white p-1 shadow-sm">
        <button
          v-for="s in ['', ...statuses]"
          :key="s"
          type="button"
          class="rounded-lg px-3 py-1.5 text-sm"
          :class="status === s ? 'bg-brand-600 text-white' : 'hover:bg-slate-100'"
          @click="status = s"
        >
          {{ s ? $t(`admin.status.${s}`) : $t('admin.all') }}
        </button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-start text-xs text-slate-500">
          <tr>
            <th class="p-3 text-start">#</th>
            <th class="p-3 text-start">{{ $t('form.type') }}</th>
            <th class="p-3 text-start">{{ $t('form.name') }}</th>
            <th class="p-3 text-start">{{ $t('form.email') }}</th>
            <th class="p-3 text-start">{{ $t('admin.date') }}</th>
            <th class="p-3 text-start">{{ $t('admin.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!rows?.length"><td colspan="6" class="p-8 text-center text-slate-400">{{ $t('admin.empty') }}</td></tr>
          <template v-for="r in rows" :key="r.id">
            <tr class="cursor-pointer border-t border-slate-100 hover:bg-slate-50" @click="expanded = expanded === r.id ? null : r.id">
              <td class="p-3 text-slate-400">{{ r.id }}</td>
              <td class="p-3">
                {{ $t(`form.types.${r.type}`) }}
                <span v-if="r.product" class="text-xs text-slate-400">({{ r.product }})</span>
              </td>
              <td class="p-3 font-medium text-ink-900">{{ r.name }}<span v-if="r.company" class="block text-xs font-normal text-slate-400">{{ r.company }}</span></td>
              <td class="p-3" dir="ltr">{{ r.email }}</td>
              <td class="p-3 whitespace-nowrap text-slate-500" dir="ltr">{{ r.createdAt }}</td>
              <td class="p-3" @click.stop>
                <div class="flex items-center gap-2">
                  <select :value="r.status" class="rounded-lg border-0 px-2 py-1 text-xs font-medium" :class="badge[r.status]" @change="setStatus(r, ($event.target as HTMLSelectElement).value as RequestRow['status'])">
                    <option v-for="s in statuses" :key="s" :value="s">{{ $t(`admin.status.${s}`) }}</option>
                  </select>
                  <button type="button" class="text-slate-400 hover:text-red-600" :aria-label="$t('admin.delete')" @click="remove(r)">
                    <Icon name="lucide:trash-2" class="size-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="expanded === r.id" class="bg-slate-50">
              <td colspan="6" class="p-4">
                <p v-if="r.phone" class="mb-2"><strong>{{ $t('form.phone') }}:</strong> <span dir="ltr">{{ r.phone }}</span></p>
                <p class="whitespace-pre-line text-slate-700">{{ r.message || '—' }}</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
