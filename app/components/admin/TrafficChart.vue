<script setup lang="ts">
// Two-series line chart (visitors + page views share one count axis).
// Colors validated with the dataviz palette checker against white: both pass CVD + 3:1 contrast.
const props = defineProps<{
  series: { day: string, views: number, visitors: number }[]
  labels: { views: string, visitors: string }
}>()

const COLORS = { visitors: '#069179', views: '#c2780b' }
const W = 800
const H = 260
const PAD = { top: 16, right: 16, bottom: 28, left: 40 }
const innerW = W - PAD.left - PAD.right
const innerH = H - PAD.top - PAD.bottom

const max = computed(() => {
  const m = Math.max(1, ...props.series.map(s => s.views))
  // round up to a "nice" number for the axis
  const pow = 10 ** Math.floor(Math.log10(m))
  return Math.ceil(m / pow) * pow
})
const x = (i: number) => PAD.left + (props.series.length <= 1 ? innerW / 2 : (i / (props.series.length - 1)) * innerW)
const y = (v: number) => PAD.top + innerH - (v / max.value) * innerH

const path = (key: 'views' | 'visitors') =>
  props.series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(s[key]).toFixed(1)}`).join('')
const area = computed(() => props.series.length
  ? `${path('visitors')}L${x(props.series.length - 1)},${y(0)}L${x(0)},${y(0)}Z`
  : '')

const ticks = computed(() => [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(max.value * f)))
const xLabels = computed(() => {
  const n = props.series.length
  const step = Math.max(1, Math.ceil(n / 6))
  return props.series.map((s, i) => ({ i, label: s.day.slice(5).replace('-', '/') })).filter(({ i }) => i % step === 0 || i === n - 1)
})

// Hover: crosshair + tooltip on the nearest day
const hover = ref<number | null>(null)
const svg = ref<SVGSVGElement>()
function onMove(e: PointerEvent) {
  if (!svg.value || !props.series.length) return
  const r = svg.value.getBoundingClientRect()
  const px = ((e.clientX - r.left) / r.width) * W
  const i = Math.round(((px - PAD.left) / innerW) * (props.series.length - 1))
  hover.value = Math.min(props.series.length - 1, Math.max(0, i))
}
const tip = computed(() => hover.value == null ? null : props.series[hover.value])
const tipLeft = computed(() => hover.value == null ? 0 : (x(hover.value) / W) * 100)
const fmt = new Intl.NumberFormat('en-US')
</script>

<template>
  <div class="relative" dir="ltr">
    <!-- legend (always shown for 2 series) -->
    <div class="mb-3 flex flex-wrap items-center gap-5 text-sm text-slate-600">
      <span v-for="k in (['visitors', 'views'] as const)" :key="k" class="flex items-center gap-2">
        <span class="h-0.5 w-5 rounded-full" :style="{ background: COLORS[k] }" />{{ labels[k] }}
      </span>
    </div>

    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="w-full touch-none select-none"
      role="img"
      :aria-label="`${labels.visitors} / ${labels.views}`"
      @pointermove="onMove"
      @pointerleave="hover = null"
    >
      <!-- recessive grid + y axis -->
      <g v-for="t in ticks" :key="t">
        <line :x1="PAD.left" :x2="W - PAD.right" :y1="y(t)" :y2="y(t)" stroke="#e2e8f0" stroke-width="1" />
        <text :x="PAD.left - 8" :y="y(t)" text-anchor="end" dominant-baseline="middle" class="fill-slate-400 text-[11px]">{{ fmt.format(t) }}</text>
      </g>
      <text v-for="l in xLabels" :key="l.i" :x="x(l.i)" :y="H - 8" text-anchor="middle" class="fill-slate-400 text-[11px]">{{ l.label }}</text>

      <path :d="area" :fill="COLORS.visitors" opacity="0.08" />
      <path :d="path('views')" fill="none" :stroke="COLORS.views" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <path :d="path('visitors')" fill="none" :stroke="COLORS.visitors" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />

      <!-- crosshair + markers with surface ring -->
      <g v-if="tip && hover != null">
        <line :x1="x(hover)" :x2="x(hover)" :y1="PAD.top" :y2="PAD.top + innerH" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />
        <circle :cx="x(hover)" :cy="y(tip.views)" r="5" :fill="COLORS.views" stroke="#fff" stroke-width="2" />
        <circle :cx="x(hover)" :cy="y(tip.visitors)" r="5" :fill="COLORS.visitors" stroke="#fff" stroke-width="2" />
      </g>
    </svg>

    <div
      v-if="tip"
      class="pointer-events-none absolute top-10 z-10 min-w-36 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
      :style="{ left: `clamp(4.5rem, ${tipLeft}%, calc(100% - 4.5rem))` }"
    >
      <p class="mb-1 font-semibold text-ink-900">{{ tip.day }}</p>
      <p class="flex items-center justify-between gap-4 text-slate-600">
        <span class="flex items-center gap-1.5"><span class="size-2 rounded-full" :style="{ background: COLORS.visitors }" />{{ labels.visitors }}</span>
        <span class="font-semibold tabular-nums text-ink-900">{{ fmt.format(tip.visitors) }}</span>
      </p>
      <p class="flex items-center justify-between gap-4 text-slate-600">
        <span class="flex items-center gap-1.5"><span class="size-2 rounded-full" :style="{ background: COLORS.views }" />{{ labels.views }}</span>
        <span class="font-semibold tabular-nums text-ink-900">{{ fmt.format(tip.views) }}</span>
      </p>
    </div>
  </div>
</template>
