"use client";

import { useEffect, useState } from "react";
import {
  donationCadences,
  donationTiers,
  supportAvailabilityOptions,
  supportInquiryAreas,
  supportInquiryRoutes
} from "./siteData";

const donationAmountOptions = [...donationTiers, "Custom amount or partner budget"];
const involvementRouteOptions = supportInquiryRoutes.filter((item) => item.value !== "donor");

function createInitialForm(variant, initialValues = {}) {
  const isDonation = variant === "donation";
  const baseForm = {
    sourcePage: isDonation ? "donate" : "get-involved",
    routeType: isDonation ? "donor" : involvementRouteOptions[0].value,
    contactName: "",
    email: "",
    organization: "",
    country: "",
    supportArea: supportInquiryAreas[0],
    amount: isDonation ? donationAmountOptions[1] : "",
    cadence: isDonation ? donationCadences[0] : "",
    availability: isDonation ? "" : supportAvailabilityOptions[0],
    message: "",
    consentToContact: true,
    wantsUpdates: isDonation,
    website: ""
  };

  return {
    ...baseForm,
    ...initialValues,
    sourcePage: baseForm.sourcePage,
    routeType: isDonation ? "donor" : initialValues.routeType || baseForm.routeType,
    supportArea: initialValues.supportArea || baseForm.supportArea,
    amount: isDonation ? initialValues.amount || baseForm.amount : "",
    cadence: isDonation ? initialValues.cadence || baseForm.cadence : "",
    availability: isDonation ? "" : initialValues.availability || baseForm.availability,
    consentToContact:
      typeof initialValues.consentToContact === "boolean"
        ? initialValues.consentToContact
        : baseForm.consentToContact,
    wantsUpdates:
      typeof initialValues.wantsUpdates === "boolean"
        ? initialValues.wantsUpdates
        : baseForm.wantsUpdates,
    website: ""
  };
}

