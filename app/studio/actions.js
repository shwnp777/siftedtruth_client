'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminOrNull } from '@/lib/studio/auth';
import { createClient } from '@/lib/supabase/server';
import { getPassages } from '@/lib/bible';
import { slugify, estimateMinutes, RATING_OPTIONS, CONFIDENCE_OPTIONS } from '@/lib/studio/schema';

const NOT_ALLOWED = { error: 'Your session has expired or you are not an admin. Sign in again.' };
const clean = (s) => (typeof s === 'string' ? s.trim() : s);
const label = (list, id) => list.find((x) => x.id === id)?.label ?? id;

/* ------------------------------------------------------------------------ */
/* Posts                                                                     */
/* ------------------------------------------------------------------------ */

export async function savePost(input) {
  const auth = await adminOrNull();
  if (!auth) return NOT_ALLOWED;
  const { supabase, user } = auth;

  const title = clean(input.title) ?? '';
  const slug = slugify(input.slug || title);
  const status = input.status;
  const goingLive = status === 'published' || status === 'scheduled';

  // Validation
  if (!slug) return { error: 'Add a title (or a slug) before saving.' };
  if (goingLive) {
    if (!title) return { error: 'A title is required to publish.' };
    if (!input.topic_id) return { error: 'Choose a topic before publishing.' };
    if (input.type === 'claim' && !clean(input.claim?.statement)) return { error: 'A claim review needs the claim itself.' };
  }
  if (status === 'scheduled' && (!input.published_at || new Date(input.published_at) <= new Date())) {
    return { error: 'Pick a future date and time to schedule this post.' };
  }

  let published_at = input.published_at || null;
  if (status === 'published' && !published_at) published_at = new Date().toISOString();

  // Claims: log rating changes automatically in the review history.
  let claim = input.claim ?? null;
  if (input.type === 'claim' && claim) {
    claim = { ...claim, history: [...(claim.history ?? [])] };
    if (input.id) {
      const { data: prev } = await supabase.from('posts').select('claim, status').eq('id', input.id).maybeSingle();
      const before = prev?.claim;
      const today = new Date().toISOString().slice(0, 10);
      if (before && prev.status !== 'draft' && (before.rating !== claim.rating || before.confidence !== claim.confidence)) {
        claim.history.push({
          date: today,
          text: `Rating changed from ${label(RATING_OPTIONS, before.rating)} (${label(CONFIDENCE_OPTIONS, before.confidence).toLowerCase()} confidence) to ${label(RATING_OPTIONS, claim.rating)} (${label(CONFIDENCE_OPTIONS, claim.confidence).toLowerCase()} confidence).`,
        });
        claim.reviewed_at = today;
      }
    }
    if (goingLive && !claim.reviewed_at) claim.reviewed_at = new Date().toISOString().slice(0, 10);
    if (goingLive && claim.history.length === 0) claim.history.push({ date: claim.reviewed_at, text: 'First published.' });
  }

  const row = {
    type: input.type,
    slug,
    title,
    dek: clean(input.dek) || null,
    topic_id: input.topic_id || null,
    author_id: input.author_id || null,
    status,
    featured: Boolean(input.featured),
    published_at,
    reading_minutes: input.type === 'article' ? Number(input.reading_minutes) || estimateMinutes(input.body) : null,
    hero: input.hero?.src || input.hero?.alt ? input.hero : null,
    body: input.body ?? [],
    footnotes: (input.footnotes ?? []).map((f, i) => ({ n: i + 1, text: f.text ?? '', source_id: f.source_id || null })),
    corrections: input.corrections ?? [],
    video: input.type === 'video' ? input.video : null,
    claim: input.type === 'claim' ? claim : null,
    dispatch: input.type === 'dispatch' ? input.dispatch : null,
    related_slug: clean(input.related_slug) || null,
  };

  // Only one featured article at a time.
  if (row.type === 'article' && row.featured) {
    let q = supabase.from('posts').update({ featured: false }).eq('type', 'article').eq('featured', true);
    if (input.id) q = q.neq('id', input.id);
    await q;
  }

  const result = input.id
    ? await supabase.from('posts').update(row).eq('id', input.id).select('id, slug, updated_at, published_at, claim').single()
    : await supabase
        .from('posts')
        .insert({ ...row, created_by: user.id })
        .select('id, slug, updated_at, published_at, claim')
        .single();

  if (result.error) {
    if (result.error.code === '23505') return { error: `Another ${row.type} already uses the slug “${slug}”.` };
    return { error: result.error.message };
  }
  const saved = result.data;

  // Replace the source links
  await supabase.from('post_sources').delete().eq('post_id', saved.id);
  const links = (input.source_ids ?? []).map((source_id, sort) => ({ post_id: saved.id, source_id, sort }));
  if (links.length) {
    const { error } = await supabase.from('post_sources').insert(links);
    if (error) return { error: `Saved, but sources could not be linked: ${error.message}` };
  }

  revalidatePath('/', 'layout');
  return {
    ok: true,
    id: saved.id,
    slug: saved.slug,
    updated_at: saved.updated_at,
    published_at: saved.published_at,
    claim: saved.claim,
  };
}

export async function deletePost(id) {
  const auth = await adminOrNull();
  if (!auth) return NOT_ALLOWED;
  const { error } = await auth.supabase.from('posts').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/', 'layout');
  redirect('/studio/posts?deleted=1');
}

/* ------------------------------------------------------------------------ */
/* Sources                                                                   */
/* ------------------------------------------------------------------------ */

export async function saveSource(input) {
  const auth = await adminOrNull();
  if (!auth) return NOT_ALLOWED;
  if (!clean(input.title)) return { error: 'A source needs a title.' };
  const row = {
    kind: input.kind === 'primary' ? 'primary' : 'secondary',
    author: clean(input.author) || null,
    title: clean(input.title),
    publication: clean(input.publication) || null,
    year: input.year ? Number(input.year) : null,
    pages: clean(input.pages) || null,
    url: clean(input.url) || null,
    notes: clean(input.notes) || null,
  };
  const { data, error } = input.id
    ? await auth.supabase.from('sources').update(row).eq('id', input.id).select().single()
    : await auth.supabase.from('sources').insert(row).select().single();
  if (error) return { error: error.message };
  revalidatePath('/', 'layout');
  return { ok: true, source: data };
}

export async function deleteSource(id) {
  const auth = await adminOrNull();
  if (!auth) return NOT_ALLOWED;
  const { error } = await auth.supabase.from('sources').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/', 'layout');
  return { ok: true };
}

/* ------------------------------------------------------------------------ */
/* Misc                                                                      */
/* ------------------------------------------------------------------------ */

/** Verse text for the editor's live preview. */
export async function previewPassages(keys) {
  const auth = await adminOrNull();
  if (!auth) return {};
  return getPassages((keys ?? []).slice(0, 60));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/studio/login');
}
