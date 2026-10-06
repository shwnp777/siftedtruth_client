/**
 * Scripture reference parsing.
 *
 * Finds references like "John 1:1–3", "1 Cor 15:3-8" or "Gen. 1:1" in plain
 * text and normalizes them to a key such as "JHN.1.1-3". Book ids follow the
 * USFM / OSIS-style three-letter codes used by most open Bible datasets, so
 * the same keys work when the real verse tables are imported into Supabase.
 */

export const BOOKS = [
  // Old Testament
  { id: 'GEN', name: 'Genesis', alt: ['Gen', 'Gn'] },
  { id: 'EXO', name: 'Exodus', alt: ['Exod', 'Exo', 'Ex'] },
  { id: 'LEV', name: 'Leviticus', alt: ['Lev', 'Lv'] },
  { id: 'NUM', name: 'Numbers', alt: ['Num', 'Nm'] },
  { id: 'DEU', name: 'Deuteronomy', alt: ['Deut', 'Dt'] },
  { id: 'JOS', name: 'Joshua', alt: ['Josh'] },
  { id: 'JDG', name: 'Judges', alt: ['Judg', 'Jdg'] },
  { id: 'RUT', name: 'Ruth', alt: ['Ru'] },
  { id: '1SA', name: '1 Samuel', alt: ['1 Sam', '1Sam', 'I Samuel'] },
  { id: '2SA', name: '2 Samuel', alt: ['2 Sam', '2Sam', 'II Samuel'] },
  { id: '1KI', name: '1 Kings', alt: ['1 Kgs', '1Kgs', '1 Ki', 'I Kings'] },
  { id: '2KI', name: '2 Kings', alt: ['2 Kgs', '2Kgs', '2 Ki', 'II Kings'] },
  { id: '1CH', name: '1 Chronicles', alt: ['1 Chr', '1Chr', '1 Chron'] },
  { id: '2CH', name: '2 Chronicles', alt: ['2 Chr', '2Chr', '2 Chron'] },
  { id: 'EZR', name: 'Ezra', alt: ['Ezr'] },
  { id: 'NEH', name: 'Nehemiah', alt: ['Neh'] },
  { id: 'EST', name: 'Esther', alt: ['Esth', 'Est'] },
  { id: 'JOB', name: 'Job', alt: [] },
  { id: 'PSA', name: 'Psalms', alt: ['Psalm', 'Ps', 'Psa'] },
  { id: 'PRO', name: 'Proverbs', alt: ['Prov', 'Prv'] },
  { id: 'ECC', name: 'Ecclesiastes', alt: ['Eccl', 'Eccles', 'Qoh'] },
  { id: 'SNG', name: 'Song of Songs', alt: ['Song of Solomon', 'Song'] },
  { id: 'ISA', name: 'Isaiah', alt: ['Isa'] },
  { id: 'JER', name: 'Jeremiah', alt: ['Jer'] },
  { id: 'LAM', name: 'Lamentations', alt: ['Lam'] },
  { id: 'EZK', name: 'Ezekiel', alt: ['Ezek', 'Ezk'] },
  { id: 'DAN', name: 'Daniel', alt: ['Dan', 'Dn'] },
  { id: 'HOS', name: 'Hosea', alt: ['Hos'] },
  { id: 'JOL', name: 'Joel', alt: [] },
  { id: 'AMO', name: 'Amos', alt: [] },
  { id: 'OBA', name: 'Obadiah', alt: ['Obad'] },
  { id: 'JON', name: 'Jonah', alt: ['Jon'] },
  { id: 'MIC', name: 'Micah', alt: ['Mic'] },
  { id: 'NAM', name: 'Nahum', alt: ['Nah'] },
  { id: 'HAB', name: 'Habakkuk', alt: ['Hab'] },
  { id: 'ZEP', name: 'Zephaniah', alt: ['Zeph'] },
  { id: 'HAG', name: 'Haggai', alt: ['Hag'] },
  { id: 'ZEC', name: 'Zechariah', alt: ['Zech'] },
  { id: 'MAL', name: 'Malachi', alt: ['Mal'] },
  // New Testament
  { id: 'MAT', name: 'Matthew', alt: ['Matt', 'Mt'] },
  { id: 'MRK', name: 'Mark', alt: ['Mk', 'Mrk'] },
  { id: 'LUK', name: 'Luke', alt: ['Lk'] },
  { id: 'JHN', name: 'John', alt: ['Jn', 'Jhn'] },
  { id: 'ACT', name: 'Acts', alt: [] },
  { id: 'ROM', name: 'Romans', alt: ['Rom'] },
  { id: '1CO', name: '1 Corinthians', alt: ['1 Cor', '1Cor', 'I Corinthians'] },
  { id: '2CO', name: '2 Corinthians', alt: ['2 Cor', '2Cor', 'II Corinthians'] },
  { id: 'GAL', name: 'Galatians', alt: ['Gal'] },
  { id: 'EPH', name: 'Ephesians', alt: ['Eph'] },
  { id: 'PHP', name: 'Philippians', alt: ['Phil', 'Php'] },
  { id: 'COL', name: 'Colossians', alt: ['Col'] },
  { id: '1TH', name: '1 Thessalonians', alt: ['1 Thess', '1Thess', '1 Th'] },
  { id: '2TH', name: '2 Thessalonians', alt: ['2 Thess', '2Thess', '2 Th'] },
  { id: '1TI', name: '1 Timothy', alt: ['1 Tim', '1Tim'] },
  { id: '2TI', name: '2 Timothy', alt: ['2 Tim', '2Tim'] },
  { id: 'TIT', name: 'Titus', alt: ['Tit'] },
  { id: 'PHM', name: 'Philemon', alt: ['Phlm', 'Philem'] },
  { id: 'HEB', name: 'Hebrews', alt: ['Heb'] },
  { id: 'JAS', name: 'James', alt: ['Jas'] },
  { id: '1PE', name: '1 Peter', alt: ['1 Pet', '1Pet', '1 Pt'] },
  { id: '2PE', name: '2 Peter', alt: ['2 Pet', '2Pet', '2 Pt'] },
  { id: '1JN', name: '1 John', alt: ['1 Jn', '1Jn'] },
  { id: '2JN', name: '2 John', alt: ['2 Jn', '2Jn'] },
  { id: '3JN', name: '3 John', alt: ['3 Jn', '3Jn'] },
  { id: 'JUD', name: 'Jude', alt: [] },
  { id: 'REV', name: 'Revelation', alt: ['Rev', 'Rv'] },
];

