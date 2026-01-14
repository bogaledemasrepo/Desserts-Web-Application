// test-db.ts
import supabaseClient from "@/lib/supabase/supabaseClient";
async function test() {
  const { data, error } = await supabaseClient.from('categories').select('count')
    
  if (error) {
    console.error("❌ Connection failed:", error.message)
  } else {
    console.log("✅ Connection successful! Database is reachable.")
  }
}

test()