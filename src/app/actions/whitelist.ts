"use server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/db";
import { getCurrentUser } from "@/lib/session";

const { users, addresses, presaleBatches, whitelistEntries } = schema;

const trimmed = (max: number) => z.string().trim().max(max);
const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined));

const InputSchema = z
  .object({
    firstName: trimmed(80).min(1, "Required"),
    lastName: trimmed(80).min(1, "Required"),
    email: z.email("Enter a valid email").max(254),
    company: optional(120),
    jobTitle: optional(120),
    phone: optional(40),
    line1: optional(160),
    line2: optional(160),
    city: optional(80),
    region: optional(80),
    postalCode: optional(20),
    country: optional(2),
    comments: optional(4000),
    batchSlug: optional(80),
  })
  .superRefine((v, ctx) => {
    const addressFields = [v.line1, v.city, v.postalCode, v.country];
    const anyAddress = addressFields.some(Boolean);
    const allAddress = addressFields.every(Boolean);
    if (anyAddress && !allAddress) {
      const missing = (["line1", "city", "postalCode", "country"] as const).filter(
        (k) => !v[k],
      );
      for (const k of missing) {
        ctx.addIssue({ code: "custom", path: [k], message: "Required to save address" });
      }
    }
  });

export type WhitelistFormState = {
  status: "idle" | "success" | "error" | "duplicate";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof InputSchema>, string>>;
  receipt?: {
    timestamp: string;
    entryId: string;
    userId: string;
    batchSlug: string;
    batchName: string;
    position: number | null;
  };
};

export const initialState: WhitelistFormState = { status: "idle" };

function readForm(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    firstName: get("firstName"),
    lastName: get("lastName"),
    email: get("email"),
    company: get("company"),
    jobTitle: get("jobTitle"),
    phone: get("phone"),
    line1: get("line1"),
    line2: get("line2"),
    city: get("city"),
    region: get("region"),
    postalCode: get("postalCode"),
    country: get("country"),
    comments: get("comments"),
    batchSlug: get("batchSlug"),
  };
}

export async function submitWhitelist(
  _prev: WhitelistFormState,
  formData: FormData,
): Promise<WhitelistFormState> {
  const parsed = InputSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    const errors: WhitelistFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof InputSchema>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Some fields need attention.",
      errors,
    };
  }

  const input = parsed.data;
  const email = input.email.toLowerCase();
  const currentUser = await getCurrentUser();

  try {
    const result = await db.transaction(async (tx) => {
      const batch = input.batchSlug
        ? await tx.query.presaleBatches.findFirst({
            where: eq(presaleBatches.slug, input.batchSlug),
          })
        : await tx.query.presaleBatches.findFirst({
            where: eq(presaleBatches.status, "open"),
            orderBy: (b, { asc }) => [asc(b.createdAt)],
          });

      if (!batch) {
        return { kind: "no_batch" as const };
      }

      // Signed-in users always attach the entry to their account row, ignoring
      // whatever email is in the form. Anonymous submissions fall back to the
      // legacy upsert-by-email path so existing landing-page flows keep working.
      let userId: string;
      if (currentUser) {
        userId = currentUser.id;
        await tx
          .update(users)
          .set({
            firstName: input.firstName,
            lastName: input.lastName,
            company: input.company,
            jobTitle: input.jobTitle,
            phone: input.phone,
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId));
      } else {
        const existing = await tx
          .select({ id: users.id })
          .from(users)
          .where(sql`lower(${users.email}) = ${email}`)
          .limit(1);

        if (existing[0]) {
          userId = existing[0].id;
          await tx
            .update(users)
            .set({
              firstName: input.firstName,
              lastName: input.lastName,
              company: input.company,
              jobTitle: input.jobTitle,
              phone: input.phone,
              updatedAt: new Date(),
            })
            .where(eq(users.id, userId));
        } else {
          const [u] = await tx
            .insert(users)
            .values({
              email,
              firstName: input.firstName,
              lastName: input.lastName,
              company: input.company,
              jobTitle: input.jobTitle,
              phone: input.phone,
            })
            .returning({ id: users.id });
          userId = u.id;
        }
      }

      if (input.line1 && input.city && input.postalCode && input.country) {
        await tx.insert(addresses).values({
          userId,
          kind: "shipping",
          line1: input.line1,
          line2: input.line2,
          city: input.city,
          region: input.region,
          postalCode: input.postalCode,
          country: input.country.toUpperCase(),
          isDefault: true,
        });
      }

      const [entry] = await tx
        .insert(whitelistEntries)
        .values({
          batchId: batch.id,
          userId,
          notes: input.comments,
          status: "pending",
        })
        .onConflictDoNothing({
          target: [whitelistEntries.batchId, whitelistEntries.userId],
        })
        .returning({ id: whitelistEntries.id });

      if (!entry) {
        return { kind: "duplicate" as const, batch };
      }

      const [{ position }] = await tx
        .select({
          position: sql<number>`count(*)::int`.as("position"),
        })
        .from(whitelistEntries)
        .where(
          and(
            eq(whitelistEntries.batchId, batch.id),
            sql`${whitelistEntries.createdAt} <= (select created_at from whitelist_entries where id = ${entry.id})`,
          ),
        );

      return {
        kind: "ok" as const,
        batch,
        userId,
        entryId: entry.id,
        position,
      };
    });

    if (result.kind === "no_batch") {
      return {
        status: "error",
        message: "No open presale batch right now — check back soon.",
      };
    }
    if (result.kind === "duplicate") {
      return {
        status: "duplicate",
        message: `You're already on the ${result.batch.name} list. We'll be in touch.`,
      };
    }

    return {
      status: "success",
      message: `Registered to ${result.batch.name}.`,
      receipt: {
        timestamp: new Date().toISOString(),
        entryId: result.entryId,
        userId: result.userId,
        batchSlug: result.batch.slug,
        batchName: result.batch.name,
        position: result.position,
      },
    };
  } catch (err) {
    console.error("[whitelist] submission failed", err);
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again.",
    };
  }
}
