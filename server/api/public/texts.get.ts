// UI text overrides edited in /admin/texts: { ar: { "hero.text": "..." }, en: { ... } }
export default defineEventHandler(async () => {
  const rows = await useDb().select().from(tables.pageTexts)
  const out: Record<'ar' | 'en', Record<string, string>> = { ar: {}, en: {} }
  for (const r of rows) out[r.locale][r.key] = r.value
  return out
})
