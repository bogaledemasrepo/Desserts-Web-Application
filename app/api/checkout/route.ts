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
      .select('id, name, price_cents, thumbnail_url');
      //.in('id', items.map((i: CartItem) => i.id));
    if (fetchError || !desserts) {
      throw new Error(fetchError?.message || "Products not found");
    }

    const dessertList = desserts as DessertRow[];

    // 3. Map to Stripe Line Items using official Stripe types
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
    //   const dessert = dessertList.find((d) => d.id === item.id);
      const dessert = dessertList[0]; // Temporary: always use the first dessert
      if (!dessert) throw new Error(`Dessert with ID ${item.id} not found`);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: dessert.name,
            images: [dessert.thumbnail_url],
          },
          unit_amount: dessert.price_cents,
        },
        quantity: item.quantity,
      };
    });


    // 4. Create Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email,
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}