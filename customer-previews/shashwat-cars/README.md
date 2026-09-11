# Shashwat Cars Digital Dealership Platform

A production-oriented Next.js App Router implementation of the Shashwat Cars brief: public dealership website, searchable inventory, vehicle pages, seller/finance/contact lead capture, protected admin dashboard, inventory controls, CRM views, local SEO foundations and mobile-first UX.

## What is implemented

- Premium automotive homepage and responsive navigation
- Working inventory filtering/sorting against loaded inventory data
- Dynamic `/cars/[slug]` pages with metadata, specs, features and enquiry capture
- `/sell-your-car`, `/finance`, `/about`, `/reviews`, `/contact`
- Privacy, terms and disclaimer pages
- Lead API with server-side validation
- Development-only local lead persistence; production requires Supabase
- Supabase SQL schema for vehicles, leads, notes, reviews and settings
- Protected admin login using SHA-256 password hash + signed HttpOnly session cookie
- Admin KPI dashboard, inventory add/status controls, leads view and configuration view
- Sitemap/robots and dynamic vehicle SEO metadata
- Demo inventory is **development only**; production shows no fake vehicles if the database is not configured

## Production data setup

1. Create a Supabase project dedicated to Shashwat Cars.
2. Run `supabase/schema.sql` in the SQL editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel/server environment variables. Never expose the service role key as `NEXT_PUBLIC_*`.
4. Configure the public business environment variables from `.env.example` after verifying dealership phone, WhatsApp, email and exact address.
5. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_SHA256` and a long random `SESSION_SECRET`.

To generate the admin password SHA-256 locally:

```bash
node -e "console.log(require('crypto').createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"
```

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production deployment

Recommended: push this project to a new GitHub repository (for example `shashwat-cars`) and import it into Vercel. Add environment variables before promoting to production, run the Supabase schema, then test homepage, search, vehicle pages, all forms, admin login, inventory changes and CRM leads.

## Media storage

Vehicle images currently accept URL arrays in the data model. For production uploads, connect a dedicated storage provider (Supabase Storage, Vercel Blob or S3-compatible storage), validate MIME type/file size server-side, store only object URLs in `vehicles.images`, and never store large binaries in Postgres.

## Rollback

The original Savrdh repositories were not modified. This project was created separately because no Shashwat Cars repository was present in the connected GitHub account. If later imported into Git, keep `main` stable and develop changes on `feature/shashwat-cars-redesign` before merge.

## Verification

Run:

```bash
npm run verify
npm run typecheck
npm run build
```

The structure verification works without framework dependencies; `typecheck` and `build` require `npm install`.
