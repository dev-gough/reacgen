"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight, KeyRound, Mail, Sparkles } from "lucide-react";
import { signIn } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const INK = "#0B1F33";
const HAIR = "#DBE6F1";
const SOFT = "#5D7892";
const BRAND = "#2F7FB8";
const HIGHLIGHT = "#FFE45A";
const CARD = "#FFFFFF";
const DANGER_FG = "#7A1F1F";
const DANGER_BG = "#FBE6E6";

export default function V3SignInPage() {
  const [state, formAction, pending] = useActionState(signIn, initialAuthState);

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
          For returning operators.
        </span>
        <h1
          className="mt-6 leading-[0.98] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(2.4rem, 5.6vw, 4rem)",
            fontWeight: 600,
          }}
        >
          Sign back in to{" "}
          <span className="relative inline-block">
            your runs
            <Squiggle />
          </span>
          .
        </h1>
        <p className="mt-7 max-w-md text-[16px] leading-[1.55]" style={{ color: SOFT }}>
          Your waitlist standing, evaluation units, and any orders that have
          shipped — all in one place. Self-hosted, no SaaS subscription.
        </p>

        <div
          className="mt-12 rounded-2xl border p-5"
          style={{ borderColor: HAIR, background: CARD }}
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-v3-mono)" }}
          >
            FYI
          </p>
          <p className="mt-2 text-[14px] leading-[1.55]" style={{ color: INK }}>
            Tried the waitlist already? Sign up with that same email and your
            requests will follow you in automatically.
          </p>
        </div>
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
            sign in
          </p>
          <h2
            className="mt-3 text-[1.6rem] tracking-[-0.02em]"
            style={{ fontWeight: 600 }}
          >
            Welcome back.
          </h2>

          <div className="mt-6 flex flex-col gap-4">
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
              autoComplete="current-password"
              placeholder="••••••••••"
              disabled={pending}
              error={state.errors?.password}
            />
          </div>

          {state.message ? (
            <div
              role="alert"
              className="mt-5 rounded-lg px-3.5 py-3 text-[13.5px]"
              style={{ background: DANGER_BG, color: DANGER_FG }}
            >
              {state.message}
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
            {pending ? "Signing in…" : "Sign in"}
            <ArrowRight size={15} />
          </button>

          <p
            className="mt-5 text-center text-[12.5px]"
            style={{ color: SOFT, fontFamily: "var(--font-v3-mono)" }}
          >
            New here?{" "}
            <Link
              href="/v3/account/sign-up"
              className="underline underline-offset-4"
              style={{ color: BRAND }}
            >
              create an account →
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
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: React.ReactNode;
  error?: string;
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
      ) : null}
    </label>
  );
}
