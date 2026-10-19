import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // 5 attempts per 15 minutes per IP
  await rateLimit(event, { name: 'login', limit: 5, windowSec: 15 * 60 })

  const { password } = await readValidatedBody(event, z.object({ password: z.string().min(1) }).parse)
  const hash = useRuntimeConfig(event).adminPasswordHash
  if (!hash) throw createError({ statusCode: 500, statusMessage: 'NUXT_ADMIN_PASSWORD_HASH is not configured' })

  if (!(await verifyAdminPassword(password, hash))) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }
  await resetRateLimit(event, 'login')
  await setUserSession(event, { user: { role: 'admin' }, loggedInAt: Date.now() })
  return { ok: true }
})
