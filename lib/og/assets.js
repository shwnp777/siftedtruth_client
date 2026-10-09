import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from '@/lib/site';

const FONT_DIR = path.join(process.cwd(), 'assets', 'og-fonts');

let fontsPromise;

/** Static font files for share images (Newsreader + Instrument Sans, OFL). */
export function ogFonts() {
  if (!fontsPromise) {
    const load = (file) => readFile(path.join(FONT_DIR, file));
    fontsPromise = Promise.all([
      load('Newsreader-Display-Medium.ttf'),
      load('Newsreader-Text-Regular.ttf'),
      load('Newsreader-Italic.ttf'),
      load('InstrumentSans-Medium.ttf'),
      load('InstrumentSans-SemiBold.ttf'),
    ]).then(([display, text, italic, sans, sansBold]) => [
      { name: 'Newsreader Display', data: display, weight: 500, style: 'normal' },
      { name: 'Newsreader', data: text, weight: 400, style: 'normal' },
      { name: 'Newsreader', data: italic, weight: 400, style: 'italic' },
      { name: 'Instrument Sans', data: sans, weight: 500, style: 'normal' },
      { name: 'Instrument Sans', data: sansBold, weight: 600, style: 'normal' },
    ]);
  }
  return fontsPromise;
}

/**
 * Fetch a cover photo and return it as a data URL the image renderer can use,
 * or null if it can't be fetched in time (the card then renders without it).
 */
export async function ogPhoto(src) {
  if (!src) return null;
  try {
    let url = src.startsWith('/') ? `${SITE_URL}${src}` : src;
    // Wikimedia thumbnails: 960px is plenty for a share card and loads fast.
    url = url.replace(/\/(\d{3,4})px-([^/]+)$/, (m, w, name) => (Number(w) > 960 ? `/960px-${name}` : m));
    const res = await fetch(url, {
      headers: { 'User-Agent': `SiftedTruthShareCards/1.0 (+${SITE_URL})`, Accept: 'image/jpeg,image/png' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const type = (res.headers.get('content-type') || '').split(';')[0].trim();
    if (!['image/jpeg', 'image/png'].includes(type)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 6_000_000) return null;
    return `data:${type};base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}
