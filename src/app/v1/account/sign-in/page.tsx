"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const INK = "#1A1814";
const PAPER = "#F3EDE0";
const GREEN = "#2E7D5B";
const RULE = "rgba(26,24,20,0.25)";
const SOFT = "rgba(26,24,20,0.65)";

export default function V1SignInPage() {
  const [state, formAction, pending] = useActionState(signIn, initialAuthState);

  return (
    <section className="mx-auto max-w-[78rem] px-6 pt-14 pb-24 md:px-16 md:pt-20">
      <div className="grid grid-cols-12 gap-x-10 gap-y-10">
        <aside className="col-span-12 md:col-span-5">
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-v1-mono)", color: GREEN }}
          >
            Folio I &nbsp;§ &nbsp; Subscriber Entry
          </p>
          <h1
            className="mt-6 leading-[0.95] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-v1-display)",
              fontSize: "clamp(2.6rem, 5.8vw, 4.2rem)",
              fontWeight: 400,
            }}
          >
            <span style={{ fontStyle: "italic" }}>Return</span>
            <br />
            to your record.
          </h1>
          <p
            className="mt-8 max-w-md text-[17px] leading-[1.55]"
            style={{ fontFamily: "var(--font-v1-body)" }}
          >
            Subscribers are invited to consult their own column of the
            Bulletin&apos;s ledger — reservations, deliveries, and any
            correspondence on file with the editors.
          </p>

          <aside
            className="mt-12 border-t pt-6 text-[13px] leading-[1.55]"
            style={{
              borderColor: RULE,
              color: SOFT,
              fontFamily: "var(--font-v1-body)",
            }}
          >
            <p className="italic">
              &ldquo;The first virtue of a laboratory is its notebook; the
              second, the patience to revisit it.&rdquo;
            </p>
            <p
              className="mt-3 text-[10.5px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "var(--font-v1-mono)" }}
            >
              — A. R. P., Editor
            </p>
          </aside>
        </aside>

        <div className="col-span-12 md:col-span-7 md:col-start-7">
          <form
            action={formAction}
            className="relative"
            style={{ fontFamily: "var(--font-v1-body)" }}
          >
            <input type="hidden" name="returnTo" value="/v1/account" />

            <p
              className="text-[10.5px] tracking-[0.22em] uppercase"
              style={{ color: SOFT, fontFamily: "var(--font-v1-mono)" }}
            >
              Form A — Subscriber Sign-in
            </p>

            <RuledField
              label="Subscriber email"
              ordinal="i"
              name="email"
              type="email"
              autoComplete="email"
              disabled={pending}
              error={state.errors?.email}
            />
            <RuledField
              label="Pass-phrase"
              ordinal="ii"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={pending}
              error={state.errors?.password}
            />

            {state.message ? (
              <div
                role="alert"
                className="mt-8 border-l-4 pl-4 text-[14px] italic"
                style={{ borderColor: "#7A1F1F", color: "#7A1F1F", fontFamily: "var(--font-v1-body)" }}
              >
                <span
                  className="not-italic text-[10px] tracking-[0.24em] uppercase block mb-1"
                  style={{ fontFamily: "var(--font-v1-mono)" }}
                >
                  Editor&apos;s note
                </span>
                {state.message}
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-baseline justify-between gap-y-4">
              <p
                className="text-[12px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-v1-mono)", color: SOFT }}
              >
                Submitted by hand
              </p>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-baseline gap-3 border px-6 py-3 text-[11px] tracking-[0.24em] uppercase transition-colors hover:bg-[#1A1814] hover:text-[#F3EDE0] disabled:opacity-60"
                style={{
                  borderColor: INK,
                  color: INK,
                  background: PAPER,
                  fontFamily: "var(--font-v1-mono)",
                }}
              >
                {pending ? "Filing entry…" : "File entry"}
                <span aria-hidden>—</span>
              </button>
            </div>
          </form>

          <aside
            className="mt-14 border-t pt-6 text-[12px] tracking-[0.16em] uppercase"
            style={{
              borderColor: RULE,
              color: SOFT,
              fontFamily: "var(--font-v1-mono)",
            }}
          >
            <span>No subscription on file? &nbsp;</span>
            <Link
              href="/v1/account/sign-up"
              className="lowercase tracking-normal text-[14px] underline underline-offset-4"
              style={{ color: INK, fontFamily: "var(--font-v1-body)" }}
            >
              Request one &rarr;
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function RuledField({
  label,
  ordinal,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  ordinal: string;
  error?: string;
}) {
  return (
    <label className="mt-10 block">
      <div className="flex items-baseline gap-4">
        <span
          className="w-7 text-[14px]"
          style={{ color: GREEN, fontFamily: "var(--font-v1-display)", fontStyle: "italic" }}
        >
          §{ordinal}.
        </span>
        <span
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ color: INK, fontFamily: "var(--font-v1-mono)" }}
        >
          {label}
        </span>
      </div>
      <input
        {...rest}
        required
        className="mt-3 w-full border-0 border-b bg-transparent px-1 py-2 text-[20px] outline-none transition-colors focus:border-[#2E7D5B]"
        style={{
          borderBottomColor: RULE,
          borderBottomWidth: 1,
          color: INK,
          fontFamily: "var(--font-v1-body)",
        }}
      />
      {error ? (
        <small
          role="alert"
          className="mt-2 block text-[12px]"
          style={{ color: "#7A1F1F", fontFamily: "var(--font-v1-body)" }}
        >
          {error}
        </small>
      ) : null}
    </label>
  );
}
