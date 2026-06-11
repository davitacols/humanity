"use client";

import { useState } from "react";

export function ManageDonationForm() {
  const [form, setForm] = useState({ reference: "", email: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      const response = await fetch("/api/donation-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ tone: "error", message: data.error || "That could not be completed." });
      } else {
        setStatus({ tone: "success", message: data.message || "Done." });
      }
    } catch {
      setStatus({ tone: "error", message: "The form could not reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="submission-form" onSubmit={handleSubmit} noValidate>
      <div className="submission-form__header">
        <p className="section-kicker">Manage giving</p>
        <h2 className="submission-form__title">Cancel a monthly donation</h2>
        <p className="submission-form__body">
          Enter the reference from your donation receipt and the email you gave with. We'll stop any
          future charges right away — your past support is unaffected.
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
          <label className="field__label" htmlFor="manage-reference">Donation reference</label>
          <input
            id="manage-reference"
            className="field__input"
            value={form.reference}
            onChange={(event) => setForm((current) => ({ ...current, reference: event.target.value }))}
            placeholder="DON-FLW-…"
            required
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="manage-email">Email address</label>
          <input
            id="manage-email"
            type="email"
            className="field__input"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="submission-form__footer">
        <p className="submission-form__footnote">
          You can also reply to any receipt email and the team will cancel it for you.
        </p>
        <button
          type="submit"
          className={`button button--primary${busy ? " is-loading" : ""}`}
          disabled={busy}
          aria-busy={busy}
        >
          <span className="button__label">{busy ? "Cancelling…" : "Cancel monthly donation"}</span>
          <span className="button__spinner" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
