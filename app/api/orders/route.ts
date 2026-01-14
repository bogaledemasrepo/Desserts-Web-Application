// app/api/orders/route.ts
import supabaseClient from "@/lib/supabase/supabaseClient";
import { NextResponse } from 'next/server';

// types/index.ts

export interface OrderItemInput {
  id: string;
  quantity: number;
}

export interface OrderRequestBody {
  items: OrderItemInput[];
  customer_email: string;
}

export interface DessertRow {
  id: string;
  price_cents: number;
  name: string;
}
export async function POST(request: Request) {
  
  // Cast the JSON body to our interface
  const body: OrderRequestBody = await request.json();
  const { items, customer_email } = body;

  try {
    // 1. Fetch prices with typed response
    const { data: desserts, error: fetchError } = await supabaseClient
      .from('desserts')
      .select('id, price_cents, name')
      .in('id', items.map((i: OrderItemInput) => i.id));

    if (fetchError) throw fetchError;
    if (!desserts) throw new Error("Desserts not found");

    // 2. Calculate Total
    let totalAmount = 0;
    const itemsWithPrice = items.map((item: OrderItemInput) => {
      const dessert = (desserts as DessertRow[]).find((d) => d.id === item.id);
      const unitPrice = dessert?.price_cents || 0;
      totalAmount += unitPrice * item.quantity;
      
      return { 
        dessert_id: item.id, 
        quantity: item.quantity, 
        unit_price_cents: unitPrice 
      };
    });

    // 3. Insert Order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        customer_email,
        total_amount_cents: totalAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Insert Items
    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(itemsWithPrice.map(item => ({ ...item, order_id: order.id })));

    if (itemsError) throw itemsError;

    return NextResponse.json({ orderId: order.id }, { status: 201 });

  } catch (error: unknown) {
    // Handle "unknown" type for errors (standard in modern TS)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// app/api/orders/route.ts (continued)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabaseClient
    .from('orders')
    .select('*, order_items(*)', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      total: count,
      page,
      last_page: Math.ceil((count || 0) / limit),
    },
  });
}

