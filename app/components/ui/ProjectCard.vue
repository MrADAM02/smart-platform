<script setup lang="ts">
import type { Project } from '~~/server/db/schema'

defineProps<{ project: Project }>()
const { tr } = useLocalized()
</script>

<template>
  <article class="card group flex flex-col">
    <div class="flex items-start justify-between gap-4">
      <span class="flex size-12 items-center justify-center rounded-2xl bg-ink-900 text-brand-300 transition group-hover:bg-brand-600 group-hover:text-white">
        <Icon :name="project.icon" class="size-6" />
      </span>
      <span v-if="project.year" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600" dir="ltr">{{ project.year }}</span>
    </div>
    <h3 class="mt-5 text-lg leading-snug">{{ tr(project, 'title') }}</h3>
    <p class="mt-3 flex-1 leading-7 text-slate-600">{{ tr(project, 'summary') }}</p>
    <dl class="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-slate-200 pt-4 text-sm">
      <div v-if="tr(project, 'client')">
        <dt class="text-xs text-slate-400">{{ $t('projects.client') }}</dt>
        <dd class="mt-0.5 font-medium text-ink-800">{{ tr(project, 'client') }}</dd>
      </div>
      <div v-if="tr(project, 'sector')">
        <dt class="text-xs text-slate-400">{{ $t('projects.sector') }}</dt>
        <dd class="mt-0.5 font-medium text-ink-800">{{ tr(project, 'sector') }}</dd>
      </div>
    </dl>
  </article>
</template>
