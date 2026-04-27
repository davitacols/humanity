"use client";

import { useEffect, useMemo, useState } from "react";

const PROVIDER_ORDER = ["flutterwave", "paypal"];

const PROVIDER_CONTENT = {
  flutterwave: {
    label: "Flutterwave",
    currency: "NGN",
    amountLabel: "Amount in naira",
    helper: "Best for local NGN donations, transfers, cards, and regional payment methods.",
    presets: [10000, 25000, 50000, 100000]
  },
  paypal: {
    label: "PayPal",
    currency: "USD",
    amountLabel: "Amount in dollars",
    helper: "Best for international and diaspora donors paying in USD through PayPal.",
    presets: [10, 25, 50, 100]
  }
};

const UNAVAILABLE_COPY = {
  title: "Use donor follow-up for this gift.",
  body:
    "Direct card and wallet checkout is not active on this page right now. The donor follow-up form below still lets you choose a route, request payment guidance, or start a sponsorship conversation.",
  action: "Use donor follow-up"
};

function pickInitialProvider(providers, preferredProvider) {
  if (preferredProvider && providers[preferredProvider]?.configured) {
    return preferredProvider;
  }

  return PROVIDER_ORDER.find((provider) => providers[provider]?.configured) || "flutterwave";
}

function createInitialState({ funds, providers, initialFundSlug, initialProvider }) {
  const provider = pickInitialProvider(providers, initialProvider);
  const preset = PROVIDER_CONTENT[provider]?.presets?.[1] ?? "";

  return {
    fundSlug: initialFundSlug || funds[0]?.slug || "",
    provider,
    donorName: "",
    donorEmail: "",
    amount: String(preset),
    currency: PROVIDER_CONTENT[provider]?.currency || "NGN"
  };
}

