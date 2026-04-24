import { NextResponse } from "next/server";

import {
  getDonationPaymentByReference,
  markDonationPaymentSucceeded
} from "../../../../../lib/donation-payments";
import { verifyPayPalWebhook } from "../../../../../lib/payment-providers";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const valid = await verifyPayPalWebhook(request.headers, payload);

    if (!valid) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  } catch (error) {
    console.error("PayPal webhook signature verification failed:", error);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const reference =
    payload?.resource?.custom_id ||
    payload?.resource?.purchase_units?.[0]?.custom_id ||
    "";

  if (payload?.event_type === "PAYMENT.CAPTURE.COMPLETED" && reference) {
    const payment = await getDonationPaymentByReference(reference);

    if (payment) {
      await markDonationPaymentSucceeded(reference, {
        providerPaymentId: payload?.resource?.supplementary_data?.related_ids?.order_id || "",
        rawPayload: payload
      });
    }
  }

  return NextResponse.json({ ok: true });
}
