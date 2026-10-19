import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const bodySchema = z.object({
  locale: z.enum(['ar', 'en']),
  // dotted path like "hero.text" or "hero.words.0"
  key: z.string().regex(/^[a-zA-Z]+(\.[a-zA-Z0-9]+)+$/).max(120),
  // empty string = remove override and fall back to the default text
  value: z.string().max(4000),
})

export default defineEventHandler(async (event) => {
  const { locale, key, value } = await readValidatedBody(event, bodySchema.parse)
  const t = tables.pageTexts
  const db = useDb()

  if (!value.trim()) {
    await db.delete(t).where(and(eq(t.locale, locale), eq(t.key, key)))
  }
  else {
    await db.insert(t).values({ locale, key, value })
      .onConflictDoUpdate({ target: [t.locale, t.key], set: { value } })
  }
  await purgeSiteCache()
  return { ok: true }
})
