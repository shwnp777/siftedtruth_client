/**
 * Cover photos from Wikimedia Commons, chosen for each launch post.
 * Each entry records the file page, author and license so credits stay
 * accurate. CC BY and CC BY-SA images must keep their credit line.
 *
 * Images are linked from Wikimedia for now; move them to S3/CloudFront
 * later and only `src` changes.
 */

const T = 'https://thumb.wikimedia.org/wikipedia/commons/thumb';
const U = 'https://upload.wikimedia.org/wikipedia/commons';
const page = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`;

function photo({ src, file, author, license, alt, caption }) {
  return {
    src,
    alt,
    caption,
    credit: `${author} / Wikimedia Commons, ${license}`,
    credit_url: page(file),
  };
}

export const photos = {
  telDan: photo({
    src: `${T}/c/c3/Aramaic_Inscription_on_Basalt_Monument%2C_Dan%2C_9th_Century_BC_%2843167226572%29.jpg/1920px-Aramaic_Inscription_on_Basalt_Monument%2C_Dan%2C_9th_Century_BC_%2843167226572%29.jpg`,
    file: 'Aramaic Inscription on Basalt Monument, Dan, 9th Century BC (43167226572).jpg',
    author: 'Gary Todd',
    license: 'CC0',
    alt: 'The basalt fragments of the Tel Dan Stele with Aramaic writing',
    caption: 'The Tel Dan Stele, ninth century BC, Israel Museum, Jerusalem.',
  }),
  ararat: photo({
    src: `${T}/e/ea/Mount_Ararat%2C_Two_volcanic_cones%2C_Ararat_Plain%2C_Armenia.jpg/1920px-Mount_Ararat%2C_Two_volcanic_cones%2C_Ararat_Plain%2C_Armenia.jpg`,
    file: 'Mount Ararat, Two volcanic cones, Ararat Plain, Armenia.jpg',
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    alt: 'The two snow-capped volcanic cones of Mount Ararat rising over a green plain',
    caption: 'Greater and Lesser Ararat seen from the Ararat Plain.',
  }),
  isaiah53: photo({
    src: `${T}/b/b2/Great_Isaiah_Scroll_Ch53.jpg/1920px-Great_Isaiah_Scroll_Ch53.jpg`,
    file: 'Great Isaiah Scroll Ch53.jpg',
    author: 'Ardon Bar Hama',
    license: 'public domain',
    alt: 'Columns of Hebrew text on the Great Isaiah Scroll',
    caption: 'Isaiah 53 in the Great Isaiah Scroll from Qumran, about 150–100 BC.',
  }),
  isaiahScroll: photo({
    src: `${T}/b/ba/The_Great_Isaiah_Scroll_MS_A_%281QIsa%29_-_Google_Art_Project-x0-y0.jpg/1920px-The_Great_Isaiah_Scroll_MS_A_%281QIsa%29_-_Google_Art_Project-x0-y0.jpg`,
    file: 'The Great Isaiah Scroll MS A (1QIsa) - Google Art Project-x0-y0.jpg',
    author: 'Google Art Project',
    license: 'public domain',
    alt: 'A long stretch of the Great Isaiah Scroll showing several columns of text',
    caption: 'The Great Isaiah Scroll (1QIsaᵃ), Israel Museum, Jerusalem.',
  }),
  ketefHinnom: photo({
    src: `${T}/a/a4/Ketef_hinom_scrolls.JPG/1920px-Ketef_hinom_scrolls.JPG`,
    file: 'Ketef hinom scrolls.JPG',
    author: 'Bachrach44',
    license: 'CC BY-SA 3.0',
    alt: 'Two small silver scrolls displayed in a museum case',
    caption: 'The Ketef Hinnom silver amulets, Israel Museum, Jerusalem.',
  }),
  shiloh: photo({
    src: `${T}/4/46/Tel_Shiloh_%28biblical_site%29_2017.jpg/1920px-Tel_Shiloh_%28biblical_site%29_2017.jpg`,
    file: 'Tel Shiloh (biblical site) 2017.jpg',
    author: 'Deg777',
    license: 'CC BY-SA 4.0',
    alt: 'The hillside site of ancient Shiloh with excavated areas',
    caption: 'Tel Shiloh, where the tabernacle stood according to Joshua 18:1.',
  }),
  cityOfDavid: photo({
    src: `${U}/b/ba/Excavation_in_City_of_David_Givaty_parking_lot_Jerusalem_202.jpg`,
    file: 'Excavation in City of David Givaty parking lot Jerusalem 202.jpg',
    author: 'Daniel Ventura',
    license: 'CC BY-SA 4.0',
    alt: 'Excavated stone walls and arches in the Givati Parking Lot dig in Jerusalem',
    caption: 'The Givati Parking Lot excavation in the City of David (file photo).',
  }),
  telEton: photo({
    src: `${T}/4/4a/Tel-Eton-072.jpg/1920px-Tel-Eton-072.jpg`,
    file: 'Tel-Eton-072.jpg',
    author: 'Bukvoed',
    license: 'CC BY 4.0',
    alt: 'Excavated stone foundations at Tel ‘Eton among dry grass',
    caption: 'Excavations at Tel ‘Eton in the Judean Lowlands.',
  }),
  sinaiticus: photo({
    src: `${T}/d/d3/Codex_Sinaiticus.jpg/1920px-Codex_Sinaiticus.jpg`,
    file: 'Codex Sinaiticus.jpg',
    author: 'PotatoCow25',
    license: 'CC0',
    alt: 'An open facsimile of Codex Sinaiticus with columns of Greek text',
    caption: 'A facsimile of Codex Sinaiticus, a fourth-century Greek Bible.',
  }),
  tabgha: photo({
    src: `${T}/3/3e/Northern_views._Ain_Tabgha._Mosaic_floor._Loaves_and_fishes_LOC_matpc.02800.jpg/1920px-Northern_views._Ain_Tabgha._Mosaic_floor._Loaves_and_fishes_LOC_matpc.02800.jpg`,
    file: 'Northern views. Ain Tabgha. Mosaic floor. Loaves and fishes LOC matpc.02800.jpg',
    author: 'Matson Photo Service (Library of Congress)',
    license: 'public domain',
    alt: 'An ancient floor mosaic of a basket of loaves between two fish',
    caption: 'The loaves-and-fishes mosaic at Tabgha on the Sea of Galilee.',
  }),
  tacitus: photo({
    src: `${U}/4/41/Tacitus%2C_Annals%2C_Florence%2C_Plut._68%2C2.jpg`,
    file: 'Tacitus, Annals, Florence, Plut. 68,2.jpg',
    author: 'Biblioteca Medicea Laurenziana',
    license: 'public domain',
    alt: 'A medieval manuscript page of Latin text from Tacitus’ Annals',
    caption: 'An 11th-century manuscript of Tacitus’ Annals, Florence.',
  }),
  papyrus6: photo({
    src: `${T}/2/27/Paris%2C_BnF_Ms_Papyrus_Copte_384_%28Papyrus_6%29_verso_John_11%2C_46%E2%80%9352.jpg/1920px-Paris%2C_BnF_Ms_Papyrus_Copte_384_%28Papyrus_6%29_verso_John_11%2C_46%E2%80%9352.jpg`,
    file: 'Paris, BnF Ms Papyrus Copte 384 (Papyrus 6) verso John 11, 46–52.jpg',
    author: 'Bibliothèque nationale de France',
    license: 'public domain',
    alt: 'Fragments of an ancient papyrus manuscript of John’s Gospel on a dark background',
    caption: 'Papyrus fragments of John 11, Bibliothèque nationale de France.',
  }),
  jericho: photo({
    src: `${T}/f/fe/Tell_es-Sultan%2C_Jericho%2C_Palestine2.jpg/1920px-Tell_es-Sultan%2C_Jericho%2C_Palestine2.jpg`,
    file: 'Tell es-Sultan, Jericho, Palestine2.jpg',
    author: 'Diego Delso',
    license: 'CC BY-SA 3.0',
    alt: 'Excavated trenches and mudbrick ruins at Tell es-Sultan',
    caption: 'Tell es-Sultan, the mound of ancient Jericho.',
  }),
  qeiyafa: photo({
    src: `${T}/a/aa/View_of_Khirbet_Qeiyafa.jpg/1920px-View_of_Khirbet_Qeiyafa.jpg`,
    file: 'View of Khirbet Qeiyafa.jpg',
    author: 'Davidbena',
    license: 'CC0',
    alt: 'Stone walls of a fortified hilltop town above green fields',
    caption: 'Khirbet Qeiyafa, a fortified town from the tenth century BC.',
  }),
  michelangeloIsaiah: photo({
    src: `${U}/e/ec/Jesaja_%28Michelangelo%29.jpg`,
    file: 'Jesaja (Michelangelo).jpg',
    author: 'Michelangelo',
    license: 'public domain',
    alt: 'Michelangelo’s fresco of the prophet Isaiah turning from a book',
    caption: 'The prophet Isaiah, Michelangelo, Sistine Chapel ceiling.',
  }),
  nicaeaIcon: photo({
    src: `${U}/3/31/Nicaea_icon.jpg`,
    file: 'Nicaea icon.jpg',
    author: 'Unknown iconographer',
    license: 'public domain',
    alt: 'An icon showing Constantine and the bishops of the Council of Nicaea holding the creed',
    caption: 'An icon of the First Council of Nicaea, AD 325.',
  }),
  nicaeaDamaskinos: photo({
    src: `${U}/3/33/First_Council_of_Nicaea_Michael_Damaskinos.png`,
    file: 'First Council of Nicaea Michael Damaskinos.png',
    author: 'Michael Damaskinos',
    license: 'public domain',
    alt: 'A 16th-century painting of bishops seated in council',
    caption: 'The First Council of Nicaea, by Michael Damaskinos (16th century).',
  }),
  p46: photo({
    src: `${T}/8/8d/Bifolio_from_Paul%27s_Letter_to_the_Romans%2C_the_end_of_Paul%27s_Letter_to_the_Philippians_and_the_beginning_of_Paul%27s_Letter_to_the_Colossians.jpg/1920px-Bifolio_from_Paul%27s_Letter_to_the_Romans%2C_the_end_of_Paul%27s_Letter_to_the_Philippians_and_the_beginning_of_Paul%27s_Letter_to_the_Colossians.jpg`,
    file: "Bifolio from Paul's Letter to the Romans, the end of Paul's Letter to the Philippians and the beginning of Paul's Letter to the Colossians.jpg",
    author: 'University of Michigan Library',
    license: 'public domain',
    alt: 'Two papyrus pages with Greek text from Paul’s letters',
    caption: 'Pages of Papyrus 46, an early copy of Paul’s letters.',
  }),
  merneptah: photo({
    src: `${T}/6/68/Merneptah_Stele_2022_11.jpg/1920px-Merneptah_Stele_2022_11.jpg`,
    file: 'Merneptah Stele 2022 11.jpg',
    author: 'Onceinawhile',
    license: 'CC BY-SA 4.0',
    alt: 'The tall inscribed granite Merneptah Stele in a museum',
    caption: 'The Merneptah Stele (c. 1208 BC), the earliest mention of Israel outside the Bible.',
  }),
};

/** Covers for posts that already exist (the sample articles and claims). */
export const existingCovers = [
  { type: 'article', slug: 'tel-dan-stele-house-of-david', photo: 'telDan' },
  { type: 'article', slug: 'why-historians-date-the-corinthian-creed-early', photo: 'p46' },
  { type: 'article', slug: 'what-the-council-of-nicaea-actually-decided', photo: 'nicaeaIcon' },
  { type: 'article', slug: 'the-great-isaiah-scroll-and-the-hebrew-text', photo: 'isaiahScroll' },
  { type: 'claim', slug: 'tel-dan-stele-house-of-david', photo: 'telDan' },
  { type: 'claim', slug: 'exodus-dated-to-1446-bc', photo: 'merneptah' },
];
