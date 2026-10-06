'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV = [
  { href: '/dispatches', label: 'Dispatches' },
  { href: '/topics/apologetics', label: 'Apologetics' },
  { href: '/topics/archaeology', label: 'Archaeology' },
  { href: '/topics/church-history', label: 'Church History' },
  { href: '/topics/bible-manuscripts', label: 'Bible & Manuscripts' },
  { href: '/claims', label: 'Claims Examined' },
  { href: '/watch', label: 'Watch' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul>
      {NAV.map((item) => {
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