export function SupportInquiryForm({ variant = "involvement", initialValues }) {
  const isDonation = variant === "donation";
  const initialValuesKey = JSON.stringify(initialValues || {});
  const [formData, setFormData] = useState(() => createInitialForm(variant, initialValues));
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(createInitialForm(variant, initialValues));
    setFieldErrors({});
    setStatus(null);
  }, [initialValuesKey, variant]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/support-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setStatus({
          tone: "error",
          message: result.error || "Something went wrong while sending the form."
        });
        return;
      }

      const reference = result.submission?.reference;
      setFormData(createInitialForm(variant, initialValues));
      setStatus({
        tone: "success",
        message: reference
          ? `${result.message} Reference: ${reference}.`
          : result.message || "Thanks. Your request has been received."
      });
    } catch {
      setStatus({
        tone: "error",
        message: "The form could not reach the server. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="submission-form support-form" onSubmit={handleSubmit} noValidate>
      <div className="submission-form__header">
        <p className="section-kicker">{isDonation ? "Donation intake" : "Support intake"}</p>
        <h2 className="submission-form__title">
          {isDonation ? "Log a giving request and get a clear follow-up." : "Tell the team how you want to help."}
        </h2>
        <p className="submission-form__body">
          {isDonation
            ? "Use this path for sponsorship, custom giving conversations, partner support, or any donation route that still needs a guided follow-up."
            : "Use one form for volunteering, partnership, sponsorship, creative contribution, or specialist support so the right team can follow up quickly."}
        </p>
      </div>

      <div className="support-form__notice">
        <p className="support-form__notice-title">
          {isDonation ? "Current donation setup" : "Current support setup"}
        </p>
        <p className="support-form__notice-body">
          {isDonation
            ? "Live checkout is available above for direct payment. This form is for custom amounts, sponsorship, partnership budgets, or donor conversations that need a person-to-person next step."
            : "Submit your preferred route, focus area, and availability. The team will follow up by email with the most relevant next step."}
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
        <div className="field">
          <label className="field__label" htmlFor={`${variant}-contactName`}>
            Full name
          </label>
          <input
            id={`${variant}-contactName`}
            className={`field__input${fieldErrors.contactName ? " has-error" : ""}`}
            name="contactName"
            value={formData.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            autoComplete="name"
          />
          {fieldErrors.contactName ? (
            <p className="field__error">{fieldErrors.contactName}</p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor={`${variant}-email`}>
            Email address
          </label>
          <input
            id={`${variant}-email`}
            className={`field__input${fieldErrors.email ? " has-error" : ""}`}
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
          />
          {fieldErrors.email ? <p className="field__error">{fieldErrors.email}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor={`${variant}-organization`}>
            Organization or group
          </label>
          <input
            id={`${variant}-organization`}
            className={`field__input${fieldErrors.organization ? " has-error" : ""}`}
            name="organization"
            value={formData.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            autoComplete="organization"
          />
          {fieldErrors.organization ? (
            <p className="field__error">{fieldErrors.organization}</p>
          ) : (
            <p className="field__hint">Optional, but useful for partner and sponsor follow-up.</p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor={`${variant}-country`}>
            Country or city
          </label>
          <input
            id={`${variant}-country`}
            className={`field__input${fieldErrors.country ? " has-error" : ""}`}
            name="country"
            value={formData.country}
            onChange={(event) => updateField("country", event.target.value)}
            autoComplete="country-name"
          />
          {fieldErrors.country ? <p className="field__error">{fieldErrors.country}</p> : null}
        </div>

        {!isDonation ? (
          <div className="field">
            <label className="field__label" htmlFor={`${variant}-routeType`}>
              I want to help as
            </label>
            <select
              id={`${variant}-routeType`}
              className={`field__input${fieldErrors.routeType ? " has-error" : ""}`}
              name="routeType"
              value={formData.routeType}
              onChange={(event) => updateField("routeType", event.target.value)}
            >
              {involvementRouteOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {fieldErrors.routeType ? <p className="field__error">{fieldErrors.routeType}</p> : null}
          </div>
        ) : null}

        <div className="field">
          <label className="field__label" htmlFor={`${variant}-supportArea`}>
            Focus area
          </label>
          <select
            id={`${variant}-supportArea`}
            className={`field__input${fieldErrors.supportArea ? " has-error" : ""}`}
            name="supportArea"
            value={formData.supportArea}
            onChange={(event) => updateField("supportArea", event.target.value)}
          >
            {supportInquiryAreas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.supportArea ? (
            <p className="field__error">{fieldErrors.supportArea}</p>
          ) : null}
        </div>

        {isDonation ? (
          <>
            <div className="field">
              <label className="field__label" htmlFor={`${variant}-amount`}>
                Giving level
              </label>
              <select
                id={`${variant}-amount`}
                className={`field__input${fieldErrors.amount ? " has-error" : ""}`}
                name="amount"
                value={formData.amount}
                onChange={(event) => updateField("amount", event.target.value)}
              >
                {donationAmountOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldErrors.amount ? <p className="field__error">{fieldErrors.amount}</p> : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${variant}-cadence`}>
                Giving rhythm
              </label>
              <select
                id={`${variant}-cadence`}
                className={`field__input${fieldErrors.cadence ? " has-error" : ""}`}
                name="cadence"
                value={formData.cadence}
                onChange={(event) => updateField("cadence", event.target.value)}
              >
                {donationCadences.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldErrors.cadence ? <p className="field__error">{fieldErrors.cadence}</p> : null}
            </div>
          </>
        ) : (
          <div className="field">
            <label className="field__label" htmlFor={`${variant}-availability`}>
              Best time to follow up
            </label>
            <select
              id={`${variant}-availability`}
              className={`field__input${fieldErrors.availability ? " has-error" : ""}`}
              name="availability"
              value={formData.availability}
              onChange={(event) => updateField("availability", event.target.value)}
            >
              {supportAvailabilityOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldErrors.availability ? (
              <p className="field__error">{fieldErrors.availability}</p>
            ) : null}
          </div>
        )}

        <div className="field field--full">
          <label className="field__label" htmlFor={`${variant}-message`}>
            {isDonation ? "What would you like this gift to support?" : "How would you like to contribute?"}
          </label>
          <textarea
            id={`${variant}-message`}
            className={`field__input field__textarea${fieldErrors.message ? " has-error" : ""}`}
            name="message"
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={5}
          />
          {fieldErrors.message ? (
            <p className="field__error">{fieldErrors.message}</p>
          ) : (
            <p className="field__hint">
              {isDonation
                ? "Share any campaign preference, sponsorship context, or follow-up detail the team should know."
                : "Tell the team what you can offer, any useful experience, and the kind of collaboration you have in mind."}
            </p>
          )}
        </div>

        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor={`${variant}-website`}>Website</label>
          <input
            id={`${variant}-website`}
            name="website"
            value={formData.website}
            onChange={(event) => updateField("website", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="submission-form__checks">
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={formData.consentToContact}
            onChange={(event) => updateField("consentToContact", event.target.checked)}
          />
          <span>Humanity First may contact me by email about this request.</span>
        </label>
        {fieldErrors.consentToContact ? (
          <p className="field__error">{fieldErrors.consentToContact}</p>
        ) : null}

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={formData.wantsUpdates}
            onChange={(event) => updateField("wantsUpdates", event.target.checked)}
          />
          <span>
            {isDonation
              ? "I would like occasional updates about the work this support helps make possible."
              : "I would like occasional updates about related opportunities and program progress."}
          </span>
        </label>
      </div>

      <div className="submission-form__footer">
        <p className="submission-form__footnote">
          {isDonation
            ? "This form creates a tracked donor follow-up request for support that should not go straight into checkout."
            : "This form creates a tracked support request so volunteer, partner, and contributor follow-up does not get lost."}
        </p>
        <button
          type="submit"
          className={`button button--primary${isSubmitting ? " is-loading" : ""}`}
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        >
          <span className="button__label">
            {isSubmitting
              ? isDonation
                ? "Sending giving request"
                : "Sending support request"
              : isDonation
                ? "Submit Giving Request"
                : "Submit Support Request"}
          </span>
          <span className="button__spinner" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
