# PACE

AI companion that builds your day for you — auto-prioritizing tasks around your real calendar.

## Stack
- Next.js (App Router) — frontend + API routes, no separate backend
- PostgreSQL via Cloud SQL, accessed through Prisma
- Gemini API (`@google/generative-ai`) for AI scheduling
- NextAuth (Credentials provider + a separate Guest provider) for auth

## Folder structure
```
src/
  app/
    api/
      auth/[...nextauth]/route.ts   # NextAuth handler
      schedule/generate/route.ts    # POST: manual AI schedule generation
    dashboard/                      # Dashboard route
    calendar/                       # Calendar route (Day view first)
    deadlines/                      # Deadlines route
    settings/                       # Settings route
  components/                       # Shared UI (sidebar, topbar, panels)
  lib/
    prisma.ts                       # Prisma client singleton
    auth.ts                         # NextAuth config
    gemini.ts                       # Gemini client + scheduling system prompt
prisma/
  schema.prisma
  seed.ts                           # Seeds the guest demo account
```

Task Management and AI panels are slide-in overlays, not routes — build them as
components rendered conditionally over the active route, not as `app/` pages.

## Local setup
```bash
cp .env.example .env        # fill in DATABASE_URL, NEXTAUTH_SECRET, GEMINI_API_KEY
npm install
npx prisma migrate dev --name init
npm run seed                # creates the guest@pace.app demo account
npm run dev
```

## Deploying to Cloud Run
1. Provision Cloud SQL (Postgres), create a database, get the connection name.
2. Build & push: `gcloud builds submit --tag gcr.io/PROJECT_ID/pace`
3. Deploy: `gcloud run deploy pace --image gcr.io/PROJECT_ID/pace --add-cloudsql-instances PROJECT:REGION:INSTANCE --set-env-vars DATABASE_URL=...,NEXTAUTH_SECRET=...,GEMINI_API_KEY=...,NEXTAUTH_URL=...`
4. Run `prisma migrate deploy` against the Cloud SQL instance (via Cloud SQL Proxy) before
   or right after first deploy.

**Known blocker:** GCP billing was reported as not active until the evening before the
hackathon deadline (June 30, 11:59 PM). Confirm billing is live before attempting any of
the steps above — local dev (steps in "Local setup") is fully unblocked in the meantime.

## What's scaffolded vs. still to build
Scaffolded: Prisma schema (User/Task/Habit/CalendarEvent/ScheduleBlock), NextAuth
(credentials + guest), Gemini client + scheduling system prompt, `/api/schedule/generate`
route, seed script, Dockerfile.

Still to build: all UI components (sidebar, topbar, Dashboard, Calendar Day/Week/Month,
Task panel, Deadlines page, Settings page, AI panel), drag-and-drop, the actual `/login`
page, task CRUD API routes, calendar event CRUD API routes, habit CRUD + UI (currently
has zero design attention beyond the schema — flagged as needing its own pass), Week/Month
calendar views, empty/error states, optimistic UI decision.
