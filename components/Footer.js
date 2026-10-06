import Link from 'next/link';

export default function Footer() {
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
              <Link href="/dispatches">Dispatches</Link>
              <Link href="/claims">Claims Examined</Link>
              <Link href="/watch">Watch</Link>
            </div>
            <div className="footer-col">
              <span className="head">About</span>
              <Link href="/standards">Our standards</Link>
              <Link href="/standards#corrections">Corrections</Link>
              <Link href="/support">Support our work</Link>
            </div>
            <div className="footer-col">
              <span className="head">Follow</span>
              <a href="#">YouTube</a>
              <a href="#">Podcast</a>
              <a href="#">RSS</a>
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
