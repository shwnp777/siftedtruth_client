/**
 * Content data layer.
 *
 * Every page reads content through these functions only. In stage 1 they read
 * the dummy data; in stage 2 their bodies become Supabase queries and nothing
 * else in the app needs to change. They are async for that reason.
 */

import { authors, topics, sources, posts } from '@/data/dummy';
import { collectReferenceKeys } from './scripture';
import { getPassages } from './bible';

const byNewest = (a, b) => new Date(b.published_at) - new Date(a.published_at);
const published = () => posts.filter((p) => p.status === 'published');

export const TYPE_LABELS = {
  article: 'Article',
  dispatch: 'Dispatch',
  video: 'Video',
  claim: 'Claims Examined',
};

export const TYPE_PATHS = {
  article: 'articles',
  dispatch: 'dispatches',
  video: 'watch',
  claim: 'claims',
};

export function postHref(post) {
  return `/${TYPE_PATHS[post.type]}/${post.slug}`;
}

function hydrate(post) {
  if (!post) return null;
  return {
    ...post,
    topic: topics.find((t) => t.id === post.topic_id) ?? null,
    author: authors.find((a) => a.id === post.author_id) ?? null,
  };
}

export async function listPosts({ type, topicSlug, limit, exclude } = {}) {
  let list = published();
  if (type) list = list.filter((p) => p.type === type);
  if (topicSlug) {
    const topic = topics.find((t) => t.slug === topicSlug);
    list = topic ? list.filter((p) => p.topic_id === topic.id) : [];
  }
  if (exclude) list = list.filter((p) => p.id !== exclude);
  list = list.sort(byNewest).map(hydrate);
  return limit ? list.slice(0, limit) : list;
}

export async function getPost(type, slug) {
  return hydrate(published().find((p) => p.type === type && p.slug === slug));
}

export async function getSlugs(type) {
  return published()
    .filter((p) => p.type === type)
    .map((p) => p.slug);
}

export async function getHome() {
  const articles = await listPosts({ type: 'article' });
  const lead = articles.find((p) => p.featured) ?? articles[0];
  return {
    lead,
    articles: articles.filter((p) => p.id !== lead?.id).slice(0, 3),
    dispatches: await listPosts({ type: 'dispatch', limit: 4 }),
    videos: await listPosts({ type: 'video', limit: 3 }),
    claims: await listPosts({ type: 'claim', limit: 3 }),
    topics,
  };
}

export async function getTopics() {
  return topics;
}

export async function getTopic(slug) {
  return topics.find((t) => t.slug === slug) ?? null;
}

export async function getSources(ids = []) {
  return ids.map((id) => sources.find((s) => s.id === id)).filter(Boolean);
}

/** All strings in a post that may contain Scripture references. */
function textOf(post) {
  const out = [post.dek];
  const walk = (blocks = []) => {
    for (const b of blocks) {
      if (b.text) out.push(b.text);
      if (b.title) out.push(b.title);
      if (b.items) out.push(...b.items);
    }
  };
  walk(post.body);
  walk(post.video?.transcript);
  if (post.claim) {
    out.push(post.claim.summary, post.claim.origin, ...post.claim.evidence_for, ...post.claim.evidence_against);
  }
  for (const f of post.footnotes ?? []) out.push(f.text);
  return out;
}

/** Verse text for every reference in the post, keyed by reference. */
export async function getPassagesForPost(post) {
  return getPassages(collectReferenceKeys(textOf(post)));
}
