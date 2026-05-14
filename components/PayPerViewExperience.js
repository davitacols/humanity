"use client";

import { useEffect, useMemo, useState } from "react";

const ACCESS_HOURS = 48;

function createLocalPurchase() {
  const unlockedAt = Date.now();
  const expiresAt = unlockedAt + ACCESS_HOURS * 60 * 60 * 1000;

  return {
    unlockedAt,
    expiresAt,
    orderRef: `SCR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  };
}

function formatRemaining(ms) {
  const totalMinutes = Math.max(1, Math.floor(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes} min left`;
  }

  return `${hours}h ${minutes}m left`;
}

function isExternalUrl(href) {
  return /^https?:\/\//i.test(href);
}

export function PayPerViewExperience({
  storageKey,
  title,
  price,
  runtime,
  accessWindow,
  teaser,
  benefits,
  paymentUrl,
  supportUrl
}) {
  const [purchase, setPurchase] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        if (parsed.expiresAt > Date.now() && parsed.videoSrc) {
          setPurchase(parsed);
        } else {
          window.localStorage.removeItem(storageKey);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!purchase) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => window.clearInterval(timer);
  }, [purchase]);

  const isUnlocked = purchase ? purchase.expiresAt > now : false;

  useEffect(() => {
    if (purchase && purchase.expiresAt <= now) {
      window.localStorage.removeItem(storageKey);
      setPurchase(null);
    }
  }, [now, purchase, storageKey]);

  const remainingLabel = useMemo(() => {
    if (!purchase) {
      return accessWindow;
    }

    return formatRemaining(purchase.expiresAt - now);
  }, [accessWindow, now, purchase]);

  async function handleUnlock(event) {
    event.preventDefault();

    if (!password.trim()) {
      setError("Enter the screening password to unlock this film.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/premium-video/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.error || "That password did not unlock the screening.");
        return;
      }

      const nextPurchase = {
        ...createLocalPurchase(),
        expiresAt: result.expiresAt,
        orderRef: result.orderRef,
        videoSrc: result.videoSrc
      };

      window.localStorage.setItem(storageKey, JSON.stringify(nextPurchase));
      setPurchase(nextPurchase);
      setPassword("");
      setNow(Date.now());
    } catch {
      setError("We could not check the password right now. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function handleReset() {
    window.localStorage.removeItem(storageKey);
    setPurchase(null);
    setNow(Date.now());
  }

  return (
    <section className="ppv-shell">
      <div className="ppv-stage">
        <div className="ppv-stage__screen">
          {isUnlocked ? (
            <video
              className="ppv-video"
              controls
              preload="metadata"
              playsInline
              src={purchase.videoSrc}
            />
          ) : (
            <div className="ppv-preview">
              <div className="ppv-preview__overlay">
                <span className="pill pill--soft">Supporter screening</span>
                <h2>{title}</h2>
                <p>{teaser}</p>
                <div className="chip-row">
                  <span className="chip">{price}</span>
                  <span className="chip">{runtime}</span>
                  <span className="chip">{accessWindow}</span>
                </div>
              </div>
            </div>
          )}

          <div className="ppv-stage__meta">
            <div>
              <p className="ppv-stage__label">
                {isUnlocked ? "Access active" : "Locked video"}
              </p>
              <p className="ppv-stage__value">{remainingLabel}</p>
            </div>
            <div>
              <p className="ppv-stage__label">Runtime</p>
              <p className="ppv-stage__value">{runtime}</p>
            </div>
            <div>
              <p className="ppv-stage__label">Access type</p>
              <p className="ppv-stage__value">Single-title supporter access</p>
            </div>
          </div>
        </div>

        <aside className="ppv-paywall">
          <p className="section-intro__eyebrow">Access this screening</p>
          <h3 className="ppv-paywall__title">{price}</h3>
          <p className="ppv-paywall__body">
            Pay for the screening, then use the password sent after confirmation to
            unlock this film on your device for the viewing window.
          </p>

          <div className="ppv-steps" aria-label="How pay-per-view access works">
            <div className="ppv-step">
              <span>01</span>
              <strong>Pay</strong>
              <p>Complete the approved checkout or request payment instructions.</p>
            </div>
            <div className="ppv-step">
              <span>02</span>
              <strong>Receive password</strong>
              <p>The screening password is shared after payment is confirmed.</p>
            </div>
            <div className="ppv-step">
              <span>03</span>
              <strong>Watch</strong>
              <p>Unlock the video and watch within the active access window.</p>
            </div>
          </div>

          <div className="ppv-benefits">
            {benefits.map((benefit) => (
              <div key={benefit} className="ppv-benefits__item">
                <span className="ppv-benefits__dot" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {!hydrated ? (
            <button type="button" className="button button--primary is-loading">
              <span className="button__label">Loading access</span>
              <span className="button__spinner" aria-hidden="true" />
            </button>
          ) : isUnlocked ? (
            <div className="ppv-paywall__actions">
              <button type="button" className="button button--primary">
                <span className="button__label">Access confirmed</span>
                <span className="button__spinner" aria-hidden="true" />
              </button>
              <button type="button" className="button button--secondary" onClick={handleReset}>
                <span className="button__label">Clear local access</span>
                <span className="button__spinner" aria-hidden="true" />
              </button>
              <p className="ppv-paywall__receipt">Order ref: {purchase?.orderRef}</p>
            </div>
          ) : (
            <form className="ppv-paywall__actions" onSubmit={handleUnlock}>
              {paymentUrl ? (
                <a
                  href={paymentUrl}
                  className="button button--primary"
                  target={isExternalUrl(paymentUrl) ? "_blank" : undefined}
                  rel={isExternalUrl(paymentUrl) ? "noreferrer" : undefined}
                >
                  Pay for access
                </a>
              ) : null}
              <label className="ppv-password-field">
                <span>Screening password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="off"
                  placeholder="Enter password"
                  disabled={processing}
                />
              </label>
              {error ? <p className="ppv-paywall__error">{error}</p> : null}
              <button
                type="submit"
                className={`button button--primary${processing ? " is-loading" : ""}`}
                disabled={processing}
              >
                <span className="button__label">
                  {processing ? "Checking password" : "Unlock screening"}
                </span>
                <span className="button__spinner" aria-hidden="true" />
              </button>
              <p className="ppv-paywall__note">
                Already paid? Enter the password you received. If access does not work,
                use the support link below with your payment reference.
              </p>
              {supportUrl ? (
                <a
                  href={supportUrl}
                  className="ppv-paywall__support"
                  target={isExternalUrl(supportUrl) ? "_blank" : undefined}
                  rel={isExternalUrl(supportUrl) ? "noreferrer" : undefined}
                >
                  Need help with access?
                </a>
              ) : null}
            </form>
          )}
        </aside>
      </div>
    </section>
  );
}
