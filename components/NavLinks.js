'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * The site menu: Dispatches, then every topic marked "show in menu" (in the
 * order set in the studio), then Claims Examined and Watch.
 */
export default function NavLinks({ topics = [] }) {
  const pathname = usePathname();
  const items = [
    { href: '/dispatches', label: 'Dispatches' },
    ...topics.filter((t) => t.show_in_nav !== false).map((t) => ({ href: `/topics/${t.slug}`, label: t.name })),
    { href: '/claims', label: 'Claims Examined' },
    { href: '/watch', label: 'Watch' },
  ];
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
