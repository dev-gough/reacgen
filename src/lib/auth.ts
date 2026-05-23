import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "@/db";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3001";

export const auth = betterAuth({
  secret,
  baseURL,
  trustedOrigins: [baseURL, "http://reacgen.local:3001", "http://reacgen.local"],
  database: drizzleAdapter(db, {
    provider: "pg",
    // The keys here must match each model's `modelName` below.
    schema,
  }),
  user: { modelName: "users" },
  session: { modelName: "sessions" },
  account: { modelName: "accounts" },
  verification: { modelName: "verifications" },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 10,
    maxPasswordLength: 256,
  },
  advanced: {
    // users.id is uuid; sessions/accounts/verifications.id is text and accepts
    // a uuid string. Telling Better Auth to use crypto.randomUUID() for every
    // model keeps inserts compatible with both column types.
    database: { generateId: "uuid" },
  },
  plugins: [nextCookies()],
});

export type Auth = typeof auth;
