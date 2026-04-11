import Link from "next/link";
import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__panel">
        <div className="site-footer__lead">
          <div className="site-footer__brand">
            <span className="site-footer__brand-name">Humanity First</span>
            <span className="site-footer__brand-sub">Initiative</span>
          </div>

          <div>
            <p className="site-footer__eyebrow">Built for long-term impact</p>
            <h2 className="site-footer__title">
              A digital platform for dignity, transparency, and grassroots storytelling.
            </h2>
            <p className="site-footer__body">
              The foundation is designed to scale across countries, campaigns, partners, and
              contributors without losing the human feel of the work.
            </p>
          </div>
        </div>

        <div className="site-footer__side">
          <nav className="site-footer__nav" aria-label="Footer">
            <p className="site-footer__nav-title">Explore</p>
            <div className="site-footer__nav-list">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="site-footer__nav-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="site-footer__actions">
            <LoadingLink
              href="/get-involved"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Request Partnership
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost" loadingLabel="Opening">
              Support the Mission
            </LoadingLink>
          </div>
        </div>
      </div>

      <div className="site-footer__base">
        <p>Humanity First Initiative</p>
        <p>Community-centered humanitarian platform</p>
        <p>Designed for growth across Africa</p>
      </div>
    </footer>
  );
}
