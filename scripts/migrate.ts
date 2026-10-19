import 'dotenv/config'
import { mkdirSync } from 'node:fs'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { createDb } from '../server/db/client'

if (!process.env.TURSO_DATABASE_URL) mkdirSync('./data', { recursive: true })

const db = createDb(process.env.TURSO_DATABASE_URL, process.env.TURSO_AUTH_TOKEN)
await migrate(db, { migrationsFolder: './server/db/migrations' })
console.log('Migrations applied to', process.env.TURSO_DATABASE_URL || 'file:./data/local.sqlite')
