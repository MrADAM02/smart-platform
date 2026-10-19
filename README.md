# المنصة الذكية - SMART PLATFORM

Bilingual (Arabic RTL / English) corporate site built with **Nuxt 4**, **Tailwind CSS 4**, **Drizzle ORM** and **SQLite (libSQL / Turso)**, deployable to **Netlify**.

## Quick start (local)

```bash
npm install
cp .env.example .env              # then fill in the values below
npm run hash-password -- "your-admin-password"   # paste the printed line into .env
npm run db:setup                  # creates ./data/local.sqlite, runs migrations, seeds content
npm run dev                       # http://localhost:3000
```

- Arabic: `/`  ·  English: `/en`
- Admin: `/admin` (password from `NUXT_ADMIN_PASSWORD_HASH`)

`NUXT_SESSION_PASSWORD` must be at least 32 random characters, for example the output of `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (Netlify preset) |
| `npm run db:generate` | Create a new migration after editing `server/db/schema.ts` |
| `npm run db:migrate` | Apply migrations (local file, or Turso if `TURSO_DATABASE_URL` is set) |
| `npm run db:seed` | **Replace** all content tables with the starter content (requests are kept) |
| `npm run hash-password -- "pw"` | Print a `NUXT_ADMIN_PASSWORD_HASH=` line |

## Project layout

```
app/
  components/home/     Home page sections (Hero, Solutions, Stats, Products, FAQ, ...)
  components/layout/   TopBar, SiteHeader, SiteFooter, LangSwitch, WhatsAppFloat
  components/ui/       Cards, PageHeader, RequestForm, BrandLogo
  pages/               Public pages + /admin
  assets/css/main.css  Tailwind theme: brand colors live in @theme
i18n/locales/          ar.json / en.json: fixed UI text
server/
  db/schema.ts         Tables (bilingual columns *_ar / *_en)
  api/public/          Read-only content API
  api/requests.post.ts Contact / quote / demo / product form
  api/admin/           Login + CRUD (protected by server/middleware/admin-auth.ts)
scripts/               migrate, seed, hash-password
```

Content you can edit in `/admin`: solutions, products, FAQ, stats, sectors, methodology steps, contact settings, and incoming requests.
Fixed UI text (hero headline, section titles, about text and so on) lives in `i18n/locales/*.json`.

## Deploying to Netlify with Turso

Netlify functions cannot write to local files, so production uses **Turso**, a hosted, SQLite-compatible database with a free tier.

1. **Create the database**
   ```bash
   # install the CLI: https://docs.turso.tech/cli/installation
   turso auth login
   turso db create smart-platform
   turso db show smart-platform --url        # -> libsql://...
   turso db tokens create smart-platform     # -> auth token
   ```
2. **Migrate and seed Turso** from your machine:
   ```bash
   TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run db:setup
   ```
   (On PowerShell: `$env:TURSO_DATABASE_URL="..."; $env:TURSO_AUTH_TOKEN="..."; npm run db:setup`)
3. **Push the repo to GitHub** and import it in Netlify. Build settings come from `netlify.toml`.
4. In **Netlify → Site settings → Environment variables**, add:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `NUXT_SESSION_PASSWORD`
   - `NUXT_ADMIN_PASSWORD_HASH`
5. Deploy. Then update `site.url` and `i18n.baseUrl` in `nuxt.config.ts` to your real domain, for sitemap and hreflang.

## Caching

Public pages and `/api/public/*` are cached on Netlify's CDN (`routeRules` in `nuxt.config.ts`, tag `site`).
The cache is cleared automatically on every deploy, and on every admin change through `purgeSiteCache()` (`server/utils/cache.ts`), so edits appear immediately.
Admin pages, admin APIs, the form endpoint and the session endpoint are never cached. The admin session is only loaded inside `/admin`, so it can never end up in cached HTML.
If you add a new admin endpoint that changes public content, call `await purgeSiteCache()` after the write.

## Before going live

- Replace the placeholder phone, email, WhatsApp and address in **/admin → Settings**.
- Review the privacy and compliance page text (`app/pages/privacy.vue`, `compliance.vue`) with your legal advisor.
- Adjust the numbers in **/admin → Stats** to your real figures.
