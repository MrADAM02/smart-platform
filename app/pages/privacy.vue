<script setup lang="ts">
const { t, locale } = useI18n()
useSeoMeta({ title: () => t('pages.privacyTitle') })

// Placeholder policy text — have it reviewed by your legal advisor before going live.
const content = {
  ar: [
    ['البيانات التي نجمعها', 'نجمع البيانات التي تقدمها طوعاً عبر نماذج التواصل، مثل الاسم والجهة والبريد الإلكتروني ورقم الجوال وتفاصيل الطلب.'],
    ['كيف نستخدمها', 'نستخدم هذه البيانات للرد على طلباتك وإعداد العروض وتحسين خدماتنا فقط، ولا نبيعها لأي طرف ثالث.'],
    ['حماية البيانات', 'نحفظ البيانات في بيئات مؤمنة ونقيد الوصول إليها على الموظفين المخولين، وفق نظام حماية البيانات الشخصية المعمول به.'],
    ['حقوقك', 'يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها بالتواصل معنا عبر البريد الإلكتروني الموضح في الموقع.'],
  ],
  en: [
    ['Data we collect', 'We collect the data you voluntarily provide through our contact forms, such as your name, organization, email, phone number and request details.'],
    ['How we use it', 'We use this data only to respond to your requests, prepare proposals and improve our services. We never sell it to third parties.'],
    ['Data protection', 'Data is stored in secured environments with access limited to authorized staff, in line with the applicable personal data protection law.'],
    ['Your rights', 'You may request access to, correction of, or deletion of your data by contacting us at the email address shown on this site.'],
  ],
}
const sections = computed(() => content[locale.value as 'ar' | 'en'])
</script>

<template>
  <div>
    <UiPageHeader :title="$t('pages.privacyTitle')" icon="lucide:lock" />
    <section class="section">
      <div class="container-x max-w-3xl space-y-8">
        <div v-for="[title, body] in sections" :key="title">
          <h2 class="text-xl">{{ title }}</h2>
          <p class="mt-2 leading-8 text-slate-600">{{ body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
