import { NextResponse } from "next/server";

import {
  getDonationPaymentByReference,
  markDonationPaymentCanceled,
  markDonationPaymentFailed,
  markDonationPaymentSucceeded
} from "../../../../../lib/donation-payments";
import { verifyFlutterwaveTransaction } from "../../../../../lib/payment-providers";
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

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const reference = searchParams.get("tx_ref") || searchParams.get("reference");
  const status = (searchParams.get("status") || "").toLowerCase();
  const transactionId = searchParams.get("transaction_id");
  const fundSlug = searchParams.get("fund") || "";

  if (!reference) {
    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: fundSlug,
        payment: "failed",
        provider: "flutterwave",
        reason: "missing-reference"
      })
    );
  }

  const payment = await getDonationPaymentByReference(reference);

  if (!payment) {
    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: fundSlug,
        payment: "failed",
        provider: "flutterwave",
        reason: "payment-not-found"
      })
    );
  }

  if (status === "cancelled" || status === "canceled") {
    await markDonationPaymentCanceled(reference, {
      rawPayload: Object.fromEntries(searchParams.entries())
    });

    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: payment.fundSlug,
        payment: "canceled",
        provider: "flutterwave",
        reference
      })
    );
  }

  if (!transactionId) {
    await markDonationPaymentFailed(reference, {
      rawPayload: Object.fromEntries(searchParams.entries())
    });

    return NextResponse.redirect(
      buildDonateRedirect(origin, {
        fund: payment.fundSlug,
        payment: "failed",
        provider: "flutterwave",
        reference
      })
    );
  }

  try {
    const verification = await verifyFlutterwaveTransaction(transactionId);
    const verified = verification?.data;
    const amountMatches = Number(verified?.amount) === Number(payment.amount);
    const currencyMatches = verified?.currency === payment.currency;
    const referenceMatches = verified?.tx_ref === reference;
    const statusMatches = verified?.status === "successful";

    if (amountMatches && currencyMatches && referenceMatches && statusMatches) {
      const confirmed = await markDonationPaymentSucceeded(reference, {
        providerPaymentId: String(verified.id),
        rawPayload: verification
      });

      if (confirmed) {
        await Promise.allSettled([sendDonationReceipt(confirmed), notifyTeamOfDonation(confirmed)]);
      }

      return NextResponse.redirect(
        buildDonateRedirect(origin, {
          fund: payment.fundSlug,
          payment: "success",
          provider: "flutterwave",
          reference
        })
      );
    }

    await markDonationPaymentFailed(reference, {
      providerPaymentId: verified?.id ? String(verified.id) : "",
      rawPayload: verification
    });
  } catch (error) {
    console.error("Flutterwave callback verification failed:", error);
    await markDonationPaymentFailed(reference, {
      rawPayload: {
        error: error?.message || "Verification failed."
      }
    });
  }

  return NextResponse.redirect(
    buildDonateRedirect(origin, {
      fund: payment.fundSlug,
      payment: "failed",
      provider: "flutterwave",
      reference
    })
  );
}
