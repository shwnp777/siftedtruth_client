'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from './Icon';

const MAIN = [
  { href: '/studio', label: 'Dashboard', icon: 'home', exact: true },
  { href: '/studio/posts', label: 'All posts', icon: 'posts', exact: true },
];

const TYPES = [
  { type: 'article', label: 'Articles', icon: 'article' },
  { type: 'dispatch', label: 'Dispatches', icon: 'dispatch' },
  { type: 'video', label: 'Videos', icon: 'video' },
  { type: 'claim', label: 'Claims Examined', icon: 'claim' },
];

export default function StudioNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get('type');

  return (
    <nav className="st-nav" aria-label="Studio">
      {MAIN.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href && !(item.href === '/studio/posts' && type) ? 'page' : undefined}
        >
          <Icon name={item.icon} />
          {item.label}
        </Link>
      ))}
      <span className="st-nav-label">Content</span>
      {TYPES.map((t) => (
        <Link
          key={t.type}
          href={`/studio/posts?type=${t.type}`}
          aria-current={pathname === '/studio/posts' && type === t.type ? 'page' : undefined}
        >
          <Icon name={t.icon} />
          {t.label}
        </Link>
      ))}
      <span className="st-nav-label">Library</span>
      <Link href="/studio/sources" aria-current={pathname.startsWith('/studio/sources') ? 'page' : undefined}>
        <Icon name="sources" />
        Sources
      </Link>
      <Link href="/studio/topics" aria-current={pathname.startsWith('/studio/topics') ? 'page' : undefined}>
        <Icon name="tag" />
        Topics
      </Link>
      <span className="st-nav-label">Audience</span>
      <Link href="/studio/readers" aria-current={pathname.startsWith('/studio/readers') ? 'page' : undefined}>
        <Icon name="mail" />
        Readers
      </Link>
      <Link href="/" target="_blank">
        <Icon name="external" />
        View site
      </Link>
    </nav>
  );
}
