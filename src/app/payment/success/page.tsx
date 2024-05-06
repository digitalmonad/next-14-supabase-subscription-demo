import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {};

const PaymentSucceededPage = (props: Props) => {
  return (
    <div className='w-full flex flex-1 items-center justify-center'>
      <Card className='w-[350px]'>
        <div className='p-6 w-full flex flex-col items-center'>
          <div className='w-10 h-10 rounded-full bg-green-600 flex justify-center items-center'>
            <Check className='w-6 h-6 text-green-400' />
          </div>
          <div className='w-full text-center'>
            <h3 className='text-xl font-semibold mt-4'>Payment Succeeded</h3>
            <p className='text-muted-foreground mt-2'>
              Congrats on tour subscription.
            </p>
            <p className='text-muted-foreground mt-2'>
              Please check your email for further info.
            </p>
          </div>
          <div className='mt-4 text-center'>
            <Link href='/dashboard'>
              <Button variant={'link'}>
                <ArrowLeft className='w-4 h-4 mr-2' /> Back to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSucceededPage;
