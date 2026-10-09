import { postImage } from '@/lib/og/render';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;
export const alt = 'Sifted Truth · Video';

export default async function Image({ params }) {
  const { slug } = await params;
  return postImage('video', slug);
}
