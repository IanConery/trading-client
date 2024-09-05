'use client';

import {
  BanknotesIcon,
  NewspaperIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChartBarSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Overview', href: '/dashboard', icon: ChartBarSquareIcon },
  { name: 'Holdings', href: '/dashboard/holdings', icon: BanknotesIcon },
  { name: 'Charts', href: '/dashboard/analysis', icon: MagnifyingGlassIcon },
  { name: 'News', href: '/dashboard/news', icon: NewspaperIcon },
  {
    name: 'Account',
    href: '/dashboard/account',
    icon: UserCircleIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-stone-300 text-sm font-medium hover:bg-neutral-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-neutral-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
