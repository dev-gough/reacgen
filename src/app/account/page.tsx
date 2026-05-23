import { redirect } from "next/navigation";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Package,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import { db, schema } from "@/db";
import { getCurrentSession } from "@/lib/session";

const { whitelistEntries, presaleOrders, presaleBatches } = schema;

const INK = "#0F1311";
const BG = "#FAFAF7";
const HAIR = "#E5E5DC";
const SOFT = "#67726B";
const BRAND = "#2F7FB8";
const CARD = "#FFFFFF";
const CARD_SOFT = "#F1F6FB";

function dollars(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function statusTone(status: string) {
  switch (status) {
    case "paid":
    case "approved":
    case "redeemed":
    case "fulfilled":
      return { fg: "#0F6E3B", bg: "#E6F4EC" };
    case "pending":
    case "processing":
    case "requires_payment":
    case "draft":
    case "open":
      return { fg: "#7A5A00", bg: "#FBF1D9" };
    case "rejected":
    case "failed":
    case "expired":
    case "cancelled":
    case "refunded":
      return { fg: "#7A1F1F", bg: "#FBE6E6" };
    case "invited":
      return { fg: "#1F4F7A", bg: "#E6EEF6" };
    default:
      return { fg: SOFT, bg: "#EFEEEA" };
  }
}

function StatusPill({ value }: { value: string }) {
  const t = statusTone(value);
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] tracking-[0.1em] uppercase"
      style={{
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-account-mono)",
      }}
    >
      {value}
    </span>
  );
}

