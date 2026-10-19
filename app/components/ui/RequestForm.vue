<script setup lang="ts">
type RequestType = 'contact' | 'quote' | 'demo' | 'product'

const props = defineProps<{ type?: RequestType, product?: string, showProduct?: boolean }>()

const { data } = useSite()
const { tr, locale } = useLocalized()

const form = reactive({
  type: props.type ?? 'contact',
  product: props.product ?? '',
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  website: '', // honeypot
})
watch(() => props.type, v => v && (form.type = v))
watch(() => props.product, v => v && (form.product = v))

const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  state.value = 'sending'
  try {
    await $fetch('/api/requests', {
      method: 'POST',
      body: { ...form, product: form.product || null, locale: locale.value },
    })
    state.value = 'success'
    Object.assign(form, { name: '', company: '', email: '', phone: '', message: '' })
  }
  catch {
    state.value = 'error'
  }
}
</script>

<template>
  <form class="grid gap-5 sm:grid-cols-2" @submit.prevent="submit">
    <div v-if="!showProduct" class="sm:col-span-2">
      <label class="label" for="rf-type">{{ $t('form.type') }}</label>
      <select id="rf-type" v-model="form.type" class="input">
        <option v-for="tp in ['contact', 'quote', 'demo']" :key="tp" :value="tp">{{ $t(`form.types.${tp}`) }}</option>
      </select>
    </div>
    <div v-else class="sm:col-span-2">
      <label class="label" for="rf-product">{{ $t('form.product') }}</label>
      <select id="rf-product" v-model="form.product" class="input" required>
        <option v-for="p in data?.products" :key="p.slug" :value="p.slug">{{ tr(p, 'name') }}</option>
      </select>
    </div>

    <div>
      <label class="label" for="rf-name">{{ $t('form.name') }} *</label>
      <input id="rf-name" v-model="form.name" class="input" required minlength="2" maxlength="120" autocomplete="name">
    </div>
    <div>
      <label class="label" for="rf-company">{{ $t('form.company') }}</label>
      <input id="rf-company" v-model="form.company" class="input" maxlength="160" autocomplete="organization">
    </div>
    <div>
      <label class="label" for="rf-email">{{ $t('form.email') }} *</label>
      <input id="rf-email" v-model="form.email" type="email" class="input" required dir="ltr" autocomplete="email">
    </div>
    <div>
      <label class="label" for="rf-phone">{{ $t('form.phone') }}</label>
      <input id="rf-phone" v-model="form.phone" type="tel" class="input" dir="ltr" maxlength="30" autocomplete="tel">
    </div>
    <div class="sm:col-span-2">
      <label class="label" for="rf-message">{{ $t('form.message') }}</label>
      <textarea id="rf-message" v-model="form.message" rows="5" class="input" maxlength="4000" />
    </div>

    <!-- Honeypot: hidden from people, bots tend to fill it -->
    <div class="hidden" aria-hidden="true">
      <input v-model="form.website" tabindex="-1" autocomplete="off" name="website">
    </div>

    <div class="sm:col-span-2">
      <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="state === 'sending'">
        <Icon v-if="state === 'sending'" name="lucide:loader-circle" class="size-4 animate-spin" />
        {{ state === 'sending' ? $t('form.sending') : $t('form.submit') }}
      </button>
      <p v-if="state === 'success'" role="status" class="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 p-4 text-brand-800">
        <Icon name="lucide:circle-check" class="size-5" />{{ $t('form.success') }}
      </p>
      <p v-if="state === 'error'" role="alert" class="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700">
        <Icon name="lucide:circle-alert" class="size-5" />{{ $t('form.error') }}
      </p>
    </div>
  </form>
</template>
