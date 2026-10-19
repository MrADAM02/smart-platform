import type { H3Event } from 'h3'
import { eq, lt, sql } from 'drizzle-orm'

interface RateLimitOptions {
  /** Bucket name, e.g. "login" */
  name: string
  /** Max requests per window */
  limit: number
  /** Window length in seconds */
  windowSec: number
}

function clientIp(event: H3Event) {
  return getRequestHeader(event, 'x-nf-client-connection-ip') // Netlify
    || getRequestIP(event, { xForwardedFor: true })
    || 'unknown'
}

/**
 * Fixed-window rate limit stored in the database, so it works across serverless instances.
 * Throws 429 with Retry-After when exceeded.
 */
export async function rateLimit(event: H3Event, { name, limit, windowSec }: RateLimitOptions) {
  const db = useDb()
  const now = Math.floor(Date.now() / 1000)
  const key = `${name}:${clientIp(event)}`
  const t = tables.rateLimits

  // Atomic upsert: start a new window if the old one expired, otherwise increment
  const [row] = await db.insert(t)
    .values({ key, count: 1, resetAt: now + windowSec })
    .onConflictDoUpdate({
      target: t.key,
      set: {
        count: sql`CASE WHEN ${t.resetAt} <= ${now} THEN 1 ELSE ${t.count} + 1 END`,
        resetAt: sql`CASE WHEN ${t.resetAt} <= ${now} THEN ${now + windowSec} ELSE ${t.resetAt} END`,
      },
    })
    .returning()

  // Occasionally purge expired rows to keep the table small
  if (Math.random() < 0.05) await db.delete(t).where(lt(t.resetAt, now))

  if (row && row.count > limit) {
    const retryAfter = Math.max(1, row.resetAt - now)
    setResponseHeader(event, 'Retry-After', retryAfter)
    throw createError({ statusCode: 429, statusMessage: 'Too many requests', data: { retryAfter } })
  }
}

/** Clears a bucket for the current client (e.g. after a successful login) */
export async function resetRateLimit(event: H3Event, name: string) {
  await useDb().delete(tables.rateLimits).where(eq(tables.rateLimits.key, `${name}:${clientIp(event)}`))
}
