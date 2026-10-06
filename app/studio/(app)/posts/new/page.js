import PostEditor from '@/components/studio/editor/PostEditor';
import { requireAdmin } from '@/lib/studio/auth';
import { getEditorLookups } from '@/lib/studio/data';
import { emptyPost, TYPES } from '@/lib/studio/schema';

export const metadata = { title: 'New post' };

export default async function NewPostPage({ searchParams }) {
  const { type: requested } = await searchParams;
  const type = TYPES.some((t) => t.id === requested) ? requested : 'article';
  const { supabase } = await requireAdmin();
  const { topics, authors, sources } = await getEditorLookups(supabase);

  const initial = { ...emptyPost(type), author_id: authors[0]?.id ?? null };
  return <PostEditor key={type} initial={initial} topics={topics} authors={authors} sources={sources} />;
}
