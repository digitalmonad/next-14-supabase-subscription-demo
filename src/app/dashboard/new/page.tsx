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
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const NewNotePage = (props: Props) => {
  const createNewNoteServerAction = async (formData: FormData) => {
    'use server';
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('Not authorized');
    }

    await prisma.note.create({
      data: {
        title: (formData.get('title') as string) ?? undefined,
        description: (formData.get('description') as string) ?? undefined,
        userId: user?.id,
      },
    });

    return redirect('/dashboard');
  };
  return (
    <Card>
      <form action={createNewNoteServerAction}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>Here you can create your note</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5'>
          <div className='gap-y-2 flex flex-col'>
            <Label>Title</Label>
            <Input
              required
              type='text'
              name='title'
              placeholder='Title for your note'
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Description</Label>
            <Textarea
              required
              name='description'
              placeholder='Content for your note'
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
