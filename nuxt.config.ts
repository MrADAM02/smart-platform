import tailwindcss from '@tailwindcss/vite'

const noStore = () => ({
  'Cache-Control': 'no-store',
  'Netlify-CDN-Cache-Control': 'no-store',
})

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/icon', '@nuxt/fonts', 'nuxt-auth-utils', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  site: {
    url: 'https://smartplat.netlify.app',
    name: 'المنصة الذكية - SMART PLATFORM',
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  fonts: {
    families: [
      { name: 'IBM Plex Sans Arabic', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  i18n: {
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    baseUrl: 'https://smartplat.netlify.app',
    locales: [
      { code: 'ar', language: 'ar-SA', dir: 'rtl', name: 'العربية', file: 'ar.json' },
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
  },

  icon: {
    serverBundle: { collections: ['lucide'] },
  },

  // Session is only loaded inside /admin (see app/middleware/admin.ts),
  // so it never ends up in CDN-cached public HTML.
  auth: {
    loadStrategy: 'none',
  },

  routeRules: {
    // Public pages + public API: cached on Netlify's CDN, purged on every admin edit
    // (server/utils/cache.ts) and automatically on every deploy.
    '/**': {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=604800, stale-while-revalidate=86400',
        'Netlify-Cache-Tag': 'site',
      },
    },
    // Never cached
    '/admin/**': { ssr: false, headers: noStore() },
    '/en/admin/**': { ssr: false, headers: noStore() },
    '/api/admin/**': { headers: noStore() },
    '/api/requests': { headers: noStore() },
    '/api/_auth/**': { headers: noStore() },
  },

  sitemap: {
    exclude: ['/admin/**', '/en/admin/**'],
  },

  runtimeConfig: {
    // Overridden by NUXT_TURSO_DATABASE_URL / NUXT_TURSO_AUTH_TOKEN, or TURSO_* (see server/db/index.ts)
    tursoDatabaseUrl: '',
    tursoAuthToken: '',
    adminPasswordHash: '',
  },

  nitro: {
    preset: 'netlify',
  },
})
