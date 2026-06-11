import "server-only";

import { getSql } from "./db";
import { validateDonationCheckout } from "./donation-validation.mjs";

export { validateDonationCheckout };

const PAYMENT_STATUS = {
  pending: "pending",
  succeeded: "succeeded",
  failed: "failed",
  canceled: "canceled"
};

function createReference(provider) {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DON-${provider.slice(0, 3).toUpperCase()}-${stamp}-${random}`;
}

let paymentsTableReady = false;

async function ensureDonationPaymentsTable() {
  if (paymentsTableReady) {
    return;
  }

  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await sql`
    create table if not exists donation_payments (
      id integer generated always as identity primary key,
      reference text not null unique,
      fund_slug text not null,
      fund_title text not null,
      provider text not null,
      provider_payment_id text,
      donor_name text not null,
      donor_email text not null,
      amount numeric(12, 2) not null,
      currency text not null,
      status text not null default 'pending',
      checkout_url text,
      raw_payload jsonb,
      completed_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  // Recurring-donation columns (added non-destructively for existing tables).
  await sql`alter table donation_payments add column if not exists frequency text not null default 'one-time'`;
  await sql`alter table donation_payments add column if not exists provider_subscription_id text`;
  await sql`alter table donation_payments add column if not exists subscription_canceled_at timestamptz`;

  await sql`
    create index if not exists donation_payments_status_idx
      on donation_payments (status, created_at desc)
  `;

  await sql`
    create index if not exists donation_payments_provider_idx
      on donation_payments (provider, created_at desc)
  `;

  await sql`
    create index if not exists donation_payments_fund_idx
      on donation_payments (fund_slug, created_at desc)
  `;

  paymentsTableReady = true;
}

function formatPaymentRecord(record) {
  return {
    id: record.id,
    reference: record.reference,
    fundSlug: record.fund_slug,
    fundTitle: record.fund_title,
    provider: record.provider,
    providerPaymentId: record.provider_payment_id,
    donorName: record.donor_name,
    donorEmail: record.donor_email,
    amount: Number(record.amount),
    currency: record.currency,
    status: record.status,
    checkoutUrl: record.checkout_url,
    frequency: record.frequency || "one-time",
    providerSubscriptionId: record.provider_subscription_id || "",
    subscriptionCanceledAt: record.subscription_canceled_at || null,
    completedAt: record.completed_at,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

export async function createDonationPaymentAttempt({ fund, provider, donorName, donorEmail, amount, currency, frequency = "one-time" }) {
  await ensureDonationPaymentsTable();
  const sql = getSql();
  const reference = createReference(provider);

  const [record] = await sql`
    insert into donation_payments (
      reference,
      fund_slug,
      fund_title,
      provider,
      donor_name,
      donor_email,
      amount,
      currency,
      status,
      frequency
    )
    values (
      ${reference},
      ${fund.slug},
      ${fund.title},
      ${provider},
      ${donorName},
      ${donorEmail},
      ${amount},
      ${currency},
      ${PAYMENT_STATUS.pending},
      ${frequency}
    )
    returning *
  `;

  return formatPaymentRecord(record);
}

export async function updateDonationPaymentCheckout(reference, { providerPaymentId, providerSubscriptionId, checkoutUrl, rawPayload }) {
  await ensureDonationPaymentsTable();
  const sql = getSql();

  const [record] = await sql`
    update donation_payments
    set
      provider_payment_id = ${providerPaymentId || null},
      provider_subscription_id = ${providerSubscriptionId || null},
      checkout_url = ${checkoutUrl || null},
      raw_payload = ${rawPayload ? sql.json(rawPayload) : null},
      updated_at = now()
    where reference = ${reference}
    returning *
  `;

  return record ? formatPaymentRecord(record) : null;
}

async function updateDonationPaymentStatusByReference(reference, nextStatus, extra = {}) {
  await ensureDonationPaymentsTable();
  const sql = getSql();

  const [record] = await sql`
    update donation_payments
    set
      status = ${nextStatus},
      provider_payment_id = ${extra.providerPaymentId || null},
      raw_payload = ${extra.rawPayload ? sql.json(extra.rawPayload) : null},
      completed_at = ${nextStatus === PAYMENT_STATUS.succeeded ? sql`now()` : null},
      updated_at = now()
    where reference = ${reference}
    returning *
  `;

  return record ? formatPaymentRecord(record) : null;
}

export function markDonationPaymentSucceeded(reference, extra = {}) {
  return updateDonationPaymentStatusByReference(reference, PAYMENT_STATUS.succeeded, extra);
}

export function markDonationPaymentFailed(reference, extra = {}) {
  return updateDonationPaymentStatusByReference(reference, PAYMENT_STATUS.failed, extra);
}

export function markDonationPaymentCanceled(reference, extra = {}) {
  return updateDonationPaymentStatusByReference(reference, PAYMENT_STATUS.canceled, extra);
}

/**
 * Record a recurring charge for an existing subscription. Returns the new
 * renewal record (so a receipt can be sent), or null when nothing new was
 * recorded (unknown subscription, duplicate charge, or the first charge — which
 * is attached to the original row instead of duplicating it).
 */
export async function recordDonationRenewal({
  provider,
  subscriptionId,
  providerPaymentId,
  amount,
  currency,
  rawPayload
}) {
  if (!subscriptionId) {
    return null;
  }

  await ensureDonationPaymentsTable();
  const sql = getSql();

  const [original] = await sql`
    select *
    from donation_payments
    where provider = ${provider} and provider_subscription_id = ${subscriptionId}
    order by created_at asc, id asc
    limit 1
  `;

  if (!original) {
    return null;
  }

  // Dedup — this provider charge was already recorded.
  if (providerPaymentId) {
    const [dupe] = await sql`
      select id
      from donation_payments
      where provider = ${provider} and provider_payment_id = ${providerPaymentId}
      limit 1
    `;
    if (dupe) {
      return null;
    }
  }

  // First charge: the original row still points at the subscription id (no real
  // charge claimed yet) — attach this charge to it rather than duplicating.
  if (providerPaymentId && original.provider_payment_id === subscriptionId) {
    await sql`
      update donation_payments
      set provider_payment_id = ${providerPaymentId},
          status = ${PAYMENT_STATUS.succeeded},
          completed_at = coalesce(completed_at, now()),
          updated_at = now()
      where id = ${original.id}
    `;
    return null;
  }

  const reference = createReference(provider);
  const renewalAmount = Number.isFinite(Number(amount)) ? Number(amount) : Number(original.amount);

  const [record] = await sql`
    insert into donation_payments (
      reference,
      fund_slug,
      fund_title,
      provider,
      provider_payment_id,
      provider_subscription_id,
      donor_name,
      donor_email,
      amount,
      currency,
      status,
      frequency,
      raw_payload,
      completed_at
    )
    values (
      ${reference},
      ${original.fund_slug},
      ${original.fund_title},
      ${provider},
      ${providerPaymentId || null},
      ${subscriptionId},
      ${original.donor_name},
      ${original.donor_email},
      ${renewalAmount},
      ${currency || original.currency},
      ${PAYMENT_STATUS.succeeded},
      'monthly',
      ${rawPayload ? sql.json(rawPayload) : null},
      now()
    )
    returning *
  `;

  return formatPaymentRecord(record);
}

// Look up an active monthly subscription by a reference from the donor's receipt
// + their email (a lightweight ownership check without donor accounts).
export async function getActiveSubscriptionByReference(reference, email) {
  if (!reference || !email) {
    return null;
  }

  await ensureDonationPaymentsTable();
  const sql = getSql();

  const [record] = await sql`
    select *
    from donation_payments
    where reference = ${String(reference).trim()}
      and lower(donor_email) = ${String(email).trim().toLowerCase()}
      and frequency = 'monthly'
      and provider_subscription_id is not null
      and provider_subscription_id <> ''
    limit 1
  `;

  return record ? formatPaymentRecord(record) : null;
}

export async function markSubscriptionCanceled(provider, subscriptionId) {
  if (!subscriptionId) {
    return;
  }

  await ensureDonationPaymentsTable();
  const sql = getSql();

  await sql`
    update donation_payments
    set subscription_canceled_at = now(), updated_at = now()
    where provider = ${provider} and provider_subscription_id = ${subscriptionId}
  `;
}

export async function getDonationPaymentByReference(reference) {
  if (!reference) {
    return null;
  }

  await ensureDonationPaymentsTable();
  const sql = getSql();
  const [record] = await sql`
    select *
    from donation_payments
    where reference = ${reference}
    limit 1
  `;

  return record ? formatPaymentRecord(record) : null;
}

export async function getDonationPaymentByProviderPaymentId(provider, providerPaymentId) {
  if (!provider || !providerPaymentId) {
    return null;
  }

  await ensureDonationPaymentsTable();
  const sql = getSql();
  const [record] = await sql`
    select *
    from donation_payments
    where provider = ${provider}
      and provider_payment_id = ${providerPaymentId}
    limit 1
  `;

  return record ? formatPaymentRecord(record) : null;
}

export async function getRecentDonationPayments(limit = 12) {
  try {
    await ensureDonationPaymentsTable();
  } catch {
    return [];
  }

  const sql = getSql();
  const rows = await sql`
    select *
    from donation_payments
    order by created_at desc, id desc
    limit ${limit}
  `;

  return rows.map(formatPaymentRecord);
}

