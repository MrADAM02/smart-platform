import { and, count, countDistinct, desc, gte, isNotNull, lte, sql } from 'drizzle-orm'
import { z } from 'zod'

const querySchema = z.object({ days: z.coerce.number().int().min(1).max(365).default(30) })

const isoDay = (d: Date) => d.toISOString().slice(0, 10)

export default defineEventHandler(async (event) => {
  const { days } = await getValidatedQuery(event, querySchema.parse)
  const v = tables.pageViews
  const db = useDb()

  const today = new Date()
  const from = isoDay(new Date(today.getTime() - (days - 1) * 864e5))
  const prevFrom = isoDay(new Date(today.getTime() - (2 * days - 1) * 864e5))
  const prevTo = isoDay(new Date(today.getTime() - days * 864e5))
  const inRange = gte(v.day, from)

  // Unique visitors = distinct (day, visitor) pairs, since the hash rotates daily
  const visitorsExpr = sql<number>`count(distinct ${v.day} || ${v.visitor})`

  const top = (col: typeof v.path | typeof v.referrer | typeof v.country, limit = 10) =>
    db.select({ key: col, views: count(), visitors: visitorsExpr })
      .from(v).where(and(inRange, isNotNull(col))).groupBy(col).orderBy(desc(count())).limit(limit)

  const [[totals], [previous], daily, pages, referrers, countries, devices, locales] = await Promise.all([
    db.select({ views: count(), visitors: visitorsExpr }).from(v).where(inRange),
    db.select({ views: count(), visitors: visitorsExpr }).from(v).where(and(gte(v.day, prevFrom), lte(v.day, prevTo))),
    db.select({ day: v.day, views: count(), visitors: countDistinct(v.visitor) }).from(v).where(inRange).groupBy(v.day),
    top(v.path),
    top(v.referrer),
    top(v.country),
    db.select({ key: v.device, views: count() }).from(v).where(inRange).groupBy(v.device),
    db.select({ key: v.locale, views: count() }).from(v).where(inRange).groupBy(v.locale),
  ])

  // Fill in days with no traffic so the chart has a continuous axis
  const byDay = new Map(daily.map(d => [d.day, d]))
  const series = Array.from({ length: days }, (_, i) => {
    const day = isoDay(new Date(today.getTime() - (days - 1 - i) * 864e5))
    return { day, views: byDay.get(day)?.views ?? 0, visitors: byDay.get(day)?.visitors ?? 0 }
  })

  return {
    days,
    totals: { views: totals?.views ?? 0, visitors: totals?.visitors ?? 0 },
    previous: { views: previous?.views ?? 0, visitors: previous?.visitors ?? 0 },
    series,
    pages,
    referrers,
    countries,
    devices,
    locales,
  }
})
