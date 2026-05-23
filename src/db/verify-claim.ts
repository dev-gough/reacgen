/**
 * One-off claim-flow verification. Run with `node --env-file=.env.local --import tsx src/db/verify-claim.ts`.
 *
 * Replicates the signUp Server Action's claim path against the seeded
 * `claim-test@example.com` row to prove that:
 *   (a) we detect the existing passwordless user,
 *   (b) we can hash a password via Better Auth's context,
 *   (c) we attach a credential and the user can sign in with it,
 *   (d) their pre-existing waitlist entries remain linked to the same user_id.
 */

import { and, eq, sql } from "drizzle-orm";
import { auth } from "../lib/auth";
import { db, schema } from "./index";

const { users, accounts, whitelistEntries } = schema;

const EMAIL = "claim-test@example.com";
const PASSWORD = "Claimed!2026";

async function main() {
  console.log("Checking pre-claim state…");
  const before = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${EMAIL.toLowerCase()}`)
    .limit(1);
  if (!before[0]) {
    throw new Error(
      `Expected an anonymous user row for ${EMAIL} — re-run the setup step first.`,
    );
  }
  const userId = before[0].id;
  const credentialBefore = await db
    .select()
    .from(accounts)
    .where(
      and(eq(accounts.userId, userId), eq(accounts.providerId, "credential")),
    );
  const entriesBefore = await db
    .select()
    .from(whitelistEntries)
    .where(eq(whitelistEntries.userId, userId));
  console.log(`  · user id: ${userId}`);
  console.log(`  · credentials: ${credentialBefore.length}`);
  console.log(`  · waitlist entries: ${entriesBefore.length}`);

  if (credentialBefore.length > 0) {
    console.log("Already claimed — exiting without modifying state.");
    return;
  }

  console.log("Attaching credential (claim)…");
  const ctx = await auth.$context;
  const hashed = await ctx.password.hash(PASSWORD);
  await db.insert(accounts).values({
    userId,
    accountId: userId,
    providerId: "credential",
    password: hashed,
  });

  console.log("Verifying sign-in works…");
  const result = await auth.api.signInEmail({
    body: { email: EMAIL, password: PASSWORD },
    headers: new Headers(),
  });
  if (!result?.user || result.user.id !== userId) {
    throw new Error("Sign-in returned an unexpected payload");
  }
  console.log(`  · signed in as ${result.user.email} (id=${result.user.id})`);

  const entriesAfter = await db
    .select()
    .from(whitelistEntries)
    .where(eq(whitelistEntries.userId, userId));
  console.log(`  · waitlist entries still linked: ${entriesAfter.length}`);

  if (entriesAfter.length !== entriesBefore.length) {
    throw new Error("Waitlist entries went missing after claim — bug!");
  }
  console.log("\nClaim flow verified.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit(0));
