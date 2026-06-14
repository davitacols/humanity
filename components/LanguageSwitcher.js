"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeMeta } from "../lib/i18n/config";
import { useTranslation } from "./i18n/LanguageProvider";

/**
 * Language picker. `variant="bar"` is the compact header pill; `variant="menu"`
 * is the wider list used inside the mobile overlay menu.
 */
export function LanguageSwitcher({ variant = "bar" }) {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onPointer(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div className={`lang-switch lang-switch--${variant}`} ref={ref}>
      <button
        type="button"
        className="lang-switch__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("switcher.label")}
        onClick={() => setOpen((value) => !value)}
      >
        <svg className="lang-switch__globe" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c2.5 2.4 2.5 16.2 0 18M12 3c-2.5 2.4-2.5 16.2 0 18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span className="lang-switch__current">{localeMeta[locale].short}</span>
        <svg className="lang-switch__chevron" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="lang-switch__menu" role="listbox" aria-label={t("switcher.label")}>
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                className={`lang-switch__option${code === locale ? " is-active" : ""}`}
                onClick={() => choose(code)}
              >
                <span className="lang-switch__option-short">{localeMeta[code].short}</span>
                <span className="lang-switch__option-label">{localeMeta[code].label}</span>
                {code === locale && (
                  <svg className="lang-switch__check" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5L6 11l5.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
