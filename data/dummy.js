/**
 * Stage 1 dummy data.
 *
 * Shaped like the future Supabase tables so the pages won't change when the
 * real database replaces this file:
 *
 *   authors  (id, slug, name, role, bio)
 *   topics   (id, slug, name, description, sort)
 *   sources  (id, kind 'primary'|'secondary', citation fields, url)
 *   posts    (id, type 'article'|'dispatch'|'video'|'claim', slug, title, dek,
 *             topic_id, author_id, status, published_at, updated_at, featured,
 *             hero, body (blocks), footnotes, source_ids, corrections,
 *             + one type-specific JSON column: video | claim | dispatch)
 *
 * Body blocks: p, h2, h3, quote, list, callout, figure.
 * Inline text: *italic*, **bold**, [^n] footnote markers. Scripture references
 * ("John 1:1–3") are detected automatically and become hover popovers.
 *
 * Historical content is written to be accurate but is SAMPLE copy for layout
 * work. Dispatches are placeholders, not real news.
 */

export const authors = [
  {
    id: 'a1',
    slug: 'editor',
    name: 'The Editor',
    role: 'Founder & Editor',
    bio: '[Your bio: background, why you started Sifted Truth, and what readers can expect.]',
  },
];

export const topics = [
  {
    id: 't1',
    slug: 'apologetics',
    name: 'Apologetics',
    description: 'Arguments for the faith, weighed fairly against the strongest objections.',
  },
  {
    id: 't2',
    slug: 'archaeology',
    name: 'Archaeology',
    description: 'Sites, inscriptions and finds that touch the biblical world.',
  },
  {
    id: 't3',
    slug: 'church-history',
    name: 'Church History',
    description: 'Two thousand years of councils, schisms, saints and scholars.',
  },
  {
    id: 't4',
    slug: 'bible-manuscripts',
    name: 'Bible & Manuscripts',
    description: 'How the text came to us, copy by copy and language by language.',
  },
];

export const sources = [
  // Tel Dan
  {
    id: 's1',
    kind: 'primary',
    author: 'Avraham Biran and Joseph Naveh',
    title: 'An Aramaic Stele Fragment from Tel Dan',
    publication: 'Israel Exploration Journal 43',
    year: 1993,
    pages: '81–98',
  },
  {
    id: 's2',
    kind: 'primary',
    author: 'Avraham Biran and Joseph Naveh',
    title: 'The Tel Dan Inscription: A New Fragment',
    publication: 'Israel Exploration Journal 45',
    year: 1995,
    pages: '1–18',
  },
  {
    id: 's3',
    kind: 'secondary',
    author: 'Hallvard Hagelia',
    title: 'The Dan Debate: The Tel Dan Inscription in Recent Research',
    publication: 'Sheffield Phoenix Press',
    year: 2009,
  },
  {
    id: 's4',
    kind: 'secondary',
    author: 'K. A. Kitchen',
    title: 'On the Reliability of the Old Testament',
    publication: 'Eerdmans',
    year: 2003,
  },
  {
    id: 's5',
    kind: 'secondary',
    author: 'André Lemaire',
    title: '“House of David” Restored in Moabite Inscription',
    publication: 'Biblical Archaeology Review 20:3',
    year: 1994,
  },
  // Resurrection creed
  {
    id: 's6',
    kind: 'secondary',
    author: 'Gary R. Habermas and Michael R. Licona',
    title: 'The Case for the Resurrection of Jesus',
    publication: 'Kregel',
    year: 2004,
  },
  {
    id: 's7',
    kind: 'secondary',
    author: 'Gerd Lüdemann',
    title: 'The Resurrection of Jesus: History, Experience, Theology',
    publication: 'Fortress Press',
    year: 1994,
  },
  {
    id: 's8',
    kind: 'secondary',
    author: 'James D. G. Dunn',
    title: 'Jesus Remembered',
    publication: 'Eerdmans',
    year: 2003,
  },
  {
    id: 's9',
    kind: 'secondary',
    author: 'Bart D. Ehrman',
    title: 'How Jesus Became God',
    publication: 'HarperOne',
    year: 2014,
  },
  // Nicaea
  {
    id: 's10',
    kind: 'primary',
    author: 'Eusebius of Caesarea',
    title: 'Life of Constantine',
    publication: 'Book III',
    year: null,
  },
  {
    id: 's11',
    kind: 'primary',
    author: 'Socrates Scholasticus',
    title: 'Ecclesiastical History',
    publication: 'Book I',
    year: null,
  },
  {
    id: 's12',
    kind: 'secondary',
    author: 'Lewis Ayres',
    title: 'Nicaea and Its Legacy',
    publication: 'Oxford University Press',
    year: 2004,
  },
  {
    id: 's13',
    kind: 'secondary',
    author: 'Bruce M. Metzger',
    title: 'The Canon of the New Testament',
    publication: 'Oxford University Press',
    year: 1987,
  },
  // Isaiah scroll
  {
    id: 's14',
    kind: 'primary',
    author: 'Great Isaiah Scroll (1QIsaᵃ)',
    title: 'Qumran Cave 1',
    publication: 'Israel Museum, Shrine of the Book',
    year: null,
  },
  {
    id: 's15',
    kind: 'secondary',
    author: 'Emanuel Tov',
    title: 'Textual Criticism of the Hebrew Bible, 3rd ed.',
    publication: 'Fortress Press',
    year: 2012,
  },
  {
    id: 's16',
    kind: 'secondary',
    author: 'Martin Abegg Jr., Peter Flint and Eugene Ulrich',
    title: 'The Dead Sea Scrolls Bible',
    publication: 'HarperSanFrancisco',
    year: 1999,
  },
  // Exodus date
  {
    id: 's17',
    kind: 'secondary',
    author: 'James K. Hoffmeier',
    title: 'Israel in Egypt',
    publication: 'Oxford University Press',
    year: 1997,
  },
  {
    id: 's18',
    kind: 'secondary',
    author: 'Bryant G. Wood',
    title: 'The Rise and Fall of the 13th-Century Exodus-Conquest Theory',
    publication: 'Journal of the Evangelical Theological Society 48:3',
    year: 2005,
  },
];

