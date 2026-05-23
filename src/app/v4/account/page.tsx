import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccountData, formatDollars } from "@/lib/account";

const INK = "#2C2218";
const INK_SOFT = "#74634F";
const HAIR = "#D7CDB9";
const LIGHT = "#F4EDDD";

export default async function V4AccountPage() {
  const data = await getAccountData();
  if (!data) redirect("/v4/account/sign-in");
  const { session, entries, orders } = data;
  const user = session.user;
  const handle = user.name?.trim() || user.email.split("@")[0];

  return (
    <section className="mx-auto max-w-[72rem] px-6 pt-16 pb-32 md:px-12 md:pt-24">
      <div className="grid grid-cols-12 gap-x-8 gap-y-14">
        <aside className="col-span-12 md:col-span-1">
          <Marginalia label="Account" />
        </aside>

        <header className="col-span-12 md:col-span-10">
          <h1
            className="leading-[0.95]"
            style={{
              fontFamily: "var(--font-v4-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 7vw, 5.4rem)",
              letterSpacing: "-0.015em",
            }}
          >
            {handle},{" "}
            <span style={{ fontStyle: "italic", color: INK_SOFT }}>
              your record.
            </span>
          </h1>
          <p
            className="mt-10 max-w-2xl text-[19px] leading-[1.6]"
            style={{ fontFamily: "var(--font-v4-display)", color: INK_SOFT }}
          >
            What follows is everything the workshop knows of you — kept simply,
            kept here. Signed in as{" "}
            <span style={{ color: INK }}>{user.email}</span>.
          </p>
        </header>
      </div>

      {/* Reservations */}
      <Chapter roman="I" title="Reservations">
        {entries.length === 0 ? (
          <Empty
            note="Nothing reserved at present."
            cta={{ label: "Browse the instrument", href: "/v4" }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
            {entries.map((e) => (
              <li key={e.id} className="grid grid-cols-12 gap-x-4">
                <Marginalia
                  label={new Date(e.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  className="col-span-12 md:col-span-3"
                />
                <div className="col-span-12 md:col-span-9">
                  <h3
                    className="text-[1.9rem] leading-[1.05]"
                    style={{
                      fontFamily: "var(--font-v4-display)",
                      fontWeight: 400,
                    }}
                  >
                    {e.batchName}{" "}
                    <span
                      className="text-[1rem] italic"
                      style={{ color: INK_SOFT }}
                    >
                      — {statusLabel(e.status)}
                    </span>
                  </h3>
                  <dl
                    className="mt-3 grid grid-cols-2 gap-y-2 text-[14px]"
                    style={{ color: INK_SOFT }}
                  >
                    <dt>Indicated price</dt>
                    <dd className="text-right" style={{ color: INK }}>
                      {formatDollars(e.batchPriceCents, e.batchCurrency)}
                    </dd>
                    {e.position != null ? (
                      <>
                        <dt>Position on the list</dt>
                        <dd className="text-right" style={{ color: INK }}>
                          № {e.position}
                        </dd>
                      </>
                    ) : null}
                  </dl>
                  {e.notes ? (
                    <p
                      className="mt-4 text-[15px] italic leading-[1.6]"
                      style={{ color: INK_SOFT }}
                    >
                      “{e.notes}”
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Chapter>

      {/* Deliveries */}
      <Chapter roman="II" title="Deliveries">
        {orders.length === 0 ? (
          <Empty note="No deliveries to your name as yet." />
        ) : (
          <ul className="grid grid-cols-1 gap-y-10">
            {orders.map((o) => (
              <li key={o.id} className="grid grid-cols-12 gap-x-4">
                <Marginalia
                  label={
                    o.paidAt
                      ? new Date(o.paidAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Ordered"
                  }
                  className="col-span-12 md:col-span-3"
                />
                <div className="col-span-12 md:col-span-9">
                  <h3
                    className="text-[1.9rem] leading-[1.05]"
                    style={{
                      fontFamily: "var(--font-v4-display)",
                      fontWeight: 400,
                    }}
                  >
                    {o.batchName}{" "}
                    <span
                      className="text-[1rem] italic"
                      style={{ color: INK_SOFT }}
                    >
                      — {statusLabel(o.status)}
                    </span>
                  </h3>
                  <dl
                    className="mt-3 grid grid-cols-2 gap-y-2 text-[14px]"
                    style={{ color: INK_SOFT }}
                  >
                    <dt>Quantity</dt>
                    <dd className="text-right" style={{ color: INK }}>
                      {o.quantity}
                    </dd>
                    <dt>Amount</dt>
                    <dd className="text-right" style={{ color: INK }}>
                      {formatDollars(o.amountCents, o.currency)}
                    </dd>
                    {o.stripeCheckoutSessionId ? (
                      <>
                        <dt>Receipt reference</dt>
                        <dd
                          className="text-right text-[13px] italic"
                          style={{ color: INK_SOFT }}
                        >
                          {o.stripeCheckoutSessionId}
                        </dd>
                      </>
                    ) : null}
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Chapter>

      {/* Subscriber */}
      <Chapter roman="III" title="Subscriber">
        <ul className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
          <ProfileItem label="Name" value={user.name || "—"} />
          <ProfileItem label="Correspondence" value={user.email} />
          <ProfileItem
            label="Email confirmation"
            value={
              user.emailVerified ? (
                <span style={{ fontStyle: "italic" }}>acknowledged</span>
              ) : (
                <span style={{ fontStyle: "italic", color: INK_SOFT }}>
                  awaiting confirmation
                </span>
              )
            }
          />
          <ProfileItem
            label="Enrolled"
            value={new Date(user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </ul>
      </Chapter>
    </section>
  );
}

function Chapter({
  roman,
  title,
  children,
}: {
  roman: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-24">
      <div
        className="mb-12 grid grid-cols-12 items-baseline border-t pt-8"
        style={{ borderColor: HAIR }}
      >
        <Marginalia
          label={`Chapter ${roman}`}
          className="col-span-12 md:col-span-1"
        />
        <h2
          className="col-span-12 md:col-span-10 text-[2.6rem] leading-none md:text-[3.2rem]"
          style={{
            fontFamily: "var(--font-v4-display)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="mx-auto md:ml-[8.33%]">{children}</div>
    </section>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-12 gap-x-4">
      <Marginalia
        label={label}
        className="col-span-12 md:col-span-3"
      />
      <span
        className="col-span-12 md:col-span-9 text-[20px]"
        style={{ fontFamily: "var(--font-v4-display)", color: INK }}
      >
        {value}
      </span>
    </li>
  );
}

function Marginalia({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`block text-[11px] ${className ?? ""}`}
      style={{
        fontFamily: "var(--font-v4-sans)",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: INK_SOFT,
      }}
    >
      {label}
    </span>
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
      className="border p-10 text-center"
      style={{ borderColor: HAIR, background: LIGHT }}
    >
      <p
        className="text-[19px] italic"
        style={{ fontFamily: "var(--font-v4-display)", color: INK_SOFT }}
      >
        {note}
      </p>
      {cta ? (
        <Link
          href={cta.href}
          className="mt-4 inline-block text-[11px]"
          style={{
            fontFamily: "var(--font-v4-sans)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: INK,
            textDecoration: "underline",
            textUnderlineOffset: "6px",
          }}
        >
          {cta.label} →
        </Link>
      ) : null}
    </div>
  );
}

function statusLabel(value: string) {
  switch (value) {
    case "pending":
      return "in review";
    case "approved":
      return "approved";
    case "redeemed":
      return "redeemed";
    case "invited":
      return "invited";
    case "expired":
      return "expired";
    case "rejected":
      return "declined";
    case "paid":
      return "paid";
    case "fulfilled":
      return "fulfilled";
    case "processing":
      return "in transit";
    case "refunded":
      return "refunded";
    case "cancelled":
      return "cancelled";
    case "failed":
      return "failed";
    case "requires_payment":
      return "awaits payment";
    default:
      return value;
  }
}
