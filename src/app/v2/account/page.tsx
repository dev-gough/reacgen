import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccountData, formatDollars } from "@/lib/account";

const PANEL = "#0C1014";
const GRID = "#1A2128";
const TEXT = "#D4DDE0";
const MUTED = "#5A6770";
const BRAND = "#3DA478";
const HOT = "#7CFFAE";
const WARN = "#F4B860";
const DANGER = "#F47860";

const STATUS_COLORS: Record<string, string> = {
  pending: WARN,
  open: WARN,
  draft: MUTED,
  approved: HOT,
  invited: "#60A8F4",
  redeemed: HOT,
  fulfilled: HOT,
  paid: HOT,
  processing: WARN,
  requires_payment: WARN,
  created: MUTED,
  rejected: DANGER,
  failed: DANGER,
  cancelled: DANGER,
  refunded: DANGER,
  expired: DANGER,
};

export default async function V2AccountPage() {
  const data = await getAccountData();
  if (!data) redirect("/v2/account/sign-in");
  const { session, entries, orders } = data;
  const user = session.user;
  const handle = user.email.split("@")[0];

  return (
    <section className="mx-auto max-w-[88rem] px-6 pt-10 pb-20 md:px-10 md:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-y-6">
        <div>
          <p
            className="text-[10.5px] tracking-[0.18em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-v2-mono)" }}
          >
            // session.read
          </p>
          <h1
            className="mt-4 leading-[0.95] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-v2-display)",
              fontSize: "clamp(2rem, 4.4vw, 3.2rem)",
            }}
          >
            {handle}
            <span style={{ color: HOT }}>@odx-1</span>
          </h1>
        </div>
        <div
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{ color: MUTED, fontFamily: "var(--font-v2-mono)" }}
        >
          {">"} {entries.length} reservations · {orders.length} orders
        </div>
      </header>

      <div
        className="mt-10 grid grid-cols-2 gap-px md:grid-cols-4"
        style={{ background: GRID }}
      >
        <Tile
          label="User ID"
          value={user.id.slice(0, 8)}
          sub={user.id.slice(9, 13) + "…"}
        />
        <Tile
          label="Email"
          value={user.email}
          sub={user.emailVerified ? "verified" : "pending verify"}
          subColor={user.emailVerified ? HOT : WARN}
        />
        <Tile
          label="Enrolled"
          value={new Date(user.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          sub={timeSince(new Date(user.createdAt))}
        />
        <Tile
          label="Session"
          value="active"
          sub="db-backed · 7d"
          valueColor={HOT}
        />
      </div>

      {/* RESERVATIONS / WAITLIST */}
      <Panel
        index="01"
        title="reservations"
        subtitle="waitlist entries indexed against this account"
        right={`${entries.length} record${entries.length === 1 ? "" : "s"}`}
      >
        {entries.length === 0 ? (
          <Empty
            note="// no reservations on file"
            cta={{ label: "browse cohorts →", href: "/v2" }}
          />
        ) : (
          <ReadoutTable
            head={["cohort", "unit_price", "position", "submitted", "status"]}
            rows={entries.map((e) => [
              <span key={`${e.id}-name`}>
                <span style={{ color: TEXT }}>{e.batchName}</span>
                <span className="ml-2" style={{ color: MUTED }}>
                  {e.batchSlug}
                </span>
                {e.notes ? (
                  <p className="mt-1 text-[12px]" style={{ color: MUTED }}>
                    note: {e.notes}
                  </p>
                ) : null}
              </span>,
              formatDollars(e.batchPriceCents, e.batchCurrency),
              e.position != null ? `#${e.position}` : "—",
              new Date(e.createdAt).toISOString().slice(0, 10),
              <StatusChip key={`${e.id}-status`} value={e.status} />,
            ])}
          />
        )}
      </Panel>

      {/* ORDERS */}
      <Panel
        index="02"
        title="orders"
        subtitle="dispatched units and outstanding payments"
        right={`${orders.length} record${orders.length === 1 ? "" : "s"}`}
      >
        {orders.length === 0 ? (
          <Empty note="// no orders on file" />
        ) : (
          <ReadoutTable
            head={["cohort", "qty", "amount", "paid", "ref", "status"]}
            rows={orders.map((o) => [
              <span key={`${o.id}-name`}>
                <span style={{ color: TEXT }}>{o.batchName}</span>
                <span className="ml-2" style={{ color: MUTED }}>
                  {o.batchSlug}
                </span>
              </span>,
              o.quantity.toString(),
              formatDollars(o.amountCents, o.currency),
              o.paidAt
                ? new Date(o.paidAt).toISOString().slice(0, 10)
                : "—",
              o.stripeCheckoutSessionId ?? "—",
              <StatusChip key={`${o.id}-status`} value={o.status} />,
            ])}
          />
        )}
      </Panel>
    </section>
  );
}

