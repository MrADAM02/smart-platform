import { eq } from 'drizzle-orm'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const id = getIdParam(event)
  const { status } = await readValidatedBody(event, z.object({ status: z.enum(['new', 'in_progress', 'done']) }).parse)
  await useDb().update(tables.requests).set({ status }).where(eq(tables.requests.id, id))
  return { ok: true }
})
