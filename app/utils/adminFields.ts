export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'icon'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  /** shown in the list table */
  list?: boolean
  dir?: 'rtl' | 'ltr'
}

const bi = (key: string, label: string, type: FieldType = 'text', list = false): FieldDef[] => [
  { key: `${key}Ar`, label: `${label} (AR)`, type, dir: 'rtl', list },
  { key: `${key}En`, label: `${label} (EN)`, type, dir: 'ltr' },
]

const sort: FieldDef = { key: 'sort', label: 'Sort', type: 'number', list: true }

/** Form + table definitions for each admin-editable content table */
export const adminTables: Record<string, { titleKey: string, fields: FieldDef[], defaults: Record<string, unknown> }> = {
  services: {
    titleKey: 'admin.services',
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', list: true, dir: 'ltr' },
      { key: 'icon', label: 'Icon', type: 'icon' },
      ...bi('title', 'Title', 'text', true),
      ...bi('summary', 'Summary', 'textarea'),
      ...bi('highlight', 'Smart feature'),
      ...bi('body', 'Body', 'textarea'),
      sort,
      { key: 'published', label: 'Published', type: 'checkbox', list: true },
      { key: 'featured', label: 'Show on home page', type: 'checkbox' },
    ],
    defaults: { icon: 'lucide:layers', published: true, featured: true, sort: 0 },
  },
  products: {
    titleKey: 'admin.products',
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', list: true, dir: 'ltr' },
      { key: 'icon', label: 'Icon', type: 'icon' },
      ...bi('name', 'Name', 'text', true),
      ...bi('summary', 'Summary', 'textarea'),
      ...bi('features', 'Features (one per line)', 'textarea'),
      sort,
      { key: 'published', label: 'Published', type: 'checkbox', list: true },
    ],
    defaults: { icon: 'lucide:box', published: true, sort: 0 },
  },
  faqs: {
    titleKey: 'admin.faqs',
    fields: [...bi('question', 'Question', 'text', true), ...bi('answer', 'Answer', 'textarea'), sort],
    defaults: { sort: 0 },
  },
  stats: {
    titleKey: 'admin.stats',
    fields: [
      { key: 'value', label: 'Value', type: 'number', list: true },
      { key: 'suffix', label: 'Suffix (+, %, M+)', type: 'text', list: true, dir: 'ltr' },
      ...bi('label', 'Label', 'text', true),
      sort,
    ],
    defaults: { value: 0, suffix: '+', sort: 0 },
  },
  sectors: {
    titleKey: 'admin.sectors',
    fields: [{ key: 'icon', label: 'Icon', type: 'icon' }, ...bi('title', 'Title', 'text', true), sort],
    defaults: { icon: 'lucide:building', sort: 0 },
  },
  steps: {
    titleKey: 'admin.steps',
    fields: [...bi('title', 'Title', 'text', true), ...bi('description', 'Description', 'textarea'), sort],
    defaults: { sort: 0 },
  },
}
