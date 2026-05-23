import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Package,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { getAccountData, formatDollars } from "@/lib/account";

const INK = "#0B1F33";
const BG = "#F4F8FC";
const HAIR = "#DBE6F1";
const SOFT = "#5D7892";
const BRAND = "#2F7FB8";
const HIGHLIGHT = "#FFE45A";
const CARD = "#FFFFFF";

function statusTone(status: string): { fg: string; bg: string } {
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
      return { fg: "#1F4F7A", bg: "rgba(47,127,184,0.12)" };
    default:
      return { fg: SOFT, bg: "#EFEEEA" };
  }
}

function StatusPill({ value }: { value: string }) {
  const t = statusTone(value);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] tracking-[0.1em] uppercase"
      style={{
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-v3-mono)",
      }}
    >
      <span
        className="inline-block size-1.5 rounded-full"
        style={{ background: t.fg }}
      />
      {value}
    </span>
  );
}

export default async function V3AccountPage() {
  const data = await getAccountData();
  if (!data) redirect("/v3/account/sign-in");
  const { session, entries, orders } = data;
  const user = session.user;
  const handle = user.name?.trim() || user.email.split("@")[0];

  return (
    <section className="mx-auto max-w-[80rem] px-6 pt-10 pb-24 md:px-10 md:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-y-5">
        <div>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-v3-mono)" }}
          >
            Hello, {handle}
          </p>
          <h1
            className="mt-4 max-w-2xl leading-[0.98] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 600,
            }}
          >
            Your{" "}
            <span className="relative inline-block">
              account
              <svg
                aria-hidden
                viewBox="0 0 220 16"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 w-full"
                style={{ height: "0.45em" }}
              >
                <path
                  d="M2 10 Q 30 2, 55 9 T 110 9 T 165 8 T 218 10"
                  fill="none"
                  stroke={HIGHLIGHT}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , in one screen.
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.55]" style={{ color: SOFT }}>
            Signed in as <span style={{ color: INK }}>{user.email}</span>.
            Everything you do from a Reacgen landing page lands here.
          </p>
        </div>
      </header>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile
          icon={<ClipboardList size={16} strokeWidth={1.75} />}
          label="Reservations"
          value={entries.length.toString()}
        />
        <StatTile
          icon={<Receipt size={16} strokeWidth={1.75} />}
          label="Orders"
          value={orders.length.toString()}
        />
        <StatTile
          icon={<Package size={16} strokeWidth={1.75} />}
          label="Units shipped"
          value={orders
            .filter((o) => o.status === "paid")
            .reduce((sum, o) => sum + o.quantity, 0)
            .toString()}
        />
        <StatTile
          icon={<ShieldCheck size={16} strokeWidth={1.75} />}
          label="Email"
          value={user.emailVerified ? "verified" : "pending"}
          highlight={user.emailVerified}
        />
      </div>

      {/* Reservations */}
      <Section
        eyebrow="Reservations"
        title="Waitlist & cohorts"
        body="Every cohort you've reserved a spot in. Status updates land here as soon as the team approves you."
      >
        {entries.length === 0 ? (
          <Empty
            title="No reservations yet."
            body="Reserve a spot from any of the landing pages — your entry will show up here right away."
            cta={{ label: "Browse the site", href: "/v3" }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {entries.map((e) => (
              <li
                key={e.id}
                className="flex flex-col gap-4 rounded-2xl border p-6"
                style={{ borderColor: HAIR, background: CARD }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
                    >
                      cohort · {e.batchSlug}
                    </p>
                    <p className="mt-1.5 text-[1.1rem]" style={{ fontWeight: 600 }}>
                      {e.batchName}
                    </p>
                  </div>
                  <StatusPill value={e.status} />
                </div>

                <dl
                  className="grid grid-cols-2 gap-x-3 gap-y-2 text-[12.5px]"
                  style={{ fontFamily: "var(--font-v3-mono)" }}
                >
                  <dt style={{ color: SOFT }}>indicated price</dt>
                  <dd className="text-right" style={{ color: INK }}>
                    {formatDollars(e.batchPriceCents, e.batchCurrency)}
                  </dd>
                  {e.position != null ? (
                    <>
                      <dt style={{ color: SOFT }}>position</dt>
                      <dd className="text-right" style={{ color: INK }}>
                        #{e.position}
                      </dd>
                    </>
                  ) : null}
                  <dt style={{ color: SOFT }}>submitted</dt>
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
                    className="rounded-xl p-3 text-[13.5px] leading-[1.5]"
                    style={{ background: BG, color: INK }}
                  >
                    <span
                      className="mr-1 text-[11px] tracking-[0.16em] uppercase"
                      style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
                    >
                      note ·
                    </span>
                    {e.notes}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Orders */}
      <Section
        eyebrow="Orders"
        title="Purchases & deliveries"
        body="Every paid ODX-1 unit and where it ended up. Receipts are linked by Stripe checkout ID."
      >
        {orders.length === 0 ? (
          <Empty
            title="No purchases yet."
            body="When you check out for an ODX-1, your receipt and shipping ref show up here."
          />
        ) : (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li
                key={o.id}
                className="grid grid-cols-12 items-center gap-4 rounded-2xl border px-5 py-4"
                style={{ borderColor: HAIR, background: CARD }}
              >
                <div className="col-span-12 md:col-span-4">
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
                  >
                    {o.batchSlug} · {o.quantity} unit
                    {o.quantity === 1 ? "" : "s"}
                  </p>
                  <p className="mt-1 text-[1.05rem]" style={{ fontWeight: 600 }}>
                    {o.batchName}
                  </p>
                </div>
                <div
                  className="col-span-6 md:col-span-2 text-[15px]"
                  style={{ fontFamily: "var(--font-v3-mono)" }}
                >
                  {formatDollars(o.amountCents, o.currency)}
                </div>
                <div className="col-span-6 md:col-span-2">
                  <StatusPill value={o.status} />
                </div>
                <div
                  className="col-span-12 md:col-span-4 text-[12.5px] md:text-right"
                  style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
                >
                  {o.paidAt
                    ? `paid ${new Date(o.paidAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                    : `created ${new Date(o.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`}
                  {o.stripeCheckoutSessionId ? (
                    <span className="block opacity-70">
                      ref · {o.stripeCheckoutSessionId}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Profile card */}
      <Section eyebrow="Profile" title="Account details" body="">
        <dl
          className="grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl border p-6 text-[14.5px] md:grid-cols-2"
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
    </section>
  );
}

function StatTile({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border p-5"
      style={{ borderColor: HAIR, background: CARD }}
    >
      <span
        className="inline-flex size-9 items-center justify-center rounded-full"
        style={{
          background: highlight ? HIGHLIGHT : BG,
          color: highlight ? INK : BRAND,
          border: `1px solid ${HAIR}`,
        }}
      >
        {icon}
      </span>
      <div>
        <p
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
        >
          {label}
        </p>
        <p className="mt-1 text-[1.6rem]" style={{ fontWeight: 600 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-y-3 border-b pb-5" style={{ borderColor: HAIR }}>
        <div>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-v3-mono)" }}
          >
            {eyebrow}
          </p>
          <h2
            className="mt-2 text-[1.5rem] tracking-[-0.02em]"
            style={{ fontWeight: 600 }}
          >
            {title}
          </h2>
        </div>
        {body ? (
          <p className="max-w-md text-[14px] leading-[1.55]" style={{ color: SOFT }}>
            {body}
          </p>
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
        style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
      >
        {label}
      </dt>
      <dd style={{ color: INK }}>{value}</dd>
    </div>
  );
}

function Empty({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div
      className="flex flex-col items-start gap-3 rounded-2xl border border-dashed p-8 text-[14.5px]"
      style={{ borderColor: HAIR, background: BG, color: SOFT }}
    >
      <p style={{ color: INK, fontWeight: 600 }}>{title}</p>
      <p className="max-w-md leading-[1.55]">{body}</p>
      {cta ? (
        <Link
          href={cta.href}
          className="mt-2 inline-flex items-center gap-1.5 text-[13.5px]"
          style={{ color: BRAND }}
        >
          {cta.label}
          <ArrowRight size={13} />
        </Link>
      ) : null}
    </div>
  );
}
