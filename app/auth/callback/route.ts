import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/`)
    }
  }

  // Return the user to an error page if auth fails
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url)
//   const code = searchParams.get('code')
//   console.log(code,"---------------------------------")
//   // If the URL has ?next=/dashboard, it will redirect there, otherwise home
//   const next = searchParams.get('next') ?? '/'

//   if (code) {
//     const cookieStore = await cookies()
//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() { return cookieStore.getAll() },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 cookieStore.set(name, value, options)
//               )
//             } catch (error) {
//               // Ignore cookie errors in Server Actions/Route Handlers
//             }
//           },
//         },
//       }
//     )

//     const { error } = await supabase.auth.exchangeCodeForSession(code)
//     if (!error) {
//       return NextResponse.redirect(`${origin}${next}`)
//     }
//   }

//   // Redirect to error page if exchange fails
//   return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
// }