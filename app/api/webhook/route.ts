// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!; // Define this in your .env.local

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;
      // Then define and call a function to handle the event checkout.session.completed
      console.log(`Checkout session completed: ${checkoutSessionCompleted.id}`);
      // TODO: Fulfill the purchase, update your database, send confirmation email, etc.
      // E.g., check checkoutSessionCompleted.metadata or line items to know what was purchased.
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment Intent succeeded: ${paymentIntentSucceeded.id}`);
      // This is another common event to listen for if using Payment Intents directly
      break;
    // ... handle other event types
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}