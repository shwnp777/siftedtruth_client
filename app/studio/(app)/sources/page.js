import SourcesManager from '@/components/studio/SourcesManager';
import { requireAdmin } from '@/lib/studio/auth';
import { listSourcesWithUsage } from '@/lib/studio/data';

export const metadata = { title: 'Sources' };

export default async function SourcesPage() {
  const { supabase } = await requireAdmin();
  const sources = await listSourcesWithUsage(supabase);
  return (
    <div className="st-page">
      <header className="st-head">
        <div>
          <p className="st-eyebrow">Library</p>
          <h1 className="st-h1">Sources</h1>
          <p className="st-sub">Your reusable bibliography. Link sources to any post; notes can point to them too.</p>
        </div>
      </header>
      <SourcesManager initial={sources} />
    </div>
  );
}
