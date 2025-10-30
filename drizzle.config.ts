import { defineConfig } from "drizzle-kit";
import "./envConfig";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: { url: process.env.DRIZZLE_KIT_DATABASE_URL! },
  schemaFilter: ["public"],
  entities: {
    roles: {
      provider: "supabase",
      exclude: ["powerync_role"],
    },
  },
});
