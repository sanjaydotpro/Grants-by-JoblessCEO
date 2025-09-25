import { pgTable, text, integer, real, index, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Institutions table
export const institutions = pgTable("institutions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("institutions_name_idx").on(table.name)
  };
});

// Grants table
export const grants = pgTable("grants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  institutionId: uuid("institution_id").references(() => institutions.id, { onDelete: "cascade" }).notNull(),
  grantAmount: real("grant_amount"),
  website: text("website"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  return {
    nameIdx: index("grants_name_idx").on(table.name),
    institutionIdx: index("grants_institution_idx").on(table.institutionId),
    amountIdx: index("grants_amount_idx").on(table.grantAmount),
    createdAtIdx: index("grants_created_at_idx").on(table.createdAt)
  };
});

// News Updates table
export const newsUpdates = pgTable("news_updates", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  type: text("type").notNull().default("news"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => {
  return {
    typeIdx: index("news_updates_type_idx").on(table.type),
    createdAtIdx: index("news_updates_created_at_idx").on(table.createdAt)
  };
});

// Waitlist table
export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  return {
    emailIdx: index("waitlist_email_idx").on(table.email),
    createdAtIdx: index("waitlist_created_at_idx").on(table.createdAt)
  };
});

// Define relations
export const institutionsRelations = relations(institutions, ({ many }) => ({
  grants: many(grants)
}));

export const grantsRelations = relations(grants, ({ one }) => ({
  institution: one(institutions, {
    fields: [grants.institutionId],
    references: [institutions.id]
  })
}));

// Export all tables for type inference
export const schema = {
  institutions,
  grants,
  newsUpdates,
  waitlist
};

// Export table names for migrations
export const tableNames = {
  institutions: "institutions",
  grants: "grants",
  newsUpdates: "news_updates",
  waitlist: "waitlist"
} as const;