import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const [row] = await useDb().select().from(tables.products)
    .where(and(eq(tables.products.slug, slug), eq(tables.products.published, true)))
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return row
})
