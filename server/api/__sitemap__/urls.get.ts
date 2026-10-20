import { eq } from 'drizzle-orm'

// Dynamic pages for @nuxtjs/sitemap (solutions, products, projects page), in both languages
export default defineSitemapEventHandler(async () => {
  const db = useDb()
  const [services, products, projects] = await Promise.all([
    db.select({ slug: tables.services.slug }).from(tables.services).where(eq(tables.services.published, true)),
    db.select({ slug: tables.products.slug }).from(tables.products).where(eq(tables.products.published, true)),
    db.select({ id: tables.projects.id }).from(tables.projects).where(eq(tables.projects.published, true)).limit(1),
  ])
  const paths = [
    ...services.map(s => `/solutions/${s.slug}`),
    ...products.map(p => `/products/${p.slug}`),
    ...(projects.length ? ['/projects'] : []),
  ]
  // _i18nTransform lets the sitemap module add the /en variant + hreflang alternates
  return paths.map(loc => ({ loc, _i18nTransform: true }))
})
