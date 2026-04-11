const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing.");
  }

  const sql = postgres(process.env.DATABASE_URL, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 20
  });

  try {
    const [databaseInfo] = await sql`select current_database() as database_name, now() as connected_at`;
    const [countInfo] = await sql`
      select count(*)::int as total
      from information_schema.tables
      where table_schema = 'public'
        and table_name like 'education_%'
    `;

    console.log("Connected to Neon:", databaseInfo.database_name);
    console.log("Education tables found:", countInfo.total);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
