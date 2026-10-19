import { z } from 'zod'

const bodySchema = z.object({
  type: z.enum(['contact', 'quote', 'demo', 'product']),
  product: z.string().max(80).optional().nullable(),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().nullable(),
  email: z.email().max(200),
  phone: z.string().trim().max(30).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  locale: z.enum(['ar', 'en']).default('ar'),
  website: z.string().optional(), // honeypot — must stay empty
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.safeParse)
  if (!body.success) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid form data', data: z.treeifyError(body.error) })
  }
  const { website, ...data } = body.data
  // Silently accept bot submissions without storing them
  if (website) return { ok: true }

  await useDb().insert(tables.requests).values(data)
  return { ok: true }
})
