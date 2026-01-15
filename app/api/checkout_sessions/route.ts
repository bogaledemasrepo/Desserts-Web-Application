import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-12-15.clover', // Use a recent stable API version
});
interface Item{
name:string,
price:number,
quantity:number
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as {
      items:Item[]
    };

    // Transform your cart items into Stripe line items
    const line_items = items.map((item: Item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          // You can also add images, descriptions, etc.
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment', // 'payment' for one-time payments, 'subscription' for recurring
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    return NextResponse.json({ url: session.url });
   } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Webhook Error";
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }
}