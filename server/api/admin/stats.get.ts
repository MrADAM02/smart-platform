import { count } from 'drizzle-orm'

// Dashboard counters: requests grouped by status
export default defineEventHandler(async () => {
  const rows = await useDb()
    .select({ status: tables.requests.status, total: count() })
    .from(tables.requests)
    .groupBy(tables.requests.status)
  const byStatus = { new: 0, in_progress: 0, done: 0 }
  for (const r of rows) byStatus[r.status] = r.total
  return { ...byStatus, total: byStatus.new + byStatus.in_progress + byStatus.done }
})
