import { expect, test, describe } from "bun:test";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

describe("Database Integrity", () => {
  test("should fetch at least one dessert from the seeded database", async () => {
    const { data, error } = await supabase.from("desserts").select("*").limit(1);
    expect(error).toBeNull();
    expect(data).toBeArray();
    expect(data?.length).toBeGreaterThan(0);
  });

  test("should enforce correct price_cents format", async () => {
    const { data } =  await supabase.from("desserts").select("price_cents").limit(1).single();
    expect(typeof data?.price_cents).toBe("number");
    expect(data?.price_cents % 1).toBe(0); // Check if it's an integer
  });
});