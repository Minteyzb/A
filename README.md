# Mintesinot Zenebe – Portfolio (Next.js · Neon · Prisma · Clerk · Vercel Blob)

## 1. Run locally
1. Install Node 20.9 or newer. In this folder: `npm install`
2. Copy `.env.example` to `.env` and fill it in (see steps 2–4 below).
3. `npx prisma db push` (creates tables in Neon) then `npm run db:seed` (adds sample projects and a welcome post).
4. `npm run dev` and open http://localhost:3000

## 2. Neon (database)
1. neon.tech → New project → Connect.
2. Copy the **pooled** string into `DATABASE_URL` and the **direct** (unpooled) string into `DIRECT_URL`.

## 3. Clerk (sign-in)
1. clerk.com → Create application → choose Email and any social logins you want.
2. API keys → copy the Publishable key into `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and the Secret key into `CLERK_SECRET_KEY`.
3. Set `ADMIN_EMAILS` to your email. Sign up on the site at `/sign-up` with that email and verify it. Only a verified admin email sees the Admin button.
4. After deploying, Clerk's development keys also work on Vercel for testing. For a real launch, switch the Clerk app to Production, add your domain, and replace the keys in Vercel.

## 4. Vercel Blob (pictures and videos)
Created in the Vercel dashboard (step 6 below); it adds `BLOB_READ_WRITE_TOKEN` for you. For local uploads, copy that token into `.env`.

## 5. Push to GitHub
`git init && git add . && git commit -m "portfolio" && git branch -M main`, create an empty GitHub repo, then `git remote add origin <url> && git push -u origin main`.

## 6. Deploy on Vercel
1. vercel.com → Add New → Project → import the repo (framework is detected as Next.js).
2. Environment Variables: add every key from `.env.example` except `BLOB_READ_WRITE_TOKEN`.
3. Click Deploy.
4. In the project: Storage → Create → Blob → connect it to the project. Redeploy (Deployments → ⋯ → Redeploy) so the token is applied.
5. (Production Clerk only) add your domain in the Clerk dashboard.
6. Visit `/sign-in`, sign in with your admin email, and use Admin → New blog post / New project.

## Notes
- Update the database after changing `prisma/schema.prisma`: run `npx prisma db push` from your computer.
