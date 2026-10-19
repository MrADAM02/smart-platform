import type { H3Event } from 'h3'

/** Reads a positive integer route param, or throws 400 */
export function getIdParam(event: H3Event, name = 'id') {
  const id = Number(getRouterParam(event, name))
  if (!Number.isInteger(id) || id <= 0) throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  return id
}
