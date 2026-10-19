<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { data } = await useSite()
const { setting } = useLocalized()

const type = computed(() => {
  const q = route.query.type
  return q === 'quote' || q === 'demo' ? q : 'contact'
})
const title = computed(() => ({ quote: t('form.quoteTitle'), demo: t('form.demoTitle'), contact: t('form.contactTitle') })[type.value])
const s = computed(() => data.value?.settings ?? {})

useSeoMeta({ title, description: () => t('form.contactText') })
</script>

<template>
  <div>
    <UiPageHeader :title="title" :text="$t('form.contactText')" icon="lucide:send" />

    <section class="section">
      <div class="container-x grid gap-10 lg:grid-cols-3">
        <div class="card lg:col-span-2 hover:translate-y-0">
          <UiRequestForm :type="type" />
        </div>

        <aside class="space-y-4">
          <div class="rounded-2xl bg-slate-50 p-6">
            <h2 class="mb-4 text-lg">{{ $t('form.info') }}</h2>
            <ul class="space-y-4 text-sm">
              <li v-if="s.phone" class="flex items-center gap-3"><Icon name="lucide:phone" class="size-5 text-brand-600" /><a :href="telHref(s.phone)" dir="ltr">{{ s.phone }}</a></li>
              <li v-if="s.email" class="flex items-center gap-3"><Icon name="lucide:mail" class="size-5 text-brand-600" /><a :href="`mailto:${s.email}`">{{ s.email }}</a></li>
              <li class="flex items-center gap-3"><Icon name="lucide:map-pin" class="size-5 text-brand-600" />{{ setting(s, 'address') }}</li>
              <li class="flex items-center gap-3"><Icon name="lucide:clock" class="size-5 text-brand-600" />{{ setting(s, 'hours') }}</li>
            </ul>
          </div>
          <div id="map" class="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              :title="$t('form.map')"
              :src="`https://maps.google.com/maps?q=${encodeURIComponent(setting(s, 'address') || 'Riyadh')}&output=embed`"
              class="h-64 w-full"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
          <a v-if="s.mapUrl" :href="s.mapUrl" target="_blank" rel="noopener" class="btn-outline w-full">
            <Icon name="lucide:map" class="size-4" />{{ $t('form.map') }}
          </a>
        </aside>
      </div>
    </section>
  </div>
</template>
