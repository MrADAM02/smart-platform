<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()

const DURATION = 2000 // ms per counter
const STAGGER = 180 // ms between counters

const root = ref<HTMLElement>()
// Per-counter progress 0 → 1. Starts at 1 so SSR / no-JS shows final values.
const progress = ref<number[]>([])
const started = ref(false)

const stats = computed(() => data.value?.stats ?? [])
const fmt = new Intl.NumberFormat('en-US')
const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x))

function display(i: number, value: number) {
  const p = started.value ? (progress.value[i] ?? 0) : 1
  return fmt.format(Math.round(value * easeOutExpo(p)))
}

function run() {
  const n = stats.value.length
  progress.value = Array.from({ length: n }, () => 0)
  started.value = true
  const start = performance.now()
  const step = (now: number) => {
    let done = true
    for (let i = 0; i < n; i++) {
      const p = Math.min(1, Math.max(0, (now - start - i * STAGGER) / DURATION))
      progress.value[i] = p
      if (p < 1) done = false
    }
    if (!done) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  // Hide final values until the counters actually start
  const io = new IntersectionObserver(([e]) => {
    if (e?.isIntersecting) {
      run()
      io.disconnect()
    }
  }, { threshold: 0.35 })
  io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section ref="root" class="relative isolate overflow-hidden bg-ink-900 py-20 sm:py-24">
    <div class="bg-grid-dark mask-fade absolute inset-0 -z-10" />
    <div class="absolute start-1/4 top-0 -z-10 size-96 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl" />

    <div class="container-x">
      <div class="reveal mx-auto mb-14 max-w-2xl text-center">
        <span class="eyebrow-dark">{{ $t('stats.eyebrow') }}</span>
        <h2 class="text-3xl text-white sm:text-4xl">{{ $t('stats.title') }}</h2>
      </div>

      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <div
          v-for="(s, i) in stats"
          :key="s.id"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-brand-400/40 hover:bg-white/[0.07] sm:p-8"
        >
          <div class="absolute -end-8 -top-8 size-28 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-500/25" />
          <span class="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-900/40">
            <Icon :name="s.icon" class="size-6" />
          </span>
          <p class="mt-6 text-4xl font-bold tabular-nums text-white sm:text-5xl" dir="ltr" :aria-label="`${s.value}${s.suffix}`">
            <span class="text-start">{{ display(i, s.value) }}</span><span class="text-brand-300">{{ s.suffix }}</span>
          </p>
          <p class="mt-2 text-sm text-slate-300 sm:text-base">{{ tr(s, 'label') }}</p>
          <!-- progress bar fills with the counter -->
          <div class="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
              :style="{ width: `${(started ? easeOutExpo(progress[i] ?? 0) : 1) * 100}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
