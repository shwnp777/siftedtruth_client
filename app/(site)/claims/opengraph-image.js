import { sectionImage } from '@/lib/og/render';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;
export const alt = 'Sifted Truth · Claims Examined';

export default function Image() {
  return sectionImage({
    kicker: 'Signature series',
    title: 'Claims Examined',
    text: 'Popular claims, from skeptics and believers alike, rated against the primary evidence.',
  });
}
