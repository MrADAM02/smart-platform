import { createHash } from 'node:crypto'
import { lt } from 'drizzle-orm'
import { z } from 'zod'

const bodySchema = z.object({
  path: z.string().startsWith('/').max(300),
  referrer: z.string().max(500).optional().nullable(),
})

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|lighthouse|headless|curl|wget|python|axios|node-fetch/i

function deviceOf(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return 'tablet'
  if (/mobi|iphone|android/i.test(ua)) return 'mobile'
  return 'desktop'
}

function referrerHost(ref: string | null | undefined, ownHost: string) {
  if (!ref) return null
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '')
    return host && host !== ownHost ? host : null
  }
  catch {
    return null
  }
}

/**
 * Cookie-less page view tracking. Stores no IP and no cookie:
 * a daily-rotating hash counts unique visitors per day only.
 */
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 204)
  const ua = getRequestHeader(event, 'user-agent') ?? ''
  if (!ua || BOT_RE.test(ua) || getRequestHeader(event, 'dnt') === '1') return null

  const parsed = bodySchema.safeParse(await readBody(event).catch(() => null))
  if (!parsed.success) return null
  const path = parsed.data.path.split(/[?#]/)[0]!.replace(/\/+$/, '') || '/'
  if (/^\/(en\/)?admin(\/|$)/.test(path) || path.startsWith('/api/')) return null

  // Generous limit — only there to stop someone flooding the database
  await rateLimit(event, { name: 'track', limit: 120, windowSec: 10 * 60 })

  const day = new Date().toISOString().slice(0, 10)
  const ip = getRequestHeader(event, 'x-nf-client-connection-ip') || getRequestIP(event, { xForwardedFor: true }) || ''
  const secret = process.env.NUXT_SESSION_PASSWORD || 'dev-secret'
  const visitor = createHash('sha256').update(`${secret}|${day}|${ip}|${ua}`).digest('hex').slice(0, 32)
  const ownHost = (getRequestHeader(event, 'host') ?? '').replace(/^www\./, '').split(':')[0]!

  const db = useDb()
  await db.insert(tables.pageViews).values({
    day,
    path,
    locale: path === '/en' || path.startsWith('/en/') ? 'en' : 'ar',
    referrer: referrerHost(parsed.data.referrer, ownHost),
    device: deviceOf(ua),
    country: getRequestHeader(event, 'x-country') || null, // set by Netlify
    visitor,
  })

  // Keep ~13 months of data
  if (Math.random() < 0.01) {
    const cutoff = new Date(Date.now() - 400 * 864e5).toISOString().slice(0, 10)
    await db.delete(tables.pageViews).where(lt(tables.pageViews.day, cutoff))
  }
  return null
})
