import { getTopics, listPosts, postHref } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap() {
  const [posts, topics] = await Promise.all([listPosts().catch(() => []), getTopics().catch(() => [])]);
  const has = (type) => posts.some((p) => p.type === type);
  const sections = [
    { path: '', priority: 1 },
    has('dispatch') && { path: '/dispatches', priority: 0.8 },
    has('claim') && { path: '/claims', priority: 0.8 },
    has('video') && { path: '/watch', priority: 0.7 },
    { path: '/standards', priority: 0.4 },
    { path: '/contact', priority: 0.3 },
  ].filter(Boolean);

  return [
    ...sections.map((s) => ({ url: `${SITE_URL}${s.path}`, changeFrequency: 'daily', priority: s.priority })),
    ...topics.map((t) => ({ url: `${SITE_URL}/topics/${t.slug}`, changeFrequency: 'weekly', priority: 0.6 })),
    ...posts.map((p) => ({
      url: `${SITE_URL}${postHref(p)}`,
      lastModified: p.updated_at || p.published_at,
      changeFrequency: 'monthly',
      priority: p.type === 'article' || p.type === 'claim' ? 0.7 : 0.5,
    })),
  ];
}
