/**
 * Launch content: Claims Examined reviews.
 * Run `node scripts/generate-content.mjs` to turn this into
 * supabase/content/launch-claims.sql, then run that file in the Supabase SQL Editor.
 * Posts are inserted as DRAFTS so they can be reviewed and published from the studio.
 */

export const sources = {
  // Historical Jesus
  tacitus: { kind: 'primary', author: 'Tacitus', title: 'Annals', publication: 'Book 15.44 (c. AD 116)' },
  josephus_ant: { kind: 'primary', author: 'Flavius Josephus', title: 'Antiquities of the Jews', publication: 'c. AD 93–94', url: 'https://www.gutenberg.org/ebooks/2848' },
  pliny: { kind: 'primary', author: 'Pliny the Younger', title: 'Letters', publication: 'Book 10.96 (c. AD 112)' },
  ehrman_exist: { kind: 'secondary', author: 'Bart D. Ehrman', title: 'Did Jesus Exist? The Historical Argument for Jesus of Nazareth', publication: 'HarperOne', year: 2012 },
  carrier: { kind: 'secondary', author: 'Richard Carrier', title: 'On the Historicity of Jesus', publication: 'Sheffield Phoenix Press', year: 2014 },
  // Gospel dating
  eusebius_eh: { kind: 'primary', author: 'Eusebius of Caesarea', title: 'Ecclesiastical History', publication: 'Book 3.39 (quoting Papias)' },
  robinson: { kind: 'secondary', author: 'John A. T. Robinson', title: 'Redating the New Testament', publication: 'SCM Press', year: 1976 },
  nongbri: { kind: 'secondary', author: 'Brent Nongbri', title: 'The Use and Abuse of P52', publication: 'Harvard Theological Review 98', year: 2005, pages: '23–48' },
  // Isaiah
  isaiah_scroll: { kind: 'primary', author: 'Great Isaiah Scroll (1QIsaᵃ)', title: 'Qumran Cave 1', publication: 'Israel Museum, Shrine of the Book', url: 'https://www.imj.org.il/en/wings/shrine-book/dead-sea-scrolls' },
  abegg: { kind: 'secondary', author: 'Martin Abegg Jr., Peter Flint and Eugene Ulrich', title: 'The Dead Sea Scrolls Bible', publication: 'HarperSanFrancisco', year: 1999 },
  tov: { kind: 'secondary', author: 'Emanuel Tov', title: 'Textual Criticism of the Hebrew Bible, 3rd ed.', publication: 'Fortress Press', year: 2012 },
  // David
  tel_dan: { kind: 'primary', author: 'Avraham Biran and Joseph Naveh', title: 'An Aramaic Stele Fragment from Tel Dan', publication: 'Israel Exploration Journal 43', year: 1993, pages: '81–98' },
  kitchen: { kind: 'secondary', author: 'K. A. Kitchen', title: 'On the Reliability of the Old Testament', publication: 'Eerdmans', year: 2003 },
  finkelstein: { kind: 'secondary', author: 'Israel Finkelstein and Neil Asher Silberman', title: 'David and Solomon', publication: 'Free Press', year: 2006 },
  garfinkel: { kind: 'secondary', author: 'Yosef Garfinkel, Saar Ganor and Michael G. Hasel', title: 'In the Footsteps of King David', publication: 'Thames & Hudson', year: 2018 },
  // Noah
  jpost_ark: { kind: 'secondary', author: 'Jerusalem Post', title: 'Researchers claim radar scan reveals “man-made” structure at Turkey site', publication: 'Oct. 3, 2026', url: 'https://www.jpost.com/archaeology/article-910413' },
  arkeonews: { kind: 'secondary', author: 'Arkeonews', title: 'Noah’s Ark Mystery Deepens as New Discoveries Emerge Near Mount Ararat', publication: 'Sept. 23, 2026', url: 'https://arkeonews.net/noahs-ark-mystery-deepens-as-new-discoveries-emerge-near-mount-ararat/' },
  fox_drill: { kind: 'secondary', author: 'Fox News', title: 'Noah’s Ark team finds no bedrock in Turkey boat-shaped formation drill', publication: '2026', url: 'https://www.foxnews.com/media/noahs-ark-researchers-inching-towards-confirmation-drilling-challenges-natural-rock-theory' },
  collins_fasold: { kind: 'secondary', author: 'Lorence G. Collins and David F. Fasold', title: 'Bogus “Noah’s Ark” from Turkey Exposed as a Common Geologic Structure', publication: 'Journal of Geoscience Education 44', year: 1996 },
  // Jericho
  wood_bar: { kind: 'secondary', author: 'Bryant G. Wood', title: 'Did the Israelites Conquer Jericho? A New Look at the Archaeological Evidence', publication: 'Biblical Archaeology Review 16:2', year: 1990, pages: '44–58' },
  bruins: { kind: 'primary', author: 'Hendrik J. Bruins and Johannes van der Plicht', title: 'Tell es-Sultan (Jericho): Radiocarbon Results of Short-Lived Cereal and Multiyear Charcoal Samples from the End of the Middle Bronze Age', publication: 'Radiocarbon 37:2', year: 1995, pages: '213–220', url: 'https://repository.arizona.edu/handle/10150/653465' },
  kenyon: { kind: 'secondary', author: 'Kathleen M. Kenyon', title: 'Digging Up Jericho', publication: 'Ernest Benn', year: 1957 },
  // Prophecy
  mcdowell: { kind: 'secondary', author: 'Josh McDowell and Sean McDowell', title: 'Evidence That Demands a Verdict', publication: 'Thomas Nelson', year: 2017 },
  // Nicaea
  eusebius_vc: { kind: 'primary', author: 'Eusebius of Caesarea', title: 'Life of Constantine', publication: 'Book III' },
  ayres: { kind: 'secondary', author: 'Lewis Ayres', title: 'Nicaea and Its Legacy', publication: 'Oxford University Press', year: 2004 },
  metzger: { kind: 'secondary', author: 'Bruce M. Metzger', title: 'The Canon of the New Testament', publication: 'Oxford University Press', year: 1987 },
  athanasius: { kind: 'primary', author: 'Athanasius of Alexandria', title: 'Festal Letter 39', publication: 'AD 367' },
};

