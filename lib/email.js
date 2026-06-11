import "server-only";

import { getSiteOrigin } from "./site";

/**
 * Email delivery via the Resend HTTP API (no SDK dependency, matching the
 * project's fetch-based provider style). Everything here is best-effort and
 * NEVER throws into the caller — a mail failure must not break a donation,
 * inquiry, or submission. When RESEND_API_KEY is unset, sends are skipped.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const BRAND = "Humanity First Initiative";

function readEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

export function isEmailConfigured() {
  return Boolean(readEnv("RESEND_API_KEY") && readEnv("EMAIL_FROM"));
}

export function getAdminRecipients() {
  return readEnv("ADMIN_NOTIFICATION_EMAIL")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#0c0d08;font-family:Arial,Helvetica,sans-serif;color:#f4efe0;">
  <div style="max-width:560px;margin:0 auto;padding:28px 22px;">
    <div style="height:4px;border-radius:2px;background:linear-gradient(90deg,#e23b32 0 33%,#f4c318 33% 66%,#1ba34c 66% 100%);"></div>
    <h1 style="font-size:18px;letter-spacing:0.04em;text-transform:uppercase;color:#fbf7ec;margin:20px 0 4px;">${escapeHtml(BRAND)}</h1>
    <p style="color:#f4c318;font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 18px;">${escapeHtml(title)}</p>
    <div style="font-size:15px;line-height:1.65;color:rgba(244,239,224,0.85);">${bodyHtml}</div>
    <p style="margin-top:28px;font-size:12px;color:rgba(244,239,224,0.5);">${escapeHtml(BRAND)} — grassroots humanitarian work across Africa.</p>
  </div></body></html>`;
}

/** Low-level send. Returns { ok, skipped?, error? }; never throws. */
export async function sendEmail({ to, subject, html, text, replyTo }) {
  const apiKey = readEnv("RESEND_API_KEY");
  const from = readEnv("EMAIL_FROM");
  const recipients = (Array.isArray(to) ? to : [to]).filter(Boolean);

  if (!apiKey || !from || !recipients.length) {
    return { ok: false, skipped: true };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        html,
        text: text || undefined,
        reply_to: replyTo || undefined
      }),
      cache: "no-store",
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Email send failed:", response.status, detail);
      return { ok: false, error: `HTTP ${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    console.error("Email send error:", error?.message || error);
    return { ok: false, error: error?.message || "send-failed" };
  }
}

function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency || "NGN",
      maximumFractionDigits: currency === "USD" ? 2 : 0
    }).format(Number(amount));
  } catch {
    return `${currency} ${amount}`;
  }
}

/** Receipt to the donor after a confirmed payment. */
export async function sendDonationReceipt(payment) {
  if (!payment?.donorEmail) return { ok: false, skipped: true };
  const amount = formatMoney(payment.amount, payment.currency);
  const isMonthly = payment.frequency === "monthly";
  const manageUrl = `${getSiteOrigin()}/donate/manage`;
  const recurringNote = isMonthly
    ? `<p>This is a <strong>recurring monthly gift</strong> of ${amount}. You can cancel anytime at <a href="${manageUrl}" style="color:#f4c318;">${manageUrl}</a> — no account needed.</p>`
    : "";
  const body = `
    <p>Hi ${escapeHtml(payment.donorName || "there")},</p>
    <p>Thank you — your ${isMonthly ? "monthly donation" : "donation"} of <strong style="color:#f4c318;">${amount}</strong> to
    <strong>${escapeHtml(payment.fundTitle)}</strong> has been received and confirmed.</p>
    <table style="margin:16px 0;font-size:14px;">
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Amount</td><td><strong>${amount}${isMonthly ? " / month" : ""}</strong></td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Route</td><td>${escapeHtml(payment.fundTitle)}</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Reference</td><td>${escapeHtml(payment.reference)}</td></tr>
    </table>
    ${recurringNote}
    <p>Your gift stays tied to this route — you can follow its progress on our public transparency tracker. We're grateful for your support.</p>`;
  return sendEmail({
    to: payment.donorEmail,
    subject: `Your ${isMonthly ? "monthly " : ""}donation to ${BRAND} — receipt ${payment.reference}`,
    html: layout("Donation receipt", body),
    text: `Thank you. We received your ${isMonthly ? "monthly " : ""}donation of ${amount} to ${payment.fundTitle}. Reference: ${payment.reference}.${isMonthly ? ` Manage or cancel anytime at ${manageUrl}.` : ""}`
  });
}

