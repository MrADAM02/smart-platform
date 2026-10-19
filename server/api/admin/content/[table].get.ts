import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const table = getContentTable(getRouterParam(event, 'table'))
  return useDb().select().from(table).orderBy(asc(table.sort))
})
