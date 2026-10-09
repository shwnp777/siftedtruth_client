import Link from 'next/link';
import { LogoMark } from './Logo';
import NavLinks from './NavLinks';
import TodayDate from './TodayDate';
import { getSections, getTopics } from '@/lib/content';
import { GIVING_ENABLED, TAGLINE } from '@/lib/site';

export default async function Header() {
  const [topics, sections] = await Promise.all([
    getTopics().catch(() => []),
    getSections().catch(() => ({})),
  ]);
  return (
    <header>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility">
        <div className="wrap utility-inner">
          <TodayDate />
          <div className="utility-links">
            <Link href="/#newsletter">The Weekly Sift</Link>
            {GIVING_ENABLED && (
              <Link href="/support" className="btn-support">
                Support our work
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="wrap masthead">
        <Link href="/" className="masthead-brand" aria-label="Sifted Truth home">
          <LogoMark />
          <span className="masthead-name">Sifted Truth</span>
        </Link>
        <p className="masthead-tagline">{TAGLINE}</p>
      </div>
      <nav className="wrap site-nav" aria-label="Sections">
        <NavLinks topics={topics} sections={sections} />
      </nav>
    </header>
  );
}
