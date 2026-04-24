import Image from "next/image";
import Link from "next/link";
import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

const footerExploreLinks = navItems.filter((item) =>
  ["/", "/about", "/projects", "/blog"].includes(item.href)
);

const footerFocusAreas = [
  { href: "/education", label: "Education Access" },
  { href: "/arts", label: "Arts and storytelling" },
  { href: "/health", label: "Public Health" },
  { href: "/projects/dodoma-best-sports-center", label: "Sports Development" }
];

const footerSupportLinks = [
  { href: "/donate", label: "Donate" },
  { href: "/donate/transparency", label: "Transparency" },
  { href: "/get-involved", label: "Partner or Volunteer" }
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__shell">
        <div className="site-footer__summary">
          <div className="site-footer__brand-row">
            <Image
              src="/logo.jpeg"
              alt=""
              width={48}
              height={48}
              className="site-footer__logo"
            />
            <div className="site-footer__brand-copy">
              <p className="site-footer__kicker">Humanity First Initiative</p>
              <p className="site-footer__headline">
                Community-led humanitarian work across education, arts, health, and sports.
              </p>
            </div>
          </div>
          <p className="site-footer__description">
            Explore programs, review project stories, support current work, or move directly into
            partnership and volunteer routes from one clear footer.
          </p>
          <p className="site-footer__summary-note">
            Nigeria + Ghana footprint. Built for donor trust, collaboration, and low-bandwidth
            access.
          </p>

          <div className="site-footer__cta">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate now
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
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
        <p>&copy; {currentYear} Humanity First Initiative</p>
        <p>Community-led humanitarian platform across health, education, arts, and sports.</p>
        <p>Designed for clarity, donor trust, and low-bandwidth access.</p>
      </div>
    </footer>
  );
}
