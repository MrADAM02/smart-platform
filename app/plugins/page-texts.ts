type Overrides = Record<'ar' | 'en', Record<string, string>>

/** Writes value at a dotted path, keeping arrays as arrays (e.g. "hero.words.1") */
function setPath(target: Record<string, unknown>, path: string, value: string) {
  const parts = path.split('.')
  let node: Record<string, unknown> = target
  for (const part of parts.slice(0, -1)) {
    if (node[part] == null || typeof node[part] !== 'object') return // unknown key: ignore
    node = node[part] as Record<string, unknown>
  }
  const last = parts.at(-1)!
  if (last in node && typeof node[last] === 'string') node[last] = value
}

/**
 * Applies admin-edited UI text (page_texts table) on top of i18n/locales/*.json.
 * Runs on server and client, and re-applies whenever a locale's messages are loaded.
 */
export default defineNuxtPlugin({
  name: 'page-texts',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const { data } = await useFetch<Overrides>('/api/public/texts', { key: 'page-texts' })
    const i18n = nuxtApp.$i18n as unknown as {
      locale: { value: string }
      getLocaleMessage: (l: string) => Record<string, unknown>
      setLocaleMessage: (l: string, m: Record<string, unknown>) => void
    }

    const apply = (locale: string) => {
      const overrides = data.value?.[locale as 'ar' | 'en']
      if (!overrides || !Object.keys(overrides).length) return
      const messages = structuredClone(i18n.getLocaleMessage(locale))
      if (!messages || !Object.keys(messages).length) return
      for (const [key, value] of Object.entries(overrides)) setPath(messages, key, value)
      i18n.setLocaleMessage(locale, messages)
    }

    apply(i18n.locale.value)
    nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => apply(newLocale))
    // Re-apply after admin edits (refreshNuxtData('page-texts'))
    watch(data, () => apply(i18n.locale.value))
  },
})
