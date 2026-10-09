'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * The site menu: Dispatches, then every topic marked "show in menu" (in the
 * order set in the studio), then Claims Examined and Watch. Sections with
 * nothing published yet are left out.
 */
export default function NavLinks({ topics = [], sections = {} }) {
  const pathname = usePathname();
  const items = [
    sections.dispatches !== false && { href: '/dispatches', label: 'Dispatches' },
    ...topics.filter((t) => t.show_in_nav !== false).map((t) => ({ href: `/topics/${t.slug}`, label: t.name })),
    sections.claims !== false && { href: '/claims', label: 'Claims Examined' },
    sections.videos !== false && { href: '/watch', label: 'Watch' },
  ].filter(Boolean);
  return (
    <ul>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={active ? 'page' : undefined}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
