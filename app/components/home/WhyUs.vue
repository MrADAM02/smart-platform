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
  <section class="section">
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('why.eyebrow')" :title="$t('why.title')" />
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="item in items" :key="item.title" class="card reveal text-center">
          <div class="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Icon :name="item.icon" class="size-7" />
          </div>
          <h3 class="text-lg">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-7 text-slate-600">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
