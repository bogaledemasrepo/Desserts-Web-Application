// app/api/desserts/route.ts
import supabaseClient from "@/lib/supabase/supabaseClient";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;


  const { data, count, error } = await supabaseClient
    .from('desserts')
    .select('*, categories(name)', { count: 'exact' })
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

// app/api/desserts/route.ts (continued)

export async function POST(request: Request) {
  const body = await request.json();

  // Note: For external tools like n8n, you'd usually verify an API Key header here
  const { data, error } = await supabaseClient
    .from('desserts')
    .insert([body])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Dessert created!', data }, { status: 201 });
}