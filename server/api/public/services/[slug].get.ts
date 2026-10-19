import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const [row] = await useDb().select().from(tables.services)
    .where(and(eq(tables.services.slug, slug), eq(tables.services.published, true)))
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Service not found' })
  return row
})
