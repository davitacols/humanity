import "server-only";

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const DEFAULT_CONNECT_TIMEOUT_SECONDS = 5;

function getConnectTimeoutSeconds() {
  const configuredTimeout = Number(process.env.POSTGRES_CONNECT_TIMEOUT_SECONDS);

  if (Number.isFinite(configuredTimeout) && configuredTimeout > 0) {
    return configuredTimeout;
  }

  return DEFAULT_CONNECT_TIMEOUT_SECONDS;
}

function createClient() {
  if (!connectionString) {
    return null;
  }

  return postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: getConnectTimeoutSeconds()
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
