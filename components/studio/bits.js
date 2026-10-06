import { STATUSES } from '@/lib/studio/schema';

export function StatusPill({ status, publishedAt }) {
  const future = status === 'scheduled' && publishedAt && new Date(publishedAt) > new Date();
  const shown = status === 'scheduled' && !future ? 'published' : status;
  const label = STATUSES.find((s) => s.id === shown)?.label ?? shown;
  return <span className={`st-pill ${shown}`}>{label}</span>;
}

export function shortDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });
}

export function dateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  });
}
