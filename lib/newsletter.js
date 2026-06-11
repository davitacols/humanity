import "server-only";

import { getSql } from "./db";

let tableReady = false;

async function ensureNewsletterTable(sql) {
  if (tableReady) {
    return;
  }

  await sql`
    create table if not exists newsletter_subscribers (
      id integer generated always as identity primary key,
      email text not null unique,
      status text not null default 'subscribed',
      source text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  tableReady = true;
}

export function validateNewsletterSignup(payload) {
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload?.source === "string" ? payload.source.trim().slice(0, 60) : "";
  const website = typeof payload?.website === "string" ? payload.website.trim() : "";

  // Honeypot — bots fill the hidden field; accept silently without storing.
  if (website) {
    return { ok: true, isSpam: true, data: { email, source } };
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 160;

  return {
    ok: valid,
    isSpam: false,
    data: { email, source },
    error: valid ? "" : "Enter a valid email address."
  };
}

export async function subscribeToNewsletter({ email, source }) {
  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureNewsletterTable(sql);

  const [row] = await sql`
    insert into newsletter_subscribers (email, source)
    values (${email}, ${source || null})
    on conflict (email) do update set status = 'subscribed', updated_at = now()
    returning email, created_at
  `;

  return { email: row.email, createdAt: row.created_at };
}