const today = '2026-10-06';

export const claims = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'jesus-never-existed',
    photo: 'tacitus',
    topic: 'apologetics',
    title: 'Jesus never existed.',
    dek: 'Was Jesus of Nazareth a real person? Here is what ancient sources, friendly and hostile, actually say.',
    claim: {
      statement: 'Jesus never existed.',
      origin:
        'The “Christ myth” theory, popular online and in documentaries, and defended in academic form by a small number of writers such as Richard Carrier.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'Jesus is attested within a generation by Paul, who knew his brother, and within a century by Roman and Jewish writers who had no reason to invent him. Virtually all historians, including non-Christian ones, accept that he existed. What he did and who he was are separate questions.',
      evidence_for: [
        'No document survives from Jesus’ own lifetime that mentions him.',
        'Part of Josephus’ longer passage about Jesus was later expanded by a Christian copyist.',
        'Most early evidence comes from his followers.',
      ],
      evidence_against: [
        'Paul, writing in the AD 50s, says he met Jesus’ brother James and Peter in Jerusalem (Galatians 1:19).',
        'Tacitus (c. AD 116) says “Christus” was executed by Pontius Pilate under Tiberius.',
        'Josephus mentions “James, the brother of Jesus who was called Christ,” a passage almost no scholar disputes.',
        'Pliny the Younger (c. AD 112) reports Christians singing hymns “to Christ as to a god.”',
        'Hostile sources argue about Jesus’ claims, never about whether he lived.',
      ],
    },
    body: [
      { type: 'p', text: 'The claim that Jesus never existed spreads easily online, but it has almost no support among historians who study the ancient world, whatever their religious views. The evidence is not just Christian, and it is early by ancient standards.' },
      { type: 'h2', text: 'The earliest witness knew his family' },
      { type: 'p', text: 'Paul’s letters are the earliest Christian documents we have, written roughly 20 to 25 years after the crucifixion. In Galatians 1:18–19 Paul says he stayed with Peter in Jerusalem and also met “James, the Lord’s brother.” A mythical figure does not usually have a living brother whom people can visit.[^1]' },
      { type: 'h2', text: 'Outsiders who had no reason to invent him' },
      { type: 'p', text: 'The Roman historian Tacitus, no friend of Christians, explains that the name comes from “Christus,” who “suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus.”[^2] Pliny the Younger, governing a Roman province around AD 112, wrote to the emperor about Christians who met before dawn to sing to Christ “as to a god.”[^3]' },
      { type: 'p', text: 'The Jewish historian Josephus mentions Jesus twice. His longer passage was touched up by a later Christian copyist, and we say so plainly. But his brief note about the execution of “James, the brother of Jesus who was called Christ” is accepted as authentic by nearly all specialists.[^4]' },
      { type: 'callout', title: 'A skeptic agrees', text: 'Bart Ehrman, an agnostic New Testament scholar, wrote a whole book against the myth theory. His conclusion: Jesus “certainly existed.” The debate among scholars is about what Jesus said and did, not whether he lived.[^5]' },
      { type: 'h2', text: 'What the evidence does not settle' },
      { type: 'p', text: 'Showing that Jesus existed does not prove he rose from the dead or was who he claimed to be. Those questions deserve their own careful treatment. But anyone who wants to argue about them has to start from a real man executed under Pilate, which is exactly where the Gospels start too (Luke 3:1).' },
    ],
    footnotes: [
      { text: 'Galatians 1:18–19.', source: null },
      { text: 'Tacitus, Annals 15.44.', source: 'tacitus' },
      { text: 'Pliny the Younger, Letters 10.96.', source: 'pliny' },
      { text: 'Josephus, Antiquities 20.200; the longer passage is 18.63–64.', source: 'josephus_ant' },
      { text: 'Ehrman, Did Jesus Exist?', source: 'ehrman_exist' },
    ],
    sources: ['tacitus', 'josephus_ant', 'pliny', 'ehrman_exist', 'carrier'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'gospels-written-centuries-after-jesus',
    photo: 'papyrus6',
    topic: 'bible-manuscripts',
    title: 'The Gospels were written centuries after Jesus.',
    dek: 'When were Matthew, Mark, Luke and John really written? The evidence points to the first century, and possibly earlier than most think.',
    claim: {
      statement: 'The Gospels were written centuries after Jesus.',
      origin: 'A common online claim, often tied to the idea that the Gospels were invented or edited by the later church.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'All four Gospels were in circulation by the early second century at the latest, and most scholars date them between about AD 65 and 100. A serious minority, including the scholar John A. T. Robinson, argues they were all written before Jerusalem fell in AD 70.',
      evidence_for: [
        'Our oldest complete Gospel manuscripts date from the third and fourth centuries.',
        'Scholars disagree about the exact dates of each Gospel.',
      ],
      evidence_against: [
        'Christian writers around AD 95–120 already quote or describe the Gospels; Papias names Mark and Matthew.',
        'The papyrus fragment P52, containing John 18, is usually dated to the second century.',
        'Mainstream scholarship dates Mark around AD 65–73 and John around AD 90–100.',
        'Acts ends with Paul still alive in Rome around AD 62, which early-date scholars read as a clue to when Luke and Acts were written.',
      ],
    },
    body: [
      { type: 'p', text: 'Whether the Gospels were written within living memory of Jesus matters. If they came centuries later, they would be legend. They didn’t. The real scholarly debate is about decades, not centuries.' },
      { type: 'h2', text: 'The outer limit: who was quoting them?' },
      { type: 'p', text: 'Early Christian writers give us a ceiling. Papias, a bishop writing around AD 110–130, reports what he had been told about how Mark and Matthew came to be written.[^1] The tiny papyrus P52, with a few lines of John 18, is usually dated to the second century; its exact date is debated, which we note.[^2] Either way, the Gospels were already copied and circulating long before “centuries” had passed.' },
      { type: 'h2', text: 'The mainstream view' },
      { type: 'p', text: 'Most New Testament scholars place Mark around AD 65–73, Matthew and Luke around AD 80–90, and John around AD 90–100. On that view, all four were written while people who had known Jesus, or known his followers, were still alive.' },
      { type: 'h2', text: 'The case for writing before AD 70' },
      { type: 'p', text: 'Some scholars argue for even earlier dates. Their strongest points: Jerusalem and its Temple were destroyed in AD 70, a catastrophe that none of the Gospels describes as having happened, even though Jesus predicts it (Luke 21:20). Acts ends abruptly with Paul under house arrest in Rome around AD 62, without telling us how his trial ended. And John describes a pool in Jerusalem in the present tense (John 5:2).[^3]' },
      { type: 'callout', title: 'Our read', text: 'The pre-70 case is a respected minority view, not the consensus. But even the latest mainstream dates put the Gospels within about 60 years of Jesus. “Centuries” is simply wrong.' },
    ],
    footnotes: [
      { text: 'Eusebius, Ecclesiastical History 3.39, quoting Papias.', source: 'eusebius_eh' },
      { text: 'Nongbri, “The Use and Abuse of P52,” argues for a wider date range than older estimates.', source: 'nongbri' },
      { text: 'Robinson, Redating the New Testament.', source: 'robinson' },
    ],
    sources: ['eusebius_eh', 'nongbri', 'robinson'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'isaiah-53-written-after-jesus',
    photo: 'isaiah53',
    topic: 'bible-manuscripts',
    title: 'Isaiah 53 was written after Jesus to fit him.',
    dek: 'Could Christians have written the “suffering servant” passage after the fact? A scroll from the Dead Sea answers that.',
    claim: {
      statement: 'Isaiah 53 was written after Jesus to fit him.',
      origin: 'Sometimes claimed by skeptics who find the parallels between Isaiah 53 and the crucifixion too close to be a coincidence.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'A complete copy of Isaiah, including chapter 53, was found among the Dead Sea Scrolls and dates to about 150–100 BC, more than a century before Jesus. The text existed before him. Who the “servant” is remains a real debate between Jewish and Christian readers.',
      evidence_for: ['None from the manuscripts. The claim is usually made without reference to them.'],
      evidence_against: [
        'The Great Isaiah Scroll from Qumran Cave 1 contains all 66 chapters, including Isaiah 53.',
        'Handwriting places it around 150–100 BC; radiocarbon tests give a range of about 356–103 BC.',
        'The Greek translation of Isaiah (the Septuagint) was also made before the time of Jesus.',
      ],
    },
    body: [
      { type: 'p', text: 'Isaiah 53 describes a servant who is “pierced for our transgressions” and “led like a lamb to the slaughter” (Isaiah 53:5, Isaiah 53:7). Christians have read it as a portrait of the crucifixion since the first century (Acts 8:32). It is so close that some skeptics suggest it was written afterward. The manuscripts rule that out.' },
      { type: 'h2', text: 'A scroll older than Jesus' },
      { type: 'p', text: 'In 1946–47, Bedouin shepherds found the Great Isaiah Scroll in a cave at Qumran near the Dead Sea. It is a complete copy of Isaiah, about 24 feet long. Scholars date its handwriting to about 150–100 BC, and radiocarbon tests broadly agree.[^1] Chapter 53 is there, and it reads essentially as our Bibles do.[^2]' },
      { type: 'h2', text: 'What remains open' },
      { type: 'p', text: 'The dating settles when the text was written. It does not settle what it means. Many Jewish readers understand the servant as Israel, pointing to Isaiah 49:3. Christians point to details that fit an individual who suffers for others. That debate is worth having, and we will take it up separately. But the idea that Isaiah 53 was forged after the fact does not survive contact with the scroll.' },
    ],
    footnotes: [
      { text: 'Israel Museum, Shrine of the Book; radiocarbon and paleographic dates are summarized in Tov, Textual Criticism of the Hebrew Bible.', source: 'tov' },
      { text: 'Abegg, Flint and Ulrich, The Dead Sea Scrolls Bible, on Isaiah.', source: 'abegg' },
    ],
    sources: ['isaiah_scroll', 'tov', 'abegg'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'king-david-was-a-legend',
    photo: 'qeiyafa',
    topic: 'archaeology',
    title: 'King David is a legend with no evidence.',
    dek: 'For years some scholars doubted David existed. Then a broken stone turned up at Tel Dan.',
    claim: {
      statement: 'King David is a legend with no evidence.',
      origin: 'Associated with the “minimalist” school of the 1980s and 1990s, and still repeated online.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'The Tel Dan Stele, a ninth-century BC inscription by an enemy king, names the Judean royal line the “House of David.” Most scholars now accept that David was a real founder of a dynasty. How large and powerful his kingdom was is still debated.',
      evidence_for: [
        'Remains in Jerusalem from David’s century (the tenth century BC) are limited and their dating is disputed.',
        'Some archaeologists see David as a local chieftain rather than the ruler of a large kingdom.',
      ],
      evidence_against: [
        'The Tel Dan Stele names the “House of David” about 150 years after his reign.',
        'A disputed reading of the Mesha Stele may also mention the House of David.',
        'Fortified tenth-century sites such as Khirbet Qeiyafa show organized activity in Judah in David’s era.',
      ],
    },
    body: [
      { type: 'p', text: 'Before 1993, it was respectable in some academic circles to treat David as a figure of legend, like King Arthur. That changed when excavators at Tel Dan found an Aramaic inscription naming the “House of David.”[^1]' },
      { type: 'h2', text: 'An enemy names his dynasty' },
      { type: 'p', text: 'The stele was set up by an Aramean king, probably Hazael, boasting of victory over a king of Israel and a king of the “House of David.” It names the Judean royal line after its founder, just as Assyrian records name Israel the “House of Omri.” It echoes the promise of a lasting house in 2 Samuel 7:16. See our long read on the stele for the full story.' },
      { type: 'h2', text: 'Where the real debate is now' },
      { type: 'p', text: 'Few scholars still argue that David never existed. The live question is scale. Israel Finkelstein and others see a modest chiefdom.[^2] Excavators at Khirbet Qeiyafa, a fortified town from the tenth century BC, argue for a more organized kingdom.[^3] That is an honest debate, and we will follow it. “No evidence” is no longer one of the options.' },
    ],
    footnotes: [
      { text: 'Biran and Naveh, “An Aramaic Stele Fragment from Tel Dan.”', source: 'tel_dan' },
      { text: 'Finkelstein and Silberman, David and Solomon.', source: 'finkelstein' },
      { text: 'Garfinkel, Ganor and Hasel, In the Footsteps of King David.', source: 'garfinkel' },
    ],
    sources: ['tel_dan', 'kitchen', 'finkelstein', 'garfinkel'],
    related_slug: 'tel-dan-stele-house-of-david',
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'scientists-have-found-noahs-ark',
    photo: 'ararat',
    topic: 'archaeology',
    title: 'Scientists have found Noah’s Ark.',
    dek: 'New radar scans and soil samples at Turkey’s Durupınar formation have revived the question. What do we actually know?',
    claim: {
      statement: 'Scientists have found Noah’s Ark.',
      origin:
        'Headlines in 2025–2026 about radar scans, drilling and soil tests at the Durupınar formation near Mount Ararat, a boat-shaped feature about 515 feet long.',
      rating: 'insufficient',
      confidence: 'low',
      summary:
        'Researchers report radar anomalies, no bedrock under the formation, and higher organic content inside it than outside. None of this has been peer-reviewed, and lab results are due in winter 2026–27. Until dated wood or clear construction is shown, the honest answer is “not yet known.” We will update this rating when results are published.',
      evidence_for: [
        'The formation is about 515 feet long, close to the 300 cubits of Genesis 6:15.',
        'Ground-penetrating radar shows linear features, right angles and possible voids, according to the research team.',
        'Drilling at more than 12 points reportedly found no bedrock.',
        'Soil inside the formation reportedly has more carbon and potassium than soil outside it.',
        'Ancient writers report that remains of the ark were shown to visitors in the region in their day.',
      ],
      evidence_against: [
        'No wood, joinery or datable organic remains have been published.',
        'Geologists Lorence Collins and David Fasold concluded in 1996 that the formation is a natural feature.',
        'Reported carbon figures vary between reports (“three times,” 2.72 times, 40% higher).',
        'The ancient reports point to the mountains of the Gordyaeans (Kurdistan), not clearly to this site.',
      ],
    },
    body: [
      { type: 'p', text: 'Genesis 8:4 says the ark came to rest on “the mountains of Ararat,” a region (ancient Urartu), not one named peak. The Durupınar formation lies in that region, about 18 miles south of Mount Ararat in eastern Turkey. This year’s field work has put it back in the news.' },
      { type: 'h2', text: 'What was found in 2026' },
      { type: 'p', text: 'A team from Noah’s Ark Scans, led by Andrew Jones, reports radar images showing straight lines, right angles, layers and possible voids beneath the formation. Drilling at more than a dozen points found rich black soil and no bedrock.[^1] A separate team led by Prof. Cenker Atila of Sivas Cumhuriyet University collected about 1,000 soil samples from 150 locations and some pottery fragments; it reports carbon levels about 40% higher inside the formation than outside.[^2] Lab results are expected in winter 2026–27.' },
      { type: 'h2', text: 'What the ancient historians said' },
      { type: 'p', text: 'One of the most interesting threads is ancient. The Jewish historian Josephus, writing in Rome in the AD 90s, says the ark’s remains “are shown there by the inhabitants to this day.” He quotes the Babylonian priest Berossus, who said part of the ship survived in the mountains of the Gordyaeans and that people scraped off its bitumen to use as charms. He also cites Nicolaus of Damascus, King Herod’s court historian, on a mountain called Baris in Armenia where “the remains of the timber were a great while preserved.”[^3]' },
      { type: 'p', text: 'So for centuries there was a living tradition of a place where visitors went to see the ark. That is real historical evidence of belief and pilgrimage. It is worth being precise, though: these writers point mostly to the Gordyaean mountains in what is now southeastern Turkey and northern Iraq, the region of the traditional Mount Judi site, not clearly to Durupınar.' },
      { type: 'h2', text: 'The case against' },
      { type: 'p', text: 'In 1996, geologist Lorence Collins and investigator David Fasold, who had once championed the site, concluded that the formation is a natural geological structure and that earlier “iron bracket” samples were weathered volcanic minerals.[^4] Radar anomalies and organic soil can have natural explanations.' },
      { type: 'callout', title: 'What would settle it', text: 'Published, peer-reviewed results showing worked wood, joinery or metal fittings, with radiocarbon dates. Until then: insufficient evidence, low confidence. We will update this review, with a dated note, when the lab results are released.' },
    ],
    footnotes: [
      { text: 'Jerusalem Post, Oct. 3, 2026; Fox News on the drilling results.', source: 'jpost_ark' },
      { text: 'Arkeonews, Sept. 23, 2026.', source: 'arkeonews' },
      { text: 'Josephus, Antiquities 1.3.5–6 (1.92–95).', source: 'josephus_ant' },
      { text: 'Collins and Fasold, Journal of Geoscience Education, 1996.', source: 'collins_fasold' },
    ],
    sources: ['jpost_ark', 'fox_drill', 'arkeonews', 'josephus_ant', 'collins_fasold'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'jerichos-walls-fell-as-joshua-describes',
    photo: 'jericho',
    topic: 'archaeology',
    title: 'Jericho’s walls fell just as Joshua describes.',
    dek: 'Jericho’s walls really did collapse. The fight is over when.',
    claim: {
      statement: 'Jericho’s walls fell just as Joshua describes.',
      origin: 'A favorite of popular apologetics, based mainly on Bryant Wood’s 1990 reassessment of the excavations.',
      rating: 'debated',
      confidence: 'moderate',
      summary:
        'Excavations found a violent destruction with collapsed walls and burned grain, details that fit Joshua 6 strikingly well. But most archaeologists date that destruction to about 1550 BC, too early for Joshua on most chronologies. Bryant Wood argues for about 1400 BC. The match in details is real; the date is disputed.',
      evidence_for: [
        'Fallen mudbrick walls lay at the base of the city’s embankment, matching walls that fell outward (Joshua 6:20).',
        'The city was burned (Joshua 6:24).',
        'Storage jars full of grain suggest a short siege after harvest, and that the city was not looted, matching Joshua 3:15 and Joshua 6:18.',
        'Bryant Wood dated the destruction to about 1400 BC based on pottery and scarabs.',
      ],
      evidence_against: [
        'Kathleen Kenyon’s 1950s excavation dated the destruction to about 1550 BC and found little sign of a city around 1400 BC.',
        'Radiocarbon dating of charred grain from the destruction (1995) points to the late 17th or 16th century BC.',
        'Most archaeologists accept Kenyon’s date rather than Wood’s.',
      ],
    },
    body: [
      { type: 'p', text: 'Jericho is one of the most excavated sites in the world, and the details found there are remarkable. The question is not whether its walls fell, but when.' },
      { type: 'h2', text: 'What was found' },
      { type: 'p', text: 'Excavators found a city destroyed by fire, with its mudbrick walls tumbled down the slope of the embankment. Large jars of burned grain were left in the houses. That points to a short siege after the harvest and a city that was burned rather than plundered, which is what Joshua 6:24 describes. The walls falling outward fits Joshua 6:20.' },
      { type: 'h2', text: 'The dating fight' },
      { type: 'p', text: 'Kathleen Kenyon, excavating in the 1950s, dated this destruction to about 1550 BC, at the end of the Middle Bronze Age, and concluded there was little or no city when Joshua would have arrived.[^1] In 1990, Bryant Wood re-examined the pottery and argued the destruction happened around 1400 BC, matching an early date for the Exodus and conquest.[^2] In 1995, radiocarbon tests on charred grain from the destruction pointed to the late 17th or 16th century BC, supporting Kenyon.[^3]' },
      { type: 'callout', title: 'Our read', text: 'The physical details line up with Joshua in a way that is hard to dismiss. But the consensus date does not, and the radiocarbon evidence favors that consensus. Defenders of the biblical account point to unresolved problems in Bronze Age chronology. Debated, moderate confidence.' },
    ],
    footnotes: [
      { text: 'Kenyon, Digging Up Jericho.', source: 'kenyon' },
      { text: 'Wood, “Did the Israelites Conquer Jericho?”', source: 'wood_bar' },
      { text: 'Bruins and van der Plicht, Radiocarbon 37:2 (1995).', source: 'bruins' },
    ],
    sources: ['kenyon', 'wood_bar', 'bruins'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'jesus-fulfilled-hundreds-of-prophecies',
    photo: 'michelangeloIsaiah',
    topic: 'apologetics',
    title: 'Jesus fulfilled hundreds of specific prophecies.',
    dek: 'Some of the Old Testament’s links to Jesus are specific predictions. Many more are patterns and echoes. Both are worth seeing clearly.',
    claim: {
      statement: 'Jesus fulfilled hundreds of specific prophecies.',
      origin: 'Popular apologetics; lists of 300 or more Old Testament passages applied to Jesus are widely shared.',
      rating: 'debated',
      confidence: 'moderate',
      summary:
        'The Old Testament is woven through with passages the New Testament connects to Jesus, and some are specific predictions such as his birthplace and his entry into Jerusalem. But many items on popular lists are patterns (“types”) and echoes rather than predictions. The number depends on what you count. The connections are rich; “hundreds of specific predictions” overstates it.',
      evidence_for: [
        'Some passages make specific predictions: the ruler from Bethlehem (Micah 5:2), the king on a donkey (Zechariah 9:9), the suffering servant (Isaiah 53).',
        'Psalm 22 parallels the crucifixion in detail, including divided garments and the cry of abandonment.',
        'Popular lists collect more than 300 Old Testament passages that the New Testament links to Jesus.',
      ],
      evidence_against: [
        'Some texts the Gospels say were “fulfilled” were not predictions in context: Hosea 11:1 speaks of Israel coming out of Egypt.',
        'Some events could have been fulfilled deliberately, such as riding into Jerusalem on a donkey.',
        'Skeptics argue that the Gospel writers shaped some stories to match the prophecies.',
      ],
    },
    body: [
      { type: 'p', text: 'Some of the most moving discoveries in Bible study are the small links between the Old Testament and Jesus: a phrase, an image or a pattern that reappears centuries later. To weigh this claim fairly, it helps to sort those links into kinds.' },
      { type: 'h2', text: 'Kind one: predictions' },
      { type: 'p', text: 'Some passages look forward to a specific event. Micah 5:2 names Bethlehem as the birthplace of a coming ruler, and Matthew 2:5–6 quotes it. Zechariah 9:9 describes a king coming humbly on a donkey, which the Gospels describe in Matthew 21:5. Isaiah 53 describes a servant who suffers and dies for others, a passage written before Jesus, as the Dead Sea Scrolls prove.' },
      { type: 'h2', text: 'Kind two: patterns' },
      { type: 'p', text: 'Many links are what theologians call types: a person or event that prefigures a later one. Isaac carrying the wood up the mountain (Genesis 22:6), the Passover lamb (Exodus 12:46, quoted in John 19:36) and the bronze serpent (Numbers 21:9, recalled in John 3:14). These are not predictions in the strict sense, but the pattern across books written centuries apart is striking.' },
      { type: 'h2', text: 'Kind three: echoes' },
      { type: 'p', text: 'Sometimes the New Testament says a text was “fulfilled” in a looser sense. Matthew 2:15 applies Hosea 11:1, “Out of Egypt I called my son,” to Jesus, although Hosea was speaking of Israel. Matthew is showing Jesus reliving Israel’s story, not claiming Hosea predicted a single event. Counting echoes like these as “specific prophecies” is where the popular numbers get inflated.[^1]' },
      { type: 'callout', title: 'Our read', text: 'There are a handful of strong, specific predictions and a far larger web of patterns and echoes. The web may be the more impressive evidence. It is the subject of our series The Interwoven Word. But “hundreds of specific prophecies” is a counting claim that does not hold up as stated. Debated, moderate confidence.' },
    ],
    footnotes: [{ text: 'For a popular list of prophecies applied to Jesus, see McDowell and McDowell, Evidence That Demands a Verdict.', source: 'mcdowell' }],
    sources: ['mcdowell'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'nicaea-chose-the-books-of-the-bible',
    photo: 'nicaeaDamaskinos',
    topic: 'church-history',
    title: 'The Council of Nicaea decided which books belong in the Bible.',
    dek: 'A popular claim, checked against the council’s own records. What the bishops actually decided matters more than the myth.',
    claim: {
      statement: 'The Council of Nicaea decided which books belong in the Bible.',
      origin: 'Repeated in popular books such as The Da Vinci Code, in films and on social media.',
      rating: 'not_supported',
      confidence: 'high',
      summary:
        'No surviving record of the council discusses the biblical canon. In AD 325 the bishops met to answer Arius, who taught that the Son was a created being. They confessed the Son to be “of one substance” with the Father, and they also set the date of Easter and issued twenty canons on church order.',
      evidence_for: ['None from the council’s records or from contemporary accounts.'],
      evidence_against: [
        'The Nicene Creed and the twenty canons say nothing about which books are Scripture.',
        'Eusebius, who attended, describes the proceedings without mentioning the canon.',
        'The first list matching our 27-book New Testament exactly is Athanasius’ Festal Letter of AD 367, decades later.',
        'Churches were already reading the Gospels and Paul’s letters as Scripture long before 325.',
      ],
    },
    body: [
      { type: 'p', text: 'The myth gets Nicaea wrong in a way that hides why the council actually mattered. The bishops were not choosing books. They were answering a question about who Jesus is.' },
      { type: 'h2', text: 'What the council was about' },
      { type: 'p', text: 'Arius, a presbyter in Alexandria, taught that the Son was the first and greatest thing God created, so that “there was when he was not.” That struck at the heart of Christian worship. If the Son is a creature, praying to him is idolatry. The bishops gathered at Nicaea in AD 325, at the emperor Constantine’s invitation, to settle it.[^1]' },
      { type: 'h2', text: 'What they decided' },
      { type: 'p', text: 'The council confessed that the Son is “true God from true God, begotten, not made, of one substance with the Father.” They grounded this in texts such as John 1:1–3, where the Word is God and all things were made through him. They also agreed on how to calculate Easter and issued twenty canons on church order.[^2]' },
      { type: 'h2', text: 'What they didn’t do' },
      { type: 'p', text: 'None of the council’s documents, and none of the eyewitness accounts, discuss which books belong in the Bible. The New Testament took shape gradually through use in the churches. The first list matching our 27 books exactly comes from Athanasius in AD 367, more than forty years after Nicaea.[^3]' },
      { type: 'callout', title: 'Why it matters', text: 'The myth suggests the Bible was invented by a powerful council. The record shows a church that already had its Scriptures and gathered to defend what they taught about Christ.' },
    ],
    footnotes: [
      { text: 'Eusebius, Life of Constantine, Book III.', source: 'eusebius_vc' },
      { text: 'Ayres, Nicaea and Its Legacy.', source: 'ayres' },
      { text: 'Metzger, The Canon of the New Testament; Athanasius, Festal Letter 39.', source: 'metzger' },
    ],
    sources: ['eusebius_vc', 'ayres', 'metzger', 'athanasius'],
    related_slug: 'what-the-council-of-nicaea-actually-decided',
  },
].map((c) => ({
  ...c,
  claim: { ...c.claim, reviewed_at: today, history: [] },
}));
