export default defineEventHandler(async () => {
  const rows = await useDb().select().from(tables.settings)
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
})
