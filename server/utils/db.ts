import { createDb, type Db } from '../db/client'

let db: Db | undefined

export function useDb(): Db {
  if (!db) {
    const config = useRuntimeConfig()
    db = createDb(
      config.tursoDatabaseUrl || process.env.TURSO_DATABASE_URL,
      config.tursoAuthToken || process.env.TURSO_AUTH_TOKEN,
    )
  }
  return db
}

export * as tables from '../db/schema'
