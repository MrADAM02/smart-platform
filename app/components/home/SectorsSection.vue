<script setup lang="ts">
const { data } = useSite()
const { tr } = useLocalized()
</script>

<template>
  <section class="section relative isolate overflow-hidden bg-ink-900">
    <div class="bg-grid-dark mask-fade absolute inset-0 -z-10" />
    <div class="absolute -bottom-32 start-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
    <div class="container-x">
      <UiSectionTitle :eyebrow="$t('sectors.eyebrow')" :title="$t('sectors.title')" light />
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="(s, i) in data?.sectors"
          :key="s.id"
          class="reveal group rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.08]"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <span class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 text-brand-300 transition group-hover:bg-brand-500 group-hover:text-white">
            <Icon :name="s.icon" class="size-7" />
          </span>
          <p class="mt-4 text-sm font-semibold text-white">{{ tr(s, 'title') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
