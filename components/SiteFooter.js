import Image from "next/image";
import Link from "next/link";
import { LoadingLink } from "./LoadingLink";

const footerLinks = {
  explore: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Field notes" },
    { href: "/gallery", label: "Gallery" }
  ],
  programs: [
    { href: "/health", label: "Maternal and child health" },
    { href: "/education", label: "Education access" },
    { href: "/sports", label: "Sports development" },
    { href: "/arts", label: "Arts and advocacy" },
    { href: "/programs", label: "All programs" }
  ],
  support: [
    { href: "/donate", label: "Donate" },
    { href: "/donate/transparency", label: "Transparency tracker" },
    { href: "/get-involved", label: "Partner or volunteer" },
    { href: "/education/contribute", label: "Contribute resources" }
  ],
  connect: [
    { href: "/about#network", label: "Team and collaborators" },
    { href: "/get-involved", label: "Contact the team" },
    { href: "/projects/dodoma-best-sports-center", label: "Flagship project" }
  ]
};

const signals = [
  "Community-led programs",
  "Transparent support pathways",
  "Low-bandwidth access",
  "Cross-border network"
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft__main">
        {/* Brand + CTA */}
        <div className="ft__brand-section">
          <div className="ft__brand">
            <Image src="/logo.jpeg" alt="" width={44} height={44} className="ft__logo" />
            <div>
              <p className="ft__brand-name">Humanity First</p>
              <p className="ft__brand-sub">Initiative</p>
            </div>
          </div>
          <p className="ft__tagline">
            Community-led humanitarian work across education, arts, health, and sports development.
          </p>
          <div className="ft__signals">
            {signals.map((s) => (
              <span key={s} className="ft__signal">{s}</span>
            ))}
          </div>
          <div className="ft__cta">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate now
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
              Get involved
            </LoadingLink>
          </div>
        </div>

        {/* Link columns */}
        <div className="ft__columns">
          <nav className="ft__column" aria-label="Explore">
            <p className="ft__column-title">Explore</p>
            <div className="ft__list">
              {footerLinks.explore.map((l) => (
                <Link key={l.href} href={l.href} className="ft__link">{l.label}</Link>
              ))}
            </div>
          </nav>
          <nav className="ft__column" aria-label="Programs">
            <p className="ft__column-title">Programs</p>
            <div className="ft__list">
              {footerLinks.programs.map((l) => (
                <Link key={l.href} href={l.href} className="ft__link">{l.label}</Link>
              ))}
            </div>
          </nav>
          <nav className="ft__column" aria-label="Support">
            <p className="ft__column-title">Support</p>
            <div className="ft__list">
              {footerLinks.support.map((l) => (
                <Link key={l.href} href={l.href} className="ft__link">{l.label}</Link>
              ))}
            </div>
          </nav>
          <nav className="ft__column" aria-label="Connect">
            <p className="ft__column-title">Connect</p>
            <div className="ft__list">
              {footerLinks.connect.map((l) => (
                <Link key={l.href} href={l.href} className="ft__link">{l.label}</Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Base */}
      <div className="ft__base">
        <p>&copy; {year} Humanity First Initiative</p>
        <p>Designed for clarity, donor trust, and low-bandwidth access.</p>
      </div>
    </footer>
  );
}
