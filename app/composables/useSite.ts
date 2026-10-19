import type { Service, Product, Faq, Stat, Sector, Step } from '~~/server/db/schema'

export interface SiteData {
  services: Service[]
  products: Product[]
  faqs: Faq[]
  stats: Stat[]
  sectors: Sector[]
  steps: Step[]
  settings: Record<string, string>
}

/** Shared site content (cached under one key, fetched once per navigation session) */
export function useSite() {
  return useFetch<SiteData>('/api/public/site', { key: 'site', dedupe: 'defer' })
}
