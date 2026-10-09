/**
 * Studio reads. Always called with the signed-in admin's Supabase client
 * (from requireAdmin), so drafts and scheduled posts are visible.
 */

export async function listAllPosts(supabase, { type, status, q } = {}) {
  let query = supabase
    .from('posts')
    .select('id, type, slug, title, dek, status, featured, published_at, updated_at, topic:topics(name, slug), claim')
    .order('updated_at', { ascending: false });
  if (type) query = query.eq('type', type);
  if (status) query = query.eq('status', status);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getPostById(supabase, id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, post_sources(source_id, sort)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const { post_sources, ...post } = data;
  return {
    ...post,
    source_ids: (post_sources ?? []).sort((a, b) => a.sort - b.sort).map((s) => s.source_id),
  };
}

export async function getEditorLookups(supabase) {
  const [topics, authors, sources] = await Promise.all([
    supabase.from('topics').select('id, name, slug').order('sort'),
    supabase.from('authors').select('id, name, slug').order('name'),
    supabase.from('sources').select('*').order('title'),
  ]);
  return { topics: topics.data ?? [], authors: authors.data ?? [], sources: sources.data ?? [] };
}

export async function listSourcesWithUsage(supabase) {
  const { data, error } = await supabase
    .from('sources')
    .select('*, post_sources(post_id)')
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(({ post_sources, ...s }) => ({ ...s, used: post_sources?.length ?? 0 }));
}

export async function getDashboard(supabase) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, type, title, status, published_at, updated_at, claim')
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  const now = new Date();
  const count = (fn) => data.filter(fn).length;
  return {
    total: data.length,
    published: count((p) => p.status === 'published' || (p.status === 'scheduled' && new Date(p.published_at) <= now)),
    drafts: data.filter((p) => p.status === 'draft').slice(0, 6),
    draftCount: count((p) => p.status === 'draft'),
    scheduled: data
      .filter((p) => p.status === 'scheduled' && new Date(p.published_at) > now)
      .sort((a, b) => new Date(a.published_at) - new Date(b.published_at)),
    recent: data
      .filter((p) => p.status === 'published')
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      .slice(0, 6),
    byType: ['article', 'dispatch', 'video', 'claim'].map((t) => ({
      type: t,
      n: count((p) => p.type === t && p.status !== 'archived'),
    })),
    claimsDue: data.filter(
      (p) =>
        p.type === 'claim' &&
        p.status === 'published' &&
        p.claim?.reviewed_at &&
        now - new Date(p.claim.reviewed_at) > 1000 * 60 * 60 * 24 * 180
    ),
  };
}

export async function listTopicsWithCounts(supabase) {
  const [{ data: topics, error }, { data: posts }] = await Promise.all([
    supabase.from('topics').select('*').order('sort').order('name'),
    supabase.from('posts').select('topic_id, status'),
  ]);
  if (error) throw new Error(error.message);
  return topics.map((t) => ({
    ...t,
    show_in_nav: t.show_in_nav !== false,
    posts: (posts ?? []).filter((p) => p.topic_id === t.id).length,
  }));
}
