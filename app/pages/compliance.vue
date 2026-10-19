<script setup lang="ts">
const { t, locale } = useI18n()
useSeoMeta({ title: () => t('pages.complianceTitle') })

// Placeholder text — replace with your actual certifications and frameworks.
const content = {
  ar: [
    ['lucide:file-check-2', 'إدارة الوثائق', 'نطبق في مشاريعنا الأدلة والقواعد الوطنية المنظمة لإدارة الوثائق والمحفوظات، ونسلم مع كل مشروع ما يثبت ذلك.'],
    ['lucide:user-lock', 'حماية البيانات الشخصية', 'نصمم الأنظمة والعمليات بحيث تراعي متطلبات حماية البيانات الشخصية من الجمع حتى الإتلاف.'],
    ['lucide:shield-check', 'الأمن السيبراني', 'نلتزم بالضوابط الأساسية للأمن السيبراني في التطوير والاستضافة وإدارة الصلاحيات.'],
  ],
  en: [
    ['lucide:file-check-2', 'Records management', 'Our projects follow the national guidelines governing records and archives, and every delivery includes evidence of this.'],
    ['lucide:user-lock', 'Personal data protection', 'We design systems and processes around personal data protection requirements, from collection to disposal.'],
    ['lucide:shield-check', 'Cybersecurity', 'We follow essential cybersecurity controls across development, hosting and access management.'],
  ],
}
const items = computed(() => content[locale.value as 'ar' | 'en'])
</script>

<template>
  <div>
    <UiPageHeader :title="$t('pages.complianceTitle')" icon="lucide:shield-check" />
    <section class="section">
      <div class="container-x grid gap-6 md:grid-cols-3">
        <div v-for="[icon, title, body] in items" :key="title" class="card">
          <Icon :name="icon" class="size-10 text-brand-600" />
          <h2 class="mt-4 text-xl">{{ title }}</h2>
          <p class="mt-2 leading-7 text-slate-600">{{ body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
