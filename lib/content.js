/**
 * Content data layer for the public site.
 *
 * Every public page reads content through these functions only. When Supabase
 * is configured (NEXT_PUBLIC_SUPABASE_URL + publishable key) they
 * query the database; otherwise they fall back to the dummy data, so the site
 * still runs with no setup.
 */

import * as dummy from '@/data/dummy';
import { isSupabaseConfigured } from './supabase/config';
import { publicClient } from './supabase/public';
import { collectReferenceKeys } from './scripture';
import { getPassages } from './bible';
import { textOf } from './post-text';
import { clean, isSamplePost } from './placeholder';

export const TYPE_LABELS = {
  article: 'Article',
  dispatch: 'Dispatch',
  video: 'Video',
  claim: 'Claims Examined',
};

import { TYPE_PATHS } from './post-paths';

export { TYPE_PATHS };

export function postHref(post) {
  return `/${TYPE_PATHS[post.type]}/${post.slug}`;
}

const byNewest = (a, b) => new Date(b.published_at) - new Date(a.published_at);

/* ------------------------------------------------------------------------ */
/* Supabase                                                                  */
/* ------------------------------------------------------------------------ */

const POST_SELECT = '*, topic:topics(*), author:authors(*), post_sources(source_id, sort)';

function fromRow(row) {
  if (!row) return null;
  const { post_sources, ...rest } = row;
  return {
    ...rest,
    body: rest.body ?? [],
    footnotes: rest.footnotes ?? [],
    corrections: rest.corrections ?? [],
    source_ids: (post_sources ?? []).sort((a, b) => a.sort - b.sort).map((s) => s.source_id),
  };
}

function livePosts() {
  return publicClient()
    .from('posts')
    .select(POST_SELECT)
    .in('status', ['published', 'scheduled'])
    .lte('published_at', new Date().toISOString());
}

function check({ data, error }, what) {
  if (error) throw new Error(`Supabase ${what}: ${error.message}`);
  return data;
}

const db = {
  async listPosts({ type, topicSlug, limit, exclude }) {
    let query = livePosts().order('published_at', { ascending: false });
    if (type) query = query.eq('type', type);
    if (topicSlug) {
      const topic = await db.getTopic(topicSlug);
      if (!topic) return [];
      query = query.eq('topic_id', topic.id);
    }
    if (exclude) query = query.neq('id', exclude);
    if (limit) query = query.limit(limit);
    return check(await query, 'listPosts').map(fromRow);
  },
  async getPost(type, slug) {
    const data = check(await livePosts().eq('type', type).eq('slug', slug).maybeSingle(), 'getPost');
    return fromRow(data);
  },
  async getSlugs(type) {
    return check(await livePosts().eq('type', type), 'getSlugs').map((p) => p.slug);
  },
  async getTopics() {
    return check(await publicClient().from('topics').select('*').order('sort'), 'getTopics');
  },
  async getTopic(slug) {
    return check(await publicClient().from('topics').select('*').eq('slug', slug).maybeSingle(), 'getTopic');
  },
  async getSources(ids) {
    if (!ids.length) return [];
    const rows = check(await publicClient().from('sources').select('*').in('id', ids), 'getSources');
    return ids.map((id) => rows.find((r) => r.id === id)).filter(Boolean);
  },
};

/* ------------------------------------------------------------------------ */
/* Dummy data                                                                */
/* ------------------------------------------------------------------------ */

const local = {
  hydrate(post) {
    if (!post) return null;
    return {
      ...post,
      topic: dummy.topics.find((t) => t.id === post.topic_id) ?? null,
      author: dummy.authors.find((a) => a.id === post.author_id) ?? null,
    };
  },
  published() {
    return dummy.posts.filter((p) => p.status === 'published');
  },
  async listPosts({ type, topicSlug, limit, exclude }) {
    let list = local.published();
    if (type) list = list.filter((p) => p.type === type);
    if (topicSlug) {
      const topic = dummy.topics.find((t) => t.slug === topicSlug);
      list = topic ? list.filter((p) => p.topic_id === topic.id) : [];
    }
    if (exclude) list = list.filter((p) => p.id !== exclude);
    list = list.sort(byNewest).map(local.hydrate);
    return limit ? list.slice(0, limit) : list;
  },
  async getPost(type, slug) {
    return local.hydrate(local.published().find((p) => p.type === type && p.slug === slug));
  },
  async getSlugs(type) {
    return local
      .published()
      .filter((p) => p.type === type)
      .map((p) => p.slug);
  },
  async getTopics() {
    return dummy.topics;
  },
  async getTopic(slug) {
    return dummy.topics.find((t) => t.slug === slug) ?? null;
  },
  async getSources(ids) {
    return ids.map((id) => dummy.sources.find((s) => s.id === id)).filter(Boolean);
  },
};

const store = isSupabaseConfigured ? db : local;

/* ------------------------------------------------------------------------ */
/* Public API                                                                */
/* ------------------------------------------------------------------------ */

/**
 * A post is ready for readers when it is not leftover sample material and,
 * for videos, has a YouTube ID to play.
 */
function isReady(post) {
  if (!post || isSamplePost(post)) return false;
  if (post.type === 'video' && !post.video?.youtube_id) return false;
  return true;
}

/** Drop any bracketed placeholders that slipped into optional fields. */
function polish(post) {
  if (!post) return null;
  const hero = post.hero ? { ...post.hero, credit: clean(post.hero.credit), caption: clean(post.hero.caption) } : post.hero;
  const author = post.author ? { ...post.author, bio: clean(post.author.bio), role: clean(post.author.role) } : post.author;
  const dispatch = post.dispatch
    ? { ...post.dispatch, original_outlet: clean(post.dispatch.original_outlet) }
    : post.dispatch;
  const video = post.video
    ? {
        ...post.video,
        thumbnail: post.video.thumbnail || (post.video.youtube_id ? `https://i.ytimg.com/vi/${post.video.youtube_id}/hqdefault.jpg` : null),
      }
    : post.video;
  return { ...post, hero, author, dispatch, video };
}

export async function listPosts({ limit, ...opts } = {}) {
  const list = (await store.listPosts(opts)).filter(isReady).map(polish);
  return limit ? list.slice(0, limit) : list;
}

export async function getPost(type, slug) {
  const post = await store.getPost(type, slug);
  return isReady(post) ? polish(post) : null;
}

export async function getSlugs(type) {
  return (await store.listPosts({ type })).filter(isReady).map((p) => p.slug);
}

export const getTopics = () => store.getTopics();
export const getTopic = (slug) => store.getTopic(slug);
export const getSources = (ids = []) => store.getSources(ids);

/** Which sections have anything published, so empty ones stay out of the menus. */
export async function getSections() {
  const all = await listPosts();
  const has = (type) => all.some((p) => p.type === type);
  return { dispatches: has('dispatch'), claims: has('claim'), videos: has('video') };
}

export async function getHome() {
  const [articles, dispatches, videos, claims, topics] = await Promise.all([
    listPosts({ type: 'article', limit: 12 }),
    listPosts({ type: 'dispatch', limit: 4 }),
    listPosts({ type: 'video', limit: 3 }),
    listPosts({ type: 'claim', limit: 3 }),
    getTopics(),
  ]);
  const lead = articles.find((p) => p.featured) ?? articles[0];
  return {
    lead,
    articles: articles.filter((p) => p.id !== lead?.id).slice(0, 3),
    dispatches,
    videos,
    claims,
    topics,
  };
}

/** Verse text for every reference in the post, keyed by reference. */
export async function getPassagesForPost(post) {
  return getPassages(collectReferenceKeys(textOf(post)));
}
