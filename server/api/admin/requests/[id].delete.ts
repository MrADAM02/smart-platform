import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await useDb().delete(tables.requests).where(eq(tables.requests.id, getIdParam(event)))
  return { ok: true }
})
