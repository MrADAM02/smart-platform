import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const table = getContentTable(getRouterParam(event, 'table'))
  await useDb().delete(table).where(eq(table.id, getIdParam(event)))
  return { ok: true }
})
