import { desc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { status } = getQuery(event)
  const db = useDb()
  const query = db.select().from(tables.requests).orderBy(desc(tables.requests.id)).$dynamic()
  if (status === 'new' || status === 'in_progress' || status === 'done') {
    query.where(eq(tables.requests.status, status))
  }
  return query
})
