/**
 * Integrity fix: zero out fabricated "raised" amounts on donation funds.
 * Published goals (target_amount_ngn) are kept; only the raised totals — which
 * drive the progress bars and the "documented support" metric — are reset to 0
 * so the donate page never shows fundraising results that didn't happen. Set
 * real values later via the admin platform editor.
 *
 * Run: node scripts/zero-fund-raised.js
 */
const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local before running this script.");
  }

  const sql = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 20
  });

  try {
    const before = await sql`select slug, target_amount_ngn, raised_amount_ngn from donation_funds order by display_order asc, id asc`;
    console.log("Before:");
    console.table(before);

    await sql`update donation_funds set raised_amount_ngn = 0`;

    const after = await sql`select slug, target_amount_ngn, raised_amount_ngn from donation_funds order by display_order asc, id asc`;
    console.log("After:");
    console.table(after);
    console.log("Raised amounts zeroed (goals preserved).");
  } catch (error) {
    if (error?.code === "42P01") {
      console.log("donation_funds table does not exist yet — nothing to zero (static fallback is already 0).");
      return;
    }
    throw error;
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
