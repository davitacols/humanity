import { NextResponse } from "next/server";

import {
  getDonationPaymentByProviderPaymentId,
  getDonationPaymentByReference,
  markDonationPaymentFailed,
  markDonationPaymentSucceeded
} from "../../../../../lib/donation-payments";
import { capturePayPalOrder } from "../../../../../lib/payment-providers";

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
  const orderId = searchParams.get("token");
  const reference = searchParams.get("reference");
  const fundSlug = searchParams.get("fund") || "";

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
      await markDonationPaymentSucceeded(payment.reference, {
        providerPaymentId: orderId,
        rawPayload: capture
      });

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
