<script setup lang="ts">
definePageMeta({ layout: false })
const { t } = useI18n()
useSeoMeta({ title: () => t('admin.login'), robots: 'noindex' })

const localePath = useLocalePath()
const { fetch: refreshSession } = useUserSession()
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    await refreshSession()
    await navigateTo(localePath('/admin'))
  }
  catch (e) {
    const err = e as { statusCode?: number, statusMessage?: string, data?: { data?: { retryAfter?: number } } }
    if (err.statusCode === 429) {
      const minutes = Math.ceil((err.data?.data?.retryAfter ?? 900) / 60)
      error.value = t('admin.tooMany', { minutes })
    }
    else {
      error.value = err.statusCode === 401 ? t('admin.invalid') : err.statusMessage || 'Error'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-4">
    <form class="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg" @submit.prevent="login">
      <UiBrandLogo />
      <h1 class="mt-6 text-xl">{{ $t('admin.title') }}</h1>
      <label class="label mt-6" for="pw">{{ $t('admin.password') }}</label>
      <input id="pw" v-model="password" type="password" class="input" required autocomplete="current-password" autofocus>
      <p v-if="error" role="alert" class="mt-3 text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary mt-6 w-full" :disabled="loading">{{ $t('admin.login') }}</button>
    </form>
  </div>
</template>
