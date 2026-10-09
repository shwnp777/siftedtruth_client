import { sectionImage } from '@/lib/og/render';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;
export const alt = 'Sifted Truth · Dispatches';

export default function Image() {
  return sectionImage({
    kicker: 'News',
    title: 'Dispatches',
    text: 'Short, sourced briefs on new discoveries, publications and claims making the rounds.',
  });
}
