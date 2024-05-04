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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import { SettingsSubmitButton } from './SubmitButton';
import { revalidatePath } from 'next/cache';

type Props = {};

const fetchUserData = async (userId: string) => {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      name: true,
      colorTheme: true,
    },
  });

  return response;
};

const SettingPage = async (props: Props) => {
  const { getUser } = await getKindeServerSession();

  const user = await getUser();

  const userData = await fetchUserData(user?.id!);

  const handleSubmit = async (formData: FormData) => {
    'use server';

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        name: (formData.get('name') as string) ?? undefined,
        colorTheme: (formData.get('colorTheme') as string) ?? undefined,
      },
    });

    revalidatePath('/', 'layout');
  };

  return (
    <div className='grid items-start gap-8'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl font-bold'>Settings</h1>
          <p className='text-lg text-muted-foreground'>Your profile settings</p>
        </div>
      </div>

      <form action={handleSubmit} className='space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle>Personal info</CardTitle>
            <CardDescription>
              Please provide general information about yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Your Name</Label>
                <Input
                  id='name'
                  type='text'
                  name='name'
                  defaultValue={userData.name}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='email'>Your Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={userData.email}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visual customization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='colorTheme'>Color theme</Label>
                <Select name='colorTheme' defaultValue={userData.colorTheme}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a color' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value='theme-green'>Green</SelectItem>
                      <SelectItem value='theme-purple'>Purple</SelectItem>
                      <SelectItem value='theme-orange'>Orange</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <SettingsSubmitButton />
      </form>
    </div>
  );
};

export default SettingPage;
