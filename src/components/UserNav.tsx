import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { DoorClosed } from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

type Props = {
  name?: string;
  email?: string;
  image?: string;
};
export const UserNav = ({ name, email, image }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10 rounded-full bg-muted'>
            <AvatarImage src={image} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='flex w-full justify-between items-center cursor-pointer'
          asChild
        >
          <LogoutLink>
            Logout <DoorClosed className='w-4 h-4' />
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
