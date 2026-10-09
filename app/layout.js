import { Newsreader, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from '@/lib/site';

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: SITE_NAME }] },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: SITE_URL,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: '#16202E',
};

// Header/Footer live in app/(site)/layout.js so the studio gets its own chrome.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
