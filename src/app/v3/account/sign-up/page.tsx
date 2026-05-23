"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight, KeyRound, Mail, Sparkles, UserRound } from "lucide-react";
import { signUp } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const INK = "#0B1F33";
const HAIR = "#DBE6F1";
const SOFT = "#5D7892";
const BRAND = "#2F7FB8";
const HIGHLIGHT = "#FFE45A";
const CARD = "#FFFFFF";
const CARD_SOFT = "rgba(47,127,184,0.08)";
const DANGER_FG = "#7A1F1F";
const DANGER_BG = "#FBE6E6";

export default function V3SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialAuthState);

  return (
    <section className="mx-auto grid max-w-[80rem] grid-cols-12 gap-10 px-6 pt-10 pb-24 md:px-10 md:pt-16">
      <div className="col-span-12 md:col-span-5">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide"
          style={{
            borderColor: HAIR,
            background: CARD,
            color: SOFT,
            fontFamily: "var(--font-v3-mono)",
          }}
        >
          <Sparkles size={11} strokeWidth={2} style={{ color: BRAND }} />
          Two minutes, no card.
        </span>
        <h1
          className="mt-6 leading-[0.98] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(2.4rem, 5.6vw, 4rem)",
            fontWeight: 600,
          }}
        >
          Make an{" "}
          <span className="relative inline-block">
            account
            <Squiggle />
          </span>
          .
        </h1>
        <p className="mt-7 max-w-md text-[16px] leading-[1.55]" style={{ color: SOFT }}>
          We&apos;ll save your waitlist requests, your orders, and any
          evaluation units you have on loan. No marketing emails. No upsells.
        </p>

        <ul className="mt-10 space-y-3 text-[14.5px]" style={{ color: INK }}>
          {[
            "Existing waitlist entries attach to your account automatically.",
            "Email + password only — no OAuth, no third-party tracking.",
            "Delete your account from this page any time.",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span
                className="mt-2 inline-block size-1.5 rounded-full"
                style={{ background: BRAND }}
              />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <form
          action={formAction}
          className="rounded-2xl border p-7 md:p-9"
          style={{ borderColor: HAIR, background: CARD }}
        >
          <input type="hidden" name="returnTo" value="/v3/account" />

          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
          >
            sign up
          </p>
          <h2
            className="mt-3 text-[1.6rem] tracking-[-0.02em]"
            style={{ fontWeight: 600 }}
          >
            Start your account.
          </h2>

          <div className="mt-6 flex flex-col gap-4">
            <Field
              label="Name"
              icon={<UserRound size={15} strokeWidth={1.75} />}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              disabled={pending}
              error={state.errors?.name}
            />
            <Field
              label="Email"
              icon={<Mail size={15} strokeWidth={1.75} />}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourlab.org"
              disabled={pending}
              error={state.errors?.email}
            />
            <Field
              label="Password"
              icon={<KeyRound size={15} strokeWidth={1.75} />}
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="at least 10 characters"
              minLength={10}
              disabled={pending}
              error={state.errors?.password}
              help="Anything hard to guess works. Mix words if you like."
            />
          </div>

          {state.message ? (
            <div
              role="alert"
              className="mt-5 rounded-lg px-3.5 py-3 text-[13.5px]"
              style={{
                background: state.status === "exists" ? CARD_SOFT : DANGER_BG,
                color: state.status === "exists" ? INK : DANGER_FG,
              }}
            >
              {state.message}
              {state.status === "exists" ? (
                <>
                  {" "}
                  <Link
                    href="/v3/account/sign-in"
                    className="underline underline-offset-4"
                    style={{ color: BRAND }}
                  >
                    sign in →
                  </Link>
                </>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px] disabled:opacity-60"
            style={{
              background: INK,
              color: "#F4F8FC",
              fontWeight: 500,
            }}
          >
            {pending ? "Creating account…" : "Create account"}
            <ArrowRight size={15} />
          </button>

          <p
            className="mt-5 text-center text-[12.5px]"
            style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
          >
            Have an account?{" "}
            <Link
              href="/v3/account/sign-in"
              className="underline underline-offset-4"
              style={{ color: BRAND }}
            >
              sign in →
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

function Squiggle() {
  return (
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
  );
}

function Field({
  label,
  icon,
  error,
  help,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: React.ReactNode;
  error?: string;
  help?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-[11px] tracking-[0.16em] uppercase"
        style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
      >
        {label}
      </span>
      <span className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5" style={{ color: SOFT }}>
          {icon}
        </span>
        <input
          {...rest}
          required
          className="w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-[15px] outline-none transition-colors focus:border-[#2F7FB8]"
          style={{ borderColor: HAIR, color: INK }}
        />
      </span>
      {error ? (
        <small role="alert" style={{ color: DANGER_FG }}>
          {error}
        </small>
      ) : help ? (
        <small style={{ color: SOFT }}>{help}</small>
      ) : null}
    </label>
  );
}
