// Server-only i18n helpers. Reads the visitor's language from the cookie so
// Server Components render in the chosen locale (no flash / hydration mismatch).
// (Imports next/headers, which already makes this module server-only.)
import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale } from "./config";
import { makeT } from "./index";

export async function getLocale() {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}

export async function getServerT() {
  const locale = await getLocale();
  return { locale, t: makeT(locale) };
}
