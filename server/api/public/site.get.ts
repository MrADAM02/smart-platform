import { asc, eq } from 'drizzle-orm'

// Everything the layout + home page need, in one round-trip
export default defineEventHandler(async () => {
  const db = useDb()
  const [services, products, faqs, stats, sectors, steps, settingsRows] = await Promise.all([
    db.select().from(tables.services).where(eq(tables.services.published, true)).orderBy(asc(tables.services.sort)),
    db.select().from(tables.products).where(eq(tables.products.published, true)).orderBy(asc(tables.products.sort)),
    db.select().from(tables.faqs).orderBy(asc(tables.faqs.sort)),
    db.select().from(tables.stats).orderBy(asc(tables.stats.sort)),
    db.select().from(tables.sectors).orderBy(asc(tables.sectors.sort)),
    db.select().from(tables.steps).orderBy(asc(tables.steps.sort)),
    db.select().from(tables.settings),
  ])
  const settings = Object.fromEntries(settingsRows.map(r => [r.key, r.value]))
  return { services, products, faqs, stats, sectors, steps, settings }
})
