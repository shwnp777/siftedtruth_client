import { listPosts, postHref, TYPE_LABELS } from '@/lib/content';
import { SITE_NAME, SITE_URL, DESCRIPTION } from '@/lib/site';

export const revalidate = 300;

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS 2.0 feed of the latest published work. */
export async function GET() {
  const posts = await listPosts({ limit: 30 }).catch(() => []);
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}${postHref(p)}`;
      const summary = p.type === 'claim' ? p.claim?.summary || p.dek : p.dek;
      return `    <item>
      <title>${esc(p.type === 'claim' ? p.claim?.statement || p.title : p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      <category>${esc(TYPE_LABELS[p.type])}</category>${p.topic?.name ? `\n      <category>${esc(p.topic.name)}</category>` : ''}${p.author?.name ? `\n      <dc:creator>${esc(p.author.name)}</dc:creator>` : ''}
      <description>${esc(summary || '')}</description>${p.hero?.src ? `\n      <enclosure url="${esc(p.hero.src)}" type="image/jpeg" length="0" />` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${esc(DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
