export default defineEventHandler(async (event) => {
  const table = getContentTable(getRouterParam(event, 'table'))
  const data = pickColumns(table, await readBody(event))
  try {
    const [row] = await useDb().insert(table).values(data as never).returning()
    await purgeSiteCache()
    return row
  }
  catch (e) {
    throw createError({ statusCode: 400, statusMessage: (e as Error).message })
  }
})
