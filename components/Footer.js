import Link from 'next/link';
import { getSections } from '@/lib/content';
import { GIVING_ENABLED, YOUTUBE_URL } from '@/lib/site';

export default async function Footer() {
  const sections = await getSections().catch(() => ({}));
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="name">Sifted Truth</span>
            <p>Every article is sourced. When we get something wrong, we say so publicly and note it on the page.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <span className="head">Read</span>
              {sections.dispatches !== false && <Link href="/dispatches">Dispatches</Link>}
              {sections.claims !== false && <Link href="/claims">Claims Examined</Link>}
              {sections.videos !== false && <Link href="/watch">Watch</Link>}
              <Link href="/#newsletter">The Weekly Sift</Link>
            </div>
            <div className="footer-col">
              <span className="head">About</span>
              <Link href="/standards">Our standards</Link>
              <Link href="/standards#corrections">Corrections</Link>
              <Link href="/contact">Contact</Link>
              {GIVING_ENABLED && <Link href="/support">Support our work</Link>}
            </div>
            <div className="footer-col">
              <span className="head">Follow</span>
              {YOUTUBE_URL && (
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              )}
              <a href="/feed.xml">RSS feed</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sifted Truth</span>
          <span>Scripture: BSB and KJV, public domain.</span>
        </div>
      </div>
    </footer>
  );
}
