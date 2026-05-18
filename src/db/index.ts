import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

// Re-use the client across hot reloads in dev so we don't exhaust connections.
const globalForPg = globalThis as unknown as {
  __reacgen_pg__?: ReturnType<typeof postgres>;
};

const client =
  globalForPg.__reacgen_pg__ ??
  postgres(url, {
    max: 10,
    idle_timeout: 30,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.__reacgen_pg__ = client;
}

export const db = drizzle(client, { schema });
export { schema };
