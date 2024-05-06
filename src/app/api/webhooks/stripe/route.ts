import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextApiResponse } from 'next';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = headers().get('Stripe-Signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`Webhook signature verification failed.`);
    return new Response(`Webhook signature verification failed.`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle the appropriate event
  switch (event.type) {
    case 'checkout.session.completed': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const customerId = subscription.customer as string;
      const user = await prisma.user.findFirst({
        where: {
          stripeCustomerId: customerId,
        },
      });
      if (!user) {
        throw new Error(`User not found with stripeCustomerId ${customerId}`);
      }

      await prisma.subscription.create({
        data: {
          userId: user.id,
          stripeSubscriptionId: subscription.id,
          currentPeriodStart: new Date(subscription.current_period_end * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: subscription.status,
          planId: subscription.items.data[0].plan.id,
          interval: subscription.items.data[0].plan.interval,
        },
      });

      break;
    }
    case 'invoice.payment_succeeded': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscriptionId,
        },
        data: {
          planId: subscription.items.data[0].plan.id,
          currentPeriodStart: new Date(
            subscription.current_period_start * 1000
          ),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: subscription.status,
        },
      });

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
};