export default async function AccountPage() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect("/account/sign-in");
  }
  const user = session.user;
  const userId = user.id;

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
      .innerJoin(
        presaleBatches,
        eq(whitelistEntries.batchId, presaleBatches.id),
      )
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

  const displayName = user.name?.trim() || user.email.split("@")[0];

  return (
    <div className="mx-auto max-w-[64rem] px-6 pt-14 pb-12 md:px-10 md:pt-20">
      <p
        className="text-[11px] tracking-[0.22em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-account-mono)" }}
      >
        Hello, {displayName}
      </p>
      <h1
        className="mt-4 max-w-2xl leading-[1] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(2.1rem, 4.4vw, 3.2rem)",
          fontWeight: 500,
        }}
      >
        Your{" "}
        <span
          style={{
            fontFamily: "var(--font-account-serif)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          orders, runs, and waitlist
        </span>
        .
      </h1>
      <p
        className="mt-4 max-w-2xl text-[15px] leading-[1.55]"
        style={{ color: SOFT }}
      >
        Signed in as <span style={{ color: INK }}>{user.email}</span>. Anything
        you place from a Reacgen landing page or buy through checkout will land
        here.
      </p>

      <Section
        eyebrow="Waitlist"
        icon={<Clock size={16} strokeWidth={1.75} />}
        title="Reservations"
        count={entries.length}
      >
        {entries.length === 0 ? (
          <EmptyState
            icon={<CircleDashed size={20} strokeWidth={1.5} />}
            title="No reservations yet."
            body="Join a cohort from one of the landing pages — your spot will appear here once it's recorded."
            cta={{ label: "Browse landing pages", href: "/" }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {entries.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border p-5"
                style={{ borderColor: HAIR, background: CARD }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-[11px] tracking-[0.18em] uppercase"
                      style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
                    >
                      {e.batchSlug}
                    </p>
                    <p className="mt-1 text-[1.05rem]" style={{ fontWeight: 500 }}>
                      {e.batchName}
                    </p>
                  </div>
                  <StatusPill value={e.status} />
                </div>

                <dl
                  className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-[12.5px]"
                  style={{ fontFamily: "var(--font-account-mono)" }}
                >
                  <dt style={{ color: SOFT }}>Unit price</dt>
                  <dd className="text-right" style={{ color: INK }}>
                    {dollars(e.batchPriceCents, e.batchCurrency)}
                  </dd>
                  {e.position != null ? (
                    <>
                      <dt style={{ color: SOFT }}>Position</dt>
                      <dd className="text-right" style={{ color: INK }}>
                        #{e.position}
                      </dd>
                    </>
                  ) : null}
                  <dt style={{ color: SOFT }}>Submitted</dt>
                  <dd className="text-right" style={{ color: INK }}>
                    {new Date(e.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </dd>
                </dl>

                {e.notes ? (
                  <p
                    className="mt-4 rounded-lg p-3 text-[13px] leading-[1.5]"
                    style={{ background: CARD_SOFT, color: INK }}
                  >
                    <span style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}>
                      Note ·{" "}
                    </span>
                    {e.notes}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        eyebrow="Purchases"
        icon={<Receipt size={16} strokeWidth={1.75} />}
        title="Orders"
        count={orders.length}
      >
        {orders.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag size={20} strokeWidth={1.5} />}
            title="No purchases yet."
            body="Once you check out for an ODX-1 unit it'll appear here with receipt + shipping detail."
          />
        ) : (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-12 items-center gap-4 rounded-2xl border p-5"
                style={{ borderColor: HAIR, background: CARD }}
              >
                <div className="col-span-12 md:col-span-5">
                  <p
                    className="text-[11px] tracking-[0.18em] uppercase"
                    style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
                  >
                    {o.batchSlug} · {o.quantity} unit
                    {o.quantity === 1 ? "" : "s"}
                  </p>
                  <p className="mt-1 text-[1.05rem]" style={{ fontWeight: 500 }}>
                    {o.batchName}
                  </p>
                </div>
                <div
                  className="col-span-6 md:col-span-3 text-[14.5px]"
                  style={{ fontFamily: "var(--font-account-mono)", color: INK }}
                >
                  {dollars(o.amountCents, o.currency)}
                </div>
                <div className="col-span-6 md:col-span-2">
                  <StatusPill value={o.status} />
                </div>
                <div
                  className="col-span-12 md:col-span-2 text-[12.5px] md:text-right"
                  style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
                >
                  {o.paidAt
                    ? `paid ${new Date(o.paidAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                    : `created ${new Date(o.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`}
                </div>
                {o.stripeCheckoutSessionId ? (
                  <p
                    className="col-span-12 text-[11.5px]"
                    style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
                  >
                    Receipt ref · {o.stripeCheckoutSessionId}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        eyebrow="Profile"
        icon={<Package size={16} strokeWidth={1.75} />}
        title="Details"
      >
        <dl
          className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-2xl border p-6 text-[14px] md:grid-cols-2"
          style={{ borderColor: HAIR, background: CARD }}
        >
          <Row label="Name" value={user.name || "—"} />
          <Row label="Email" value={user.email} />
          <Row
            label="Email verified"
            value={
              user.emailVerified ? (
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ color: "#0F6E3B" }}
                >
                  <CheckCircle2 size={14} strokeWidth={2} /> verified
                </span>
              ) : (
                <span style={{ color: SOFT }}>not yet verified</span>
              )
            }
          />
          <Row
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </dl>
      </Section>
    </div>
  );
}

function Section({
  eyebrow,
  icon,
  title,
  count,
  children,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: HAIR }}>
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex size-7 items-center justify-center rounded-full"
            style={{
              background: CARD_SOFT,
              color: BRAND,
              border: `1px solid ${HAIR}`,
            }}
          >
            {icon}
          </span>
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
          >
            {eyebrow}
          </p>
          <h2 className="ml-2 text-[1.1rem]" style={{ fontWeight: 500 }}>
            {title}
          </h2>
        </div>
        {typeof count === "number" ? (
          <span
            className="text-[12px]"
            style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
          >
            {count} {count === 1 ? "record" : "records"}
          </span>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0" style={{ borderColor: HAIR }}>
      <dt
        className="text-[11.5px] tracking-[0.18em] uppercase"
        style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
      >
        {label}
      </dt>
      <dd style={{ color: INK }}>{value}</dd>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  body,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div
      className="flex flex-col items-start gap-3 rounded-2xl border border-dashed p-8 text-[14.5px]"
      style={{ borderColor: HAIR, background: BG, color: SOFT }}
    >
      <span
        className="inline-flex size-9 items-center justify-center rounded-full"
        style={{ background: CARD, color: SOFT, border: `1px solid ${HAIR}` }}
      >
        {icon}
      </span>
      <p style={{ color: INK, fontWeight: 500 }}>{title}</p>
      <p className="max-w-md leading-[1.55]">{body}</p>
      {cta ? (
        <Link
          href={cta.href}
          className="mt-1 inline-flex items-center gap-1.5 text-[14px] underline underline-offset-4"
          style={{ color: BRAND }}
        >
          {cta.label} →
        </Link>
      ) : null}
    </div>
  );
}
