import {
  pgTable,
  text,
  uuid,
  varchar,
  pgSchema,
  timestamp,
} from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 256 }),
  attachmentId: uuid("attachment_id").references(() => attachments.id),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: uuid("created_by")
    .references(() => profiles.id)
    .notNull(),
}).enableRLS();

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: uuid("created_by")
    .references(() => profiles.id)
    .notNull(),
}).enableRLS();

export const attachments = pgTable("attachments", {
  id: uuid("id").primaryKey(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: uuid("created_by")
    .references(() => profiles.id)
    .notNull(),
}).enableRLS();

// Create reference to auth.users table
// in Supabase so that we can reference it in our profiles table
const authSchema = pgSchema("auth");
const usersInAuth = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => usersInAuth.id),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();

export type Attachment = typeof attachments.$inferSelect;
