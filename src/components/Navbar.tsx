import { ThemeToggle } from '@/context/theme/ThemeToggle';
import Link from 'next/link';
import React from 'react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { Button } from './ui/button';

type Props = {};

export const Navbar = async (props: Props) => {
  const { isAuthenticated: isAuthenticatedWithKinde } = getKindeServerSession();

  const isAuthenticated = await isAuthenticatedWithKinde();

  return (
    <div className='flex items-center border-b h-[60px]'>
      <div className='container flex items-center justify-between'>
        <Link href={'/'}>
          <h1 className='font-extrabold tracking-tight '>ZenNotes</h1>
        </Link>
        <div className='flex items-center gap-x-3'>
          {!isAuthenticated ? (
            <>
              <LoginLink>
                <Button size={'sm'} variant={'outline'}>
                  Sign in
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button size={'sm'}>Sign up</Button>
              </RegisterLink>
            </>
          ) : (
            <LogoutLink>
              <Button size={'sm'} variant={'outline'}>
                Logout
              </Button>
            </LogoutLink>
          )}

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
