import { purgeCache } from '@netlify/functions'

/**
 * Purges every CDN-cached public page/API response (tagged "site" in nuxt.config routeRules).
 * Call after any admin change that affects public content. No-op in local dev.
 */
export async function purgeSiteCache() {
  if (import.meta.dev) return
  try {
    await purgeCache({ tags: ['site'] })
  }
  catch (e) {
    // Never fail the admin save because of the cache; content refreshes on next deploy/expiry
    console.error('[cache] purge failed:', (e as Error).message)
  }
}
