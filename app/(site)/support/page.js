import { notFound } from 'next/navigation';
import SupportForm from '@/components/SupportForm';
import { GIVING_ENABLED, pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Support our work',
  description: 'Sifted Truth is reader-supported. Help keep careful, sourced work free for everyone.',
  path: '/support',
});

export default function SupportPage() {
  // Hidden until Stripe is connected (NEXT_PUBLIC_GIVING_ENABLED=true).
  if (!GIVING_ENABLED) notFound();
  return (
    <div className="wrap">
      <header className="page-head" style={{ borderBottom: 0, marginBottom: 16 }}>
        <p className="kicker">Support</p>
        <h1>Keep careful work free for everyone</h1>
        <p>
          Sifted Truth has no paywall. Reader support pays for research, site visits, source access and video production.
        </p>
      </header>

      <div className="support-grid">
        <div className="prose no-dropcap" style={{ fontSize: 19 }}>
          <h2 style={{ marginTop: 0 }}>Where your support goes</h2>
          <ul>
            <li>Access to journals, excavation reports and primary-source editions</li>
            <li>Travel to sites for the On Site video series</li>
            <li>Time to check every claim against its sources before publishing</li>
            <li>Keeping the site fast, ad-free and open to everyone</li>
          </ul>
          <h2>A note on giving</h2>
          <p>
            Sifted Truth is published by Sudden North, LLC. It is not a registered charity, so gifts are not
            tax-deductible.
          </p>
        </div>
        <SupportForm />
      </div>
    </div>
  );
}
