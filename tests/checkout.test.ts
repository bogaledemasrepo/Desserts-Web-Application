import { expect, test, describe, mock } from "bun:test";
import { POST } from "@/app/api/checkout/route";

// 1. Tell Bun to replace the entire 'stripe' module with a mock
mock.module("stripe", () => {
  return {
    default: class {
      checkout = {
        sessions: {
          // 2. This is our "Fake" create function
          create: async () => ({
            url: "https://checkout.stripe.com/test",
          }),
        },
      };
    },
  };
});


describe("Checkout API", () => {
  test("should return a 500 error if items are missing", async () => {
    const req = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({ customer_email: "test@example.com", items: [] }),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);
  });

  test("should calculate Stripe session URL for valid items", async () => {
    const mockCart = {
      customer_email: "customer@example.com",
      items: [{ id: "some-uuid", quantity: 2 }]
    };

    const req = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify(mockCart),
    });

    const response = await POST(req);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.url).toBeDefined();
  });
});