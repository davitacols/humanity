import "server-only";

import { donationFunds, transparencyEntries } from "../components/siteData";
import { getSql } from "./db";

function normalizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function toEnvKey(slug) {
  return slug.replace(/[^a-z0-9]+/gi, "_").toUpperCase();
}

function resolvePaymentUrl(slug, configuredUrl) {
  const directUrl = typeof configuredUrl === "string" ? configuredUrl.trim() : "";
  if (directUrl) {
    return directUrl;
  }

  const envKey = toEnvKey(slug);

  return (
    process.env[`DONATE_${envKey}_URL`] ||
    process.env[`NEXT_PUBLIC_DONATE_${envKey}_URL`] ||
    process.env.DONATE_GENERAL_URL ||
    process.env.NEXT_PUBLIC_DONATE_GENERAL_URL ||
    ""
  );
}

function formatFundRecord(record) {
  return {
    slug: record.slug,
    eyebrow: record.eyebrow,
    title: record.title,
    supportArea: record.support_area,
    summary: record.summary,
    amountLabel: record.amount_label,
    targetAmount: normalizeNumber(record.target_amount_ngn),
    raisedAmount: normalizeNumber(record.raised_amount_ngn),
    beneficiariesLabel: record.beneficiaries_label,
    statusLabel: record.status_label,
    href: record.href,
    hrefLabel: record.href_label,
    paymentUrl: resolvePaymentUrl(record.slug, record.payment_url)
  };
}

function formatTransparencyRecord(record) {
  return {
    periodLabel: record.period_label,
    title: record.title,
    summary: record.summary,
    amountLabel: record.amount_label,
    allocationLabel: record.allocation_label,
    statusLabel: record.status_label,
    href: record.href,
    ctaLabel: record.cta_label
  };
}

function compactNaira(value) {
  return new Intl.NumberFormat("en-NG", {
    notation: "compact",
    maximumFractionDigits: value >= 1000000 ? 1 : 0
  }).format(value);
}

function buildMetrics(funds, trackerEntries) {
  const totalGoal = funds.reduce((sum, fund) => sum + normalizeNumber(fund.targetAmount), 0);
  const totalRaised = funds.reduce((sum, fund) => sum + normalizeNumber(fund.raisedAmount), 0);

  return [
    { value: String(funds.length), label: "active giving routes" },
    { value: `NGN ${compactNaira(totalRaised)}`, label: "documented support in tracker" },
    { value: `NGN ${compactNaira(totalGoal)}`, label: "current published goals" },
    { value: String(trackerEntries.length), label: "published transparency updates" }
  ];
}

const fallbackFunds = donationFunds.map((fund) => ({
  ...fund,
  paymentUrl: resolvePaymentUrl(fund.slug, fund.paymentUrl)
}));

const fallbackEntries = transparencyEntries.map((entry) => ({ ...entry }));

export async function getDonationContentData() {
  const sql = getSql();

  if (!sql) {
    return {
      funds: fallbackFunds,
      transparencyEntries: fallbackEntries,
      metrics: buildMetrics(fallbackFunds, fallbackEntries),
      hasDirectPayments: fallbackFunds.some((fund) => Boolean(fund.paymentUrl))
    };
  }

  try {
    const [fundRows, trackerRows] = await Promise.all([
      sql`select * from donation_funds order by display_order asc, id asc`,
      sql`select * from transparency_entries order by display_order asc, id asc`
    ]);

    const funds = fundRows.map(formatFundRecord);
    const entries = trackerRows.map(formatTransparencyRecord);

    return {
      funds,
      transparencyEntries: entries,
      metrics: buildMetrics(funds, entries),
      hasDirectPayments: funds.some((fund) => Boolean(fund.paymentUrl))
    };
  } catch (error) {
    if (error?.code !== "42P01") {
      console.error("Failed to load donation content from Neon:", error);
    }

    return {
      funds: fallbackFunds,
      transparencyEntries: fallbackEntries,
      metrics: buildMetrics(fallbackFunds, fallbackEntries),
      hasDirectPayments: fallbackFunds.some((fund) => Boolean(fund.paymentUrl))
    };
  }
}

export async function getDonationFundBySlug(slug) {
  if (!slug) {
    return null;
  }

  const { funds } = await getDonationContentData();
  return funds.find((fund) => fund.slug === slug) || null;
}
