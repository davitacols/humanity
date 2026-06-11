import "server-only";

import crypto from "node:crypto";

import { getSiteOrigin } from "./site";

const PAYPAL_LIVE_BASE_URL = "https://api-m.paypal.com";
const PAYPAL_SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com";
const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";
const DEFAULT_BRAND_NAME = "Humanity First Initiative";

function readEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function normalizePayPalMode(value) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";

  if (normalized === "live" || normalized === "production") {
    return "live";
  }

  if (normalized === "sandbox") {
    return "sandbox";
  }

  return process.env.NODE_ENV === "production" ? "live" : "sandbox";
}

function getPayPalBaseUrl() {
  return normalizePayPalMode(readEnv("PAYPAL_ENV", "PAYPAL_MODE")) === "live"
    ? PAYPAL_LIVE_BASE_URL
    : PAYPAL_SANDBOX_BASE_URL;
}

export function getPaymentProviderAvailability() {
  const flutterwaveSecretKey = readEnv("FLW_SECRET_KEY", "FLUTTERWAVE_SECRET_KEY");
  const paypalClientId = readEnv("PAYPAL_CLIENT_ID");
  const paypalClientSecret = readEnv("PAYPAL_CLIENT_SECRET");

  return {
    flutterwave: {
      id: "flutterwave",
      label: "Flutterwave",
      currency: "NGN",
      configured: Boolean(flutterwaveSecretKey),
      note: flutterwaveSecretKey
        ? "Best for local NGN payments, bank transfers, cards, and regional payment methods."
        : "Flutterwave checkout is not active yet."
    },
    paypal: {
      id: "paypal",
      label: "PayPal",
      currency: "USD",
      configured: Boolean(paypalClientId && paypalClientSecret),
      note: paypalClientId && paypalClientSecret
        ? "Best for international and diaspora donors paying with PayPal."
        : "PayPal checkout is not active yet."
    }
  };
}

function assertProviderConfigured(provider) {
  const availability = getPaymentProviderAvailability();

  if (!availability[provider]?.configured) {
    throw new Error(`${provider} is not configured.`);
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function createError(message, details) {
  const error = new Error(message);
  error.details = details;
  return error;
}

let cachedPayPalToken = null;
let cachedPayPalTokenExpiresAt = 0;
let cachedPayPalProductId = null;

async function getPayPalAccessToken() {
  const now = Date.now();

  if (cachedPayPalToken && cachedPayPalTokenExpiresAt > now + 60_000) {
    return cachedPayPalToken;
  }

  const clientId = readEnv("PAYPAL_CLIENT_ID");
  const clientSecret = readEnv("PAYPAL_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are missing.");
  }

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || !data?.access_token) {
    throw createError("PayPal access token request failed.", data);
  }

  cachedPayPalToken = data.access_token;
  cachedPayPalTokenExpiresAt = now + Number(data.expires_in || 0) * 1000;
  return data.access_token;
}

function buildCallbackUrl(pathname, params = {}, siteOrigin = getSiteOrigin()) {
  const url = new URL(pathname, siteOrigin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function formatPayPalAmount(value) {
  return Number(value).toFixed(2);
}

export function getSuggestedAmountsForProvider(provider) {
  if (provider === "paypal") {
    return [10, 25, 50, 100];
  }

  return [10000, 25000, 50000, 100000];
}

// Recurring: a Flutterwave payment plan. Passing its id as `payment_plan` in the
// /payments call subscribes the customer — Flutterwave then charges monthly.
export async function createFlutterwavePaymentPlan({ amount, name }) {
  assertProviderConfigured("flutterwave");

  const secretKey = readEnv("FLW_SECRET_KEY", "FLUTTERWAVE_SECRET_KEY");
  const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payment-plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: Math.round(Number(amount)),
      name: String(name).slice(0, 100),
      interval: "monthly",
      currency: "NGN",
      duration: 0 // 0 = charge indefinitely until cancelled
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || data?.status !== "success" || !data?.data?.id) {
    throw createError("Flutterwave payment plan creation failed.", data);
  }

  return String(data.data.id);
}

export async function createFlutterwaveCheckout({
  reference,
  fund,
  donorName,
  donorEmail,
  amount,
  frequency = "one-time",
  siteOrigin
}) {
  assertProviderConfigured("flutterwave");

  const secretKey = readEnv("FLW_SECRET_KEY", "FLUTTERWAVE_SECRET_KEY");
  const redirectUrl = buildCallbackUrl(
    "/api/payments/flutterwave/callback",
    {
      fund: fund.slug,
      reference
    },
    siteOrigin
  );

  let paymentPlanId = "";
  if (frequency === "monthly") {
    paymentPlanId = await createFlutterwavePaymentPlan({
      amount,
      name: `Monthly donation — ${fund.title} (${reference})`
    });
  }

  const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tx_ref: reference,
      amount: Math.round(Number(amount)),
      currency: "NGN",
      redirect_url: redirectUrl,
      ...(paymentPlanId ? { payment_plan: paymentPlanId } : {}),
      customer: {
        email: donorEmail,
        name: donorName
      },
      customizations: {
        title: DEFAULT_BRAND_NAME,
        description: `${frequency === "monthly" ? "Monthly donation" : "Donation"} for ${fund.title}`,
        logo: buildCallbackUrl("/favicon.ico", {}, siteOrigin)
      }
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || data?.status !== "success" || !data?.data?.link) {
    throw createError("Flutterwave checkout creation failed.", data);
  }

  return {
    provider: "flutterwave",
    providerPaymentId: data.data.id ? String(data.data.id) : "",
    providerSubscriptionId: paymentPlanId,
    redirectUrl: data.data.link,
    payload: data
  };
}

