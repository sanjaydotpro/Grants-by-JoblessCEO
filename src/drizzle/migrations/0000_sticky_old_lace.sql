CREATE TABLE "grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"institution_id" uuid NOT NULL,
	"grant_amount" real,
	"website" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"website" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"type" text DEFAULT 'news' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "grants" ADD CONSTRAINT "grants_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "grants_name_idx" ON "grants" USING btree ("name");--> statement-breakpoint
CREATE INDEX "grants_institution_idx" ON "grants" USING btree ("institution_id");--> statement-breakpoint
CREATE INDEX "grants_amount_idx" ON "grants" USING btree ("grant_amount");--> statement-breakpoint
CREATE INDEX "grants_created_at_idx" ON "grants" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "institutions_name_idx" ON "institutions" USING btree ("name");--> statement-breakpoint
CREATE INDEX "news_updates_type_idx" ON "news_updates" USING btree ("type");--> statement-breakpoint
CREATE INDEX "news_updates_created_at_idx" ON "news_updates" USING btree ("created_at");