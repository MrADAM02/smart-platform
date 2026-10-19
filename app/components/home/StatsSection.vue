<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()

const root = ref<HTMLElement>()
const progress = ref(0) // 0 → 1 once the section scrolls into view

onMounted(() => {
  const animate = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.value = 1
      return
    }
    const start = performance.now()
    const step = (now: number) => {
      progress.value = Math.min(1, (now - start) / 1600)
      if (progress.value < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  const io = new IntersectionObserver(([e]) => {
    if (e?.isIntersecting) {
      animate()
      io.disconnect()
    }
  }, { threshold: 0.3 })
  if (root.value) io.observe(root.value)
  onBeforeUnmount(() => io.disconnect())
})

const eased = computed(() => 1 - (1 - progress.value) ** 3)
</script>

<template>
  <section ref="root" class="bg-brand-700 py-16">
    <div class="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
      <div v-for="s in data?.stats" :key="s.id">
        <p class="text-4xl font-bold text-white sm:text-5xl" dir="ltr">
          <!-- SSR renders the final value so the number is never missing without JS -->
          {{ progress ? Math.round(s.value * eased) : s.value }}{{ s.suffix }}
        </p>
        <p class="mt-2 text-brand-100">{{ tr(s, 'label') }}</p>
      </div>
    </div>
  </section>
</template>
