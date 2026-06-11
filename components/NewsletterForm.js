"use client";

import { useState } from "react";

export function NewsletterForm({ source = "footer" }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source })
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ tone: "error", message: data.error || "That could not be saved." });
      } else {
        setStatus({ tone: "success", message: data.message || "You're subscribed." });
        setEmail("");
      }
    } catch {
      setStatus({ tone: "error", message: "Couldn't reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ft-news" onSubmit={handleSubmit} noValidate>
      <label className="ft-news__label" htmlFor="ft-news-email">Get occasional updates</label>
      <div className="ft-news__row">
        <input
          id="ft-news-email"
          type="email"
          className="ft-news__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
          aria-label="Email address"
          required
        />
        <button type="submit" className="ft-news__button" disabled={busy}>
          {busy ? "…" : "Subscribe"}
        </button>
      </div>
      <input
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="ft-news__hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {status ? (
        <p className={`ft-news__status ft-news__status--${status.tone}`} role={status.tone === "error" ? "alert" : "status"}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
