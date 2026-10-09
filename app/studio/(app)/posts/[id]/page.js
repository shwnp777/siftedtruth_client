import { notFound } from 'next/navigation';
import PostEditor from '@/components/studio/editor/PostEditor';
import { requireAdmin } from '@/lib/studio/auth';
import { getEditorLookups, getPostById } from '@/lib/studio/data';
import { emptyPost } from '@/lib/studio/schema';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const post = await getPostById(supabase, id).catch(() => null);
  return { title: post?.title ? `Edit: ${post.title}` : 'Edit post' };
}

export default async function EditPostPage({ params }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const [post, lookups] = await Promise.all([getPostById(supabase, id), getEditorLookups(supabase)]);
  if (!post) notFound();

  // Fill any missing fields so the editor always has a complete shape.
  const base = emptyPost(post.type);
  const initial = {
    ...base,
    ...post,
    dek: post.dek ?? '',
    hero: { ...base.hero, ...(post.hero ?? {}) },
    body: post.body?.length ? post.body : base.body,
    video: post.type === 'video' ? { ...base.video, ...(post.video ?? {}) } : null,
    claim: post.type === 'claim' ? { ...base.claim, ...(post.claim ?? {}) } : null,
    dispatch: post.type === 'dispatch' ? { ...base.dispatch, ...(post.dispatch ?? {}) } : null,
  };
  // Strip server-only columns the editor never sends back.
  delete initial.created_at;
  delete initial.created_by;
  delete initial.updated_at;

  return <PostEditor key={post.id} initial={initial} {...lookups} />;
}
