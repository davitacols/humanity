import { NextResponse } from "next/server";

import {
  getDonationPaymentByProviderPaymentId,
  getDonationPaymentByReference,
  markDonationPaymentFailed,
  markDonationPaymentSucceeded
} from "../../../../../lib/donation-payments";
import { capturePayPalOrder, getPayPalSubscription } from "../../../../../lib/payment-providers";
import { notifyTeamOfDonation, sendDonationReceipt } from "../../../../../lib/email";

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

async function handlePayPalSubscriptionReturn({ origin, subscriptionId, reference, fundSlug }) {
  const payment =
    (await getDonationPaymentByReference(reference)) ||
    (await getDonationPaymentByProviderPaymentId("paypal", subscriptionId));

  if (!payment) {
    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: fundSlug,
        payment: "failed",
        provider: "paypal",
        reason: "payment-not-found"
      })
    );
  }

  try {
    const subscription = await getPayPalSubscription(subscriptionId);
    const status = subscription?.status;
    const referenceMatches = !subscription?.custom_id || subscription.custom_id === payment.reference;

    if ((status === "ACTIVE" || status === "APPROVED") && referenceMatches) {
      const confirmed = await markDonationPaymentSucceeded(payment.reference, {
        providerPaymentId: subscriptionId,
        rawPayload: subscription
      });

      if (confirmed) {
        await Promise.allSettled([sendDonationReceipt(confirmed), notifyTeamOfDonation(confirmed)]);
      }

      return NextResponse.redirect(
        buildDonateRedirect(origin, {
          fund: payment.fundSlug,
          payment: "success",
          provider: "paypal",
          reference: payment.reference
        })
      );
    }

    await markDonationPaymentFailed(payment.reference, {
      providerPaymentId: subscriptionId,
      rawPayload: subscription
    });
  } catch (error) {
    console.error("PayPal subscription return verification failed:", error);
    await markDonationPaymentFailed(payment.reference, {
      rawPayload: { error: error?.message || "Subscription verification failed." }
    });
  }

  return NextResponse.redirect(
    buildDonateRedirect(origin, {
      fund: payment.fundSlug,
      payment: "failed",
      provider: "paypal",
      reference: payment.reference
    })
  );
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const orderId = searchParams.get("token");
  const reference = searchParams.get("reference");
  const fundSlug = searchParams.get("fund") || "";
  const subscriptionId = searchParams.get("subscription_id");

  // Recurring donations approve a subscription (not an order to capture).
  if (subscriptionId) {
    return handlePayPalSubscriptionReturn({ origin, subscriptionId, reference, fundSlug });
  }

  const payment =
    (await getDonationPaymentByProviderPaymentId("paypal", orderId)) ||
    (await getDonationPaymentByReference(reference));

  if (!payment || !orderId) {
    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: fundSlug,
        payment: "failed",
        provider: "paypal",
        reason: "payment-not-found"
      })
    );
  }

  try {
    const capture = await capturePayPalOrder(orderId);
    const captureStatus = capture?.status;
    const purchaseUnit = capture?.purchase_units?.[0];
    const capturedAmount = purchaseUnit?.payments?.captures?.[0]?.amount;
    const referenceMatches =
      purchaseUnit?.custom_id === payment.reference ||
      purchaseUnit?.payments?.captures?.[0]?.custom_id === payment.reference;
    const amountMatches = Number(capturedAmount?.value) === Number(payment.amount);
    const currencyMatches = capturedAmount?.currency_code === payment.currency;

    if (captureStatus === "COMPLETED" && amountMatches && currencyMatches && referenceMatches) {
      const confirmed = await markDonationPaymentSucceeded(payment.reference, {
        providerPaymentId: orderId,
        rawPayload: capture
      });

      if (confirmed) {
        await Promise.allSettled([sendDonationReceipt(confirmed), notifyTeamOfDonation(confirmed)]);
      }

      return NextResponse.redirect(
        buildDonateRedirect(origin, {
          fund: payment.fundSlug,
          payment: "success",
          provider: "paypal",
          reference: payment.reference
        })
      );
    }

    await markDonationPaymentFailed(payment.reference, {
      providerPaymentId: orderId,
      rawPayload: capture
    });
  } catch (error) {
    console.error("PayPal return capture failed:", error);
    await markDonationPaymentFailed(payment.reference, {
      providerPaymentId: orderId,
      rawPayload: {
        error: error?.message || "Capture failed."
      }
    });
  }

  return NextResponse.redirect(
    buildDonateRedirect(origin, {
      fund: payment.fundSlug,
      payment: "failed",
      provider: "paypal",
      reference: payment.reference
    })
  );
}
