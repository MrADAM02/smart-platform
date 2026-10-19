import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  icon: text('icon').notNull().default('lucide:layers'),
  titleAr: text('title_ar').notNull(),
  titleEn: text('title_en').notNull(),
  summaryAr: text('summary_ar').notNull().default(''),
  summaryEn: text('summary_en').notNull().default(''),
  bodyAr: text('body_ar').notNull().default(''),
  bodyEn: text('body_en').notNull().default(''),
  highlightAr: text('highlight_ar').notNull().default(''),
  highlightEn: text('highlight_en').notNull().default(''),
  sort: integer('sort').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(true),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  icon: text('icon').notNull().default('lucide:box'),
  nameAr: text('name_ar').notNull(),
  nameEn: text('name_en').notNull(),
  summaryAr: text('summary_ar').notNull().default(''),
  summaryEn: text('summary_en').notNull().default(''),
  // One feature per line
  featuresAr: text('features_ar').notNull().default(''),
  featuresEn: text('features_en').notNull().default(''),
  sort: integer('sort').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
})

export const faqs = sqliteTable('faqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionAr: text('question_ar').notNull(),
  questionEn: text('question_en').notNull(),
  answerAr: text('answer_ar').notNull(),
  answerEn: text('answer_en').notNull(),
  sort: integer('sort').notNull().default(0),
})

export const stats = sqliteTable('stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  icon: text('icon').notNull().default('lucide:trending-up'),
  value: integer('value').notNull(),
  suffix: text('suffix').notNull().default('+'),
  labelAr: text('label_ar').notNull(),
  labelEn: text('label_en').notNull(),
  sort: integer('sort').notNull().default(0),
})

export const sectors = sqliteTable('sectors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  icon: text('icon').notNull().default('lucide:building'),
  titleAr: text('title_ar').notNull(),
  titleEn: text('title_en').notNull(),
  sort: integer('sort').notNull().default(0),
})

export const steps = sqliteTable('steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titleAr: text('title_ar').notNull(),
  titleEn: text('title_en').notNull(),
  descriptionAr: text('description_ar').notNull().default(''),
  descriptionEn: text('description_en').notNull().default(''),
  sort: integer('sort').notNull().default(0),
})

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull().default(''),
})

export const requests = sqliteTable('requests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: ['contact', 'quote', 'demo', 'product'] }).notNull(),
  product: text('product'),
  name: text('name').notNull(),
  company: text('company'),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message'),
  locale: text('locale').notNull().default('ar'),
  status: text('status', { enum: ['new', 'in_progress', 'done'] }).notNull().default('new'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

/** Admin overrides of UI text from i18n/locales/*.json (key = dotted path, e.g. "hero.text") */
export const pageTexts = sqliteTable('page_texts', {
  locale: text('locale', { enum: ['ar', 'en'] }).notNull(),
  key: text('key').notNull(),
  value: text('value').notNull(),
}, t => [primaryKey({ columns: [t.locale, t.key] })])

/** Fixed-window counters shared by all serverless instances */
export const rateLimits = sqliteTable('rate_limits', {
  key: text('key').primaryKey(),
  count: integer('count').notNull(),
  resetAt: integer('reset_at').notNull(),
})

export type Service = typeof services.$inferSelect
export type Product = typeof products.$inferSelect
export type Faq = typeof faqs.$inferSelect
export type Stat = typeof stats.$inferSelect
export type Sector = typeof sectors.$inferSelect
export type Step = typeof steps.$inferSelect
export type RequestRow = typeof requests.$inferSelect