export async function verifyFlutterwaveTransaction(transactionId) {
  assertProviderConfigured("flutterwave");

  const secretKey = readEnv("FLW_SECRET_KEY", "FLUTTERWAVE_SECRET_KEY");
  const response = await fetch(
    `${FLUTTERWAVE_BASE_URL}/transactions/${encodeURIComponent(transactionId)}/verify`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`
      },
      cache: "no-store"
    }
  );

  const data = await parseJsonResponse(response);

  if (!response.ok || data?.status !== "success" || !data?.data) {
    throw createError("Flutterwave transaction verification failed.", data);
  }

  return data;
}

export async function createPayPalOrder({
  reference,
  fund,
  donorName,
  donorEmail,
  amount,
  siteOrigin
}) {
  assertProviderConfigured("paypal");

  const accessToken = await getPayPalAccessToken();
  const returnUrl = buildCallbackUrl(
    "/api/payments/paypal/return",
    {
      fund: fund.slug,
      reference
    },
    siteOrigin
  );
  const cancelUrl = buildCallbackUrl(
    "/api/payments/paypal/cancel",
    {
      fund: fund.slug,
      reference
    },
    siteOrigin
  );

  const nameParts = donorName.split(/\s+/).filter(Boolean);
  const givenName = nameParts[0] || "Donor";
  const surname = nameParts.slice(1).join(" ") || "Supporter";

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": reference
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: fund.slug,
          custom_id: reference,
          description: `Donation for ${fund.title}`,
          amount: {
            currency_code: "USD",
            value: formatPayPalAmount(amount)
          }
        }
      ],
      payer: {
        name: {
          given_name: givenName,
          surname
        },
        email_address: donorEmail
      },
      application_context: {
        brand_name: DEFAULT_BRAND_NAME,
        user_action: "PAY_NOW",
        return_url: returnUrl,
        cancel_url: cancelUrl
      }
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || !data?.id || !Array.isArray(data?.links)) {
    throw createError("PayPal order creation failed.", data);
  }

  const approvalLink = data.links.find((link) => link.rel === "approve")?.href;

  if (!approvalLink) {
    throw createError("PayPal approval link was not returned.", data);
  }

  return {
    provider: "paypal",
    providerPaymentId: data.id,
    redirectUrl: approvalLink,
    payload: data
  };
}

export async function capturePayPalOrder(orderId) {
  assertProviderConfigured("paypal");

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  );

  const data = await parseJsonResponse(response);

  if (!response.ok || !data?.id) {
    throw createError("PayPal order capture failed.", data);
  }

  return data;
}

// ── PayPal recurring (Subscriptions API) ─────────────────────────────────────
async function ensurePayPalProduct(accessToken) {
  const configured = readEnv("PAYPAL_PRODUCT_ID");
  if (configured) {
    return configured;
  }
  if (cachedPayPalProductId) {
    return cachedPayPalProductId;
  }

  const response = await fetch(`${getPayPalBaseUrl()}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: `${DEFAULT_BRAND_NAME} donations`,
      description: "Recurring donations supporting community programs.",
      type: "SERVICE",
      category: "CHARITY"
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);
  if (!response.ok || !data?.id) {
    throw createError("PayPal product creation failed.", data);
  }

  cachedPayPalProductId = data.id;
  return data.id;
}

