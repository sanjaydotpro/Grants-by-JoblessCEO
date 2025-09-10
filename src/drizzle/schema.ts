import { pgTable, text, timestamp, uuid, boolean, integer, json, bigint, smallint, varchar, inet } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Example schema - you can modify this based on your needs
export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  nativeCurrencyId: uuid("native_currency_id"),
  imageLink: varchar("image_link"),
  issuerId: uuid("issuer_id"),
  collaboratorId: uuid("collaborator_id"),
  officialLink: text("official_link"),
  isDiscontinued: boolean("is_discontinued").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow()
});

export const issuers = pgTable("issuers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  shortForm: text("short_form"),
  displayName: text("display_name"),
  officialSite: text("official_site"),
  ccMitc: text("cc_mitc"),
  ccSoc: text("cc_soc"),
  isAvailable: boolean("is_available").default(false),
  availableRegions: json("available_regions").default('["all"]'),
  country: text("country").default(""),
  createdAt: timestamp("created_at").defaultNow()
});

// Define relations
export const cardsRelations = relations(cards, ({ one, many }) => ({
  issuer: one(issuers, {
    fields: [cards.issuerId],
    references: [issuers.id]
  })
}));

export const newsUpdates = pgTable("news_updates", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  type: varchar("type").default("news"),
  createdAt: timestamp("created_at").defaultNow()
});

export const collaborators = pgTable("collaborators", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name")
});

export const employment = pgTable("employment", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  name: text("name")
});

export const features = pgTable("features", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  name: varchar("name"),
  description: varchar("description"),
  featureCategory: text("feature_category")
});

export const networks = pgTable("networks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name")
});

export const issuersRelations = relations(issuers, ({ many }) => ({
  cards: many(cards)
}));