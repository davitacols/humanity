import "server-only";

import { getSql } from "./db";

const PAYMENT_STATUS = {
  pending: "pending",
  succeeded: "succeeded",
  failed: "failed",
  canceled: "canceled"
};

const PROVIDERS = new Set(["flutterwave", "paypal"]);
const CURRENCIES = {
  flutterwave: "NGN",
  paypal: "USD"
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : NaN;
}

function normalizeAmount(provider, amount) {
  if (provider === "flutterwave") {
    return Math.round(amount);
  }

  return Number(amount.toFixed(2));
}

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

export function validateDonationCheckout(payload) {
  const data = {
    fundSlug: normalizeText(payload?.fundSlug),
    provider: normalizeText(payload?.provider).toLowerCase(),
    donorName: normalizeText(payload?.donorName),
    donorEmail: normalizeEmail(payload?.donorEmail),
    amount: parseAmount(payload?.amount),
    currency: normalizeText(payload?.currency).toUpperCase()
  };

  const fieldErrors = {};

  if (!data.fundSlug) {
    fieldErrors.fundSlug = "Choose the route you want to support.";
  }

  if (!PROVIDERS.has(data.provider)) {
    fieldErrors.provider = "Choose a valid payment provider.";
  }

  if (data.donorName.length < 2 || data.donorName.length > 80) {
    fieldErrors.donorName = "Enter the donor name for this payment.";
  }

  if (!isValidEmail(data.donorEmail)) {
    fieldErrors.donorEmail = "Enter a valid donor email address.";
  }

  if (!Number.isFinite(data.amount) || data.amount <= 0) {
    fieldErrors.amount = "Enter a valid amount greater than zero.";
  }

  if (PROVIDERS.has(data.provider)) {
    const expectedCurrency = CURRENCIES[data.provider];

    if (data.currency !== expectedCurrency) {
      fieldErrors.currency = `${data.provider === "flutterwave" ? "Flutterwave" : "PayPal"} checkout uses ${expectedCurrency}.`;
    }

    if (data.provider === "flutterwave" && Number.isFinite(data.amount) && data.amount < 1000) {
      fieldErrors.amount = "Flutterwave donations should be at least NGN 1,000.";
    }

    if (data.provider === "paypal" && Number.isFinite(data.amount) && data.amount < 1) {
      fieldErrors.amount = "PayPal donations should be at least USD 1.";
    }
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    data: {
      ...data,
      amount: Number.isFinite(data.amount) && PROVIDERS.has(data.provider)
        ? normalizeAmount(data.provider, data.amount)
        : data.amount
    },
    fieldErrors
  };
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
    completedAt: record.completed_at,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

export async function createDonationPaymentAttempt({ fund, provider, donorName, donorEmail, amount, currency }) {
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
      status
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
      ${PAYMENT_STATUS.pending}
    )
    returning *
  `;

  return formatPaymentRecord(record);
}

export async function updateDonationPaymentCheckout(reference, { providerPaymentId, checkoutUrl, rawPayload }) {
  await ensureDonationPaymentsTable();
  const sql = getSql();

  const [record] = await sql`
    update donation_payments
    set
      provider_payment_id = ${providerPaymentId || null},
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

