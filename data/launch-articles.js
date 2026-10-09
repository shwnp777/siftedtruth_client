/**
 * Launch content: articles and dispatches from the launch plan.
 * Run `node scripts/generate-content.mjs` to build
 * supabase/content/launch-articles.sql (inserted as DRAFTS).
 */

import { sources as claimSources } from './launch-claims.js';

export const sources = {
  ...claimSources,
  // Interwoven Word
  openbible: { kind: 'secondary', author: 'OpenBible.info', title: 'Bible Cross References', publication: 'Data from the Treasury of Scripture Knowledge and others, CC BY', url: 'https://www.openbible.info/labs/cross-references/' },
  harrison: { kind: 'secondary', author: 'Chris Harrison and Christoph Römhild', title: 'Bible Cross-References visualization', publication: '2007', url: 'https://www.chrisharrison.net/index.php/Visualizations/BibleViz' },
  tsk: { kind: 'secondary', author: 'Samuel Bagster (publisher)', title: 'The Treasury of Scripture Knowledge', publication: '19th century; public domain' },
  blunt: { kind: 'secondary', author: 'John James Blunt', title: 'Undesigned Coincidences in the Writings Both of the Old and New Testament', publication: 'John Murray', year: 1847 },
  mcgrew: { kind: 'secondary', author: 'Lydia McGrew', title: 'Hidden in Plain View: Undesigned Coincidences in the Gospels and Acts', publication: 'DeWard Publishing', year: 2017 },
  paley: { kind: 'secondary', author: 'William Paley', title: 'Horae Paulinae', publication: '1790' },
  // Ketef Hinnom
  barkay2004: { kind: 'primary', author: 'Gabriel Barkay, Marilyn J. Lundberg, Andrew G. Vaughn and Bruce Zuckerman', title: 'The Amulets from Ketef Hinnom: A New Edition and Evaluation', publication: 'Bulletin of the American Schools of Oriental Research 334', year: 2004, pages: '41–71' },
  // Dispatches
  abr_shiloh: { kind: 'secondary', author: 'Associates for Biblical Research', title: 'ABR Announces Three Significant Discoveries at Shiloh from 2026 Season', publication: 'June 22, 2026', url: 'https://biblearchaeology.org/abr-announces-three-significant-discoveries-at-shiloh-from-2026-season/' },
  arch_beams: { kind: 'secondary', author: 'Dario Radley, Archaeology Magazine', title: 'Wooden beams from Jerusalem’s First Temple destruction', publication: 'July 22, 2026', url: 'https://archaeologymag.com/2026/07/wooden-beams-from-jerusalems-first-temple-destruction/' },
  faust_eton: { kind: 'secondary', author: 'Popular Archaeology', title: 'Bar-Ilan University study suggests 2,700-year-old standing stone may provide fresh evidence for King Hezekiah’s religious reforms', publication: 'June 16, 2026 (study by Avraham Faust, Jerusalem Journal of Archaeology)', url: 'https://popular-archaeology.com/article/bar-ilan-university-study-suggests-2700-year-old-standing-stone-massebah-may-provide-fresh-evidence-for-king-hezekiahs-religious-reforms/' },
};

