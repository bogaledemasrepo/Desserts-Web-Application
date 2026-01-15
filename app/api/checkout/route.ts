import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseClient from "@/lib/supabase/supabaseClient";


// types/index.ts
export interface CartItem {
  id: string;
  quantity: number;
}

export interface DessertRow {
  id: string;
  name: string;
  price_cents: number;
  thumbnail_url: string;
  quantity: number
}

export interface CheckoutRequest {
  items: CartItem[];
  customer_email: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover', // Use the latest version
});

export async function POST(request: Request) {



  // 1. Explicitly type the incoming body
  const body: CheckoutRequest = await request.json();
  const { items, customer_email } = body;

  try {
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in the cart" }, { status: 500 });
    }
    // 2. Fetch with explicit casting from Supabase
    const { data: desserts, error: fetchError } = await supabaseClient
      .from('desserts')
      .select('id, name, price_cents, thumbnail_url')
      .in('id', items.map((i: CartItem) => i.id));
    if (fetchError || !desserts) {
      throw new Error(fetchError?.message || "Products not found");
    }
    const dessertList = desserts as DessertRow[];

    // 3. Build Stripe Line Items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = dessertList.map((dbProduct) => {
      // Find the matching item from the user's request to get the quantity
      const cartItem = items.find((i) => i.id === dbProduct.id);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: dbProduct.name,
            images: ['https://images.immediate.co.uk/production/volatile/sites/2/2018/09/OLI-0918_HereNow-CremeCaramel_28005-cb31e47.jpg']
          },
          unit_amount: dbProduct.price_cents,
        },
        // Use the quantity from the user's cart, fallback to 1 if missing
        quantity: cartItem?.quantity || 1,
      };
    });

    // 4. Create Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email,
      success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/checkout/cancel`,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.log(error)
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}