export function DonationCheckoutForm({
  funds,
  providers,
  initialFundSlug,
  initialProvider
}) {
  const configuredProviders = useMemo(
    () => PROVIDER_ORDER.filter((provider) => providers[provider]?.configured),
    [providers]
  );
  const [formData, setFormData] = useState(() =>
    createInitialState({ funds, providers, initialFundSlug, initialProvider })
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(createInitialState({ funds, providers, initialFundSlug, initialProvider }));
    setFieldErrors({});
    setStatus(null);
  }, [funds, providers, initialFundSlug, initialProvider]);

  function updateField(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function selectProvider(provider) {
    updateField("provider", provider);
    updateField("currency", PROVIDER_CONTENT[provider].currency);
    updateField("amount", String(PROVIDER_CONTENT[provider].presets[1]));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!configuredProviders.length) {
      setStatus({
        tone: "error",
        message: "Direct checkout is not active right now. Use the donor follow-up form below."
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/donation-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fundSlug: formData.fundSlug,
          provider: formData.provider,
          donorName: formData.donorName,
          donorEmail: formData.donorEmail,
          amount: formData.amount,
          currency: formData.currency
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setStatus({
          tone: "error",
          message: result.error || "The payment session could not be created."
        });
        return;
      }

      setStatus({
        tone: "success",
        message: "Redirecting you to secure checkout..."
      });
      window.location.assign(result.redirectUrl);
    } catch {
      setStatus({
        tone: "error",
        message: "The payment service could not be reached. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const activeProvider = PROVIDER_CONTENT[formData.provider];

  if (!configuredProviders.length) {
    return (
      <section className="donation-checkout-form donation-checkout-form--unavailable" aria-labelledby="checkout-unavailable-title">
        <div className="submission-form__header">
          <p className="section-kicker">Direct checkout</p>
          <h2 id="checkout-unavailable-title" className="submission-form__title">
            {UNAVAILABLE_COPY.title}
          </h2>
          <p className="submission-form__body">{UNAVAILABLE_COPY.body}</p>
        </div>

        <div className="support-form__notice donation-checkout-form__notice">
          <p className="support-form__notice-title">Current giving path</p>
          <p className="support-form__notice-body">
            Send the donor request and the team can reply with the right route, amount,
            and payment instructions for the program you want to support.
          </p>
        </div>

        <a href="#donation-intake" className="button button--primary">
          {UNAVAILABLE_COPY.action}
        </a>
      </section>
    );
  }

  return (
    <form className="submission-form donation-checkout-form" onSubmit={handleSubmit} noValidate>
      <div className="submission-form__header">
        <p className="section-kicker">Live checkout</p>
        <h2 className="submission-form__title">Choose a giving route and continue to secure checkout.</h2>
        <p className="submission-form__body">
          Payments are tied to the route you select, so follow-up and public tracking stay connected
          to the program being supported.
        </p>
      </div>

      <div className="support-form__notice donation-checkout-form__notice">
        <p className="support-form__notice-title">Secure payment handoff</p>
        <p className="support-form__notice-body">
          Select the route, enter donor details, and you will be redirected to the provider's hosted checkout.
        </p>
      </div>

      {status ? (
        <div
          className={`submission-status submission-status--${status.tone}`}
          role={status.tone === "error" ? "alert" : "status"}
        >
          {status.message}
        </div>
      ) : null}

      <div className="submission-form__grid">
        <div className="field field--full">
          <span className="field__label">Payment provider</span>
          <div className="donation-checkout-form__providers">
            {PROVIDER_ORDER.map((provider) => {
              const providerConfig = providers[provider];
              const isActive = formData.provider === provider;
              const isAvailable = providerConfig?.configured;

              return (
                <button
                  key={provider}
                  type="button"
                  className={[
                    "donation-checkout-form__provider",
                    isActive ? "is-active" : "",
                    !isAvailable ? "is-disabled" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => isAvailable && selectProvider(provider)}
                  disabled={!isAvailable}
                >
                  <strong>{providerConfig?.label || PROVIDER_CONTENT[provider].label}</strong>
                  <span>{providerConfig?.configured ? PROVIDER_CONTENT[provider].helper : providerConfig?.note}</span>
                </button>
              );
            })}
          </div>
          {fieldErrors.provider ? <p className="field__error">{fieldErrors.provider}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="donation-fundSlug">
            Giving route
          </label>
          <select
            id="donation-fundSlug"
            className={`field__input${fieldErrors.fundSlug ? " has-error" : ""}`}
            value={formData.fundSlug}
            onChange={(event) => updateField("fundSlug", event.target.value)}
          >
            {funds.map((fund) => (
              <option key={fund.slug} value={fund.slug}>
                {fund.title}
              </option>
            ))}
          </select>
          {fieldErrors.fundSlug ? <p className="field__error">{fieldErrors.fundSlug}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="donation-currency">
            Currency
          </label>
          <input id="donation-currency" className="field__input" value={formData.currency} readOnly />
          {fieldErrors.currency ? <p className="field__error">{fieldErrors.currency}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="donation-donorName">
            Full name
          </label>
          <input
            id="donation-donorName"
            className={`field__input${fieldErrors.donorName ? " has-error" : ""}`}
            value={formData.donorName}
            onChange={(event) => updateField("donorName", event.target.value)}
            autoComplete="name"
          />
          {fieldErrors.donorName ? <p className="field__error">{fieldErrors.donorName}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="donation-donorEmail">
            Email address
          </label>
          <input
            id="donation-donorEmail"
            type="email"
            className={`field__input${fieldErrors.donorEmail ? " has-error" : ""}`}
            value={formData.donorEmail}
            onChange={(event) => updateField("donorEmail", event.target.value)}
            autoComplete="email"
          />
          {fieldErrors.donorEmail ? <p className="field__error">{fieldErrors.donorEmail}</p> : null}
        </div>

        <div className="field field--full">
          <label className="field__label" htmlFor="donation-amount">
            {activeProvider.amountLabel}
          </label>
          <div className="donation-checkout-form__amount-row">
            <input
              id="donation-amount"
              type="number"
              min="1"
              step={formData.provider === "paypal" ? "0.01" : "1"}
              className={`field__input${fieldErrors.amount ? " has-error" : ""}`}
              value={formData.amount}
              onChange={(event) => updateField("amount", event.target.value)}
            />
            <div className="donation-checkout-form__presets">
              {activeProvider.presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="button button--ghost"
                  onClick={() => updateField("amount", String(preset))}
                >
                  <span className="button__label">
                    {activeProvider.currency} {preset.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {fieldErrors.amount ? (
            <p className="field__error">{fieldErrors.amount}</p>
          ) : (
            <p className="field__hint">{activeProvider.helper}</p>
          )}
        </div>
      </div>

      <div className="submission-form__footer">
        <p className="submission-form__footnote">
          The provider handles card or wallet entry on their secure checkout page. This form
          only creates the payment session tied to your selected giving route.
        </p>
        <button
          type="submit"
          className={`button button--primary${isSubmitting ? " is-loading" : ""}`}
          aria-busy={isSubmitting}
          disabled={isSubmitting || !configuredProviders.length}
        >
          <span className="button__label">
            {isSubmitting ? "Preparing checkout" : `Continue with ${activeProvider.label}`}
          </span>
          <span className="button__spinner" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
