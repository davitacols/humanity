import { getSiteOrigin } from "../lib/site";

export default function robots() {
  const siteOrigin = getSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/education/review"]
      }
    ],
    sitemap: `${siteOrigin}/sitemap.xml`
  };
}
