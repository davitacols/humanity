import "server-only";

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

function createClient() {
  if (!connectionString) {
    return null;
  }

  return postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 20
  });
}

const globalForDb = globalThis;

export function getSql() {
  if (!connectionString) {
    return null;
  }

  if (!globalForDb.__humanitySql) {
    globalForDb.__humanitySql = createClient();
  }

  return globalForDb.__humanitySql;
}
