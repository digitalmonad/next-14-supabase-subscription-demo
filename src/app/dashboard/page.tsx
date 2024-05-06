import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Note } from '@prisma/client';
import { create } from 'domain';
import { Edit, Trash } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react';

const getData = async (userId: string) => {
  const data = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      Notes: true,
      Subscription: {
        select: { status: true },
      },
    },
  });

  return data[0];
};

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id!);

  const deleteNote = async (formData: FormData) => {
    'use server';
    const noteId = formData.get('noteId') as string;
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath('/dashboard');
  };

  return (
    <div className='grid items-center gap-y-8'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl font-bold'>Notes</h1>
          <p className='text-lg text-muted-foreground'>
            Here you can view and edit your notes
          </p>
        </div>
        <Link href={'/dashboard/new'}>
          <Button>Create new note</Button>
        </Link>
      </div>
      {data?.Notes.length === 0 ? (
        <p className='text-muted-foreground'>
          You don&apos;t have any notes yet. Create one now!
        </p>
      ) : (
        <div>
          {data.Notes.map((note: Note) => (
            <Card
              key={note.id}
              className='flex items-center justify-between p-4'
            >
              <div className=''>
                <h2 className='text-xl font-semibold'>{note.title}</h2>
                <p className='text-muted-foreground'>
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                  }).format(new Date(note.createdAt))}
                </p>
              </div>
              <div className='flex space-x-2'>
                <Link href={`/dashboard/edit/${note.id}`}>
                  <Button variant={'outline'} size={'icon'}>
                    <Edit className='w-4 h-4' />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input type='hidden' name='noteId' value={note.id} />
                  <Button type='submit' variant={'outline'} size={'icon'}>
                    <Trash className='w-4 h-4' />
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
