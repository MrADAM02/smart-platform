export default defineNuxtRouteMiddleware(async () => {
  // Admin routes are client-rendered (ssr: false) and the session isn't auto-loaded
  // (auth.loadStrategy: 'none'), so fetch it here on first use.
  const { loggedIn, ready, fetch } = useUserSession()
  if (!ready.value) await fetch()
  if (!loggedIn.value) return navigateTo(useLocalePath()('/admin/login'))
})
