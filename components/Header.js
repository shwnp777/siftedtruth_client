import Link from 'next/link';
import { LogoMark } from './Logo';
import NavLinks from './NavLinks';
import TodayDate from './TodayDate';
import { getTopics } from '@/lib/content';

export default async function Header() {
  const topics = await getTopics().catch(() => []);
  const showBanner = process.env.NEXT_PUBLIC_SHOW_SAMPLE_BANNER !== 'false';
  return (
    <header>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {showBanner && <div className="sample-banner">Preview build · sample content for design and development</div>}
      <div className="utility">
        <div className="wrap utility-inner">
          <TodayDate />
          <div className="utility-links">
            <Link href="/#newsletter">The Weekly Sift</Link>
            <Link href="/support" className="btn-support">
              Support our work
            </Link>
          </div>
        </div>
      </div>
      <div className="wrap masthead">
        <Link href="/" className="masthead-brand" aria-label="Sifted Truth home">
          <LogoMark />
          <span className="masthead-name">Sifted Truth</span>
        </Link>
        <p className="masthead-tagline">Faith, history and the evidence beneath both</p>
      </div>
      <nav className="wrap site-nav" aria-label="Sections">
        <NavLinks topics={topics} />
      </nav>
    </header>
  );
}
