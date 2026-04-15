import Link from "next/link";
import { LoadingLink } from "./LoadingLink";
import { headerUtilityItems, navItems, programPillars } from "./siteData";

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
            <p className="site-footer__eyebrow">Community-led humanitarian action</p>
            <h2 className="site-footer__title">
              Working alongside communities through health, education, youth development, and creative advocacy.
            </h2>
            <p className="site-footer__body">
              Humanity First Initiative documents local interventions, connects supporters to
              visible work, and creates clear routes for donors, volunteers, and partners to act
              with confidence.
            </p>

            <div className="site-footer__signals" aria-label="Platform strengths">
              {headerUtilityItems.map((item) => (
                <span key={item} className="site-footer__signal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__side">
          <div className="site-footer__nav">
            <p className="site-footer__nav-title">Priority areas</p>
            <div className="site-footer__nav-list">
              {programPillars.map((item) => (
                <span key={item.title} className="site-footer__nav-link site-footer__nav-link--static">
                  {item.title}
                </span>
              ))}
            </div>
          </div>

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
        <p>Community-led programs across health, education, sports, and advocacy</p>
        <p>Current footprint: Nigeria and Ghana</p>
      </div>
    </footer>
  );
}
