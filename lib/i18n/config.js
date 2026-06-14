// Shared i18n constants — safe to import from both server and client code
// (no next/headers here).

export const locales = ["en", "fr", "pt", "es"];
export const defaultLocale = "en";

// Cookie that remembers the visitor's language choice (1 year).
export const LOCALE_COOKIE = "hfi_locale";
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

// Display metadata for the switcher. `short` is the compact code shown in the
// header pill; `label` is the native language name.
export const localeMeta = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
  pt: { label: "Português", short: "PT" },
  es: { label: "Español", short: "ES" }
};

export function isLocale(value) {
  return locales.includes(value);
}

export function normalizeLocale(value) {
  return isLocale(value) ? value : defaultLocale;
}
