<script setup lang="ts">
const { data } = useSite()
const { t } = useI18n()
const href = computed(() => whatsappHref(data.value?.settings.whatsapp, t('cta.whatsappMessage')))
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener"
    :aria-label="$t('cta.whatsapp')"
    class="fixed bottom-5 end-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
  >
    <Icon name="lucide:message-circle" class="size-7" />
  </a>
</template>
