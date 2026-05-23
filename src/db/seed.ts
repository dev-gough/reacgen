/**
 * Idempotent seed script. Run with `pnpm db:seed`.
 *
 * Creates two demo accounts (Alice and Bob), one extra presale batch ("Pilot
 * Cohort"), one pending waitlist entry for Alice, and one redeemed entry + one
 * paid order for Bob. Re-runs are safe — every insert is guarded by either a
 * unique constraint + onConflictDoNothing or an existence check.
 */

import { and, eq, sql } from "drizzle-orm";
import { auth } from "../lib/auth";
import { db, schema } from "./index";

const {
  users,
  accounts,
  presaleBatches,
  whitelistEntries,
  presaleOrders,
} = schema;

const DEMO_PASSWORD = "Reacgen!2026";

async function ensureBatch(input: {
  slug: string;
  name: string;
  description: string;
  unitPriceCents: number;
  status: "open" | "closed";
  opensAt: Date;
  closesAt: Date | null;
}) {
  const existing = await db.query.presaleBatches.findFirst({
    where: eq(presaleBatches.slug, input.slug),
  });
  if (existing) return existing;
  const [row] = await db
    .insert(presaleBatches)
    .values(input)
    .returning();
  console.log(`  · created batch "${row.name}" (${row.slug})`);
  return row;
}

async function ensureUser(input: {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
}) {
  const email = input.email.toLowerCase();

  const existing = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${email}`)
    .limit(1);

  let userId: string;
  if (existing[0]) {
    userId = existing[0].id;
    // Refresh denormalized fields in case the seed config changed.
    await db
      .update(users)
      .set({
        name: input.name,
        firstName: input.firstName,
        lastName: input.lastName,
        company: input.company,
        jobTitle: input.jobTitle,
        emailVerified: true,
        emailVerifiedAt: existing[0].emailVerifiedAt ?? new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  } else {
    const [row] = await db
      .insert(users)
      .values({
        email,
        name: input.name,
        firstName: input.firstName,
        lastName: input.lastName,
        company: input.company,
        jobTitle: input.jobTitle,
        emailVerified: true,
        emailVerifiedAt: new Date(),
      })
      .returning();
    userId = row.id;
    console.log(`  · created user ${email}`);
  }

  // Attach a credential account if one doesn't exist yet.
  const credential = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(
      and(
        eq(accounts.userId, userId),
        eq(accounts.providerId, "credential"),
      ),
    )
    .limit(1);

  if (!credential[0]) {
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(DEMO_PASSWORD);
    await db.insert(accounts).values({
      id: crypto.randomUUID(),
      userId,
      accountId: userId,
      providerId: "credential",
      password: hash,
    });
    console.log(`  · added credential for ${email}`);
  }

  return userId;
}

async function ensureWhitelistEntry(input: {
  batchId: string;
  userId: string;
  status: "pending" | "approved" | "invited" | "redeemed";
  notes?: string;
}) {
  const result = await db
    .insert(whitelistEntries)
    .values({
      batchId: input.batchId,
      userId: input.userId,
      status: input.status,
      notes: input.notes,
    })
    .onConflictDoNothing({
      target: [whitelistEntries.batchId, whitelistEntries.userId],
    })
    .returning({ id: whitelistEntries.id });

  if (result[0]) {
    console.log(`  · created whitelist entry (${input.status})`);
  } else {
    // Make sure existing entry reflects the desired status.
    await db
      .update(whitelistEntries)
      .set({ status: input.status, updatedAt: new Date() })
      .where(
        and(
          eq(whitelistEntries.batchId, input.batchId),
          eq(whitelistEntries.userId, input.userId),
        ),
      );
  }
}

async function ensureOrder(input: {
  userId: string;
  batchId: string;
  amountCents: number;
  stripeCheckoutSessionId: string;
}) {
  // The unique index on stripe_checkout_session_id is partial (WHERE NOT NULL),
  // so ON CONFLICT can't target it cleanly. Check first, insert if missing.
  const existing = await db
    .select({ id: presaleOrders.id })
    .from(presaleOrders)
    .where(
      eq(presaleOrders.stripeCheckoutSessionId, input.stripeCheckoutSessionId),
    )
    .limit(1);

  if (existing[0]) return;

  await db.insert(presaleOrders).values({
    userId: input.userId,
    batchId: input.batchId,
    quantity: 1,
    amountCents: input.amountCents,
    currency: "USD",
    status: "paid",
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripePaymentIntentId: `pi_demo_${input.stripeCheckoutSessionId.slice(-8)}`,
    paidAt: new Date(),
  });
  console.log(`  · created paid order (${input.stripeCheckoutSessionId})`);
}

async function main() {
  console.log("Seeding…");

  console.log("Batches");
  const founders = await ensureBatch({
    slug: "founders",
    name: "Founders Wave",
    description: "First production cohort. Hand-installed by Reacgen engineers.",
    unitPriceCents: 4_500_000,
    status: "open",
    opensAt: new Date("2026-05-17T00:00:00Z"),
    closesAt: null,
  });
  const pilot = await ensureBatch({
    slug: "pilot",
    name: "Pilot Cohort",
    description: "Closed cohort of design partners running ODX-1 at pilot scale.",
    unitPriceCents: 4_800_000,
    status: "closed",
    opensAt: new Date("2026-01-15T00:00:00Z"),
    closesAt: new Date("2026-03-15T00:00:00Z"),
  });

  console.log("Users");
  const aliceId = await ensureUser({
    email: "alice@reacgen.dev",
    name: "Alice Chen",
    firstName: "Alice",
    lastName: "Chen",
    company: "Heliophage Biosciences",
    jobTitle: "Process Development Lead",
  });
  const bobId = await ensureUser({
    email: "bob@reacgen.dev",
    name: "Bob Adeyemi",
    firstName: "Bob",
    lastName: "Adeyemi",
    company: "Spire Bio",
    jobTitle: "Senior Fermentation Scientist",
  });

  console.log("Waitlist entries");
  await ensureWhitelistEntry({
    batchId: founders.id,
    userId: aliceId,
    status: "pending",
    notes: "Wants to test on 200L fed-batch CHO.",
  });
  await ensureWhitelistEntry({
    batchId: pilot.id,
    userId: bobId,
    status: "redeemed",
  });

  console.log("Orders");
  await ensureOrder({
    userId: bobId,
    batchId: pilot.id,
    amountCents: 4_800_000,
    stripeCheckoutSessionId: "cs_demo_bob_pilot",
  });

  console.log("Done.");
  console.log(`Demo credentials: alice@reacgen.dev / bob@reacgen.dev — password "${DEMO_PASSWORD}"`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit(0));