/** Internal alert to the team for a confirmed donation. */
export async function notifyTeamOfDonation(payment) {
  const recipients = getAdminRecipients();
  if (!recipients.length) return { ok: false, skipped: true };
  const amount = formatMoney(payment.amount, payment.currency);
  const body = `
    <p>A donation was confirmed.</p>
    <table style="font-size:14px;">
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Amount</td><td><strong>${amount}</strong></td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Route</td><td>${escapeHtml(payment.fundTitle)}</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Donor</td><td>${escapeHtml(payment.donorName)} &lt;${escapeHtml(payment.donorEmail)}&gt;</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Provider</td><td>${escapeHtml(payment.provider)}</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);">Reference</td><td>${escapeHtml(payment.reference)}</td></tr>
    </table>`;
  return sendEmail({
    to: recipients,
    replyTo: payment.donorEmail,
    subject: `New donation: ${amount} — ${payment.fundTitle}`,
    html: layout("New donation", body)
  });
}

/** Confirmation to the donor (and team) when a monthly donation is cancelled. */
export async function sendSubscriptionCanceledEmail(payment) {
  const amount = formatMoney(payment.amount, payment.currency);
  const sends = [];

  if (payment.donorEmail) {
    const body = `
      <p>Hi ${escapeHtml(payment.donorName || "there")},</p>
      <p>Your monthly donation of <strong>${amount}</strong> to
      <strong>${escapeHtml(payment.fundTitle)}</strong> has been cancelled — no further charges will be made.</p>
      <p>Thank you for the support you've already given; it made a real difference. You're welcome back any time.</p>`;
    sends.push(
      sendEmail({
        to: payment.donorEmail,
        subject: `Your monthly donation to ${BRAND} has been cancelled`,
        html: layout("Monthly donation cancelled", body),
        text: `Your monthly donation of ${amount} to ${payment.fundTitle} has been cancelled. No further charges will be made.`
      })
    );
  }

  const recipients = getAdminRecipients();
  if (recipients.length) {
    sends.push(
      sendEmail({
        to: recipients,
        subject: `Monthly donation cancelled — ${payment.fundTitle}`,
        html: layout(
          "Monthly donation cancelled",
          `<p>${escapeHtml(payment.donorName)} &lt;${escapeHtml(payment.donorEmail)}&gt; cancelled their ${amount}/month donation to ${escapeHtml(payment.fundTitle)} (ref ${escapeHtml(payment.reference)}).</p>`
        )
      })
    );
  }

  await Promise.allSettled(sends);
  return { ok: true };
}

/** Optional welcome email when someone subscribes to updates. */
export async function sendNewsletterWelcome(email) {
  if (!email) return { ok: false, skipped: true };
  const body = `
    <p>Thanks for subscribing.</p>
    <p>You'll get occasional updates from ${escapeHtml(BRAND)} — field notes, program progress, and
    clear ways to help. No spam, and you can unsubscribe from any email.</p>`;
  return sendEmail({
    to: email,
    subject: `You're subscribed to ${BRAND} updates`,
    html: layout("Welcome", body),
    text: `Thanks for subscribing to ${BRAND} updates. You can unsubscribe from any email.`
  });
}

/** Internal alert for a new support/donation inquiry or education submission. */
export async function notifyTeam(kind, fields = {}, replyTo) {
  const recipients = getAdminRecipients();
  if (!recipients.length) return { ok: false, skipped: true };
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:3px 14px 3px 0;color:rgba(244,239,224,0.6);text-transform:capitalize;">${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return sendEmail({
    to: recipients,
    replyTo: replyTo || undefined,
    subject: `New ${kind}`,
    html: layout(`New ${kind}`, `<table style="font-size:14px;">${rows}</table>`)
  });
}