const NAME_TO_BOOK = new Map();
for (const book of BOOKS) {
  for (const n of [book.name, ...book.alt]) NAME_TO_BOOK.set(n.toLowerCase(), book);
}
const BOOK_BY_ID = new Map(BOOKS.map((b) => [b.id, b]));

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Longest names first so "1 Corinthians" wins over "1 Cor", "Song of Songs" over "Song".
const NAME_PATTERN = [...NAME_TO_BOOK.keys()]
  .sort((a, b) => b.length - a.length)
  .map((n) => escapeRe(n).replace(/ /g, '\\s'))
  .join('|');

// Book, optional period, chapter:verse, optional -verse (hyphen, en or em dash).
const REF_SOURCE = `\\b(${NAME_PATTERN})\\.?\\s(\\d{1,3}):(\\d{1,3})(?:\\s?[-–—]\\s?(\\d{1,3}))?\\b`;

/** A fresh global regex for scanning text (case-insensitive book names). */
export function referenceRegex() {
  return new RegExp(REF_SOURCE, 'gi');
}

function build(book, chapter, start, end) {
  const c = Number(chapter);
  const s = Number(start);
  const e = end ? Number(end) : s;
  if (!book || !c || !s || e < s) return null;
  return {
    bookId: book.id,
    book: book.name,
    chapter: c,
    start: s,
    end: e,
    key: `${book.id}.${c}.${s}${e > s ? `-${e}` : ''}`,
    label: `${book.name} ${c}:${s}${e > s ? `–${e}` : ''}`,
  };
}

/** Parse a single reference string ("Acts 17:11", "1 Cor 15:3–8"). */
export function parseReference(text) {
  if (!text) return null;
  const m = new RegExp(`^\\s*${REF_SOURCE}\\s*$`, 'i').exec(text);
  if (!m) return null;
  const book = NAME_TO_BOOK.get(m[1].toLowerCase().replace(/\s+/g, ' '));
  return build(book, m[2], m[3], m[4]);
}

/** Parse a normalized key ("JHN.1.1-3"). */
export function parseKey(key) {
  const m = /^([1-3A-Z]{3})\.(\d+)\.(\d+)(?:-(\d+))?$/.exec(key || '');
  if (!m) return null;
  return build(BOOK_BY_ID.get(m[1]), m[2], m[3], m[4]);
}

/**
 * Split text into plain strings and reference objects:
 *   "See John 1:1." -> ["See ", {ref, raw: "John 1:1"}, "."]
 */
export function splitReferences(text) {
  const out = [];
  const re = referenceRegex();
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    const book = NAME_TO_BOOK.get(m[1].toLowerCase().replace(/\s+/g, ' '));
    const ref = build(book, m[2], m[3], m[4]);
    if (!ref) continue;
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ ref, raw: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Every distinct reference key found in a list of strings. */
export function collectReferenceKeys(strings) {
  const keys = new Set();
  for (const s of strings) {
    if (typeof s !== 'string') continue;
    for (const part of splitReferences(s)) {
      if (typeof part !== 'string') keys.add(part.ref.key);
    }
  }
  return [...keys];
}
