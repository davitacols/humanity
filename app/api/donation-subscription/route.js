import { NextResponse } from "next/server";

import {
  getActiveSubscriptionByReference,
  markSubscriptionCanceled
} from "../../../lib/donation-payments";
import {
  cancelFlutterwavePaymentPlan,
  cancelPayPalSubscription
} from "../../../lib/payment-providers";
import { sendSubscriptionCanceledEmail } from "../../../lib/email";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that request. Please try again." },
      { status: 400 }
    );
  }

  const reference = typeof payload?.reference === "string" ? payload.reference.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";

  if (!reference || !email) {
    return NextResponse.json(
      { error: "Enter the reference from your receipt and the email you donated with." },
      { status: 400 }
    );
  }

  let subscription;
  try {
    subscription = await getActiveSubscriptionByReference(reference, email);
  } catch (error) {
    console.error("Subscription lookup failed:", error);
    return NextResponse.json(
      { error: "We couldn't look that up right now. Please try again in a moment." },
      { status: 500 }
    );
  }

  if (!subscription) {
    return NextResponse.json(
      {
        error:
          "No active monthly donation matched those details. Double-check the reference and email on your receipt."
      },
      { status: 404 }
    );
  }

  if (subscription.subscriptionCanceledAt) {
    return NextResponse.json({
      ok: true,
      message: "That monthly donation is already cancelled — no further charges will be made."
    });
  }

  try {
    if (subscription.provider === "flutterwave") {
      await cancelFlutterwavePaymentPlan(subscription.providerSubscriptionId);
    } else {
      await cancelPayPalSubscription(subscription.providerSubscriptionId);
    }

    await markSubscriptionCanceled(subscription.provider, subscription.providerSubscriptionId);
    await sendSubscriptionCanceledEmail(subscription);

    return NextResponse.json({
      ok: true,
      message:
        "Your monthly donation has been cancelled. No further charges will be made, and a confirmation is on its way to your email."
    });
  } catch (error) {
    console.error("Subscription cancellation failed:", error);
    return NextResponse.json(
      {
        error:
          "We couldn't cancel that automatically. Please email us and the team will stop it for you."
      },
      { status: 500 }
    );
  }
}
