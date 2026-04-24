import { NextResponse } from "next/server";

import {
  getDonationPaymentByReference,
  markDonationPaymentCanceled
} from "../../../../../lib/donation-payments";

function buildDonateRedirect(origin, params = {}) {
  const url = new URL("/donate", origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  url.hash = "live-checkout";
  return url;
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const reference = searchParams.get("reference");
  const fundSlug = searchParams.get("fund") || "";

  if (reference) {
    await markDonationPaymentCanceled(reference, {
      rawPayload: Object.fromEntries(searchParams.entries())
    });
  }

  const payment = await getDonationPaymentByReference(reference);

  return NextResponse.redirect(
    buildDonateRedirect(origin, {
      fund: payment?.fundSlug || fundSlug,
      payment: "canceled",
      provider: "paypal",
      reference
    })
  );
}