async function createPayPalBillingPlan(accessToken, productId, amount, fundTitle, reference) {
  const response = await fetch(`${getPayPalBaseUrl()}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `plan-${reference}`
    },
    body: JSON.stringify({
      product_id: productId,
      name: `Monthly donation — ${fundTitle}`.slice(0, 127),
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // 0 = until cancelled
          pricing_scheme: {
            fixed_price: { value: formatPayPalAmount(amount), currency_code: "USD" }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 1
      }
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);
  if (!response.ok || !data?.id) {
    throw createError("PayPal billing plan creation failed.", data);
  }

  return data.id;
}

export async function createPayPalSubscription({
  reference,
  fund,
  donorName,
  donorEmail,
  amount,
  siteOrigin
}) {
  assertProviderConfigured("paypal");

  const accessToken = await getPayPalAccessToken();
  const productId = await ensurePayPalProduct(accessToken);
  const planId = await createPayPalBillingPlan(accessToken, productId, amount, fund.title, reference);

  const returnUrl = buildCallbackUrl(
    "/api/payments/paypal/return",
    { fund: fund.slug, reference },
    siteOrigin
  );
  const cancelUrl = buildCallbackUrl(
    "/api/payments/paypal/cancel",
    { fund: fund.slug, reference },
    siteOrigin
  );

  const nameParts = donorName.split(/\s+/).filter(Boolean);

  const response = await fetch(`${getPayPalBaseUrl()}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": reference
    },
    body: JSON.stringify({
      plan_id: planId,
      custom_id: reference,
      subscriber: {
        name: {
          given_name: nameParts[0] || "Donor",
          surname: nameParts.slice(1).join(" ") || "Supporter"
        },
        email_address: donorEmail
      },
      application_context: {
        brand_name: DEFAULT_BRAND_NAME,
        user_action: "SUBSCRIBE_NOW",
        shipping_preference: "NO_SHIPPING",
        return_url: returnUrl,
        cancel_url: cancelUrl
      }
    }),
    cache: "no-store"
  });

  const data = await parseJsonResponse(response);
  if (!response.ok || !data?.id || !Array.isArray(data?.links)) {
    throw createError("PayPal subscription creation failed.", data);
  }

  const approvalLink = data.links.find((link) => link.rel === "approve")?.href;
  if (!approvalLink) {
    throw createError("PayPal subscription approval link was not returned.", data);
  }

  return {
    provider: "paypal",
    providerPaymentId: data.id,
    providerSubscriptionId: data.id,
    redirectUrl: approvalLink,
    payload: data
  };
}

export async function getPayPalSubscription(subscriptionId) {
  assertProviderConfigured("paypal");

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalBaseUrl()}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store"
    }
  );

  const data = await parseJsonResponse(response);
  if (!response.ok || !data?.id) {
    throw createError("PayPal subscription lookup failed.", data);
  }

  return data;
}

// ── Cancellations ────────────────────────────────────────────────────────────
// We store the Flutterwave payment plan id as the subscription id; cancelling
// the plan stops the donor's recurring charges.
export async function cancelFlutterwavePaymentPlan(planId) {
  assertProviderConfigured("flutterwave");

  const secretKey = readEnv("FLW_SECRET_KEY", "FLUTTERWAVE_SECRET_KEY");
  const response = await fetch(
    `${FLUTTERWAVE_BASE_URL}/payment-plans/${encodeURIComponent(planId)}/cancel`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  );

  const data = await parseJsonResponse(response);
  if (!response.ok || data?.status !== "success") {
    throw createError("Flutterwave payment plan cancellation failed.", data);
  }

  return true;
}

export async function cancelPayPalSubscription(subscriptionId, reason = "Donor requested cancellation") {
  assertProviderConfigured("paypal");

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalBaseUrl()}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason: String(reason).slice(0, 127) }),
      cache: "no-store"
    }
  );

  // PayPal returns 204 No Content on success.
  if (response.status === 204 || response.ok) {
    return true;
  }

  const data = await parseJsonResponse(response);
  throw createError("PayPal subscription cancellation failed.", data);
}

export async function verifyPayPalWebhook(headers, payload) {
  assertProviderConfigured("paypal");

  const webhookId = readEnv("PAYPAL_WEBHOOK_ID");

  if (!webhookId) {
    return false;
  }

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalBaseUrl()}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth_algo: headers.get("paypal-auth-algo") || "",
        cert_url: headers.get("paypal-cert-url") || "",
        transmission_id: headers.get("paypal-transmission-id") || "",
        transmission_sig: headers.get("paypal-transmission-sig") || "",
        transmission_time: headers.get("paypal-transmission-time") || "",
        webhook_id: webhookId,
        webhook_event: payload
      }),
      cache: "no-store"
    }
  );

  const data = await parseJsonResponse(response);
  return response.ok && data?.verification_status === "SUCCESS";
}

export function isFlutterwaveWebhookValid(headers) {
  const signature = headers.get("verif-hash");
  const secretHash = readEnv("FLW_SECRET_HASH", "FLUTTERWAVE_SECRET_HASH");

  if (!secretHash) {
    return false;
  }

  if (!signature) {
    return false;
  }

  const signatureBuffer = Buffer.from(signature);
  const secretBuffer = Buffer.from(secretHash);

  if (signatureBuffer.length !== secretBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, secretBuffer);
}
