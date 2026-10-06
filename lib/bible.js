/**
 * Bible text lookup.
 *
 * Stage 1: a small in-memory SAMPLE of verses (only the passages used in the
 * dummy articles). Before launch, import the full public-domain texts into a
 * Supabase `verses` table (version, book_id, chapter, verse, text) from the
 * official source files and replace `getVerse` with a database query.
 * Verify all sample text against those official files; it was entered by hand.
 *
 *   BSB — Berean Standard Bible (public domain since 2023), berean.bible
 *   KJV — King James Version (public domain outside the UK)
 */

import { parseKey } from './scripture';

export const VERSIONS = [
  { id: 'BSB', name: 'Berean Standard Bible', notice: 'BSB · Public domain · berean.bible' },
  { id: 'KJV', name: 'King James Version', notice: 'KJV · Public domain' },
];

export const DEFAULT_VERSION = 'BSB';

const SAMPLE = {
  BSB: {
    'GEN.1.1': 'In the beginning God created the heavens and the earth.',
    'EXO.1.11':
      'So the Egyptians appointed taskmasters over the Israelites to oppress them with forced labor. As a result, they built Pithom and Rameses as supply cities for Pharaoh.',
    '2SA.7.16':
      'Your house and kingdom will endure forever before Me, and your throne will be established forever.',
    '1KI.6.1':
      'In the four hundred and eightieth year after the Israelites had come out of the land of Egypt, in the fourth year of Solomon’s reign over Israel, in the month of Ziv, the second month, he began to build the house of the LORD.',
    '1KI.12.29': 'One calf he set up in Bethel, and the other in Dan.',
    '2KI.8.28':
      'Then Ahaziah went with Joram son of Ahab to fight against Hazael king of Aram at Ramoth-gilead, and the Arameans wounded Joram.',
    '2KI.9.24':
      'Then Jehu drew his bow and shot Joram between the shoulders. The arrow pierced his heart, and he slumped down in his chariot.',
    'ISA.40.8': 'The grass withers and the flowers fall, but the word of our God stands forever.',
    'JHN.1.1': 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    'JHN.1.2': 'He was with God in the beginning.',
    'JHN.1.3': 'Through Him all things were made, and without Him nothing was made that has been made.',
    'ACT.17.11':
      'Now the Bereans were more noble-minded than the Thessalonians, for they received the message with great eagerness and examined the Scriptures every day to see if these teachings were true.',
    '1CO.15.3':
      'For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures,',
    '1CO.15.4': 'that He was buried, that He was raised on the third day according to the Scriptures,',
    '1CO.15.5': 'and that He appeared to Cephas and then to the Twelve.',
    '1CO.15.6':
      'After that, He appeared to more than five hundred brothers at once, most of whom are still living, though some have fallen asleep.',
    '1CO.15.7': 'Then He appeared to James, then to all the apostles.',
    '1CO.15.8': 'And last of all, as to one of untimely birth, He appeared also to me.',
    'GAL.1.18':
      'Only after three years did I go up to Jerusalem to confer with Cephas, and I stayed with him fifteen days.',
    '1TH.5.21': 'but test all things. Hold fast to what is good.',
  },
  KJV: {
    'GEN.1.1': 'In the beginning God created the heaven and the earth.',
    'EXO.1.11':
      'Therefore they did set over them taskmasters to afflict them with their burdens. And they built for Pharaoh treasure cities, Pithom and Raamses.',
    '2SA.7.16':
      'And thine house and thy kingdom shall be established for ever before thee: thy throne shall be established for ever.',
    '1KI.6.1':
      'And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon’s reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.',
    '1KI.12.29': 'And he set the one in Bethel, and the other put he in Dan.',
    '2KI.8.28':
      'And he went with Joram the son of Ahab to the war against Hazael king of Syria in Ramothgilead; and the Syrians wounded Joram.',
    '2KI.9.24':
      'And Jehu drew a bow with his full strength, and smote Jehoram between his arms, and the arrow went out at his heart, and he sunk down in his chariot.',
    'ISA.40.8': 'The grass withereth, the flower fadeth: but the word of our God shall stand for ever.',
    'JHN.1.1': 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    'JHN.1.2': 'The same was in the beginning with God.',
    'JHN.1.3': 'All things were made by him; and without him was not any thing made that was made.',
    'ACT.17.11':
      'These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.',
    '1CO.15.3':
      'For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures;',
    '1CO.15.4': 'And that he was buried, and that he rose again the third day according to the scriptures:',
    '1CO.15.5': 'And that he was seen of Cephas, then of the twelve:',
    '1CO.15.6':
      'After that, he was seen of above five hundred brethren at once; of whom the greater part remain unto this present, but some are fallen asleep.',
    '1CO.15.7': 'After that, he was seen of James; then of all the apostles.',
    '1CO.15.8': 'And last of all he was seen of me also, as of one born out of due time.',
    'GAL.1.18': 'Then after three years I went up to Jerusalem to see Peter, and abode with him fifteen days.',
    '1TH.5.21': 'Prove all things; hold fast that which is good.',
  },
};

function getVerse(version, bookId, chapter, verse) {
  return SAMPLE[version]?.[`${bookId}.${chapter}.${verse}`] ?? null;
}

/** One passage in one version: { label, version, verses: [{ n, text }], complete } */
export function getPassage(key, version) {
  const ref = parseKey(key);
  if (!ref) return null;
  const verses = [];
  for (let n = ref.start; n <= ref.end; n++) {
    const text = getVerse(version, ref.bookId, ref.chapter, n);
    if (text) verses.push({ n, text });
  }
  return {
    label: ref.label,
    version,
    verses,
    complete: verses.length === ref.end - ref.start + 1,
  };
}

/**
 * Everything the verse popovers on one page need, in every version:
 *   { [key]: { BSB: passage, KJV: passage } }
 * Server-side, so popovers open instantly with no client fetch.
 */
export async function getPassages(keys) {
  const out = {};
  for (const key of keys) {
    out[key] = {};
    for (const v of VERSIONS) out[key][v.id] = getPassage(key, v.id);
  }
  return out;
}
