import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/icon', '@nuxt/fonts', 'nuxt-auth-utils', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  site: {
    url: 'https://smart-platform.netlify.app',
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
    baseUrl: 'https://smart-platform.netlify.app',
    locales: [
      { code: 'ar', language: 'ar-SA', dir: 'rtl', name: 'العربية', file: 'ar.json' },
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
  },

  icon: {
    serverBundle: { collections: ['lucide'] },
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
