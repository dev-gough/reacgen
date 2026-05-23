"use server";

import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { APIError } from "better-auth";
import { auth } from "@/lib/auth";
import { db, schema } from "@/db";
import type { AuthFormState } from "./auth.types";

const { users, accounts } = schema;

const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Required").max(160),
  email: z.email("Enter a valid email").max(254),
  password: z
    .string()
    .min(10, "At least 10 characters")
    .max(256, "Too long"),
});

const SignInSchema = z.object({
  email: z.email("Enter a valid email").max(254),
  password: z.string().min(1, "Required").max(256),
});

function readForm(formData: FormData, keys: readonly string[]) {
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = formData.get(k);
    out[k] = typeof v === "string" ? v : "";
  }
  return out;
}

// Only accept return-tos that point at one of our own account routes — never an
// open redirect to a foreign origin or an arbitrary path.
const RETURN_TO_RE = /^\/(?:v[1-4]\/)?account(?:\/.*)?$/;
const HOME_RE = /^\/(?:v[1-4])?$/;
function sanitizeReturnTo(raw: FormDataEntryValue | null): string {
  if (typeof raw !== "string") return "/account";
  return RETURN_TO_RE.test(raw) ? raw : "/account";
}
function sanitizeSignOutTo(raw: FormDataEntryValue | null): string {
  if (typeof raw !== "string") return "/";
  return HOME_RE.test(raw) ? raw : "/";
}

function zodErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as string | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = SignUpSchema.safeParse(
    readForm(formData, ["name", "email", "password"]),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the fields below.",
      errors: zodErrors(parsed.error),
    };
  }
  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();

  let didClaim = false;

  try {
    const existing = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(sql`lower(${users.email}) = ${email}`)
      .limit(1);

    if (existing[0]) {
      const userId = existing[0].id;
      const credential = await db
        .select({ id: accounts.id })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, userId),
            eq(accounts.providerId, "credential"),
          ),
        )
        .limit(1);

      if (credential[0]) {
        return {
          status: "exists",
          message:
            "An account already exists for this email. Try signing in instead.",
        };
      }

      // Claim: attach credentials to the existing passwordless row.
      const ctx = await auth.$context;
      const hashed = await ctx.password.hash(password);
      await db.transaction(async (tx) => {
        await tx.insert(accounts).values({
          id: crypto.randomUUID(),
          userId,
          accountId: userId,
          providerId: "credential",
          password: hashed,
        });
        if (!existing[0].name) {
          await tx
            .update(users)
            .set({ name, updatedAt: new Date() })
            .where(eq(users.id, userId));
        }
      });
      didClaim = true;
    }

    if (didClaim) {
      await auth.api.signInEmail({
        body: { email, password },
        headers: await headers(),
      });
    } else {
      await auth.api.signUpEmail({
        body: { email, password, name },
        headers: await headers(),
      });
    }
  } catch (err) {
    if (err instanceof APIError) {
      return {
        status: "error",
        message: err.body?.message ?? "Sign-up failed. Please try again.",
      };
    }
    console.error("[auth] signUp failed", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  redirect(sanitizeReturnTo(formData.get("returnTo")));
}

export async function signIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = SignInSchema.safeParse(
    readForm(formData, ["email", "password"]),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the fields below.",
      errors: zodErrors(parsed.error),
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: parsed.data.email.toLowerCase(),
        password: parsed.data.password,
      },
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        status: "error",
        message:
          err.body?.message ?? "Sign-in failed. Check your email and password.",
      };
    }
    console.error("[auth] signIn failed", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  redirect(sanitizeReturnTo(formData.get("returnTo")));
}

export async function signOut(formData?: FormData) {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (err) {
    console.error("[auth] signOut failed", err);
  }
  redirect(sanitizeSignOutTo(formData?.get("returnTo") ?? null));
}
