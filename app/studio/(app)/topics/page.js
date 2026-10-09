import TopicsManager from '@/components/studio/TopicsManager';
import { requireAdmin } from '@/lib/studio/auth';
import { listTopicsWithCounts } from '@/lib/studio/data';

export const metadata = { title: 'Topics' };

export default async function TopicsPage() {
  const { supabase } = await requireAdmin();
  const topics = await listTopicsWithCounts(supabase);
  return (
    <div className="st-page">
      <header className="st-head">
        <div>
          <p className="st-eyebrow">Library</p>
          <h1 className="st-h1">Topics</h1>
          <p className="st-sub">The sections of the site. Each topic gets its own page and can appear in the menu.</p>
        </div>
      </header>
      <TopicsManager initial={topics} />
    </div>
  );
}
