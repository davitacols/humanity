import test from "node:test";
import assert from "node:assert/strict";

import { validateDonationCheckout } from "../lib/donation-validation.mjs";

const valid = {
  fundSlug: "maternal-child-health",
  provider: "flutterwave",
  donorName: "Ada Lovelace",
  donorEmail: "ada@example.com",
  amount: "25000",
  currency: "NGN"
};

test("accepts a valid Flutterwave donation", () => {
  const result = validateDonationCheckout(valid);
  assert.equal(result.ok, true);
  assert.deepEqual(result.fieldErrors, {});
  assert.equal(result.data.amount, 25000);
  assert.equal(result.data.currency, "NGN");
});

test("accepts a valid PayPal donation in USD", () => {
  const result = validateDonationCheckout({ ...valid, provider: "paypal", amount: "25.5", currency: "USD" });
  assert.equal(result.ok, true);
  assert.equal(result.data.amount, 25.5);
});

test("rounds Flutterwave amounts to whole naira", () => {
  const result = validateDonationCheckout({ ...valid, amount: "25000.7" });
  assert.equal(result.data.amount, 25001);
});

test("rejects a missing fund route", () => {
  const result = validateDonationCheckout({ ...valid, fundSlug: "" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.fundSlug);
});

test("rejects an unknown provider", () => {
  const result = validateDonationCheckout({ ...valid, provider: "bitcoin" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.provider);
});

test("rejects an invalid email", () => {
  const result = validateDonationCheckout({ ...valid, donorEmail: "not-an-email" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.donorEmail);
});

test("enforces the Flutterwave minimum amount", () => {
  const result = validateDonationCheckout({ ...valid, amount: "500" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.amount);
});

test("enforces the PayPal minimum amount", () => {
  const result = validateDonationCheckout({ ...valid, provider: "paypal", amount: "0.5", currency: "USD" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.amount);
});

test("rejects a provider/currency mismatch", () => {
  const result = validateDonationCheckout({ ...valid, currency: "USD" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.currency);
});

test("rejects zero or negative amounts", () => {
  const result = validateDonationCheckout({ ...valid, amount: "-100" });
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.amount);
});

test("rejects an empty payload with multiple field errors", () => {
  const result = validateDonationCheckout({});
  assert.equal(result.ok, false);
  assert.ok(Object.keys(result.fieldErrors).length >= 3);
});

test("defaults frequency to one-time", () => {
  const result = validateDonationCheckout(valid);
  assert.equal(result.ok, true);
  assert.equal(result.data.frequency, "one-time");
});

test("accepts a monthly (recurring) donation", () => {
  const result = validateDonationCheckout({ ...valid, frequency: "monthly" });
  assert.equal(result.ok, true);
  assert.equal(result.data.frequency, "monthly");
});

test("falls back to one-time for an unknown frequency", () => {
  const result = validateDonationCheckout({ ...valid, frequency: "weekly" });
  assert.equal(result.data.frequency, "one-time");
});
