CREATE TABLE "collaborators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "collaborators_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "employment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employment_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"feature_category" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "networks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "networks_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "news_updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"type" varchar DEFAULT 'news' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "image_link" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "is_discontinued" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issuers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issuers" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "collaborators_name_idx" ON "collaborators" USING btree ("name");--> statement-breakpoint
CREATE INDEX "employment_name_idx" ON "employment" USING btree ("name");--> statement-breakpoint
CREATE INDEX "features_name_idx" ON "features" USING btree ("name");--> statement-breakpoint
CREATE INDEX "features_category_idx" ON "features" USING btree ("feature_category");--> statement-breakpoint
CREATE INDEX "networks_name_idx" ON "networks" USING btree ("name");--> statement-breakpoint
CREATE INDEX "news_updates_type_idx" ON "news_updates" USING btree ("type");--> statement-breakpoint
CREATE INDEX "news_updates_created_at_idx" ON "news_updates" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_issuer_id_issuers_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "public"."issuers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_collaborator_id_collaborators_id_fk" FOREIGN KEY ("collaborator_id") REFERENCES "public"."collaborators"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cards_name_idx" ON "cards" USING btree ("name");--> statement-breakpoint
CREATE INDEX "cards_issuer_idx" ON "cards" USING btree ("issuer_id");--> statement-breakpoint
CREATE INDEX "cards_discontinued_idx" ON "cards" USING btree ("is_discontinued");--> statement-breakpoint
CREATE INDEX "cards_created_at_idx" ON "cards" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "categories_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "issuers_name_idx" ON "issuers" USING btree ("name");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "issuers" ADD CONSTRAINT "issuers_name_unique" UNIQUE("name");