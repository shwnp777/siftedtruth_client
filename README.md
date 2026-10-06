# Sifted Truth

Next.js (App Router, plain JavaScript) site for Sifted Truth: Christian apologetics, biblical archaeology and church history.

## Run it

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

Requires Node 20 or newer.

## Stages

1. **Public site with dummy data** ← you are here
2. Admin studio (`/studio`) with Supabase: create, edit, schedule and correct posts
3. Reader accounts: saved articles and a personal section
4. (Later) Bible study tools: interlinear, concordance

## Where things live

| Path | What it is |
| --- | --- |
| `app/` | Routes. `articles/`, `dispatches/`, `watch/`, `claims/`, `topics/`, `support/`, `standards/` |
| `components/` | UI. `RichText` renders post bodies; `VerseRef` is the Scripture hover popover |
| `lib/content.js` | **The only data layer.** Every page reads through it. Stage 2 swaps its internals for Supabase queries |
| `lib/scripture.js` | Finds references like "1 Cor 15:3–8" in text and normalizes them (`1CO.15.3-8`) |
| `lib/bible.js` | Verse lookup. Currently a small hand-entered sample (BSB + KJV) |
| `data/dummy.js` | Sample posts, topics, authors and sources, shaped like the future tables |
| `app/globals.css` | Design tokens (colors, type) and all styles |

## Writing post bodies

Bodies are arrays of blocks (`p`, `h2`, `h3`, `quote`, `list`, `callout`, `figure`). Inline text supports `*italic*`, `**bold**` and footnote markers `[^1]`. Scripture references in the text are detected automatically and become hover popovers. Nothing to mark up.

## Post types

- **article**: long reads with footnotes, sources, corrections and an author box
- **dispatch**: short news briefs with a link to the original report
- **video**: YouTube embed (set `video.youtube_id`), chapters, show notes, transcript
- **claim**: Claims Examined reviews with a rating (`well_supported`, `debated`, `not_supported`, `insufficient`), a confidence level (`high`, `moderate`, `low`), evidence for/against and a review history

## Before launch

- Replace the sample verses in `lib/bible.js` with the full BSB and KJV imported from their official files, and verify the text.
- Remove `[Sample]` content and the preview banner (`NEXT_PUBLIC_SHOW_SAMPLE_BANNER=false`).
- Fill the bracketed placeholders (bio, photo credits, tax-status note on `/support`, error-reporting contact on `/standards`).

## Deploying to AWS Amplify

Connect the Git repository in Amplify Hosting; it detects Next.js and uses `npm run build`. Add environment variables in the Amplify console, not in the repository.
