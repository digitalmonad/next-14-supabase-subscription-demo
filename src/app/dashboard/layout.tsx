import React, { PropsWithChildren } from 'react';
import { DashboardNav } from './DashboardNav';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

const createUserIfNotExist = async ({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email?: string | null;
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id,
        email,
        name: firstName + ' ' + lastName,
        profileImage,
      },
    });
  }
};

type Props = PropsWithChildren;

const DashboardLayout = async ({ children }: Props) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (!user) return redirect('/');

  await createUserIfNotExist({
    email: user.email,
    id: user.id,
    firstName: user.given_name,
    lastName: user.family_name,
    profileImage: user.picture,
  });
  return (
    <div className='flex flex-col space-y-6 mt-10'>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
