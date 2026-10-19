import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.record(z.string().max(60), z.string().max(2000)).parse)
  const db = useDb()
  for (const [key, value] of Object.entries(body)) {
    await db.insert(tables.settings).values({ key, value })
      .onConflictDoUpdate({ target: tables.settings.key, set: { value } })
  }
  await purgeSiteCache()
  return { ok: true }
})
