import { homeImage } from '@/lib/og/render';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;
export const alt = 'Sifted Truth: faith, history and the evidence beneath both';

export default function Image() {
  return homeImage();
}
