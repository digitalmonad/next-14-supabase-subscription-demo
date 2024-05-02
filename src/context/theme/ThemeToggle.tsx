'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [haveMounted, setHaveMounted] = useState(false);

  useEffect(() => {
    setHaveMounted(true);
  }, []);

  if (!haveMounted) {
    return null;
  }

  const toggleTheme = () =>
    theme === 'dark' ? setTheme('light') : setTheme('dark');

  return (
    <Button variant='outline' size='icon'>
      {theme === 'dark' ? (
        <MoonIcon
          className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          onClick={toggleTheme}
        />
      ) : (
        <SunIcon
          className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          onClick={toggleTheme}
        />
      )}
    </Button>
  );
}
