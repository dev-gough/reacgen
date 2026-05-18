CREATE TYPE "public"."address_kind" AS ENUM('billing', 'shipping', 'mailing');--> statement-breakpoint
CREATE TYPE "public"."batch_status" AS ENUM('draft', 'open', 'closed', 'fulfilled', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('created', 'requires_payment', 'processing', 'paid', 'failed', 'refunded', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."whitelist_status" AS ENUM('pending', 'approved', 'rejected', 'invited', 'redeemed', 'expired');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kind" "address_kind" DEFAULT 'shipping' NOT NULL,
	"line1" text NOT NULL,
	"line2" text,
	"city" text NOT NULL,
	"region" text,
	"postal_code" text NOT NULL,
	"country" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presale_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"capacity" integer,
	"unit_price_cents" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"opens_at" timestamp with time zone,
	"closes_at" timestamp with time zone,
	"status" "batch_status" DEFAULT 'draft' NOT NULL,
	"stripe_price_id" text,
	"stripe_product_id" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presale_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"whitelist_entry_id" uuid,
	"quantity" integer DEFAULT 1 NOT NULL,
	"amount_cents" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" "order_status" DEFAULT 'created' NOT NULL,
	"stripe_checkout_session_id" text,
	"stripe_payment_intent_id" text,
	"stripe_charge_id" text,
	"paid_at" timestamp with time zone,
	"refunded_at" timestamp with time zone,
	"shipping_address_id" uuid,
	"billing_address_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stripe_events" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"api_version" text,
	"livemode" boolean NOT NULL,
	"payload" jsonb NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone,
	"processing_error" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text,
	"company" text,
	"job_title" text,
	"email_verified_at" timestamp with time zone,
	"stripe_customer_id" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "whitelist_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"batch_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "whitelist_status" DEFAULT 'pending' NOT NULL,
	"position" integer,
	"notes" text,
	"approved_at" timestamp with time zone,
	"approved_by" text,
	"invite_token" text,
	"invite_token_expires_at" timestamp with time zone,
	"redeemed_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presale_orders" ADD CONSTRAINT "presale_orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presale_orders" ADD CONSTRAINT "presale_orders_batch_id_presale_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."presale_batches"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presale_orders" ADD CONSTRAINT "presale_orders_whitelist_entry_id_whitelist_entries_id_fk" FOREIGN KEY ("whitelist_entry_id") REFERENCES "public"."whitelist_entries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presale_orders" ADD CONSTRAINT "presale_orders_shipping_address_id_addresses_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presale_orders" ADD CONSTRAINT "presale_orders_billing_address_id_addresses_id_fk" FOREIGN KEY ("billing_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelist_entries" ADD CONSTRAINT "whitelist_entries_batch_id_presale_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."presale_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelist_entries" ADD CONSTRAINT "whitelist_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "addresses_user_id_idx" ON "addresses" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "presale_batches_slug_unique_idx" ON "presale_batches" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "presale_batches_status_idx" ON "presale_batches" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "presale_orders_stripe_checkout_session_unique_idx" ON "presale_orders" USING btree ("stripe_checkout_session_id") WHERE "presale_orders"."stripe_checkout_session_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "presale_orders_stripe_payment_intent_unique_idx" ON "presale_orders" USING btree ("stripe_payment_intent_id") WHERE "presale_orders"."stripe_payment_intent_id" is not null;--> statement-breakpoint
CREATE INDEX "presale_orders_user_id_idx" ON "presale_orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "presale_orders_batch_id_idx" ON "presale_orders" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "presale_orders_status_idx" ON "presale_orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "stripe_events_type_idx" ON "stripe_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "stripe_events_processed_at_idx" ON "stripe_events" USING btree ("processed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique_idx" ON "users" USING btree (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX "users_stripe_customer_id_unique_idx" ON "users" USING btree ("stripe_customer_id") WHERE "users"."stripe_customer_id" is not null;--> statement-breakpoint
CREATE UNIQUE INDEX "whitelist_entries_batch_user_unique_idx" ON "whitelist_entries" USING btree ("batch_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "whitelist_entries_invite_token_unique_idx" ON "whitelist_entries" USING btree ("invite_token") WHERE "whitelist_entries"."invite_token" is not null;--> statement-breakpoint
CREATE INDEX "whitelist_entries_status_idx" ON "whitelist_entries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "whitelist_entries_user_id_idx" ON "whitelist_entries" USING btree ("user_id");