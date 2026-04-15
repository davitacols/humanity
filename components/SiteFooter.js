import Link from "next/link";

import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

const footerExploreLinks = navItems.filter(
  (item) => !["/", "/donate", "/get-involved"].includes(item.href)
);

const footerFocusAreas = [
  { href: "/education", label: "Education Access" },
  { href: "/programs", label: "Arts and Storytelling" },
  { href: "/programs", label: "Public Health" },
  { href: "/projects/dodoma-best-sports-center", label: "Sports Development" }
];

const footerSupportLinks = [
  { href: "/donate", label: "Donate" },
  { href: "/get-involved", label: "Partner or Volunteer" },
  { href: "/education/contribute", label: "Contribute Resources" }
];

const footerMeta = [
  "Community-led humanitarian programs",
  "Accessible, low-bandwidth experience",
  "Current footprint: Nigeria and Ghana"
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__shell">
        <div className="site-footer__summary">
          <p className="site-footer__kicker">Humanity First Initiative</p>
          <h2 className="site-footer__headline">
            Community-led humanitarian work with clear paths to support.
          </h2>
          <p className="site-footer__description">
            Humanity First Initiative documents real interventions, organizes program routes
            clearly, and makes it easier for donors, partners, and volunteers to move with
            confidence.
          </p>

          <div className="site-footer__meta">
            {footerMeta.map((item) => (
              <span key={item} className="site-footer__meta-item">
                {item}
              </span>
            ))}
          </div>

          <div className="site-footer__cta">
            <LoadingLink
              href="/donate"
              className="button button--primary"
              loadingLabel="Opening"
            >
              Donate now
            </LoadingLink>
            <LoadingLink
              href="/get-involved"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Get involved
            </LoadingLink>
          </div>
        </div>

        <div className="site-footer__columns">
          <nav className="site-footer__column" aria-label="Footer explore">
            <p className="site-footer__column-title">Explore</p>
            <div className="site-footer__list">
              {footerExploreLinks.map((item) => (
                <Link key={item.href} href={item.href} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="site-footer__column" aria-label="Footer focus areas">
            <p className="site-footer__column-title">Focus Areas</p>
            <div className="site-footer__list">
              {footerFocusAreas.map((item) => (
                <Link key={item.label} href={item.href} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="site-footer__column" aria-label="Footer support">
            <p className="site-footer__column-title">Support</p>
            <div className="site-footer__list">
              {footerSupportLinks.map((item) => (
                <Link key={item.href} href={item.href} className="site-footer__link">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="site-footer__base">
        <p>Humanity First Initiative</p>
        <p>Health, education, sports, and advocacy</p>
        <p>Built for clarity, trust, and accessible browsing</p>
      </div>
    </footer>
  );
}
