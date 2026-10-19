<script setup lang="ts">
const localePath = useLocalePath()
const { clear } = useUserSession()
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const nav = [
  { to: '/admin', key: 'admin.dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/admin/requests', key: 'admin.requests', icon: 'lucide:inbox' },
  { to: '/admin/content/services', key: 'admin.services', icon: 'lucide:layers' },
  { to: '/admin/content/products', key: 'admin.products', icon: 'lucide:boxes' },
  { to: '/admin/content/faqs', key: 'admin.faqs', icon: 'lucide:circle-help' },
  { to: '/admin/content/stats', key: 'admin.stats', icon: 'lucide:chart-column' },
  { to: '/admin/content/sectors', key: 'admin.sectors', icon: 'lucide:building' },
  { to: '/admin/content/steps', key: 'admin.steps', icon: 'lucide:list-ordered' },
  { to: '/admin/settings', key: 'admin.settings', icon: 'lucide:settings' },
]

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await clear()
  await navigateTo(localePath('/admin/login'))
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 lg:flex">
    <aside class="bg-ink-900 text-slate-300 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
      <div class="flex items-center justify-between p-5">
        <NuxtLink :to="localePath('/admin')"><UiBrandLogo light /></NuxtLink>
        <button type="button" class="lg:hidden" :aria-expanded="open" @click="open = !open">
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" class="size-6" />
        </button>
      </div>
      <nav class="space-y-1 px-3 pb-5 lg:block" :class="open ? 'block' : 'hidden'">
        <NuxtLink
          v-for="n in nav"
          :key="n.to"
          :to="localePath(n.to)"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10 hover:text-white"
          exact-active-class="bg-white/10 text-white"
        >
          <Icon :name="n.icon" class="size-4" />{{ $t(n.key) }}
        </NuxtLink>
        <hr class="my-3 border-white/10">
        <NuxtLink :to="localePath('/')" target="_blank" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
          <Icon name="lucide:external-link" class="size-4" />{{ $t('admin.viewSite') }}
        </NuxtLink>
        <LayoutLangSwitch class="px-3 py-2 text-sm" />
        <button type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10" @click="logout">
          <Icon name="lucide:log-out" class="size-4" />{{ $t('admin.logout') }}
        </button>
      </nav>
    </aside>
    <main class="flex-1 p-4 sm:p-8">
      <slot />
    </main>
  </div>
</template>
