import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getCurrentSession } from "@/lib/session";

const { whitelistEntries, presaleOrders, presaleBatches } = schema;

type AccountData = NonNullable<Awaited<ReturnType<typeof getAccountData>>>;
export type AccountEntry = AccountData["entries"][number];
export type AccountOrder = AccountData["orders"][number];
export type AccountSession = AccountData["session"];

async function loadAccountData(userId: string) {
  const [entries, orders] = await Promise.all([
    db
      .select({
        id: whitelistEntries.id,
        status: whitelistEntries.status,
        position: whitelistEntries.position,
        notes: whitelistEntries.notes,
        createdAt: whitelistEntries.createdAt,
        batchName: presaleBatches.name,
        batchSlug: presaleBatches.slug,
        batchPriceCents: presaleBatches.unitPriceCents,
        batchCurrency: presaleBatches.currency,
      })
      .from(whitelistEntries)
      .innerJoin(presaleBatches, eq(whitelistEntries.batchId, presaleBatches.id))
      .where(eq(whitelistEntries.userId, userId))
      .orderBy(desc(whitelistEntries.createdAt)),
    db
      .select({
        id: presaleOrders.id,
        status: presaleOrders.status,
        quantity: presaleOrders.quantity,
        amountCents: presaleOrders.amountCents,
        currency: presaleOrders.currency,
        paidAt: presaleOrders.paidAt,
        createdAt: presaleOrders.createdAt,
        stripeCheckoutSessionId: presaleOrders.stripeCheckoutSessionId,
        batchName: presaleBatches.name,
        batchSlug: presaleBatches.slug,
      })
      .from(presaleOrders)
      .innerJoin(presaleBatches, eq(presaleOrders.batchId, presaleBatches.id))
      .where(eq(presaleOrders.userId, userId))
      .orderBy(desc(presaleOrders.createdAt)),
  ]);
  return { entries, orders };
}

/**
 * Fetch the current session and the signed-in user's waitlist + order rows.
 * Returns `null` when no session — caller should redirect.
 */
export async function getAccountData() {
  const session = await getCurrentSession();
  if (!session?.user) return null;
  const data = await loadAccountData(session.user.id);
  return { session, ...data };
}

export function formatDollars(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
