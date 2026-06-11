import { NextResponse } from "next/server";

import {
  getDonationPaymentByReference,
  markDonationPaymentFailed,
  markDonationPaymentSucceeded,
  recordDonationRenewal
} from "../../../../../lib/donation-payments";
import {
  isFlutterwaveWebhookValid,
  verifyFlutterwaveTransaction
} from "../../../../../lib/payment-providers";
import { notifyTeamOfDonation, sendDonationReceipt } from "../../../../../lib/email";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isFlutterwaveWebhookValid(request.headers)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const transactionId = payload?.data?.id;
  const reference = payload?.data?.tx_ref;

  if (!transactionId || !reference) {
    return NextResponse.json({ ok: true });
  }

  const payment = await getDonationPaymentByReference(reference);

  if (!payment) {
    // No matching first-charge reference — this may be a recurring renewal,
    // which Flutterwave bills under a new tx_ref tied to the payment plan.
    const planId = payload?.data?.payment_plan ? String(payload.data.payment_plan) : "";
    const eventStatus = String(payload?.data?.status || "").toLowerCase();

    if (planId && eventStatus === "successful") {
      try {
        const verification = await verifyFlutterwaveTransaction(transactionId);
        const verified = verification?.data;

        if (verified?.status === "successful") {
          const renewal = await recordDonationRenewal({
            provider: "flutterwave",
            subscriptionId: planId,
            providerPaymentId: String(verified.id),
            amount: Number(verified.amount),
            currency: verified.currency,
            rawPayload: verification
          });

          if (renewal) {
            await Promise.allSettled([sendDonationReceipt(renewal), notifyTeamOfDonation(renewal)]);
          }
        }
      } catch (error) {
        console.error("Flutterwave renewal handling failed:", error);
      }
    }

    return NextResponse.json({ ok: true });
  }

  try {
    const verification = await verifyFlutterwaveTransaction(transactionId);
    const verified = verification?.data;

    if (
      verified?.status === "successful" &&
      verified?.tx_ref === reference &&
      Number(verified?.amount) === Number(payment.amount) &&
      verified?.currency === payment.currency
    ) {
      await markDonationPaymentSucceeded(reference, {
        providerPaymentId: String(verified.id),
        rawPayload: verification
      });
    } else {
      await markDonationPaymentFailed(reference, {
        providerPaymentId: verified?.id ? String(verified.id) : "",
        rawPayload: verification
      });
    }
  } catch (error) {
    console.error("Flutterwave webhook verification failed:", error);
  }

  return NextResponse.json({ ok: true });
}
