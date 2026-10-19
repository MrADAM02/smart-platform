import { getTableColumns } from 'drizzle-orm'

// Admin-editable content tables, keyed by URL segment
export const contentTables = {
  services: tables.services,
  products: tables.products,
  faqs: tables.faqs,
  stats: tables.stats,
  sectors: tables.sectors,
  steps: tables.steps,
} as const

export type ContentTableName = keyof typeof contentTables

export function getContentTable(name: string | undefined) {
  if (!name || !(name in contentTables)) throw createError({ statusCode: 404, statusMessage: 'Unknown table' })
  return contentTables[name as ContentTableName]
}

/** Keeps only real, writable columns of the table (drops id and unknown keys) */
export function pickColumns(table: (typeof contentTables)[ContentTableName], body: Record<string, unknown>) {
  const columns = getTableColumns(table)
  const out: Record<string, unknown> = {}
  for (const [key, col] of Object.entries(columns)) {
    if (key === 'id' || !(key in body)) continue
    const value = body[key]
    if (col.dataType === 'number') out[key] = Number(value) || 0
    else if (col.dataType === 'boolean') out[key] = Boolean(value)
    else out[key] = value == null ? '' : String(value)
  }
  return out
}