export const posts = [
  /* ------------------------------------------------------------------ */
  /* Articles                                                            */
  /* ------------------------------------------------------------------ */
  {
    id: 'p1',
    type: 'article',
    slug: 'tel-dan-stele-house-of-david',
    title: 'What the Tel Dan Stele does — and doesn’t — tell us about the House of David',
    dek: 'A careful reading of one of the most cited inscriptions in biblical archaeology, separating what the stone says from what has been claimed about it.',
    topic_id: 't2',
    author_id: 'a1',
    status: 'published',
    featured: true,
    published_at: '2026-10-04T13:00:00Z',
    updated_at: '2026-10-05T09:30:00Z',
    reading_minutes: 14,
    hero: {
      src: null,
      alt: 'Fragments of the Tel Dan Stele',
      caption: 'The Tel Dan Stele fragments, now in the Israel Museum, Jerusalem.',
      credit: '[Photo credit]',
    },
    body: [
      {
        type: 'p',
        text: 'In the summer of 1993, a team excavating at Tel Dan in northern Israel noticed a piece of inscribed basalt reused in a later wall. Within a year, two smaller fragments had turned up nearby. Together they preserve part of a ninth-century BC Aramaic victory inscription, and one short phrase on it has been argued over ever since: *bytdwd*, “House of David.”[^1]',
      },
      {
        type: 'p',
        text: 'Before 1993, some scholars doubted that David was anything more than a literary figure. The stele changed the shape of that conversation. But it is worth slowing down to ask what the stone actually says, and what it can and cannot carry.',
      },
      { type: 'h2', text: 'What the inscription says' },
      {
        type: 'p',
        text: 'The text is written in the voice of an Aramean king, most often identified as Hazael of Damascus. He boasts of killing a king of Israel and a king of the “House of David.” The names are damaged, but the most common restoration reads them as Joram son of Ahab and Ahaziah son of Joram, the same pair who appear together at war with Hazael in 2 Kings 8:28.[^2]',
      },
      {
        type: 'quote',
        text: '[I killed Jo]ram son of [Ahab], king of Israel, and [I] killed [Ahaz]iah son of [Joram, kin]g of the House of David.',
        cite: 'Tel Dan Stele (restored; brackets mark damaged text)',
      },
      {
        type: 'p',
        text: 'The phrase “House of David” works the way “House of Omri” does in Assyrian records: a dynasty named for its founder. That is the significance. A foreign enemy, writing perhaps 150 years after David’s reign, names the Judean royal line after him — the very promise of a lasting house that 2 Samuel 7:16 puts at the center of David’s story.',
      },
      { type: 'h2', text: 'Where the Bible and the stele differ' },
      {
        type: 'p',
        text: 'The stele and Scripture do not tell the story the same way. In 2 Kings 9:24, it is Jehu, not Hazael, who kills Joram, and Jehu’s men also kill Ahaziah. Scholars have offered several explanations: Hazael may be claiming credit for a coup he encouraged, Jehu may have acted as his ally, or the stele may simply be royal propaganda, which ancient victory inscriptions very often are.[^3]',
      },
      {
        type: 'callout',
        title: 'Our read',
        text: 'The difference is real and worth stating plainly. It does not undermine the stele’s main value, which is the dynastic name, but it is a good reminder that ancient kings wrote to impress, not to footnote.',
      },
      { type: 'h2', text: 'The objections, fairly stated' },
      {
        type: 'p',
        text: 'A minority of scholars questioned the reading early on. Some noted that *bytdwd* lacks the word divider the scribe uses elsewhere, and suggested it named a place or a temple rather than a dynasty. Others raised questions about how the fragments were found. These objections have been examined at length, and the dynastic reading is now the clear majority view, though not a unanimous one.[^4]',
      },
      {
        type: 'p',
        text: 'A related claim is that the Mesha Stele, from Moab, also mentions the House of David. That reading, proposed by André Lemaire in 1994, depends on damaged letters and remains genuinely debated.[^5]',
      },
      { type: 'h2', text: 'What it doesn’t prove' },
      {
        type: 'p',
        text: 'The stele is strong evidence that a dynasty traced itself to a founder named David and was known by that name to its neighbors within a few generations. It does not, on its own, confirm the size of David’s kingdom or the details of any particular story about him. Holding those two things apart is exactly what careful readers should do — the Bereans of Acts 17:11 were commended for examining things to see whether they were so.',
      },
    ],
    footnotes: [
      { n: 1, text: 'Biran and Naveh, “An Aramaic Stele Fragment from Tel Dan,” 81–98.', source_id: 's1' },
      { n: 2, text: 'Biran and Naveh, “The Tel Dan Inscription: A New Fragment,” 1–18.', source_id: 's2' },
      { n: 3, text: 'Kitchen, On the Reliability of the Old Testament.', source_id: 's4' },
      { n: 4, text: 'Hagelia, The Dan Debate, surveys the full range of readings.', source_id: 's3' },
      { n: 5, text: 'Lemaire, “House of David Restored in Moabite Inscription.”', source_id: 's5' },
    ],
    source_ids: ['s1', 's2', 's3', 's4', 's5'],
    corrections: [
      {
        date: '2026-10-05',
        text: 'An earlier version gave the discovery year of the two smaller fragments as 1993. They were found in 1994.',
      },
    ],
  },
  {
    id: 'p2',
    type: 'article',
    slug: 'why-historians-date-the-corinthian-creed-early',
    title: 'Why historians date the creed in 1 Corinthians 15 so early',
    dek: 'Paul quotes a summary of the faith he says he “received.” Scholars across the spectrum agree it is very old. Here is why, and what that does and doesn’t establish.',
    topic_id: 't1',
    author_id: 'a1',
    status: 'published',
    featured: false,
    published_at: '2026-10-01T13:00:00Z',
    updated_at: '2026-10-01T13:00:00Z',
    reading_minutes: 11,
    hero: {
      src: null,
      alt: 'An early papyrus page of Paul’s letters',
      caption: 'A page from an early papyrus codex of Paul’s letters.',
      credit: '[Photo credit]',
    },
    body: [
      {
        type: 'p',
        text: 'Paul wrote 1 Corinthians in the mid-50s AD. In chapter 15, he pauses to remind the church of something he had passed on to them, something he says he had himself received. What follows in 1 Corinthians 15:3–8 reads less like Paul’s own prose and more like a compact, memorized summary.[^1]',
      },
      { type: 'h2', text: 'The marks of an older tradition' },
      {
        type: 'p',
        text: 'Several features point to a formula Paul is quoting rather than composing. “Received” and “delivered” were standard terms for handing on tradition. The lines are balanced and repetitive (“and that… and that…”), the names are Aramaic forms like *Cephas*, and the vocabulary is unusual for Paul.[^2]',
      },
      {
        type: 'p',
        text: 'Paul also tells us when he had the opportunity to receive it. In Galatians 1:18, he describes visiting Jerusalem three years after his conversion and staying fifteen days with Peter. Many scholars think that visit, or one close to it, is where Paul learned this summary.',
      },
      {
        type: 'callout',
        title: 'Across the spectrum',
        text: 'This is not only an apologist’s argument. Critical scholars such as Gerd Lüdemann and Bart Ehrman also date the tradition behind the creed very early, within a few years of the crucifixion.',
      },
      { type: 'h2', text: 'What early dating does establish' },
      {
        type: 'p',
        text: 'If the creed was formulated within a few years of Jesus’ death, then the belief that he had died, been buried and appeared alive to named individuals and groups was not a late legend. It was there at the start, and Paul even notes that most of the five hundred witnesses were still living, an open invitation to check.[^3]',
      },
      { type: 'h2', text: 'What it doesn’t establish on its own' },
      {
        type: 'p',
        text: 'Early belief is not the same as a proven event. Historians who accept the early date still disagree about what the first followers experienced. Ehrman, for example, accepts that followers sincerely believed they saw Jesus but does not conclude he rose.[^4] The creed sets the starting point for that debate; it does not end it.',
      },
    ],
    footnotes: [
      { n: 1, text: 'Dunn, Jesus Remembered, on the resurrection traditions.', source_id: 's8' },
      { n: 2, text: 'Habermas and Licona, The Case for the Resurrection of Jesus.', source_id: 's6' },
      { n: 3, text: 'Lüdemann, The Resurrection of Jesus.', source_id: 's7' },
      { n: 4, text: 'Ehrman, How Jesus Became God.', source_id: 's9' },
    ],
    source_ids: ['s6', 's7', 's8', 's9'],
    corrections: [],
  },
  {
    id: 'p3',
    type: 'article',
    slug: 'what-the-council-of-nicaea-actually-decided',
    title: 'What the Council of Nicaea actually decided — and what it didn’t',
    dek: 'In AD 325 the bishops met to settle a dispute about Christ. They did not choose the books of the Bible.',
    topic_id: 't3',
    author_id: 'a1',
    status: 'published',
    featured: false,
    published_at: '2026-09-27T13:00:00Z',
    updated_at: '2026-09-27T13:00:00Z',
    reading_minutes: 9,
    hero: {
      src: null,
      alt: 'An icon depicting the First Council of Nicaea',
      caption: 'A later icon depicting the First Council of Nicaea.',
      credit: '[Image credit]',
    },
    body: [
      {
        type: 'p',
        text: 'The emperor Constantine summoned bishops from across the empire to Nicaea in AD 325. The pressing issue was the teaching of Arius, a presbyter in Alexandria, who held that the Son was a created being and that “there was when he was not.”[^1]',
      },
      { type: 'h2', text: 'The decision' },
      {
        type: 'p',
        text: 'The council rejected Arius’ view and issued a creed confessing the Son to be *homoousios*, “of the same substance,” with the Father. The bishops pointed to texts such as John 1:1–3, where the Word is with God, is God, and is the one through whom all things were made.',
      },
      {
        type: 'p',
        text: 'The council also addressed practical matters: how to calculate the date of Easter, a schism in Egypt, and twenty canons on church order.[^2]',
      },
      { type: 'h2', text: 'What it didn’t do' },
      {
        type: 'p',
        text: 'None of the surviving records of the council — its creed, its canons, or the accounts by people who were there — discuss which books belong in the Bible. The idea that Nicaea “chose the canon” is a much later story. The New Testament canon took shape gradually, through use in the churches, well before and after 325.[^3]',
      },
    ],
    footnotes: [
      { n: 1, text: 'Socrates Scholasticus, Ecclesiastical History, Book I.', source_id: 's11' },
      { n: 2, text: 'Ayres, Nicaea and Its Legacy.', source_id: 's12' },
      { n: 3, text: 'Metzger, The Canon of the New Testament.', source_id: 's13' },
    ],
    source_ids: ['s10', 's11', 's12', 's13'],
    corrections: [],
  },
  {
    id: 'p4',
    type: 'article',
    slug: 'the-great-isaiah-scroll-and-the-hebrew-text',
    title: 'The Great Isaiah Scroll and a thousand years of copying',
    dek: 'Found in 1947, the scroll let scholars compare Isaiah across a millennium of hand copying. What did they find?',
    topic_id: 't4',
    author_id: 'a1',
    status: 'published',
    featured: false,
    published_at: '2026-09-22T13:00:00Z',
    updated_at: '2026-09-22T13:00:00Z',
    reading_minutes: 8,
    hero: {
      src: null,
      alt: 'A column of the Great Isaiah Scroll',
      caption: 'A column of the Great Isaiah Scroll (1QIsaᵃ).',
      credit: '[Image credit]',
    },
    body: [
      {
        type: 'p',
        text: 'Before the Dead Sea Scrolls, the oldest complete Hebrew manuscripts of Isaiah came from the medieval period. The Great Isaiah Scroll, found in Qumran Cave 1 in 1947, is usually dated to the second century BC — roughly a thousand years earlier.[^1]',
      },
      { type: 'h2', text: 'What the comparison showed' },
      {
        type: 'p',
        text: 'The scroll is strikingly close to the later Masoretic text. Most differences are in spelling and grammar. There are meaningful variants too, and some have been adopted by modern translations, but none changes the book’s substance.[^2]',
      },
      {
        type: 'p',
        text: 'For readers, it is a vivid illustration of Isaiah 40:8 — and an equally vivid reminder that textual criticism is careful work, not a slogan.',
      },
    ],
    footnotes: [
      { n: 1, text: 'Abegg, Flint and Ulrich, The Dead Sea Scrolls Bible.', source_id: 's16' },
      { n: 2, text: 'Tov, Textual Criticism of the Hebrew Bible, 3rd ed.', source_id: 's15' },
    ],
    source_ids: ['s14', 's15', 's16'],
    corrections: [],
  },

  /* ------------------------------------------------------------------ */
  /* Dispatches (placeholders — not real news)                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'd1',
    type: 'dispatch',
    slug: 'excavation-season-wraps-northern-tell',
    title: '[Sample] Excavation season wraps at a northern Israel tell',
    dek: 'A short news brief: what was found, who found it, and why it matters.',
    topic_id: 't2',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-05T19:00:00Z',
    updated_at: '2026-10-05T19:00:00Z',
    dispatch: { label: 'Excavation news', original_outlet: '[Original outlet]', original_url: null },
    body: [
      {
        type: 'p',
        text: 'Sample dispatch. Dispatches are short briefs: two or three paragraphs summarizing a new find, publication or claim, with a link to the original report and a line on why it matters to readers.',
      },
      {
        type: 'p',
        text: 'Scripture references still work here, so a brief on a dig at Dan can point readers to 1 Kings 12:29.',
      },
    ],
    footnotes: [],
    source_ids: [],
    corrections: [],
  },
  {
    id: 'd2',
    type: 'dispatch',
    slug: 'papyrus-fragment-newly-published',
    title: '[Sample] A New Testament papyrus fragment is newly published',
    dek: 'A short news brief on a manuscript publication.',
    topic_id: 't4',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-04T15:00:00Z',
    updated_at: '2026-10-04T15:00:00Z',
    dispatch: { label: 'Manuscripts', original_outlet: '[Original outlet]', original_url: null },
    body: [
      {
        type: 'p',
        text: 'Sample dispatch. Replace with a summary of the publication, its date range, and what scholars are saying about it.',
      },
    ],
    footnotes: [],
    source_ids: [],
    corrections: [],
  },
  {
    id: 'd3',
    type: 'dispatch',
    slug: 'viral-claim-checked',
    title: '[Sample] A viral claim, checked against the sources',
    dek: 'A short brief responding to something circulating online.',
    topic_id: 't1',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-03T15:00:00Z',
    updated_at: '2026-10-03T15:00:00Z',
    dispatch: { label: 'In the headlines', original_outlet: '[Original outlet]', original_url: null },
    body: [
      {
        type: 'p',
        text: 'Sample dispatch. Quick responses like this can link to a full Claims Examined review when one exists.',
      },
    ],
    footnotes: [],
    source_ids: [],
    corrections: [],
  },
  {
    id: 'd4',
    type: 'dispatch',
    slug: 'what-early-councils-debated',
    title: '[Sample] Conference papers revisit what the early councils debated',
    dek: 'A short brief on new scholarship.',
    topic_id: 't3',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-02T15:00:00Z',
    updated_at: '2026-10-02T15:00:00Z',
    dispatch: { label: 'Church history', original_outlet: '[Original outlet]', original_url: null },
    body: [{ type: 'p', text: 'Sample dispatch. Replace with your reporting.' }],
    footnotes: [],
    source_ids: [],
    corrections: [],
  },

  /* ------------------------------------------------------------------ */
  /* Videos                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: 'v1',
    type: 'video',
    slug: 'walking-tel-dan',
    title: 'Walking Tel Dan: the gate, the high place and the stele',
    dek: 'An on-site tour of the city where the “House of David” inscription was found.',
    topic_id: 't2',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-03T12:00:00Z',
    updated_at: '2026-10-03T12:00:00Z',
    video: {
      youtube_id: null, // e.g. 'dQw4w9WgXcQ' — the 11-character id from the YouTube URL
      duration: '24:10',
      series: 'On Site',
      chapters: [
        { t: '0:00', label: 'Arriving at Tel Dan' },
        { t: '3:40', label: 'The Middle Bronze Age gate' },
        { t: '9:15', label: 'The cult platform of Jeroboam' },
        { t: '15:30', label: 'Where the stele was found' },
        { t: '21:05', label: 'What it means' },
      ],
      transcript: [
        { type: 'p', text: '[Transcript placeholder. Paste or import the episode transcript here.]' },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'We walk the site from the springs to the gate complex, stop at the platform associated with Jeroboam’s shrine (1 Kings 12:29), and stand where the stele fragments were recovered.',
      },
    ],
    footnotes: [],
    source_ids: ['s1', 's3'],
    corrections: [],
  },
  {
    id: 'v2',
    type: 'video',
    slug: 'did-nicaea-choose-the-bible',
    title: 'Did the Council of Nicaea choose the Bible?',
    dek: 'Testing a claim that won’t go away against what the council’s own records say.',
    topic_id: 't3',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-09-29T12:00:00Z',
    updated_at: '2026-09-29T12:00:00Z',
    video: {
      youtube_id: null,
      duration: '18:45',
      series: 'Claims Examined',
      chapters: [
        { t: '0:00', label: 'The claim' },
        { t: '4:20', label: 'What the records say' },
        { t: '11:00', label: 'How the canon formed' },
      ],
      transcript: [{ type: 'p', text: '[Transcript placeholder.]' }],
    },
    body: [
      {
        type: 'p',
        text: 'Companion video to our Claims Examined review. The full written review, with sources, is linked below.',
      },
    ],
    footnotes: [],
    source_ids: ['s12', 's13'],
    corrections: [],
  },
  {
    id: 'v3',
    type: 'video',
    slug: 'conversation-on-the-dead-sea-scrolls',
    title: '[Sample] A conversation on the Dead Sea Scrolls',
    dek: 'An interview with a scholar about what the scrolls changed — and what they didn’t.',
    topic_id: 't4',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-09-24T12:00:00Z',
    updated_at: '2026-09-24T12:00:00Z',
    video: {
      youtube_id: null,
      duration: '31:02',
      series: 'Conversations',
      chapters: [{ t: '0:00', label: 'Introductions' }],
      transcript: [{ type: 'p', text: '[Transcript placeholder.]' }],
    },
    body: [{ type: 'p', text: '[Guest name and show notes placeholder.]' }],
    footnotes: [],
    source_ids: [],
    corrections: [],
  },

  /* ------------------------------------------------------------------ */
  /* Claims Examined                                                     */
  /* ------------------------------------------------------------------ */
  {
    id: 'c1',
    type: 'claim',
    slug: 'tel-dan-stele-house-of-david',
    title: 'The Tel Dan Stele refers to the “House of David.”',
    dek: 'Does a ninth-century BC inscription really name David’s dynasty?',
    topic_id: 't2',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-10-02T12:00:00Z',
    updated_at: '2026-10-02T12:00:00Z',
    claim: {
      statement: 'The Tel Dan Stele refers to the “House of David.”',
      origin: 'Widely cited in apologetics and in popular coverage of biblical archaeology since 1993.',
      rating: 'well_supported',
      confidence: 'high',
      summary:
        'The phrase bytdwd is clearly legible on the main fragment, and the dynastic reading “House of David” is the strong majority view among epigraphers. Alternative readings exist but have not gained wide acceptance.',
      evidence_for: [
        'The letters are clear on the main fragment, published by the excavators in 1993.',
        '“House of X” is a standard way to name a dynasty in the period, as with “House of Omri.”',
        'The context pairs it with the “king of Israel,” fitting the two kingdoms of 2 Kings 8:28.',
      ],
      evidence_against: [
        'There is no word divider between “house” and “David,” which some read as a place name.',
        'A minority questioned the excavation context of the fragments.',
      ],
      reviewed_at: '2026-10-02',
      history: [{ date: '2026-10-02', text: 'First published.' }],
    },
    body: [
      {
        type: 'p',
        text: 'See our long read on the stele for the full discussion, including where the inscription and 2 Kings 9:24 tell the story differently.',
      },
    ],
    footnotes: [],
    source_ids: ['s1', 's2', 's3', 's4'],
    corrections: [],
    related_slug: 'tel-dan-stele-house-of-david',
  },
  {
    id: 'c2',
    type: 'claim',
    slug: 'exodus-dated-to-1446-bc',
    title: 'The Exodus can be firmly dated to 1446 BC.',
    dek: 'An early date and a late date both have serious defenders.',
    topic_id: 't2',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-09-30T12:00:00Z',
    updated_at: '2026-09-30T12:00:00Z',
    claim: {
      statement: 'The Exodus can be firmly dated to 1446 BC.',
      origin: 'Derived from the 480 years of 1 Kings 6:1, counted back from Solomon’s fourth year.',
      rating: 'debated',
      confidence: 'moderate',
      summary:
        'Scholars who accept a historical Exodus divide mainly between an early date (mid-15th century BC) and a late date (13th century BC). Each reads the biblical numbers and the archaeological evidence differently. “Firmly” overstates the case.',
      evidence_for: [
        '1 Kings 6:1 gives 480 years from the Exodus to the temple’s founding, pointing to about 1446 BC.',
        'Defenders argue destruction evidence at some Canaanite sites fits the early date.',
      ],
      evidence_against: [
        'Exodus 1:11 names Rameses as a store city, a name associated with the 13th-century pharaohs.',
        'Many read the 480 years as a schematic number (12 generations of 40 years).',
      ],
      reviewed_at: '2026-09-30',
      history: [{ date: '2026-09-30', text: 'First published.' }],
    },
    body: [],
    footnotes: [],
    source_ids: ['s4', 's17', 's18'],
    corrections: [],
  },
  {
    id: 'c3',
    type: 'claim',
    slug: 'nicaea-chose-the-books-of-the-bible',
    title: 'The Council of Nicaea decided which books belong in the Bible.',
    dek: 'A popular claim, checked against the council’s own records.',
    topic_id: 't3',
    author_id: 'a1',
    status: 'published',
    published_at: '2026-09-28T12:00:00Z',
    updated_at: '2026-09-28T12:00:00Z',
    claim: {
      statement: 'The Council of Nicaea decided which books belong in the Bible.',
      origin: 'Repeated in popular books, films and social media posts.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'No surviving record of the council — its creed, its canons, or eyewitness accounts — discusses the biblical canon. The council addressed the Arian controversy, the date of Easter and church order.',
      evidence_for: ['None from the council’s records or from contemporary accounts.'],
      evidence_against: [
        'The creed and the twenty canons say nothing about which books are Scripture.',
        'Eusebius, who attended, describes the proceedings without mentioning the canon.',
        'Lists of New Testament books both before and after 325 show a gradual process.',
      ],
      reviewed_at: '2026-09-28',
      history: [{ date: '2026-09-28', text: 'First published.' }],
    },
    body: [],
    footnotes: [],
    source_ids: ['s10', 's11', 's12', 's13'],
    corrections: [],
  },
];
