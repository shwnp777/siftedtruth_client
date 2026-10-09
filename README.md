# Sifted Truth

Next.js (App Router, plain JavaScript) site for Sifted Truth: Christian apologetics, biblical archaeology and church history. Public site plus a private studio at `/studio`, backed by Supabase.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev                  # site: http://localhost:3000   studio: http://localhost:3000/studio
```

Requires Node 20 or newer. With no Supabase keys in `.env.local`, the public site runs on the sample data in `data/dummy.js` and the studio shows setup steps.

## Connect Supabase (one time)

1. **Create the tables.** Supabase → SQL Editor → New query → paste `supabase/migrations/0001_init.sql` → Run.
   Then run `supabase/migrations/0002_grants.sql` the same way (newer Supabase projects need it).
2. **Load the sample posts (optional).** Same again with `supabase/seed.sql`.
3. **Add your keys.** Supabase → Project Settings → API. Put the Project URL and the **publishable** key (`sb_publishable_…`) into `.env.local`. Older projects show an `anon` key instead; use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for that.
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```
   The secret / `service_role` key is **not** needed. Never put it in this app or in the chat.
4. **Make yourself an admin.** Authentication → Users → Add user (tick *Auto confirm*). Then run `supabase/make-admin.sql` with your email in it.
5. Restart `npm run dev` and sign in at `/studio`.

Security lives in the database: row-level security lets anyone read live posts and only `admin` profiles write anything. Every new sign-up is a `member`, and members cannot promote themselves.

## Stages

1. Public site ✓
2. **Studio** ✓: write, schedule, publish, correct and delete all four post types; source library; live preview with working verse popovers
3. Reader accounts: saved articles and a personal section
4. (Later) Bible study tools: interlinear, concordance

## Where things live

| Path | What it is |
| --- | --- |
| `app/(site)/` | Public routes: `articles/`, `dispatches/`, `watch/`, `claims/`, `topics/`, `support/`, `standards/` |
| `app/studio/` | The studio. `(app)/` holds the signed-in pages; `actions.js` holds every write (server actions) |
| `components/studio/` | Studio UI. `editor/PostEditor.js` is the editor; `editor/BlockEditor.js` the body blocks |
| `components/` | Public UI. `RichText` renders post bodies; `VerseRef` is the Scripture hover popover |
| `lib/content.js` | Public data layer: Supabase when configured, sample data otherwise |
| `lib/studio/` | Studio auth check, queries and shared vocabulary (types, statuses, ratings) |
| `lib/supabase/` | Supabase clients: `public` (anonymous, cacheable), `server` (signed-in user), `browser` |
| `lib/scripture.js` | Finds references like "1 Cor 15:3–8" in text and normalizes them (`1CO.15.3-8`) |
| `lib/bible.js` | Verse lookup: the `verses` table once filled, otherwise a small hand-entered sample |
| `supabase/` | SQL: schema + security, seed data, make-admin |
| `middleware.js` | Keeps the studio session fresh and sends signed-out visitors to the login page |

## Load the full Bible (one time)

```bash
npm run import:bible
```

Downloads the Berean Standard Bible ([bereanbible.com](https://bereanbible.com/bsb.txt)) and the King James Version ([scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases)), asks for your studio admin email and password, and writes about 31,100 verses per version into the `verses` table. Safe to re-run. Every Scripture popover on the site then reads from the database.

## Publishing

- **Statuses:** Draft (private), Scheduled (goes live at its publish time), Published, Archived (taken down, kept).
- Saving refreshes the public pages immediately. Pages also re-check the database every 5 minutes, which is what makes scheduled posts appear.
- **Claims Examined:** changing a published claim's rating or confidence is logged in its public review history automatically.
- **Shortcuts:** ⌘S / Ctrl+S saves. Pasting several paragraphs into a paragraph block splits them into blocks.

## Writing post bodies

Bodies are arrays of blocks (`p`, `h2`, `h3`, `quote`, `list`, `callout`). Inline text supports `*italic*`, `**bold**` and footnote markers `[^1]`. Scripture references are detected automatically and become hover popovers. Nothing to mark up.

## Before launch

- Delete the `[Sample]` posts and set `NEXT_PUBLIC_SHOW_SAMPLE_BANNER=false`.
- Fill the bracketed placeholders (bio, photo credits, tax-status note on `/support`, error-reporting contact on `/standards`).

## Deploying to AWS Amplify

Connect the GitHub repository in Amplify Hosting; it detects Next.js and runs `npm run build`. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SHOW_SAMPLE_BANNER` under App settings → Environment variables.
