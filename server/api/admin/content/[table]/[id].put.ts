import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const table = getContentTable(getRouterParam(event, 'table'))
  const id = getIdParam(event)
  const data = pickColumns(table, await readBody(event))
  let row
  try {
    [row] = await useDb().update(table).set(data as never).where(eq(table.id, id)).returning()
  }
  catch (e) {
    throw createError({ statusCode: 400, statusMessage: (e as Error).message })
  }
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  await purgeSiteCache()
  return row
})
