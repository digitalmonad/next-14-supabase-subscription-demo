import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';

type Props = {};

const featureItems = [
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
];

const BillingPage = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl font-bold'>Billing</h1>
          <p className='text-lg text-muted-foreground'>Your profile settings</p>
        </div>
      </div>
      <div className='grid grid-cols-3 mt-4'>
        <Card className='flex flex-col '>
          <CardContent className='py-8'>
            <div>
              <h3 className='inline-flex rounded-full text-sm font-semibold tracking-wide'>
                Monthly
              </h3>
            </div>
            <div className='mt-4 flex items-baseline text-6xl font-extrabold'>
              $30{' '}
              <span className='ml-1 text-2xl text-muted-foreground'>/mo</span>
            </div>
            <p className='mt-5 text-lg text-muted-foreground'>
              Write as many notes as you want each month.
            </p>
          </CardContent>
          <div className='flex-1 flex flex-col justify-between px-4 py-6 rounded-xl bg-secondary m-1 space-y-6'>
            <ul className='space-y-4'>
              {featureItems.map((item, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <div className='flex-shrink-0'>
                    <CheckCircle2 className='h-4 w-4 text-green-400' />
                  </div>
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <form className='w-full'>
            <Button className='w-full'>Subscribe</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;
