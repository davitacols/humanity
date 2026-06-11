import { NextResponse } from "next/server";

import {
  createDonationPaymentAttempt,
  updateDonationPaymentCheckout,
  validateDonationCheckout
} from "../../../lib/donation-payments";
import { getDonationFundBySlug } from "../../../lib/donation-content";
import {
  createFlutterwaveCheckout,
  createPayPalOrder,
  createPayPalSubscription,
  getPaymentProviderAvailability
} from "../../../lib/payment-providers";

function buildDonateUrl(origin, params = {}, hash = "") {
  const url = new URL("/donate", origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  if (hash) {
    url.hash = hash;
  }

  return url;
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const fundSlug = searchParams.get("fund");
  const provider = searchParams.get("provider");

  if (!fundSlug) {
    return NextResponse.redirect(buildDonateUrl(origin, {}, "giving-routes"));
  }

  const fund = await getDonationFundBySlug(fundSlug);

  if (!fund) {
    return NextResponse.redirect(
      buildDonateUrl(
        origin,
        {
          payment: "failed",
          reason: "route-not-found"
        },
        "live-checkout"
      )
    );
  }

  if (provider) {
    return NextResponse.redirect(
      buildDonateUrl(
        origin,
        {
          fund: fundSlug,
          provider
        },
        "live-checkout"
      )
    );
  }

  if (fund.paymentUrl) {
    return NextResponse.redirect(new URL(fund.paymentUrl));
  }

  return NextResponse.redirect(
    buildDonateUrl(
      origin,
      {
        fund: fundSlug,
        payment: "unavailable"
      },
      "live-checkout"
    )
  );
}

export async function POST(request) {
  const { origin } = new URL(request.url);
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that payment request. Please try again." },
      { status: 400 }
    );
  }

  const validation = validateDonationCheckout(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Please review the highlighted payment fields and try again.",
        fieldErrors: validation.fieldErrors
      },
      { status: 400 }
    );
  }

  const fund = await getDonationFundBySlug(validation.data.fundSlug);

  if (!fund) {
    return NextResponse.json(
      { error: "That giving route could not be found." },
      { status: 404 }
    );
  }

  const availability = getPaymentProviderAvailability();

  if (!availability[validation.data.provider]?.configured) {
    return NextResponse.json(
      {
        error: `${availability[validation.data.provider]?.label || "This provider"} is not configured yet.`
      },
      { status: 400 }
    );
  }

  const { provider, donorName, donorEmail, amount, currency, frequency } = validation.data;

  try {
    const payment = await createDonationPaymentAttempt({
      fund,
      provider,
      donorName,
      donorEmail,
      amount,
      currency,
      frequency
    });

    const checkoutArgs = {
      reference: payment.reference,
      fund,
      donorName,
      donorEmail,
      amount,
      siteOrigin: origin
    };

    let checkout;
    if (provider === "flutterwave") {
      checkout = await createFlutterwaveCheckout({ ...checkoutArgs, frequency });
    } else if (frequency === "monthly") {
      checkout = await createPayPalSubscription(checkoutArgs);
    } else {
      checkout = await createPayPalOrder(checkoutArgs);
    }

    await updateDonationPaymentCheckout(payment.reference, {
      providerPaymentId: checkout.providerPaymentId,
      providerSubscriptionId: checkout.providerSubscriptionId,
      checkoutUrl: checkout.redirectUrl,
      rawPayload: checkout.payload
    });

    return NextResponse.json({
      ok: true,
      provider,
      frequency,
      reference: payment.reference,
      redirectUrl: checkout.redirectUrl
    });
  } catch (error) {
    console.error("Failed to create donation checkout:", error);

    return NextResponse.json(
      {
        error:
          "The payment session could not be created right now. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}
