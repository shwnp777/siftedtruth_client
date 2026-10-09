import ContactForm from '@/components/ContactForm';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact',
  description: 'Questions, corrections and story tips for Sifted Truth.',
  path: '/contact',
});

export default async function ContactPage({ searchParams }) {
  const { topic, page } = await searchParams;
  return (
    <div className="wrap" style={{ paddingBottom: 88 }}>
      <header className="page-head" style={{ borderBottom: 0, marginBottom: 8 }}>
        <p className="kicker">About</p>
        <h1>Contact us</h1>
        <p>
          Questions, corrections and story tips all land here. If you’re reporting an error, tell us what’s wrong and,
          if you can, the source that shows it.
        </p>
      </header>
      <ContactForm topic={typeof topic === 'string' ? topic : 'general'} pageUrl={typeof page === 'string' ? page : ''} />
    </div>
  );
}
