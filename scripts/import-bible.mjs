// Loads the full Berean Standard Bible and King James Version into Supabase.
//
//   npm run import:bible            (both versions)
//   npm run import:bible -- BSB     (one version)
//
// What it does:
//   1. Reads NEXT_PUBLIC_SUPABASE_URL and the publishable key from .env.local
//   2. Asks for your studio admin email and password and signs in, so the
//      database's admin-only write rules allow the import (no secret key needed)
//   3. Downloads each text from its public source
//   4. Writes every verse to the `verses` table in batches (safe to re-run)
//   5. Prints a verse count per version so you can confirm it worked
//
// Sources (both public domain):
//   BSB  https://bereanbible.com/bsb.txt
//   KJV  https://github.com/scrollmapper/bible_databases (formats/csv/KJV.csv)

import { readFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { createClient } from '@supabase/supabase-js';
import { BOOKS } from '../lib/scripture.js';

const SOURCES = {
  BSB: { url: 'https://bereanbible.com/bsb.txt', parse: parseBSB },
  KJV: {
    url: 'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/csv/KJV.csv',
    parse: parseKJV,
  },
};
const EXPECTED_VERSES = 31102; // Protestant canon, standard versification (±a few by tradition)
const BATCH = 1000;

/* ------------------------------------------------------------------------ */
/* Parsers: both files list the 66 books in canonical order, so a book's     */
/* position maps it to our three-letter id (GEN … REV), whatever it is named.*/
/* ------------------------------------------------------------------------ */

function byBookOrder(rows, version) {
  const order = [];
  for (const r of rows) if (order[order.length - 1] !== r.book) order.push(r.book);
  if (order.length !== 66) throw new Error(`${version}: expected 66 books, found ${order.length}`);
  const ids = new Map(order.map((name, i) => [name, BOOKS[i].id]));
  return rows.map((r) => ({
    version,
    book_id: ids.get(r.book),
    chapter: r.chapter,
    verse: r.verse,
    text: r.text,
  }));
}

/** bsb.txt: three header lines, then "Genesis 1:1<TAB>In the beginning…" */
export function parseBSB(raw) {
  const rows = [];
  for (const line of raw.split(/\r?\n/)) {
    const m = /^(.+?) (\d+):(\d+)\t(.*)$/.exec(line);
    if (!m) continue;
    const text = m[4].trim();
    if (!text) continue;
    rows.push({ book: m[1], chapter: Number(m[2]), verse: Number(m[3]), text });
  }
  return byBookOrder(rows, 'BSB');
}

/** KJV.csv: "Book,Chapter,Verse,Text" with quoted text where needed. */
export function parseKJV(raw) {
  const rows = [];
  for (const rec of parseCSV(raw).slice(1)) {
    if (rec.length < 4) continue;
    const [book, chapter, verse, ...rest] = rec;
    const text = rest
      .join(',')
      .replace(/[[\]]/g, '') // this edition marks translators’ supplied words with [ ]
      .replace(/\s+/g, ' ')
      .trim();
    if (!book || !text) continue;
    rows.push({ book, chapter: Number(chapter), verse: Number(verse), text });
  }
  return byBookOrder(rows, 'KJV');
}

/** Minimal RFC 4180 CSV reader (quoted fields, doubled quotes, CRLF). */
export function parseCSV(raw) {
  const out = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (quoted) {
      if (c === '"' && raw[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && raw[i + 1] === '\n') i++;
      row.push(field);
      out.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    out.push(row);
  }
  return out.filter((r) => r.some((f) => f !== ''));
}

/* ------------------------------------------------------------------------ */
/* Helpers                                                                   */
/* ------------------------------------------------------------------------ */

function loadEnv() {
  const env = { ...process.env };
  for (const file of ['.env.local', '.env']) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (s) => {
        if (s.includes(question)) rl.output.write(s);
        else rl.output.write('*');
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

/* ------------------------------------------------------------------------ */
/* Main                                                                      */
/* ------------------------------------------------------------------------ */

async function main() {
  const wanted = process.argv.slice(2).map((v) => v.toUpperCase());
  const versions = wanted.length ? wanted : Object.keys(SOURCES);
  for (const v of versions) if (!SOURCES[v]) throw new Error(`Unknown version "${v}". Use BSB or KJV.`);

  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Add NEXT_PUBLIC_SUPABASE_URL and the publishable key to .env.local first.');

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: true } });

  console.log('Sign in with your studio admin account.');
  const email = env.BIBLE_IMPORT_EMAIL || (await ask('Email: '));
  const password = env.BIBLE_IMPORT_PASSWORD || (await ask('Password: ', { hidden: true }));
  const { data: auth, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) throw new Error(`Sign-in failed: ${signInError.message}`);

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
  if (profile?.role !== 'admin') throw new Error('That account is not an admin. Run supabase/make-admin.sql for it first.');

  for (const version of versions) {
    const { url: src, parse } = SOURCES[version];
    console.log(`\n${version}: downloading ${src}`);
    const res = await fetch(src);
    if (!res.ok) throw new Error(`${version}: download failed (${res.status})`);
    const verses = parse(await res.text());
    console.log(`${version}: parsed ${verses.length.toLocaleString()} verses`);
    if (Math.abs(verses.length - EXPECTED_VERSES) > 50) {
      throw new Error(`${version}: unexpected verse count, stopping before writing anything.`);
    }

    for (let i = 0; i < verses.length; i += BATCH) {
      const chunk = verses.slice(i, i + BATCH);
      const { error } = await supabase.from('verses').upsert(chunk, { onConflict: 'version,book_id,chapter,verse' });
      if (error) throw new Error(`${version}: write failed at verse ${i}: ${error.message}`);
      process.stdout.write(`\r${version}: saved ${Math.min(i + BATCH, verses.length).toLocaleString()} / ${verses.length.toLocaleString()}`);
    }

    const { count } = await supabase.from('verses').select('*', { count: 'exact', head: true }).eq('version', version);
    console.log(`\n${version}: ${count?.toLocaleString()} verses now in the database.`);
  }

  await supabase.auth.signOut();
  console.log('\nDone. Restart `npm run dev` (or wait a few minutes) and hover any reference on the site.');
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  main().catch((e) => {
    console.error(`\nImport stopped: ${e.message}`);
    process.exit(1);
  });
}
