/**
 * Studio vocabulary shared by server and client code (no imports, no secrets).
 */

export const TYPES = [
  { id: 'article', label: 'Article', plural: 'Articles', blurb: 'Long reads with notes and sources' },
  { id: 'dispatch', label: 'Dispatch', plural: 'Dispatches', blurb: 'Short news briefs' },
  { id: 'video', label: 'Video', plural: 'Videos', blurb: 'YouTube episodes with show notes' },
  { id: 'claim', label: 'Claim review', plural: 'Claims Examined', blurb: 'Rated claims with evidence' },
];

export const typeLabel = (id) => TYPES.find((t) => t.id === id)?.label ?? id;

export const STATUSES = [
  { id: 'draft', label: 'Draft' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'published', label: 'Published' },
  { id: 'archived', label: 'Archived' },
];

export const RATING_OPTIONS = [
  { id: 'well_supported', label: 'Well supported' },
  { id: 'debated', label: 'Debated' },
  { id: 'not_supported', label: 'Not supported' },
  { id: 'insufficient', label: 'Insufficient evidence' },
];

export const CONFIDENCE_OPTIONS = [
  { id: 'high', label: 'High' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'low', label: 'Low' },
];

export const VIDEO_SERIES = ['On Site', 'Claims Examined', 'Conversations'];

export const DISPATCH_LABELS = ['Excavation news', 'Manuscripts', 'In the headlines', 'Church history', 'Scholarship'];

export const BLOCK_TYPES = [
  { id: 'p', label: 'Paragraph' },
  { id: 'h2', label: 'Heading' },
  { id: 'h3', label: 'Subheading' },
  { id: 'quote', label: 'Quote' },
  { id: 'list', label: 'List' },
  { id: 'callout', label: 'Callout' },
];

export function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'"“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** A blank post of the given type, ready for the editor. */
export function emptyPost(type) {
  return {
    id: null,
    type,
    slug: '',
    title: '',
    dek: '',
    topic_id: null,
    author_id: null,
    status: 'draft',
    featured: false,
    published_at: null,
    reading_minutes: null,
    hero: { src: '', alt: '', caption: '', credit: '' },
    body: [{ type: 'p', text: '' }],
    footnotes: [],
    corrections: [],
    source_ids: [],
    related_slug: null,
    video:
      type === 'video'
        ? { youtube_id: '', duration: '', series: VIDEO_SERIES[0], chapters: [], transcript: [] }
        : null,
    claim:
      type === 'claim'
        ? {
            statement: '',
            origin: '',
            rating: 'debated',
            confidence: 'moderate',
            summary: '',
            evidence_for: [],
            evidence_against: [],
            reviewed_at: null,
            history: [],
          }
        : null,
    dispatch: type === 'dispatch' ? { label: DISPATCH_LABELS[0], original_outlet: '', original_url: '' } : null,
  };
}

/** Rough reading time from all text in the body. */
export function estimateMinutes(blocks = []) {
  const words = blocks
    .map((b) => [b.text, b.title, ...(b.items ?? [])].filter(Boolean).join(' '))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
