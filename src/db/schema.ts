import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const ts = (name: string) =>
  timestamp(name, { withTimezone: true, mode: "date" });

const createdAt = () => ts("created_at").notNull().defaultNow();
const updatedAt = () => ts("updated_at").notNull().defaultNow();

export const addressKindEnum = pgEnum("address_kind", [
  "billing",
  "shipping",
  "mailing",
]);

export const batchStatusEnum = pgEnum("batch_status", [
  "draft",
  "open",
  "closed",
  "fulfilled",
  "cancelled",
]);

export const whitelistStatusEnum = pgEnum("whitelist_status", [
  "pending",
  "approved",
  "rejected",
  "invited",
  "redeemed",
  "expired",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "created",
  "requires_payment",
  "processing",
  "paid",
  "failed",
  "refunded",
  "cancelled",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    // first_name / last_name are populated by the legacy waitlist form but are
    // optional for accounts created through Better Auth (which only knows about
    // `name`). The account dashboard falls back to `name` when these are null.
    firstName: text("first_name"),
    lastName: text("last_name"),
    // Better Auth-required fields. `name` defaults to empty for legacy rows;
    // sign-up populates it from the form. `emailVerified` mirrors the boolean
    // Better Auth wants; we keep `emailVerifiedAt` for audit nuance.
    name: text("name").notNull().default(""),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    phone: text("phone"),
    company: text("company"),
    jobTitle: text("job_title"),
    emailVerifiedAt: ts("email_verified_at"),
    stripeCustomerId: text("stripe_customer_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("users_email_unique_idx").on(sql`lower(${t.email})`),
    uniqueIndex("users_stripe_customer_id_unique_idx")
      .on(t.stripeCustomerId)
      .where(sql`${t.stripeCustomerId} is not null`),
  ],
);

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: addressKindEnum("kind").notNull().default("shipping"),
    line1: text("line1").notNull(),
    line2: text("line2"),
    city: text("city").notNull(),
    region: text("region"),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    isDefault: boolean("is_default").notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("addresses_user_id_idx").on(t.userId)],
);

export const presaleBatches = pgTable(
  "presale_batches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    capacity: integer("capacity"),
    unitPriceCents: integer("unit_price_cents").notNull(),
    currency: text("currency").notNull().default("USD"),
    opensAt: ts("opens_at"),
    closesAt: ts("closes_at"),
    status: batchStatusEnum("status").notNull().default("draft"),
    stripePriceId: text("stripe_price_id"),
    stripeProductId: text("stripe_product_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("presale_batches_slug_unique_idx").on(t.slug),
    index("presale_batches_status_idx").on(t.status),
  ],
);

export const whitelistEntries = pgTable(
  "whitelist_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    batchId: uuid("batch_id")
      .notNull()
      .references(() => presaleBatches.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: whitelistStatusEnum("status").notNull().default("pending"),
    position: integer("position"),
    notes: text("notes"),
    approvedAt: ts("approved_at"),
    approvedBy: text("approved_by"),
    inviteToken: text("invite_token"),
    inviteTokenExpiresAt: ts("invite_token_expires_at"),
    redeemedAt: ts("redeemed_at"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("whitelist_entries_batch_user_unique_idx").on(t.batchId, t.userId),
    uniqueIndex("whitelist_entries_invite_token_unique_idx")
      .on(t.inviteToken)
      .where(sql`${t.inviteToken} is not null`),
    index("whitelist_entries_status_idx").on(t.status),
    index("whitelist_entries_user_id_idx").on(t.userId),
  ],
);

export const presaleOrders = pgTable(
  "presale_orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    batchId: uuid("batch_id")
      .notNull()
      .references(() => presaleBatches.id, { onDelete: "restrict" }),
    whitelistEntryId: uuid("whitelist_entry_id").references(
      () => whitelistEntries.id,
      { onDelete: "set null" },
    ),
    quantity: integer("quantity").notNull().default(1),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("USD"),
    status: orderStatusEnum("status").notNull().default("created"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripeChargeId: text("stripe_charge_id"),
    paidAt: ts("paid_at"),
    refundedAt: ts("refunded_at"),
    shippingAddressId: uuid("shipping_address_id").references(() => addresses.id, {
      onDelete: "set null",
    }),
    billingAddressId: uuid("billing_address_id").references(() => addresses.id, {
      onDelete: "set null",
    }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("presale_orders_stripe_checkout_session_unique_idx")
      .on(t.stripeCheckoutSessionId)
      .where(sql`${t.stripeCheckoutSessionId} is not null`),
    uniqueIndex("presale_orders_stripe_payment_intent_unique_idx")
      .on(t.stripePaymentIntentId)
      .where(sql`${t.stripePaymentIntentId} is not null`),
    index("presale_orders_user_id_idx").on(t.userId),
    index("presale_orders_batch_id_idx").on(t.batchId),
    index("presale_orders_status_idx").on(t.status),
  ],
);

export const stripeEvents = pgTable(
  "stripe_events",
  {
    id: text("id").primaryKey(),
    type: text("type").notNull(),
    apiVersion: text("api_version"),
    livemode: boolean("livemode").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
    receivedAt: ts("received_at").notNull().defaultNow(),
    processedAt: ts("processed_at"),
    processingError: text("processing_error"),
  },
  (t) => [
    index("stripe_events_type_idx").on(t.type),
    index("stripe_events_processed_at_idx").on(t.processedAt),
  ],
);

// ---------------------------------------------------------------------------
// Better Auth core tables. Column names and shapes follow the Better Auth
// "Database" spec verbatim so we don't need a `fields` map in the auth config.
// `userId` is uuid (not text) to FK cleanly into our existing `users.id`.
// ---------------------------------------------------------------------------

export const sessions = pgTable(
  "sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: ts("expires_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("sessions_token_unique_idx").on(t.token),
    index("sessions_user_id_idx").on(t.userId),
  ],
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: ts("access_token_expires_at"),
    refreshTokenExpiresAt: ts("refresh_token_expires_at"),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("accounts_provider_account_unique_idx").on(
      t.providerId,
      t.accountId,
    ),
    index("accounts_user_id_idx").on(t.userId),
  ],
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: ts("expires_at").notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("verifications_identifier_idx").on(t.identifier)],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;
export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
export type PresaleBatch = typeof presaleBatches.$inferSelect;
export type NewPresaleBatch = typeof presaleBatches.$inferInsert;
export type WhitelistEntry = typeof whitelistEntries.$inferSelect;
export type NewWhitelistEntry = typeof whitelistEntries.$inferInsert;
export type PresaleOrder = typeof presaleOrders.$inferSelect;
export type NewPresaleOrder = typeof presaleOrders.$inferInsert;
export type StripeEvent = typeof stripeEvents.$inferSelect;
export type NewStripeEvent = typeof stripeEvents.$inferInsert;
