const TZ = 'America/New_York';

export function formatDate(iso, opts = {}) {
  if (!iso) return '';
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  return d.toLocaleDateString('en-US', {
    month: opts.short ? 'short' : 'long',
    day: 'numeric',
    year: opts.noYear ? undefined : 'numeric',
    timeZone: TZ,
  });
}

export function initials(name = '') {
  return name
    .replace(/^The\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Chicago-style-ish citation pieces for a source record. */
export function citationParts(s) {
  return {
    author: s.author,
    title: s.title,
    rest: [s.publication, s.year, s.pages].filter(Boolean).join(', '),
  };
}
