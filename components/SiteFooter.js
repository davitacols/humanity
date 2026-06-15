import Link from "next/link";
import { getOrgContact } from "../lib/org";
import { getServerT } from "../lib/i18n/server";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    titleKey: "footer.colPrograms",
    links: [
      { href: "/health", key: "common.health" },
      { href: "/education", key: "common.education" },
      { href: "/sports", key: "common.sports" },
      { href: "/arts", key: "common.arts" },
      { href: "/environment", key: "common.environment" }
    ]
  },
  {
    titleKey: "footer.colPlatform",
    links: [
      { href: "/lms", key: "common.lms" },
      { href: "/projects", key: "common.projects" },
      { href: "/blog", key: "common.blog" },
      { href: "/gallery", key: "common.gallery" }
    ]
  },
  {
    titleKey: "footer.colOrganization",
    links: [
      { href: "/about", key: "common.about" },
      { href: "/team", key: "common.team" },
      { href: "/donate/transparency", key: "common.transparency" },
      { href: "/contact", key: "common.contact" }
    ]
  },
  {
    titleKey: "footer.colSupport",
    links: [
      { href: "/donate", key: "common.donate" },
      { href: "/get-involved", key: "common.volunteer" },
      { href: "/get-involved", key: "common.partner" },
      { href: "/education/contribute", key: "common.contribute" }
    ]
  }
];

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const org = getOrgContact();
  const { t } = await getServerT();

  return (
    <footer className="ft">
      <div className="ft__inner">
        <div className="ft__top">
          <div className="ft__brand">
            <span className="ft__brand-name">Humanity First Initiative</span>
            <p className="ft__desc">{t("footer.tagline")}</p>
            {(org.email || org.registration || org.socials.length > 0) && (
              <div className="ft__org">
                {org.email && (
                  <a href={`mailto:${org.email}`} className="ft__org-line">{org.email}</a>
                )}
                {org.registration && <span className="ft__org-line">{org.registration}</span>}
                {org.socials.length > 0 && (
                  <div className="ft__socials">
                    {org.socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="ft__social">{s.label}</a>
                    ))}
                  </div>
                )}
              </div>
            )}
            <NewsletterForm />
          </div>
          <div className="ft__columns">
            {columns.map((col) => (
              <nav key={col.titleKey} className="ft__column">
                <p className="ft__column-title">{t(col.titleKey)}</p>
                {col.links.map((l) => (
                  <Link key={l.href + l.key} href={l.href} className="ft__link">{t(l.key)}</Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="ft__base">
          <p>© {year} Humanity First Initiative{org.country ? ` · ${org.country}` : ""}</p>
          <nav className="ft__legal" aria-label="Legal">
            <Link href="/privacy" className="ft__link">{t("common.privacy")}</Link>
            <Link href="/terms" className="ft__link">{t("common.terms")}</Link>
            <Link href="/contact" className="ft__link">{t("common.contact")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
