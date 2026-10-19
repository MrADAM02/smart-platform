<script setup lang="ts">
// A product-style dashboard mockup built in HTML/CSS (no external images)
const { locale } = useI18n()
const ar = computed(() => locale.value === 'ar')
const bars = [42, 64, 52, 78, 58, 88, 70, 94, 66, 82, 74, 96]
const docs = computed(() => ar.value
  ? [['عقد توريد 2026', 'معتمد'], ['محضر اجتماع اللجنة', 'قيد المراجعة'], ['سجل الأصول - المبنى ب', 'معتمد']]
  : [['Supply contract 2026', 'Approved'], ['Committee minutes', 'In review'], ['Asset register — Bldg B', 'Approved']])
const nav = ['lucide:layout-dashboard', 'lucide:folder-open', 'lucide:barcode', 'lucide:building-2', 'lucide:settings']
</script>

<template>
  <div class="relative" aria-hidden="true">
    <!-- glow -->
    <div class="absolute -inset-8 rounded-[3rem] bg-brand-500/20 blur-3xl" />

    <!-- window -->
    <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/80 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur">
      <div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span class="size-2.5 rounded-full bg-red-400/80" />
        <span class="size-2.5 rounded-full bg-amber-400/80" />
        <span class="size-2.5 rounded-full bg-emerald-400/80" />
        <span class="ms-3 h-5 flex-1 rounded-md bg-white/5" />
      </div>

      <div class="flex">
        <div class="hidden flex-col gap-3 border-e border-white/10 p-3 sm:flex">
          <span v-for="(n, i) in nav" :key="n" class="flex size-9 items-center justify-center rounded-lg" :class="i === 0 ? 'bg-brand-500 text-white' : 'text-slate-400'">
            <Icon :name="n" class="size-4" />
          </span>
        </div>

        <div class="flex-1 space-y-3 p-4">
          <div class="grid grid-cols-3 gap-3">
            <div v-for="(k, i) in [['12.4K', 'lucide:files'], ['1,208', 'lucide:barcode'], ['98%', 'lucide:gauge']]" :key="i" class="rounded-xl border border-white/5 bg-white/5 p-3">
              <Icon :name="k[1]!" class="size-4 text-brand-300" />
              <p class="mt-2 text-lg font-bold text-white" dir="ltr">{{ k[0] }}</p>
              <span class="mt-1 block h-1.5 w-12 rounded-full bg-white/10" />
            </div>
          </div>

          <div class="rounded-xl border border-white/5 bg-white/5 p-3">
            <div class="mb-3 flex items-center justify-between">
              <span class="h-2 w-20 rounded-full bg-white/20" />
              <span class="h-2 w-10 rounded-full bg-brand-400/50" />
            </div>
            <div class="flex h-24 items-end gap-1.5" dir="ltr">
              <span
                v-for="(b, i) in bars"
                :key="i"
                class="flex-1 rounded-t-sm bg-gradient-to-t from-brand-600 to-brand-300"
                :style="{ height: `${b}%`, opacity: 0.45 + i / 22 }"
              />
            </div>
          </div>

          <div class="space-y-2">
            <div v-for="d in docs" :key="d[0]" class="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
              <Icon name="lucide:file-text" class="size-4 shrink-0 text-brand-300" />
              <span class="flex-1 truncate text-xs text-slate-200">{{ d[0] }}</span>
              <span class="rounded-full px-2 py-0.5 text-[10px] font-medium" :class="d[1] === 'معتمد' || d[1] === 'Approved' ? 'bg-brand-500/20 text-brand-300' : 'bg-accent-500/20 text-accent-300'">{{ d[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- floating cards -->
    <div class="animate-float absolute -bottom-6 -start-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
      <div class="flex items-center gap-3">
        <span class="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon name="lucide:scan-text" class="size-5" /></span>
        <div>
          <p class="text-sm font-bold text-ink-900">OCR</p>
          <p class="text-xs text-slate-500">{{ ar ? 'تعرّف ذكي على النص العربي' : 'Smart Arabic recognition' }}</p>
        </div>
      </div>
    </div>
    <div class="animate-float-slow absolute -end-4 -top-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
      <div class="flex items-center gap-3">
        <span class="relative flex size-3">
          <span class="animate-pulse-ring absolute inline-flex size-full rounded-full bg-brand-500" />
          <span class="relative inline-flex size-3 rounded-full bg-brand-500" />
        </span>
        <p class="text-xs font-semibold text-ink-900">{{ ar ? 'مزامنة آمنة مستمرة' : 'Secure live sync' }}</p>
      </div>
    </div>
  </div>
</template>
