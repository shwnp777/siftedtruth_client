/**
 * Site-wide settings. Values that differ per environment come from env vars
 * (set them in Amplify → Hosting → Environment variables).
 */

export const SITE_NAME = 'Sifted Truth';
export const TAGLINE = 'Faith, history and the evidence beneath both';
export const DESCRIPTION =
  'Christian apologetics, biblical archaeology and church history, sourced and sifted. News, long reads, video and claims examined against the evidence.';

/** The public address of the site, used for share links and the RSS feed. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const SITE_URL_SET = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/** Giving stays hidden until Stripe is connected and this is set to "true". */
export const GIVING_ENABLED = process.env.NEXT_PUBLIC_GIVING_ENABLED === 'true';

/** Your YouTube channel address. The link only appears once this is set. */
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL || '';

/**
 * Share metadata for one page: title, description and the Open Graph and
 * X (Twitter) tags. The share image itself comes from the route's
 * opengraph-image.js file, which Next adds automatically.
 */
export function pageMeta({ title, description, path = '/', type = 'website', article }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(SITE_URL_SET ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_US',
      url,
      title,
      description,
      ...(article ?? {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
