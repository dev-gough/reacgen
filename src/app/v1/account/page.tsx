import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccountData, formatDollars } from "@/lib/account";

const INK = "#1A1814";
const PAPER = "#F3EDE0";
const GREEN = "#2E7D5B";
const RULE = "rgba(26,24,20,0.25)";
const SOFT = "rgba(26,24,20,0.65)";

export default async function V1AccountPage() {
  const data = await getAccountData();
  if (!data) redirect("/v1/account/sign-in");
  const { session, entries, orders } = data;
  const user = session.user;
  const displayName = user.name?.trim() || user.email.split("@")[0];

  return (
    <section className="mx-auto max-w-[78rem] px-6 pt-14 pb-24 md:px-16 md:pt-20">
      <div className="grid grid-cols-12 gap-x-10 gap-y-10">
        <header className="col-span-12">
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-v1-mono)", color: GREEN }}
          >
            Folio I &nbsp;§ &nbsp; Subscriber&apos;s Ledger
          </p>
          <h1
            className="mt-6 max-w-3xl leading-[0.95] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-v1-display)",
              fontSize: "clamp(2.6rem, 5.4vw, 4rem)",
              fontWeight: 400,
            }}
          >
            <span style={{ fontStyle: "italic" }}>{displayName}&apos;s</span>{" "}
            standing on the books.
          </h1>
          <p
            className="mt-6 max-w-2xl text-[17px] leading-[1.6]"
            style={{ fontFamily: "var(--font-v1-body)" }}
          >
            Filed under{" "}
            <span style={{ color: GREEN, fontFamily: "var(--font-v1-mono)" }}>
              {user.email}
            </span>
            . Below: every reservation, delivery, and outstanding entry against
            your name.
          </p>
        </header>
      </div>

      {/* ------------------------------------------------------------------ */}
      <Ledger
        roman="I"
        title="Reservations"
        subtitle="Cohorts and waitlists you have entered"
        count={entries.length}
      >
        {entries.length === 0 ? (
          <Empty
            note="No reservations on file. The Bulletin's editors will record any waitlist correspondence here."
            cta={{ label: "Read the current issue", href: "/v1" }}
          />
        ) : (
          <table
            className="w-full text-[15px]"
            style={{ fontFamily: "var(--font-v1-body)" }}
          >
            <thead>
              <Tr head>
                <Th>Cohort</Th>
                <Th>Indicated price</Th>
                <Th>Position</Th>
                <Th>Recorded</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <Tr key={e.id} striped={i % 2 === 1}>
                  <Td>
                    <span style={{ fontStyle: "italic" }}>{e.batchName}</span>
                    <span
                      className="ml-2 text-[11px] tracking-[0.18em] uppercase"
                      style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
                    >
                      {e.batchSlug}
                    </span>
                    {e.notes ? (
                      <p
                        className="mt-1 text-[13px] italic"
                        style={{ color: SOFT }}
                      >
                        “{e.notes}”
                      </p>
                    ) : null}
                  </Td>
                  <Td mono>
                    {formatDollars(e.batchPriceCents, e.batchCurrency)}
                  </Td>
                  <Td mono>{e.position != null ? `№ ${e.position}` : "—"}</Td>
                  <Td mono>
                    {new Date(e.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Td>
                  <Td>
                    <StatusGloss value={e.status} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </table>
        )}
      </Ledger>

      {/* ------------------------------------------------------------------ */}
      <Ledger
        roman="II"
        title="Deliveries"
        subtitle="Orders placed and instruments dispatched"
        count={orders.length}
      >
        {orders.length === 0 ? (
          <Empty note="No deliveries recorded against this subscriber." />
        ) : (
          <table
            className="w-full text-[15px]"
            style={{ fontFamily: "var(--font-v1-body)" }}
          >
            <thead>
              <Tr head>
                <Th>Cohort</Th>
                <Th>Quantity</Th>
                <Th>Amount</Th>
                <Th>Date paid</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <Tr key={o.id} striped={i % 2 === 1}>
                  <Td>
                    <span style={{ fontStyle: "italic" }}>{o.batchName}</span>
                    <span
                      className="ml-2 text-[11px] tracking-[0.18em] uppercase"
                      style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
                    >
                      {o.batchSlug}
                    </span>
                    {o.stripeCheckoutSessionId ? (
                      <p
                        className="mt-1 text-[11px] tracking-[0.18em] uppercase"
                        style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
                      >
                        Ref. {o.stripeCheckoutSessionId}
                      </p>
                    ) : null}
                  </Td>
                  <Td mono>{o.quantity}</Td>
                  <Td mono>{formatDollars(o.amountCents, o.currency)}</Td>
                  <Td mono>
                    {o.paidAt
                      ? new Date(o.paidAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </Td>
                  <Td>
                    <StatusGloss value={o.status} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </table>
        )}
      </Ledger>

      {/* ------------------------------------------------------------------ */}
      <Ledger
        roman="III"
        title="Subscriber"
        subtitle="Particulars and standing with the editors"
      >
        <dl
          className="grid grid-cols-1 gap-x-12 gap-y-5 text-[15px] md:grid-cols-2"
          style={{ fontFamily: "var(--font-v1-body)" }}
        >
          <Marginal label="Name on the books" value={user.name || "—"} />
          <Marginal label="Correspondence" value={user.email} />
          <Marginal
            label="Email confirmation"
            value={
              user.emailVerified ? (
                <span style={{ color: GREEN, fontStyle: "italic" }}>
                  acknowledged
                </span>
              ) : (
                <span style={{ color: SOFT, fontStyle: "italic" }}>
                  awaiting confirmation
                </span>
              )
            }
          />
          <Marginal
            label="Enrolled"
            value={new Date(user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </dl>
      </Ledger>
    </section>
  );
}

function Ledger({
  roman,
  title,
  subtitle,
  count,
  children,
}: {
  roman: string;
  title: string;
  subtitle?: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <div
        className="flex items-end justify-between border-b pb-3"
        style={{ borderColor: RULE }}
      >
        <div className="flex items-baseline gap-4">
          <span
            className="text-[14px] tracking-[0.22em] uppercase"
            style={{
              color: GREEN,
              fontFamily: "var(--font-v1-display)",
              fontStyle: "italic",
            }}
          >
            № {roman}
          </span>
          <h2
            className="text-[1.9rem] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-v1-display)",
              fontWeight: 400,
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <span
              className="text-[12.5px] italic"
              style={{ color: SOFT, fontFamily: "var(--font-v1-body)" }}
            >
              — {subtitle}
            </span>
          ) : null}
        </div>
        {typeof count === "number" ? (
          <span
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
          >
            {count} {count === 1 ? "entry" : "entries"}
          </span>
        ) : null}
      </div>
      <div className="mt-6 overflow-x-auto">{children}</div>
    </section>
  );
}

function Tr({
  children,
  head,
  striped,
}: {
  children: React.ReactNode;
  head?: boolean;
  striped?: boolean;
}) {
  return (
    <tr
      style={{
        background: striped ? "rgba(26,24,20,0.035)" : "transparent",
        borderTop: head ? "none" : `1px solid ${RULE}`,
      }}
    >
      {head ? children : children}
    </tr>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-3 py-3 text-left text-[10.5px] tracking-[0.22em] uppercase"
      style={{ color: SOFT, fontFamily: "var(--font-v1-mono)", fontWeight: 400 }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  mono,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <td
      className="px-3 py-4 align-top"
      style={{
        fontFamily: mono ? "var(--font-v1-mono)" : "var(--font-v1-body)",
        fontSize: mono ? 14 : 16,
        color: INK,
      }}
    >
      {children}
    </td>
  );
}

function Marginal({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-1 border-b pb-3"
      style={{ borderColor: RULE }}
    >
      <span
        className="text-[10.5px] tracking-[0.22em] uppercase"
        style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
      >
        {label}
      </span>
      <span style={{ color: INK }}>{value}</span>
    </div>
  );
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
      className="border p-8 text-center"
      style={{
        borderColor: RULE,
        background: "rgba(26,24,20,0.02)",
      }}
    >
      <p
        className="text-[15px] italic"
        style={{ color: SOFT, fontFamily: "var(--font-v1-body)" }}
      >
        {note}
      </p>
      {cta ? (
        <Link
          href={cta.href}
          className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase"
          style={{ color: GREEN, fontFamily: "var(--font-v1-mono)" }}
        >
          {cta.label} →
        </Link>
      ) : null}
    </div>
  );
}

function StatusGloss({ value }: { value: string }) {
  const map: Record<string, { fg: string; label: string }> = {
    pending: { fg: "#7A5A00", label: "pending review" },
    approved: { fg: GREEN, label: "approved" },
    invited: { fg: "#1F4F7A", label: "invited" },
    redeemed: { fg: GREEN, label: "redeemed" },
    rejected: { fg: "#7A1F1F", label: "rejected" },
    expired: { fg: "#7A1F1F", label: "expired" },
    paid: { fg: GREEN, label: "paid" },
    processing: { fg: "#7A5A00", label: "processing" },
    refunded: { fg: "#7A1F1F", label: "refunded" },
    cancelled: { fg: "#7A1F1F", label: "cancelled" },
    failed: { fg: "#7A1F1F", label: "failed" },
    created: { fg: SOFT, label: "created" },
    requires_payment: { fg: "#7A5A00", label: "awaits payment" },
  };
  const t = map[value] ?? { fg: SOFT, label: value };
  return (
    <span
      className="text-[12.5px] italic"
      style={{ color: t.fg, fontFamily: "var(--font-v1-body)" }}
    >
      {t.label}
    </span>
  );
}
