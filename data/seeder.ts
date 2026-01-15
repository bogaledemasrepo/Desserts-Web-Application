import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('--- Starting Seed ---')

  console.log('--- 🗑️ Wiping Existing Data ---')

  // 1. Delete in reverse order of relationships
  // Delete Order Items -> Orders -> Favorites -> Desserts -> Categories
  
  const { error: delItemsError } = await supabaseClient.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: delOrdersError } = await supabaseClient.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: delFavError } = await supabaseClient.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: delDessertError } = await supabaseClient.from('desserts').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: delCatError } = await supabaseClient.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  console.log('Deleted order items error:', delItemsError)
  console.log('Deleted orders error:', delOrdersError)
  console.log('Deleted favorites error:', delFavError)
  if (delDessertError || delCatError) {
    console.error('❌ Wipe failed:', delDessertError?.message || delCatError?.message)
    return
  }

  console.log('✅ Data wiped. Starting seed...')


  // 1. Seed Categories
  const { data: categories, error: catError } = await supabaseClient
    .from('categories')
    .insert([
      { name: 'Waffle', slug: 'waffle' },
      { name: 'Crème Brûlée', slug: 'creme-brulee' },
      { name: 'Macaron', slug: 'macaron' },
      { name: 'Tiramisu', slug: 'tiramisu' },
      { name: 'Baklava', slug: 'baklava' },
      { name: 'Pie', slug: 'pie' },
      { name: 'Cake', slug: 'cake' }
    ])
    .select()

  if (catError) {
    console.error('Error seeding categories:', catError)
    return
  }

  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]))

  // 2. Seed Desserts
  const { error: dessError } = await supabaseClient.from('desserts').insert([
    {
      name: "Waffle with Berries",
      slug: "waffle-with-berries",
      thumbnail_url: "/assets/images/image-waffle-thumbnail.jpg",
      images: ["/assets/images/image-waffle-desktop.jpg"],
      summary: "Delicious waffle topped with fresh berries and syrup",
      description: "Our signature Belgian waffle is made from fermented dough and pearl sugar, creating a crunchy, caramelized exterior and a soft, fluffy center.",
      price_cents: 650,
      category_id: categoryMap['Waffle'],
      stock_count: 20,
      is_featured: true,
      nutritional_info: { calories: 450, sugar: "18g", allergens: ["Gluten", "Dairy"] }
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      slug: "vanilla-creme-brulee",
      thumbnail_url: "/assets/images/image-creme-brulee-thumbnail.jpg",
      images: ["/assets/images/image-creme-brulee-desktop.jpg"],
      summary: "Rich vanilla bean custard with a caramelized sugar crust",
      description: "A classic French dessert featuring a smooth, creamy custard base infused with Madagascar vanilla beans, topped with a brittle layer of melted sugar.",
      price_cents: 700,
      category_id: categoryMap['Crème Brûlée'],
      stock_count: 12,
      is_featured: true,
      nutritional_info: { calories: 380, sugar: "22g", allergens: ["Dairy", "Eggs"] }
    },
    {
      name: "Macaron Mix of Five",
      slug: "macaron-mix",
      thumbnail_url: "/assets/images/image-macaron-thumbnail.jpg",
      images: ["/assets/images/image-macaron-desktop.jpg"],
      summary: "Five assorted almond meal macarons",
      description: "A colorful assortment of delicate almond meringue cookies with various ganache fillings including pistachio, raspberry, and chocolate.",
      price_cents: 800,
      category_id: categoryMap['Macaron'],
      stock_count: 50,
      nutritional_info: { calories: 250, sugar: "30g", allergens: ["Nuts", "Eggs", "Dairy"] }
    }
  ])

  if (dessError) console.error('Error seeding desserts:', dessError)
  else console.log('--- Seed Complete! ---')
}

seed()