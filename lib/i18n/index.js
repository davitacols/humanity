// Translation core — pure JS, safe to import from both server and client.
// Server-only helpers (cookie reading) live in ./server.js.

import { defaultLocale, normalizeLocale } from "./config";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import pt from "./dictionaries/pt";
import es from "./dictionaries/es";

const dictionaries = { en, fr, pt, es };

export function getDictionary(locale) {
  return dictionaries[normalizeLocale(locale)] || dictionaries[defaultLocale];
}

function lookup(dict, key) {
  return key.split(".").reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

/**
 * Build a translator bound to a locale. Resolves a dot-path key against the
 * locale dictionary, falling back to English and then to the key itself, so a
 * missing translation degrades to readable text instead of blank.
 * Supports `{var}` interpolation: t("footer.rights", { year: 2026 }).
 */
export function makeT(locale) {
  const active = getDictionary(locale);
  const fallback = dictionaries[defaultLocale];
  return (key, vars) => {
    let value = lookup(active, key);
    if (value === undefined) value = lookup(fallback, key);
    if (value === undefined) return key;
    if (vars && typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, name) =>
        Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
      );
    }
    return value;
  };
}
