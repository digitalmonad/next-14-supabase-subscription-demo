import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowLeft } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    noteId: string;
  };
};

const getNoteData = async ({
  userId,
  noteId,
}: {
  userId: string;
  noteId: string;
}) => {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId,
    },
  });

  return data;
};

const NewNotePage = async ({ params }: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Not authorized');
  }

  const note = await getNoteData({ userId: user.id, noteId: params.noteId });

  const editNoteServerAction = async (formData: FormData) => {
    'use server';

    if (!user) {
      throw new Error('Not authorized');
    }

    await prisma.note.update({
      where: { id: note.id, userId: user.id },
      data: {
        title: (formData.get('title') as string) ?? undefined,
        description: (formData.get('description') as string) ?? undefined,
      },
    });
    revalidatePath('/dashboard', 'layout');
    return redirect('/dashboard');
  };
  return (
    <Card>
      <form action={editNoteServerAction}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>Here you can edit your note</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5'>
          <div className='gap-y-2 flex flex-col'>
            <Label>Title</Label>
            <Input
              required
              type='text'
              name='title'
              placeholder='Title for your note'
              defaultValue={note.title}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Description</Label>
            <Textarea
              required
              name='description'
              placeholder='Content for your note'
              defaultValue={note.description}
            />
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Link href={'/dashboard'}>
            <Button variant={'secondary'}>
              <ArrowLeft className='w-4 h-4' /> Cancel
            </Button>
          </Link>
          <Button type='submit'>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewNotePage;
