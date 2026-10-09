import { pageMeta } from '@/lib/site';
import Link from 'next/link';
import { RatingBadge, Confidence } from '@/components/Cards';

export const metadata = pageMeta({
  title: 'Our standards',
  description: 'How Sifted Truth sources its work, rates claims and corrects mistakes.',
  path: '/standards',
});

const RATING_TEXT = {
  well_supported: 'The best available evidence clearly supports the claim, and specialists broadly agree.',
  debated: 'Serious scholars disagree, or the evidence supports more than one reading.',
  not_supported: 'The evidence does not support the claim, or it contradicts it.',
  insufficient: 'There is not yet enough evidence to say either way.',
};

export default function StandardsPage() {
  return (
    <div className="wrap" style={{ paddingBottom: 80 }}>
      <header className="page-head">
        <p className="kicker">About</p>
        <h1>Our standards</h1>
        <p>We write from a Christian perspective and we hold ourselves to the evidence. Here is how that works in practice.</p>
      </header>

      <div style={{ maxWidth: 'var(--measure)' }}>
        <div className="prose no-dropcap">
          <h2 style={{ marginTop: 0 }}>Sourcing</h2>
          <p>
            Every article lists its sources. We prefer primary sources (inscriptions, manuscripts, excavation reports,
            ancient texts) and mark them separately from secondary scholarship. We represent views we disagree with in
            their strongest form.
          </p>
          <p>Scripture is quoted from the Berean Standard Bible and King James Version, both in the public domain.</p>
        </div>

        <div className="endmatter">
          <section id="ratings" aria-labelledby="ratings-h">
            <h2 id="ratings-h">How we rate claims</h2>
            <ul className="source-list">
              {Object.entries(RATING_TEXT).map(([k, text]) => (
                <li key={k} style={{ gridTemplateColumns: '200px minmax(0,1fr)' }}>
                  <RatingBadge rating={k} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="meta" style={{ marginTop: 16 }}>
              Each rating also carries a confidence level — how settled we think the question is:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              <Confidence level="high" />
              <Confidence level="moderate" />
              <Confidence level="low" />
            </div>
          </section>

          <section id="corrections" aria-labelledby="corrections-policy-h">
            <h2 id="corrections-policy-h">Corrections</h2>
            <div className="prose no-dropcap" style={{ fontSize: 18 }}>
              <p>
                When we get something wrong, we fix it and say so. Corrections are dated and listed at the bottom of the
                page they affect. When new evidence changes a Claims Examined rating, we update the rating and record the
                change in its review history.
              </p>
              <p>
                Spotted an error, or have evidence we missed?{' '}
                <Link href="/contact?topic=correction">Tell us here</Link>. Every report is read, and if it holds up we
                correct the page and note the change at the bottom of it.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
