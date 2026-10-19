/**
 * Reads a bilingual DB field: tr(row, 'title') -> row.titleAr | row.titleEn
 * Falls back to the other language if the current one is empty.
 */
export function useLocalized() {
  const { locale } = useI18n()
  const suffix = computed(() => (locale.value === 'en' ? 'En' : 'Ar'))

  function tr<T extends object>(row: T | null | undefined, field: string): string {
    if (!row) return ''
    const r = row as Record<string, unknown>
    const primary = r[field + suffix.value]
    const fallback = r[field + (suffix.value === 'En' ? 'Ar' : 'En')]
    return String(primary || fallback || '')
  }

  /** settings use keys like addressAr / addressEn */
  function setting(settings: Record<string, string> | undefined, key: string) {
    if (!settings) return ''
    return settings[key + suffix.value] || settings[key] || ''
  }

  function lines(row: object | null | undefined, field: string) {
    return tr(row, field).split('\n').map(s => s.trim()).filter(Boolean)
  }

  return { tr, setting, lines, locale }
}
