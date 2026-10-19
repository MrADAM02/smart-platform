<script setup lang="ts">
const { tm, rt } = useI18n()
const icons = ['lucide:file-check-2', 'lucide:cpu', 'lucide:users']
const items = computed(() =>
  (tm('why.items') as { title: unknown, text: unknown }[]).map((i, n) => ({
    title: rt(i.title as never),
    text: rt(i.text as never),
    icon: icons[n % icons.length]!,
  })),
)
</script>

<template>
  <section class="section bg-slate-50/60">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('why.eyebrow')" :title="$t('why.title')" />
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="card reveal group relative overflow-hidden p-8"
          :style="{ transitionDelay: `${i * 90}ms` }"
        >
          <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-400 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
          <span class="flex size-14 items-center justify-center rounded-2xl bg-ink-900 text-brand-300 shadow-lg shadow-ink-900/20 transition group-hover:bg-brand-600 group-hover:text-white">
            <Icon :name="item.icon" class="size-7" />
          </span>
          <h3 class="mt-6 text-xl">{{ item.title }}</h3>
          <p class="mt-3 leading-7 text-slate-600">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
