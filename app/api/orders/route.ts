import { createClient } from "@/lib/supabase/server";
import { OrderItemInput, OrderRequestBody } from "@/types";
import { NextResponse } from 'next/server';

// ... (Interfaces remain the same)

export async function POST(request: Request) {
  const supabase = await createClient();

  // 1. Get the authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // Strict check: if no user or error, block the request
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: OrderRequestBody = await request.json();
  const { items, customer_email } = body;

  try {
    // 2. Fetch prices
    const { data: desserts, error: fetchError } = await supabase
      .from('desserts')
      .select('id, price_cents, name')
      .in('id', items.map((i: OrderItemInput) => i.id));

    if (fetchError || !desserts) throw new Error("Products not found");

    // 3. Calculate Total
    let totalAmount = 0;
    const itemsWithPrice = items.map((item: OrderItemInput) => {
      const dessert = desserts.find((d) => d.id === item.id);
      const unitPrice = dessert?.price_cents || 0;
      totalAmount += unitPrice * item.quantity;

      return {
        dessert_id: item.id,
        quantity: item.quantity,
        unit_price_cents: unitPrice
      };
    });

    // 4. Create Order (Using user.id strictly from Auth session)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email,
        user_id: user.id, // FIX: Changed from 'user' to 'user.id'
        total_amount_cents: totalAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 5. Insert Items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithPrice.map(item => ({ ...item, order_id: order.id })));

    if (itemsError) throw itemsError;

    return NextResponse.json({ orderId: order.id }, { status: 201 });

   } catch (error: unknown) {
    console.log(error)
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  
  // Verify user first
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // RLS will automatically filter this based on user.id
  const { data, count, error } = await supabase
    .from('orders')
    .select('*, order_items(*)', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data,
    meta: {
      total: count,
      page,
      last_page: Math.ceil((count || 0) / limit),
    },
  });
}