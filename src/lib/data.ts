import { da } from "zod/locales";
import db from "../db";
import {
  Attachment,
  attachments,
  customers,
  profiles,
  projects,
} from "../db/schema";
import { eq } from "drizzle-orm";
import { v7 as uuidv7 } from "uuid";

export type Customer = typeof customers.$inferSelect;
export type Project = typeof projects.$inferSelect;

export async function getCustomers(): Promise<Customer[]> {
  return await db.select().from(customers);
}

export async function createCustomer(data: Customer) {
  try {
    const result = await db
      .insert(customers)
      .values({
        id: data.id,
        name: data.name,
        phone: data.phone ?? null,
        attachmentId: data.attachmentId ?? null,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
      })
      .returning();
    return { customer: result };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

export async function getCustomerWithProjects(
  customerId: string
): Promise<(Customer & { projects: Project[] }) | null> {
  const customerArr = await db
    .select()
    .from(customers)
    .where(eq(customers.id, customerId));
  const customer = customerArr[0];
  if (!customer) return null;
  const customerProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.customerId, customerId));
  return { ...customer, projects: customerProjects };
}

export async function getProjects(customerId?: string): Promise<Project[]> {
  if (customerId) {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.customerId, customerId));
  }
  return await db.select().from(projects);
}

export async function createProject(data: {
  name: string;
  customerId: string;
  createdBy: string;
}) {
  const id = uuidv7();
  return await db.insert(projects).values({
    id,
    name: data.name,
    customerId: data.customerId,
    createdBy: data.createdBy,
  });
}

export async function getProject(projectId: string): Promise<Project | null> {
  const projectArr = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));
  return projectArr[0] ?? null;
}

export async function createProfile(userId: string) {
  return await db.insert(profiles).values({ id: userId });
}

export async function createAttachment(attachment: Attachment) {
  return await db.insert(attachments).values(attachment);
}
