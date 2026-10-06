import { Newsreader, Instrument_Sans } from 'next/font/google';
import './globals.css';

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
  title: {
    default: 'Sifted Truth — Faith, history and the evidence beneath both',
    template: '%s · Sifted Truth',
  },
  description:
    'Christian apologetics, biblical archaeology and church history, sourced and sifted. News, long reads, video and claims examined against the evidence.',
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
