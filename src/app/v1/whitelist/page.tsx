"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { Fraunces, Newsreader, Fragment_Mono } from "next/font/google";
import {
  initialState,
  submitWhitelist,
  type WhitelistFormState,
} from "@/app/actions/whitelist";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

const PAPER = "#F3EDE0";
const INK = "#1A1814";
const GREEN = "#2E7D5B";
const HAIR = "rgba(26,24,20,0.28)";

export default function V1WhitelistPage() {
  const [state, formAction, pending] = useActionState<WhitelistFormState, FormData>(
    submitWhitelist,
    initialState,
  );

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen`}
      style={{ background: PAPER, color: INK, fontFamily: "var(--font-body)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1A1814 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <header className="relative mx-auto flex max-w-[78rem] items-end justify-between px-6 pt-8 pb-4 md:px-16">
        <Link href="/v1" className="flex items-baseline gap-3">
          <Image
            src="/logo-mark.png"
            alt="Reacgen Biosystems"
            width={32}
            height={32}
            className="translate-y-1"
          />
          <span
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Reacgen · Bulletin · ← Vol. I
          </span>
        </Link>
        <span
          className="hidden text-[11px] tracking-[0.22em] uppercase md:inline"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Correspondence Form 01-A
        </span>
      </header>

      <hr className="relative mx-6 border-0 border-t md:mx-16" style={{ borderColor: HAIR }} />

      <section className="relative mx-auto max-w-[78rem] px-6 pt-16 pb-24 md:px-16 md:pt-24">
        <p
          className="text-[11px] tracking-[0.32em] uppercase"
          style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
        >
          Request for inclusion · Founders Wave
        </p>
        <h1
          className="mt-8 max-w-4xl font-light leading-[0.95] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-display)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontSize: "clamp(2.6rem, 7vw, 5.8rem)",
          }}
        >
          A note to the <em style={{ fontStyle: "italic", color: GREEN }}>editor</em>,
          if you please.
        </h1>
        <p className="mt-8 max-w-2xl text-[1.15rem] leading-[1.55] md:text-[1.25rem]">
          Submissions for the founding hundred close when the lot is allocated.
          Tell us briefly who you are, where the probe should ship, and what
          you intend to put inside it.
        </p>
      </section>

      <section className="relative mx-auto max-w-[78rem] px-6 pb-24 md:px-16">
        {state.status === "success" || state.status === "duplicate" ? (
          <SuccessNotice state={state} />
        ) : (
          <form
            action={formAction}
            className="grid grid-cols-12 gap-x-10 gap-y-12"
            noValidate
          >
            <SectionHead n="§ 01" title="Correspondent" />
            <FieldGroup className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                <Field
                  label="Given name"
                  name="firstName"
                  required
                  error={state.errors?.firstName}
                />
                <Field
                  label="Family name"
                  name="lastName"
                  required
                  error={state.errors?.lastName}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  className="md:col-span-2"
                  error={state.errors?.email}
                />
                <Field label="Institution / company" name="company" error={state.errors?.company} />
                <Field label="Title / role" name="jobTitle" error={state.errors?.jobTitle} />
                <Field
                  label="Telephone"
                  name="phone"
                  type="tel"
                  className="md:col-span-2"
                  error={state.errors?.phone}
                />
              </div>
            </FieldGroup>

            <SectionHead n="§ 02" title="Address for shipment" optional />
            <FieldGroup className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-6">
                <Field
                  label="Street, line one"
                  name="line1"
                  className="md:col-span-6"
                  error={state.errors?.line1}
                />
                <Field
                  label="Street, line two"
                  name="line2"
                  className="md:col-span-6"
                  error={state.errors?.line2}
                />
                <Field
                  label="City"
                  name="city"
                  className="md:col-span-3"
                  error={state.errors?.city}
                />
                <Field
                  label="Region / state"
                  name="region"
                  className="md:col-span-2"
                  error={state.errors?.region}
                />
                <Field
                  label="Postal code"
                  name="postalCode"
                  className="md:col-span-1"
                  error={state.errors?.postalCode}
                />
                <Field
                  label="Country (ISO α-2)"
                  name="country"
                  className="md:col-span-2"
                  maxLength={2}
                  placeholder="US"
                  error={state.errors?.country}
                />
              </div>
            </FieldGroup>

            <SectionHead n="§ 03" title="Note to the editor" optional />
            <FieldGroup className="col-span-12 md:col-span-9">
              <Textarea
                label="Questions, intended application, anything you'd like us to know"
                name="comments"
                rows={6}
                error={state.errors?.comments}
              />
            </FieldGroup>

            <div className="col-span-12 md:col-start-4 md:col-span-9">
              {state.status === "error" && state.message ? (
                <p
                  className="mb-6 border-l-2 pl-4 text-[0.95rem]"
                  style={{ borderColor: GREEN, fontFamily: "var(--font-body)" }}
                >
                  {state.message}
                </p>
              ) : null}

              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t pt-8" style={{ borderColor: HAIR }}>
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.24em] uppercase transition-opacity disabled:opacity-60"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: INK,
                    color: PAPER,
                  }}
                >
                  {pending ? "Submitting…" : "Submit for review"}
                  <span aria-hidden style={{ color: GREEN }}>→</span>
                </button>
                <p
                  className="text-[11px] tracking-[0.18em] uppercase max-w-md"
                  style={{ color: "rgba(26,24,20,0.65)", fontFamily: "var(--font-mono)" }}
                >
                  We reply within two working days · No marketing list
                </p>
              </div>
            </div>
          </form>
        )}
      </section>

      <footer className="relative mx-auto flex max-w-[78rem] flex-col gap-3 px-6 pb-16 pt-8 text-[10px] tracking-[0.22em] uppercase opacity-70 md:flex-row md:items-center md:justify-between md:px-16">
        <span style={{ fontFamily: "var(--font-mono)" }}>© 2026 Reacgen Biosystems</span>
        <Link href="/v1" style={{ fontFamily: "var(--font-mono)" }}>
          ← Back to bulletin
        </Link>
      </footer>
    </div>
  );
}

function SectionHead({ n, title, optional }: { n: string; title: string; optional?: boolean }) {
  return (
    <div className="col-span-12 md:col-span-3">
      <p
        className="text-[10px] tracking-[0.28em] uppercase"
        style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
      >
        {n}
      </p>
      <h2
        className="mt-4 text-[1.5rem] leading-tight"
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"opsz" 36',
        }}
      >
        {title}
      </h2>
      {optional ? (
        <p
          className="mt-2 text-[10px] tracking-[0.2em] uppercase opacity-60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          optional
        </p>
      ) : null}
    </div>
  );
}

function FieldGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  className = "",
  maxLength,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span
        className="block text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "rgba(26,24,20,0.7)", fontFamily: "var(--font-mono)" }}
      >
        {label}
        {required ? <span style={{ color: GREEN }}> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoCompleteFor(name)}
        className="mt-2 w-full bg-transparent pb-1 text-[1.05rem] outline-none transition-[border-color] focus:border-current"
        style={{
          fontFamily: "var(--font-body)",
          color: INK,
          borderBottom: `1px solid ${error ? GREEN : HAIR}`,
        }}
      />
      {error ? (
        <span
          className="mt-1 block text-[11px]"
          style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Textarea({
  label,
  name,
  rows = 5,
  error,
}: {
  label: string;
  name: string;
  rows?: number;
  error?: string;
}) {
  return (
    <label className="block">
      <span
        className="block text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "rgba(26,24,20,0.7)", fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        maxLength={4000}
        className="mt-3 w-full bg-transparent p-3 text-[1.05rem] leading-[1.55] outline-none transition-colors focus:bg-[#FAF6EC]"
        style={{
          fontFamily: "var(--font-body)",
          color: INK,
          border: `1px solid ${error ? GREEN : HAIR}`,
        }}
      />
      {error ? (
        <span
          className="mt-1 block text-[11px]"
          style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SuccessNotice({ state }: { state: WhitelistFormState }) {
  const isDuplicate = state.status === "duplicate";
  return (
    <div
      className="border py-16 px-8 md:px-16"
      style={{
        borderColor: HAIR,
        background: "rgba(255,255,255,0.4)",
        animation: "rg-fade-up 700ms ease-out both",
      }}
    >
      <p
        className="text-[10px] tracking-[0.32em] uppercase"
        style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
      >
        {isDuplicate ? "Already on file" : "Manuscript received"}
      </p>
      <h2
        className="mt-6 max-w-3xl text-[2.4rem] leading-[1] md:text-[3.4rem]"
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {isDuplicate ? "We have your details." : "Thank you for writing in."}
      </h2>
      <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.6]">
        {state.message}
      </p>
      {state.receipt ? (
        <dl
          className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 border-t pt-8 md:grid-cols-3"
          style={{ borderColor: HAIR, fontFamily: "var(--font-mono)" }}
        >
          <div>
            <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">Filed</dt>
            <dd className="mt-1 text-[0.95rem]">{state.receipt.timestamp}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">Batch</dt>
            <dd className="mt-1 text-[0.95rem]">{state.receipt.batchName}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">Position</dt>
            <dd className="mt-1 text-[0.95rem]">
              {state.receipt.position
                ? `№ ${String(state.receipt.position).padStart(3, "0")}`
                : "—"}
            </dd>
          </div>
        </dl>
      ) : null}
      <div className="mt-10">
        <Link
          href="/v1"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase"
          style={{ color: INK, fontFamily: "var(--font-mono)" }}
        >
          ← Return to the bulletin
        </Link>
      </div>
    </div>
  );
}

function autoCompleteFor(name: string): string {
  switch (name) {
    case "firstName": return "given-name";
    case "lastName": return "family-name";
    case "email": return "email";
    case "company": return "organization";
    case "jobTitle": return "organization-title";
    case "phone": return "tel";
    case "line1": return "address-line1";
    case "line2": return "address-line2";
    case "city": return "address-level2";
    case "region": return "address-level1";
    case "postalCode": return "postal-code";
    case "country": return "country";
    default: return "off";
  }
}
