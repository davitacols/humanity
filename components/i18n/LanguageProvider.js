"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, LOCALE_MAX_AGE, defaultLocale, isLocale } from "../../lib/i18n/config";
import { makeT } from "../../lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ initialLocale, children }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(isLocale(initialLocale) ? initialLocale : defaultLocale);

  const setLocale = useCallback(
    (next) => {
      if (!isLocale(next) || next === locale) return;
      // Persist the choice so the server renders this locale on the next request.
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${LOCALE_MAX_AGE};samesite=lax`;
      document.documentElement.lang = next;
      setLocaleState(next);
      // Re-render Server Components (footer, pages) with the new cookie.
      router.refresh();
    },
    [locale, router]
  );

  const value = useMemo(() => ({ locale, setLocale, t: makeT(locale) }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
