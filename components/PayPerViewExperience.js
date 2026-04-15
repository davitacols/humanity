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

export function PayPerViewExperience({
  storageKey,
  title,
  price,
  runtime,
  accessWindow,
  teaser,
  benefits,
  videoSrc
}) {
  const [purchase, setPurchase] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        if (parsed.expiresAt > Date.now()) {
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

  function handleUnlock() {
    setProcessing(true);

    window.setTimeout(() => {
      const nextPurchase = createLocalPurchase();
      window.localStorage.setItem(storageKey, JSON.stringify(nextPurchase));
      setPurchase(nextPurchase);
      setNow(Date.now());
      setProcessing(false);
    }, 1600);
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
              src={videoSrc}
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
            This release uses device-based access with verified playback and a protected stream
            delivery flow.
          </p>

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
            <div className="ppv-paywall__actions">
              <button
                type="button"
                className={`button button--primary${processing ? " is-loading" : ""}`}
                onClick={handleUnlock}
                disabled={processing}
              >
                <span className="button__label">
                  {processing ? "Processing access" : `Unlock for ${price}`}
                </span>
                <span className="button__spinner" aria-hidden="true" />
              </button>
              <p className="ppv-paywall__note">
                Payment verification runs through the approved gateway.
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
