"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { signIn } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const INK = "#0F1311";
const HAIR = "#E5E5DC";
const SOFT = "#67726B";
const BRAND = "#2F7FB8";
const CARD = "#FFFFFF";
const CARD_SOFT = "#F1F6FB";
const DANGER_FG = "#7A1F1F";
const DANGER_BG = "#FBE6E6";

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(signIn, initialAuthState);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[28rem] flex-col justify-center px-6 py-14 md:px-0">
      <p
        className="text-[11px] tracking-[0.22em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-account-mono)" }}
      >
        Sign in
      </p>
      <h1
        className="mt-4 leading-[1.05] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
          fontWeight: 500,
        }}
      >
        Welcome{" "}
        <span
          style={{
            fontFamily: "var(--font-account-serif)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          back
        </span>
        .
      </h1>
      <p
        className="mt-3 text-[14.5px] leading-[1.55]"
        style={{ color: SOFT }}
      >
        Pick up where you left off — your waitlist spot and any past orders are
        waiting on the other side.
      </p>

      <form
        action={formAction}
        className="mt-9 flex flex-col gap-4 rounded-2xl border p-6"
        style={{ borderColor: HAIR, background: CARD }}
      >
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

        {state.message ? (
          <div
            role="alert"
            className="rounded-lg px-3.5 py-3 text-[13.5px]"
            style={{ background: DANGER_BG, color: DANGER_FG }}
          >
            {state.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14.5px] transition-transform disabled:opacity-60 hover:translate-y-[-1px]"
          style={{
            background: INK,
            color: "#FAFAF7",
            fontWeight: 500,
          }}
        >
          {pending ? "Signing in…" : "Sign in"}
          <ArrowRight size={15} />
        </button>
      </form>

      <div
        className="mt-6 flex items-center justify-between rounded-xl px-5 py-4 text-[13.5px]"
        style={{ background: CARD_SOFT, color: SOFT }}
      >
        <span>No account yet?</span>
        <Link
          href="/account/sign-up"
          className="inline-flex items-center gap-1.5 underline underline-offset-4"
          style={{ color: BRAND, fontWeight: 500 }}
        >
          Create one →
        </Link>
      </div>
    </div>
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
        style={{ color: SOFT, fontFamily: "var(--font-account-mono)" }}
      >
        {label}
      </span>
      <span className="relative flex items-center">
        <span
          className="pointer-events-none absolute left-3.5"
          style={{ color: SOFT }}
        >
          {icon}
        </span>
        <input
          {...rest}
          required
          className="w-full rounded-lg border bg-white px-3.5 py-2.5 pl-10 text-[15px] outline-none transition-colors focus:border-[#2F7FB8]"
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