function Tile({
  label,
  value,
  sub,
  valueColor,
  subColor,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  valueColor?: string;
  subColor?: string;
}) {
  return (
    <div
      className="px-4 py-4 md:px-5 md:py-5"
      style={{ background: PANEL, fontFamily: "var(--font-v2-mono)" }}
    >
      <p
        className="text-[10.5px] tracking-[0.18em] uppercase"
        style={{ color: MUTED }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-[16px] truncate"
        style={{ color: valueColor ?? TEXT }}
        title={typeof value === "string" ? value : undefined}
      >
        {value}
      </p>
      {sub ? (
        <p
          className="mt-1 text-[11px] tracking-[0.18em] uppercase"
          style={{ color: subColor ?? MUTED }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function Panel({
  index,
  title,
  subtitle,
  right,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  right?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-12 border"
      style={{ borderColor: GRID, background: PANEL }}
    >
      <div
        className="flex flex-wrap items-baseline justify-between gap-y-2 border-b px-5 py-3"
        style={{ borderColor: GRID, fontFamily: "var(--font-v2-mono)" }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="text-[10.5px] tracking-[0.22em] uppercase"
            style={{ color: HOT }}
          >
            {index}
          </span>
          <span
            className="text-[14px] tracking-wide"
            style={{ color: TEXT }}
          >
            {title}
          </span>
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{ color: MUTED }}
          >
            — {subtitle}
          </span>
        </div>
        {right ? (
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{ color: MUTED }}
          >
            {right}
          </span>
        ) : null}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

function ReadoutTable({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <table
      className="w-full text-left text-[13.5px]"
      style={{ fontFamily: "var(--font-v2-mono)" }}
    >
      <thead>
        <tr style={{ borderBottom: `1px solid ${GRID}` }}>
          {head.map((h) => (
            <th
              key={h}
              className="px-5 py-3 text-[10.5px] tracking-[0.18em] uppercase"
              style={{ color: MUTED, fontWeight: 400 }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, i) => (
          <tr
            key={i}
            style={{
              borderBottom: `1px solid ${GRID}`,
              background: i % 2 === 1 ? "rgba(26,33,40,0.35)" : "transparent",
            }}
          >
            {cells.map((c, j) => (
              <td
                key={j}
                className="px-5 py-4 align-top"
                style={{ color: TEXT }}
              >
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StatusChip({ value }: { value: string }) {
  const color = STATUS_COLORS[value] ?? MUTED;
  return (
    <span
      className="inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] tracking-[0.16em] uppercase"
      style={{
        borderColor: color,
        color,
        background: `rgba(${hexToRgb(color)},0.06)`,
      }}
    >
      <span
        className="inline-block size-1.5 rounded-full"
        style={{ background: color }}
      />
      {value}
    </span>
  );
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function Empty({
  note,
  cta,
}: {
  note: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div
      className="flex flex-col items-start gap-3 px-6 py-10"
      style={{ fontFamily: "var(--font-v2-mono)" }}
    >
      <p
        className="text-[13px] tracking-[0.16em] uppercase"
        style={{ color: MUTED }}
      >
        {note}
      </p>
      {cta ? (
        <Link
          href={cta.href}
          className="text-[12px] tracking-[0.2em] uppercase underline underline-offset-4"
          style={{ color: HOT }}
        >
          {cta.label}
        </Link>
      ) : null}
    </div>
  );
}

function timeSince(date: Date) {
  const ms = Date.now() - date.getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
