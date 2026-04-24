const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function getSiteOrigin() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeSiteUrl(process.env.SITE_URL) ||
    FALLBACK_SITE_URL
  );
}

export function getSiteUrl() {
  return new URL(getSiteOrigin());
}
