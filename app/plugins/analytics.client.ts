/**
 * Sends one cookie-less page view per navigation to /api/track (see server/api/track.post.ts).
 * Skips admin pages and visitors with Do Not Track enabled.
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (navigator.doNotTrack === '1') return
  const router = useRouter()
  let lastPath = ''
  let referrer: string | null = document.referrer || null

  const send = (path: string) => {
    if (path === lastPath || /^\/(en\/)?admin(\/|$)/.test(path)) return
    lastPath = path
    const body = JSON.stringify({ path, referrer })
    referrer = null // only the landing page has an external referrer
    const blob = new Blob([body], { type: 'application/json' })
    if (!navigator.sendBeacon?.('/api/track', blob)) {
      fetch('/api/track', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
    }
  }

  nuxtApp.hook('app:mounted', () => send(router.currentRoute.value.path))
  router.afterEach((to, from) => {
    if (to.path !== from.path) send(to.path)
  })
})