export const posts = [
  /* ================================================================ */
  /* Flagship                                                          */
  /* ================================================================ */
  {
    type: 'article',
    slug: 'is-this-noahs-ark-durupinar-evidence',
    topic: 'archaeology',
    featured: true,
    photo: 'ararat',
    title: 'Is this Noah’s Ark? What the Durupınar evidence shows so far',
    dek: 'Radar scans, deep drilling and a thousand soil samples have put a boat-shaped formation in eastern Turkey back in the headlines. Here is what has actually been found, what hasn’t, and what would settle it.',
    reading_minutes: 12,
    body: [
      { type: 'p', text: 'About 18 miles south of Mount Ararat, in the far east of Turkey, a long, boat-shaped ridge lies in the hills above the village of Üzengili. Its length, roughly 515 feet, is close to the 300 cubits of Genesis 6:15. Known as the Durupınar formation, it has drawn ark hunters since a Turkish air survey photographed it in 1959. This year, two research teams have brought new tools to the old question.' },
      { type: 'p', text: 'Sifted Truth’s aim is to report this the way we would want any claim about Scripture reported: with everything that has been found, everything that hasn’t, and the questions that would decide it. We have rated the headline claim separately in Claims Examined, and we will update both pieces when lab results arrive.' },
      { type: 'h2', text: 'What the Bible actually says' },
      { type: 'p', text: 'Genesis 8:4 says the ark came to rest “on the mountains of Ararat.” The plural matters. Ararat is the Hebrew name for the land of Urartu, a kingdom spread across eastern Turkey, Armenia and northwestern Iran. The text names a region, not a peak. Every candidate site, including Mount Ararat itself, Mount Judi far to the south and Durupınar, has to be weighed with that in mind.' },
      { type: 'h2', text: 'What the 2026 teams report' },
      { type: 'p', text: 'Noah’s Ark Scans, led by Andrew Jones, used ground-penetrating radar developed by engineer Khosrow Bakhtar. The team reports linear features, right-angled intersections, layers and possible voids beneath the formation, which it interprets as possible corridors and compartments. Core drilling at more than 12 locations, some about 60 feet deep, found rich black soil and no bedrock.[^1]' },
      { type: 'p', text: 'A second team of about 20 researchers from five countries, led by Prof. Cenker Atila of Sivas Cumhuriyet University, spent roughly 90 days on site this summer. It collected about 1,000 soil samples from 150 locations, recovered pottery fragments, and reports carbon levels about 40% higher inside the formation than outside it.[^2] Results from both teams’ lab work are expected in winter 2026–27.' },
      { type: 'callout', title: 'Note the numbers', text: 'Reports of the carbon difference have varied: “three times” in one account, 2.72 times in a 2025 report, about 40% in this year’s. The samples, labs and methods may differ. Until the data are published, treat any single figure with care.' },
      { type: 'h2', text: 'The ancient witnesses' },
      { type: 'p', text: 'Long before radar, ancient writers said the ark’s remains could be visited. The Jewish historian Josephus, writing in Rome in the AD 90s, says the Armenians called the landing site “the Place of Descent” and that its remains “are shown there by the inhabitants to this day.”[^3]' },
      { type: 'p', text: 'Josephus also quotes older writers. Berossus, a Babylonian priest of the third century BC, says part of the ship still survived in the mountains of the Gordyaeans and that people scraped off its bitumen to use as charms. Nicolaus of Damascus, King Herod’s court historian, describes a great mountain in Armenia called Baris, where “the remains of the timber were a great while preserved.”' },
      { type: 'p', text: 'That is real evidence of a long tradition of pilgrimage, and it is one of the most fascinating threads in the whole story. But precision matters. The Gordyaean mountains lie south of Lake Van, in the region of the traditional Mount Judi site, not obviously at Durupınar. The ancient sources support the belief that the ark landed in the region; they do not identify this particular formation.' },
      { type: 'h2', text: 'The case against' },
      { type: 'p', text: 'The strongest skeptical case comes from an unexpected direction. David Fasold, an early champion of Durupınar, later co-wrote a 1996 paper with geologist Lorence Collins concluding that the formation is a natural geological structure. They argued that earlier “iron bracket” finds were weathered volcanic minerals.[^4] Boat-shaped features can form when mudflows move around a rock outcrop, and radar anomalies and organic-rich soil can have natural causes.' },
      { type: 'h2', text: 'What would settle it' },
      { type: 'list', items: [
        'Wood or worked timber recovered from inside the formation, identified by species.',
        'Radiocarbon dates on that material, published with lab names and sample locations.',
        'Evidence of construction: joinery, fittings or a deliberate internal structure confirmed by excavation, not radar alone.',
        'Publication in a peer-reviewed journal where geologists and archaeologists outside the project can test the data.',
      ] },
      { type: 'p', text: 'None of those has happened yet. That is not a reason for scoffing, and it is not a reason for headlines that say the ark has been found. It is a reason to wait for the data and to ask good questions in the meantime, as the Bereans did (Acts 17:11).' },
      { type: 'callout', title: 'Our read', text: 'Interesting, unproven and worth following. We rate the claim that scientists have found Noah’s Ark as Insufficient evidence, with low confidence, and we will revisit it when the winter results are published.' },
      { type: 'h2', text: 'Why the flood story matters either way' },
      { type: 'p', text: 'Whatever Durupınar turns out to be, the flood narrative is one of the most connected stories in Scripture. Jesus points to “the days of Noah” (Matthew 24:37), Peter treats the flood as a picture of baptism (1 Peter 3:20–21), and Hebrews 11:7 holds up Noah as a model of faith. Finding a hull would be remarkable. The story’s weight in the Bible does not depend on it.' },
    ],
    footnotes: [
      { text: 'Jerusalem Post, Oct. 3, 2026; Fox News on the drilling results.', source: 'jpost_ark' },
      { text: 'Arkeonews, Sept. 23, 2026.', source: 'arkeonews' },
      { text: 'Josephus, Antiquities 1.3.5–6 (1.90–95).', source: 'josephus_ant' },
      { text: 'Collins and Fasold, Journal of Geoscience Education 44 (1996).', source: 'collins_fasold' },
    ],
    sources: ['jpost_ark', 'fox_drill', 'arkeonews', 'josephus_ant', 'collins_fasold'],
  },

  /* ================================================================ */
  /* Series opener                                                     */
  /* ================================================================ */
  {
    type: 'article',
    slug: '340000-threads-how-connected-is-the-bible',
    topic: 'bible-manuscripts',
    photo: 'sinaiticus',
    title: '340,000 threads: how connected is the Bible, really?',
    dek: 'The Interwoven Word, part one. Where the famous cross-reference numbers come from, what counts as a connection, and what the web of links can and can’t tell us.',
    reading_minutes: 9,
    body: [
      { type: 'p', text: 'Open almost any study Bible and you will find a narrow column of references running down the middle of the page. Put all of those links together and the numbers get startling. One freely available dataset, compiled mostly from the classic Treasury of Scripture Knowledge, contains about 340,000 cross-references between verses.[^1] A well-known visualization by Chris Harrison and Christoph Römhild drew 63,779 of them as arcs across the 66 books, producing an image that looks like a rainbow woven over the whole Bible.[^2]' },
      { type: 'p', text: 'This series, The Interwoven Word, is about those threads: where they come from, which ones are strongest, and what they suggest about the book that holds them. It starts with a question every careful reader should ask: what exactly is being counted?' },
      { type: 'h2', text: 'Not every thread is the same' },
      { type: 'p', text: 'A cross-reference is an editor’s judgment that two verses belong together. Some links are unmistakable; others are loose. Sorting them into kinds is the first step to weighing them.' },
      { type: 'list', items: [
        '**Quotations.** One writer cites another’s words, often with a formula such as “as it is written.” Matthew 21:5 quotes Zechariah 9:9 almost word for word.',
        '**Allusions.** A writer borrows an image or phrase without naming it. When John the Baptist calls Jesus “the Lamb of God” (John 1:29), he draws on a long line of lambs in Israel’s story.',
        '**Patterns.** Events or figures prefigure later ones. Isaac carries the wood up the mountain (Genesis 22:6); John notes that Jesus went out “carrying his own cross” (John 19:17).',
        '**Shared themes and words.** Two passages speak of the same subject, such as covenant, exile or the shepherd. These are the weakest links and the most numerous.',
      ] },
      { type: 'p', text: 'Big totals like 340,000 include all four kinds. That does not make the number meaningless, but it does mean the strength of the case lies less in the total than in the quality of particular threads.' },
      { type: 'h2', text: 'Why the strong threads are remarkable' },
      { type: 'p', text: 'The Bible was written over roughly 1,500 years, by dozens of authors, in three languages, on three continents. Many of its writers could not have known how later books would use their words. Yet the major threads run in one direction with surprising consistency: promise to fulfillment, shadow to substance, from the seed promised in Genesis 3:15 to the Lamb on the throne in Revelation 5:6.' },
      { type: 'p', text: 'A skeptic can answer that later writers deliberately wove their work into earlier texts, and sometimes they did; the New Testament writers say so openly. The interesting cases are the ones no later writer could have arranged: patterns built into the Old Testament itself, centuries before anyone claimed them, and small details across separate accounts that fit together without any sign of design. Those are the threads this series will follow.' },
      { type: 'h2', text: 'What the series will cover' },
      { type: 'list', items: [
        'Undesigned coincidences: when the Gospels explain each other by accident.',
        'The lamb from Genesis to Revelation, traced book by book.',
        'Psalm 22 and the crucifixion, including the Dead Sea Scrolls evidence.',
        '“The Bereans test”: one New Testament quotation of the Old Testament at a time, checked in context.',
      ] },
      { type: 'callout', title: 'Coming to the site', text: 'We are building a cross-reference explorer from the open dataset, so that beside any verse you read on Sifted Truth you will be able to see how many others connect to it and follow the threads yourself.' },
    ],
    footnotes: [
      { text: 'OpenBible.info, Bible Cross References, derived mainly from the Treasury of Scripture Knowledge.', source: 'openbible' },
      { text: 'Harrison and Römhild, Bible cross-references visualization (2007).', source: 'harrison' },
    ],
    sources: ['openbible', 'harrison', 'tsk'],
  },

  /* ================================================================ */
  /* Series #2                                                         */
  /* ================================================================ */
  {
    type: 'article',
    slug: 'undesigned-coincidences-gospels-explain-each-other',
    topic: 'apologetics',
    photo: 'tabgha',
    title: 'Undesigned coincidences: when the Gospels explain each other by accident',
    dek: 'The Interwoven Word, part two. Small details in one Gospel answer questions raised by another, in ways no author seems to have planned. Why that matters for reliability.',
    reading_minutes: 10,
    body: [
      { type: 'p', text: 'Detectives and lawyers know the pattern. Two witnesses tell the same story in their own words. One mentions a detail that seems odd. The other, telling a different part of the story, mentions something that explains it, without seeming to notice. Neither account was written to fit the other, yet they fit. That kind of unplanned agreement is hard to fake.' },
      { type: 'p', text: 'Christian writers have used this argument since William Paley applied it to Paul’s letters and Acts in 1790. J. J. Blunt extended it across the whole Bible in 1847, and philosopher Lydia McGrew revived and refined it in 2017.[^1] They call these links undesigned coincidences.' },
      { type: 'h2', text: 'Why did Jesus ask Philip?' },
      { type: 'p', text: 'Before feeding the five thousand, Jesus turns to one disciple and asks, “Where can we buy bread for these people to eat?” (John 6:5). Why Philip, of all the twelve? John never says.' },
      { type: 'p', text: 'Luke supplies the answer without meaning to. He places the feeding near a town called Bethsaida (Luke 9:10). John, in a different chapter, mentions in passing that Philip was from Bethsaida (John 1:44; John 12:21). Jesus asked the local man where to buy bread. Neither writer connects the dots; the dots connect themselves.[^2]' },
      { type: 'h2', text: 'Why so many people, and why green grass?' },
      { type: 'p', text: 'Mark says that before the same miracle, so many people were “coming and going” that the disciples had no time even to eat (Mark 6:31). He also notices that the crowd sat down on “the green grass” (Mark 6:39), a small detail in a dry land.' },
      { type: 'p', text: 'John explains both without referring to either. He notes that “the Jewish Feast of the Passover was near” (John 6:4). Passover falls in spring, when the hillsides by the Sea of Galilee are green, and when crowds of pilgrims would be on the roads heading toward Jerusalem.' },
      { type: 'h2', text: 'Why did they wait until evening?' },
      { type: 'p', text: 'Matthew says that “when evening came,” people brought many sick to Jesus to be healed (Matthew 8:16). Why wait all day? Mark’s account of the same day reveals that it was the Sabbath (Mark 1:21). The Sabbath ended at sundown, and only then could people carry the sick through the streets (Mark 1:32).' },
      { type: 'h2', text: 'What the argument shows, and what it doesn’t' },
      { type: 'p', text: 'One coincidence can be luck. The argument draws its strength from the number of them. Dozens of small, unforced fits across independent accounts are what we expect when writers are describing real events they knew well, and not what we expect from legend or from authors copying and embellishing each other.' },
      { type: 'p', text: 'Critics respond that some coincidences can be explained by later editing, or that the authors drew on shared traditions rather than eyewitness memory. Some proposed examples are stronger than others, and the best defenders of the argument say so themselves. The argument does not prove every detail of the Gospels. It does give a concrete, checkable reason to treat them as testimony rather than myth.' },
      { type: 'callout', title: 'Check it yourself', text: 'Hover over each reference above to read it, then read the surrounding chapters. The point of an undesigned coincidence is that you don’t have to take anyone’s word for it.' },
    ],
    footnotes: [
      { text: 'Paley, Horae Paulinae (1790); Blunt, Undesigned Coincidences (1847); McGrew, Hidden in Plain View (2017).', source: 'mcgrew' },
      { text: 'This example is discussed by both Blunt and McGrew.', source: 'blunt' },
    ],
    sources: ['mcgrew', 'blunt', 'paley'],
  },

  /* ================================================================ */
  /* Evergreen                                                         */
  /* ================================================================ */
  {
    type: 'article',
    slug: 'oldest-bible-verse-ketef-hinnom',
    topic: 'bible-manuscripts',
    photo: 'ketefHinnom',
    title: 'The oldest Bible verse ever found',
    dek: 'Two tiny silver scrolls from a Jerusalem tomb carry the priestly blessing of Numbers 6, centuries older than the Dead Sea Scrolls.',
    reading_minutes: 7,
    body: [
      { type: 'p', text: 'In 1979, a team led by archaeologist Gabriel Barkay was excavating burial caves at Ketef Hinnom, on a ridge just southwest of Jerusalem’s Old City. In a repository beneath one tomb, a young volunteer found two tiny rolled-up silver sheets. They were so fragile that unrolling them took years.' },
      { type: 'h2', text: 'What the scrolls say' },
      { type: 'p', text: 'When the silver was finally opened, it held faint Hebrew letters. Both amulets contain a version of the priestly blessing from Numbers 6:24–26: “May the LORD bless you and keep you; may the LORD cause His face to shine upon you…” They also contain the divine name, YHWH.' },
      { type: 'p', text: 'They are the oldest known artifacts to quote a passage from the Hebrew Bible, older than the earliest Dead Sea Scrolls by three to four centuries.' },
      { type: 'h2', text: 'How old are they?' },
      { type: 'p', text: 'The tomb’s pottery and the style of the letters point to the late seventh or early sixth century BC, the last decades of the kingdom of Judah, just before the Babylonian destruction of Jerusalem. Some scholars proposed a later date. In 2004, a team using new imaging techniques published a fresh edition and concluded that the script fits the late First Temple period.[^1]' },
      { type: 'h2', text: 'Why it matters' },
      { type: 'p', text: 'Some critical theories once held that much of the Pentateuch, including the priestly material in Numbers, was composed after the exile. The amulets don’t settle when Numbers was written as a whole. They do show that this blessing, in wording close to our Bibles, was known and treasured in Jerusalem before the exile, and that ordinary families carried it with them, even into the grave.' },
      { type: 'callout', title: 'A blessing that lasted', text: 'Families in Judah wore these words for protection while the Babylonian army approached. The same blessing is still spoken over congregations today.' },
    ],
    footnotes: [{ text: 'Barkay, Lundberg, Vaughn and Zuckerman, BASOR 334 (2004).', source: 'barkay2004' }],
    sources: ['barkay2004'],
  },

  /* ================================================================ */
  /* Dispatches                                                        */
  /* ================================================================ */
  {
    type: 'dispatch',
    slug: 'shiloh-2026-season-monumental-building',
    topic: 'archaeology',
    photo: 'shiloh',
    title: 'Shiloh dig uncovers more of a tabernacle-sized building and jars of burned grain',
    dek: 'The 2026 season at the site where Joshua set up the tabernacle adds a wall, gate defenses and a destruction layer to date.',
    dispatch: { label: 'Excavation news', original_outlet: 'Associates for Biblical Research', original_url: 'https://biblearchaeology.org/abr-announces-three-significant-discoveries-at-shiloh-from-2026-season/' },
    body: [
      { type: 'p', text: 'Excavators at Shiloh announced three finds from their 2026 season in June. Shiloh is where, according to Joshua 18:1, Israel set up the tabernacle, and where it stood through the days of Eli and young Samuel (1 Samuel 1:3).' },
      { type: 'p', text: 'The team, led by Dr. Scott Stripling of the Associates for Biblical Research, uncovered the southern wall of a monumental building. Its dimensions resemble those of the tabernacle, and finds associated with it include altar horns, ceramic pomegranates and murex shells, used to make purple dye. They also exposed more of the city’s northern gate complex and found three storage jars holding charred olives and wheat in a destruction layer. Radiocarbon tests on that grain should help date the destruction.[^1]' },
      { type: 'p', text: 'Why it matters: a tabernacle-sized building is suggestive, not proof, and the excavators are careful about what they claim. Dated grain from the destruction could test when Shiloh fell, a question tied to Psalm 78:60 and Jeremiah 7:12.' },
    ],
    footnotes: [{ text: 'Associates for Biblical Research, June 22, 2026.', source: 'abr_shiloh' }],
    sources: ['abr_shiloh'],
  },
  {
    type: 'dispatch',
    slug: 'city-of-david-babylonian-destruction-beams',
    topic: 'archaeology',
    photo: 'cityOfDavid',
    title: 'Charred roof beams from Babylon’s burning of Jerusalem found in the City of David',
    dek: 'Melted plaster sealed the timbers when the roof collapsed in 586 BC. Their tree rings may date the destruction more tightly than ever.',
    dispatch: { label: 'Excavation news', original_outlet: 'Archaeology Magazine', original_url: 'https://archaeologymag.com/2026/07/wooden-beams-from-jerusalems-first-temple-destruction/' },
    body: [
      { type: 'p', text: 'Excavators from the Israel Antiquities Authority and Tel Aviv University have found burned wooden beams in the Givati Parking Lot dig in the City of David. The beams appear to have roofed an inner courtyard. When the building burned, the roof fell in, and the heat melted the wall plaster, which poured over the charred wood and sealed it under the rubble.[^1]' },
      { type: 'p', text: 'The destruction is linked to the Babylonian conquest of Jerusalem in 586 BC, described in 2 Kings 25:9: Nebuchadnezzar’s commander burned the house of the LORD, the royal palace and every significant building in Jerusalem. The beams have many visible growth rings, which researchers hope could narrow their dating to about a decade. They also plan to identify the tree species.' },
      { type: 'p', text: 'Some outlets have described these as beams “from Solomon’s Temple.” The excavators have not said that. The building lies in the City of David, south of the Temple Mount. What the find does offer is a vivid, physical record of the fire the Bible describes.' },
    ],
    footnotes: [{ text: 'Archaeology Magazine, July 22, 2026.', source: 'arch_beams' }],
    sources: ['arch_beams'],
  },
  {
    type: 'dispatch',
    slug: 'tel-eton-standing-stone-hezekiah-reform',
    topic: 'archaeology',
    photo: 'telEton',
    title: 'A standing stone laid on its side may show Hezekiah’s reform reached Judah’s homes',
    dek: 'At Tel ‘Eton, a 750-kilogram cultic pillar was carefully decommissioned, not smashed, before the Assyrians destroyed the town.',
    dispatch: { label: 'Scholarship', original_outlet: 'Popular Archaeology / Jerusalem Journal of Archaeology', original_url: 'https://popular-archaeology.com/article/bar-ilan-university-study-suggests-2700-year-old-standing-stone-massebah-may-provide-fresh-evidence-for-king-hezekiahs-religious-reforms/' },
    body: [
      { type: 'p', text: 'A new study by Prof. Avraham Faust of Bar-Ilan University suggests that a standing stone found at Tel ‘Eton, in the Judean lowlands, may be evidence of King Hezekiah’s religious reform.[^1]' },
      { type: 'p', text: 'The stone, about 1.4 meters tall and weighing about 750 kilograms, once stood in the largest room of a large residence known as Building 101. At some point its owners laid it on its side and built a stone platform around it, before the Assyrians destroyed the town at the end of the eighth century BC. 2 Kings 18:4 says Hezekiah “removed the high places, shattered the sacred pillars, and cut down the Asherah poles.”' },
      { type: 'p', text: 'Faust argues the reform may have reached household worship, not only public shrines like those at Arad and Beersheba. The stone was put out of use but treated with respect, not smashed. He does not claim proof, and evidence for Hezekiah’s reform remains debated. The timing, though, fits his reign.' },
    ],
    footnotes: [{ text: 'Popular Archaeology, June 16, 2026, on Faust’s study in the Jerusalem Journal of Archaeology.', source: 'faust_eton' }],
    sources: ['faust_eton'],
  },
];
