import { pgTable, text, timestamp, uuid, boolean, integer, json, bigint, smallint, varchar, inet, index, foreignKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Example schema - you can modify this based on your needs
export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  nativeCurrencyId: uuid("native_currency_id"),
  imageLink: varchar("image_link"),
  issuerId: uuid("issuer_id").references(() => issuers.id, { onDelete: "set null" }),
  collaboratorId: uuid("collaborator_id").references(() => collaborators.id, { onDelete: "set null" }),
  officialLink: text("official_link"),
  isDiscontinued: boolean("is_discontinued").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("cards_name_idx").on(table.name),
    issuerIdx: index("cards_issuer_idx").on(table.issuerId),
    discontinuedIdx: index("cards_discontinued_idx").on(table.isDiscontinued),
    createdAtIdx: index("cards_created_at_idx").on(table.createdAt)
  };
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("categories_name_idx").on(table.name)
  };
});

export const issuers = pgTable("issuers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("issuers_name_idx").on(table.name)
  };
});

// Define relations
export const cardsRelations = relations(cards, ({ one, many }) => ({
  issuer: one(issuers, {
    fields: [cards.issuerId],
    references: [issuers.id]
  }),
  collaborator: one(collaborators, {
    fields: [cards.collaboratorId],
    references: [collaborators.id]
  })
}));

export const newsUpdates = pgTable("news_updates", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  type: varchar("type").default("news").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    typeIdx: index("news_updates_type_idx").on(table.type),
    createdAtIdx: index("news_updates_created_at_idx").on(table.createdAt)
  };
});

export const collaborators = pgTable("collaborators", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("collaborators_name_idx").on(table.name)
  };
});

export const employment = pgTable("employment", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("employment_name_idx").on(table.name)
  };
});

export const features = pgTable("features", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  featureCategory: text("feature_category"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("features_name_idx").on(table.name),
    categoryIdx: index("features_category_idx").on(table.featureCategory)
  };
});

export const networks = pgTable("networks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("networks_name_idx").on(table.name)
  };
});

export const issuersRelations = relations(issuers, ({ many }) => ({
  cards: many(cards)
}));

export const collaboratorsRelations = relations(collaborators, ({ many }) => ({
  cards: many(cards)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  // Add category-card relations if needed in the future
}));

export const newsUpdatesRelations = relations(newsUpdates, ({ one }) => ({
  // Add relations if needed
}));

export const employmentRelations = relations(employment, ({ many }) => ({
  // Add relations if needed
}));

export const featuresRelations = relations(features, ({ many }) => ({
  // Add relations if needed
}));

export const networksRelations = relations(networks, ({ many }) => ({
  // Add relations if needed
}));