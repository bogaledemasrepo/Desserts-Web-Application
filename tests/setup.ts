// tests/setup.ts
import { beforeAll } from "bun:test";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing in test env");
}

beforeAll(() => {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    configurable: true,
  });
});