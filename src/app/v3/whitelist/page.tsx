"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { Instrument_Sans, Instrument_Serif, DM_Mono } from "next/font/google";
import { ArrowUpRight, Check } from "lucide-react";
import {
  initialState,
  submitWhitelist,
  type WhitelistFormState,
} from "@/app/actions/whitelist";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const BG = "#F4F8FC";
const INK = "#0B1F33";
const HAIR = "#DBE6F1";
const SOFT = "#5D7892";
const BRAND = "#2F7FB8";

export default function V3WhitelistPage() {
  const [state, formAction, pending] = useActionState<WhitelistFormState, FormData>(
    submitWhitelist,
    initialState,
  );

  return (
    <div
      className={`${sans.variable} ${serif.variable} ${mono.variable} min-h-screen`}
      style={{
        background: BG,
        color: INK,
        fontFamily: "var(--font-sans)",
      }}
    >
      <nav className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-6 md:px-10">
        <Link href="/v3" className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={28} height={28} />
          <span className="text-[1rem] tracking-tight" style={{ fontWeight: 500 }}>
            Reacgen
          </span>
        </Link>
        <Link
          href="/v3"
          className="inline-flex items-center gap-2 text-[14px]"
          style={{ color: SOFT }}
        >
          ← Back to overview
        </Link>
      </nav>

      <section className="mx-auto max-w-[58rem] px-6 pt-12 pb-16 md:px-10 md:pt-20">
        <p
          className="mb-8 flex items-center gap-3 text-[12px] tracking-wide"
          style={{ color: SOFT }}
        >
          <span className="inline-block size-1.5 rounded-full" style={{ background: BRAND }} />
          Founders Wave · 100 units · open
        </p>

        <h1
          className="leading-[0.98] tracking-[-0.025em]"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
            fontWeight: 500,
          }}
        >
          Reserve your probe
          <br />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: BRAND,
            }}
          >
            for the founders wave.
          </span>
        </h1>

        <p
          className="mt-8 max-w-2xl text-[1.15rem] leading-[1.55]"
          style={{ color: SOFT }}
        >
          We approve every entry by hand — usually within two working days.
          You&rsquo;ll only hear from us when your slot opens or when we have a
          direct question about your application.
        </p>
      </section>

      <section className="mx-auto max-w-[58rem] px-6 pb-32 md:px-10">
        {state.status === "success" || state.status === "duplicate" ? (
          <Success state={state} />
        ) : (
          <form
            action={formAction}
            noValidate
            className="space-y-16 border-t pt-12"
            style={{ borderColor: HAIR }}
          >
            <Section title="About you" kicker="01">
              <Grid cols={2}>
                <Input
                  label="First name"
                  name="firstName"
                  required
                  error={state.errors?.firstName}
                  autoComplete="given-name"
                />
                <Input
                  label="Last name"
                  name="lastName"
                  required
                  error={state.errors?.lastName}
                  autoComplete="family-name"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  required
                  error={state.errors?.email}
                  autoComplete="email"
                  className="md:col-span-2"
                />
                <Input
                  label="Company or institution"
                  name="company"
                  hint="If applicable"
                  error={state.errors?.company}
                  autoComplete="organization"
                />
                <Input
                  label="Role"
                  name="jobTitle"
                  hint="e.g. Process Engineer"
                  error={state.errors?.jobTitle}
                  autoComplete="organization-title"
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  hint="Optional · for installation coordination"
                  error={state.errors?.phone}
                  autoComplete="tel"
                  className="md:col-span-2"
                />
              </Grid>
            </Section>

            <Section
              title="Shipping address"
              kicker="02"
              note="Optional — only needed when your slot opens. Fill it in now if you'd like; otherwise we'll ask later."
            >
              <Grid cols={6}>
                <Input
                  label="Street address"
                  name="line1"
                  error={state.errors?.line1}
                  autoComplete="address-line1"
                  className="md:col-span-6"
                />
                <Input
                  label="Apartment, suite, etc."
                  name="line2"
                  error={state.errors?.line2}
                  autoComplete="address-line2"
                  className="md:col-span-6"
                />
                <Input
                  label="City"
                  name="city"
                  error={state.errors?.city}
                  autoComplete="address-level2"
                  className="md:col-span-3"
                />
                <Input
                  label="Region / state"
                  name="region"
                  error={state.errors?.region}
                  autoComplete="address-level1"
                  className="md:col-span-2"
                />
                <Input
                  label="Postal"
                  name="postalCode"
                  error={state.errors?.postalCode}
                  autoComplete="postal-code"
                  className="md:col-span-1"
                />
                <Input
                  label="Country"
                  name="country"
                  maxLength={2}
                  placeholder="US"
                  error={state.errors?.country}
                  autoComplete="country"
                  hint="ISO alpha-2 (e.g. US, DE, JP)"
                  className="md:col-span-2"
                />
              </Grid>
            </Section>

            <Section
              title="Anything you'd like us to know"
              kicker="03"
              note="What are you measuring, in what kind of reactor? Any timeline we should know about? It helps us prioritise."
            >
              <Textarea
                name="comments"
                rows={6}
                error={state.errors?.comments}
              />
            </Section>

            {state.status === "error" && state.message ? (
              <p
                className="rounded-sm border-l-2 bg-white px-4 py-3 text-[14.5px]"
                style={{ borderColor: BRAND, color: INK }}
              >
                {state.message}
              </p>
            ) : null}

            <div
              className="flex flex-wrap items-center justify-between gap-y-5 gap-x-8 border-t pt-10"
              style={{ borderColor: HAIR }}
            >
              <p className="max-w-md text-[13px] leading-[1.55]" style={{ color: SOFT }}>
                By submitting, you consent to Reacgen contacting you about the
                ODX-1 evaluation programme. We don&rsquo;t share this list.
              </p>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px] disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ background: INK, color: BG }}
              >
                {pending ? "Submitting…" : "Submit for review"}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        )}
      </section>

      <footer
        className="border-t"
        style={{ borderColor: HAIR }}
      >
        <div
          className="mx-auto flex max-w-[80rem] flex-col gap-4 px-6 py-10 text-[13px] md:flex-row md:items-center md:justify-between md:px-10"
          style={{ color: SOFT }}
        >
          <span>© 2026 Reacgen Biosystems, Inc.</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>probe@reacgen.bio</span>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  kicker,
  note,
  children,
}: {
  title: string;
  kicker: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 gap-x-10 gap-y-6">
      <div className="col-span-12 md:col-span-4">
        <p
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          {kicker}
        </p>
        <h2
          className="mt-3 text-[1.7rem] leading-[1.1] tracking-[-0.01em]"
          style={{ fontWeight: 500 }}
        >
          {title}
        </h2>
        {note ? (
          <p className="mt-3 text-[14px] leading-[1.55]" style={{ color: SOFT }}>
            {note}
          </p>
        ) : null}
      </div>
      <div className="col-span-12 md:col-span-8">{children}</div>
    </section>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <div
      className="grid gap-x-5 gap-y-5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  error,
  hint,
  className = "",
  maxLength,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className={`block ${className}`} style={{ gridColumn: className.includes("col-span") ? undefined : undefined }}>
      <span
        className="flex items-baseline justify-between text-[12.5px]"
        style={{ color: SOFT }}
      >
        <span>
          {label}
          {required ? <span style={{ color: BRAND }}> *</span> : null}
        </span>
        {hint ? <span className="text-[11px] opacity-80">{hint}</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-sm bg-white px-4 py-3 text-[15px] outline-none transition-colors"
        style={{
          color: INK,
          border: `1px solid ${error ? BRAND : HAIR}`,
        }}
      />
      {error ? (
        <span
          className="mt-1.5 block text-[12px]"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Textarea({
  name,
  rows = 5,
  error,
}: {
  name: string;
  rows?: number;
  error?: string;
}) {
  return (
    <label className="block">
      <textarea
        name={name}
        rows={rows}
        maxLength={4000}
        className="block w-full resize-y rounded-sm bg-white px-4 py-3 text-[15px] leading-[1.55] outline-none transition-colors"
        style={{
          color: INK,
          border: `1px solid ${error ? BRAND : HAIR}`,
          fontFamily: "var(--font-sans)",
        }}
        placeholder=""
      />
      {error ? (
        <span
          className="mt-1.5 block text-[12px]"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Success({ state }: { state: WhitelistFormState }) {
  const isDup = state.status === "duplicate";

  return (
    <div
      className="rounded-sm border bg-white p-10 md:p-16"
      style={{
        borderColor: HAIR,
        animation: "rg-fade-up 700ms ease-out both",
      }}
    >
      <div
        className="inline-flex size-12 items-center justify-center rounded-full"
        style={{ background: BRAND, color: BG }}
      >
        <Check size={22} strokeWidth={2} />
      </div>
      <p
        className="mt-8 text-[11px] tracking-[0.22em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
      >
        {isDup ? "Already received" : "Submitted"}
      </p>
      <h2
        className="mt-4 max-w-2xl text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem]"
        style={{ fontWeight: 500 }}
      >
        {isDup ? (
          <>
            We&rsquo;ve got{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              your details
            </span>
            .
          </>
        ) : (
          <>
            Thank you.{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: BRAND,
              }}
            >
              We&rsquo;ll be in touch.
            </span>
          </>
        )}
      </h2>
      <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.55]" style={{ color: SOFT }}>
        {state.message}{" "}
        {!isDup
          ? "We review every entry by hand and will email you within two working days."
          : "We won't add you twice — when your slot opens, your existing entry is the one we'll use."}
      </p>

      {state.receipt ? (
        <dl
          className="mt-12 grid grid-cols-1 gap-y-6 border-t pt-8 md:grid-cols-3 md:gap-x-10"
          style={{ borderColor: HAIR, fontFamily: "var(--font-mono)" }}
        >
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase" style={{ color: SOFT }}>
              Submitted
            </dt>
            <dd className="mt-1.5 text-[14px]" style={{ color: INK }}>
              {state.receipt.timestamp.slice(0, 19).replace("T", " ")} UTC
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase" style={{ color: SOFT }}>
              Batch
            </dt>
            <dd className="mt-1.5 text-[14px]" style={{ color: INK }}>
              {state.receipt.batchName}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase" style={{ color: SOFT }}>
              Position
            </dt>
            <dd className="mt-1.5 text-[14px]" style={{ color: INK }}>
              {state.receipt.position
                ? `#${String(state.receipt.position).padStart(3, "0")} of 100`
                : "—"}
            </dd>
          </div>
        </dl>
      ) : null}

      <div className="mt-10">
        <Link
          href="/v3"
          className="inline-flex items-center gap-2 text-[15px]"
          style={{ color: INK }}
        >
          Return to overview
          <span style={{ color: BRAND }}>→</span>
        </Link>
      </div>
    </div>
  );
}
