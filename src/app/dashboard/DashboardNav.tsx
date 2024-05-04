'use client';
import { cn } from '@/lib/utils';
import { Home, Settings, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

export const navItems = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
];

export const DashboardNav = (props: Props) => {
  const pathname = usePathname();
  return (
    <nav className='grid items-start gap-2'>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              'group flex items-center rounded py-2 px-3 hover:bg-accent',
              item.href === pathname ? 'bg-accent' : 'bg-transparent'
            )}
          >
            <item.icon className='h-4 w-4 text-muted-foreground' />
            <span className='ml-2'>{item.label}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
};
