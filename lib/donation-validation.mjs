// Pure donation-checkout validation — no DB, no server-only imports, so it can
// be unit-tested directly and reused by the API route via donation-payments.js.

const PROVIDERS = new Set(["flutterwave", "paypal"]);
const CURRENCIES = {
  flutterwave: "NGN",
  paypal: "USD"
};
const FREQUENCIES = new Set(["one-time", "monthly"]);

function normalizeFrequency(value) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return FREQUENCIES.has(normalized) ? normalized : "one-time";
}

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

export function validateDonationCheckout(payload) {
  const data = {
    fundSlug: normalizeText(payload?.fundSlug),
    provider: normalizeText(payload?.provider).toLowerCase(),
    donorName: normalizeText(payload?.donorName),
    donorEmail: normalizeEmail(payload?.donorEmail),
    amount: parseAmount(payload?.amount),
    currency: normalizeText(payload?.currency).toUpperCase(),
    frequency: normalizeFrequency(payload?.frequency)
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
      amount:
        Number.isFinite(data.amount) && PROVIDERS.has(data.provider)
          ? normalizeAmount(data.provider, data.amount)
          : data.amount
    },
    fieldErrors
  };
}
