import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import prisma from '@/lib/db';
import { getStripeCheckoutSession, stripe } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CheckCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const featureItems = [
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
  { name: 'Lorem ipsum something' },
];

const getData = async (userId: string) => {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
};

const BillingPage = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id!);

  const createCheckoutSession = async () => {
    'use server';

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser.stripeCustomerId) {
      throw new Error('Stripe customer ID not found');
    }

    const subscriptionUrl = await getStripeCheckoutSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: 'http://localhost:3000',
      priceId: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!,
    });

    return redirect(subscriptionUrl);
  };

  const createCustomerPortal = async () => {
    'use server';

    const portalUrl = await stripe.billingPortal.sessions.create({
      customer: data.user.stripeCustomerId,
      return_url: 'http://localhost:3000/dashboard',
    });

    return redirect(portalUrl.url);
  };

  if (data.status === 'active') {
    return (
      <div className='grid items-start gap-8'>
        <div className='flex items-center justify-between px-2'>
          <div className='grid gap-1'>
            <h1 className='text-3xl md:text-4xl font-bold'>Subscription</h1>
            <p className='text-lg text-muted-foreground'>
              Your current subscription
            </p>
          </div>
        </div>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Edit subscription</CardTitle>
            <CardDescription>
              Click on the button below to change your payment detail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createCustomerPortal}>
              <Button>View payment details</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <form className='w-full' action={createCheckoutSession}>
              <Button className='w-full'>Subscribe</Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;
