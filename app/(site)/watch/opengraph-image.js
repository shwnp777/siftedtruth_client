import { sectionImage } from '@/lib/og/render';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;
export const alt = 'Sifted Truth · Watch';

export default function Image() {
  return sectionImage({
    kicker: 'Video',
    title: 'Watch',
    text: 'On-site tours, claims examined and conversations with scholars.',
  });
}
