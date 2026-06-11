import Link from "next/link";
import { getOrgContact } from "../lib/org";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Programs",
    links: [
      { href: "/health", label: "Health" },
      { href: "/education", label: "Education" },
      { href: "/sports", label: "Sports" },
      { href: "/arts", label: "Arts" }
    ]
  },
  {
    title: "Platform",
    links: [
      { href: "/lms", label: "LMS" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/gallery", label: "Gallery" }
    ]
  },
  {
    title: "Organization",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/donate/transparency", label: "Transparency" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Support",
    links: [
      { href: "/donate", label: "Donate" },
      { href: "/get-involved", label: "Volunteer" },
      { href: "/get-involved", label: "Partner" },
      { href: "/education/contribute", label: "Contribute" }
    ]
  }
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const org = getOrgContact();

  return (
    <footer className="ft">
      <div className="ft__inner">
        <div className="ft__top">
          <div className="ft__brand">
            <span className="ft__brand-name">Humanity First Initiative</span>
            <p className="ft__desc">Connecting communities with health, education, sports, and creative advocacy across Africa.</p>
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
              <nav key={col.title} className="ft__column">
                <p className="ft__column-title">{col.title}</p>
                {col.links.map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="ft__link">{l.label}</Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="ft__base">
          <p>© {year} Humanity First Initiative{org.country ? ` · ${org.country}` : ""}</p>
          <nav className="ft__legal" aria-label="Legal">
            <Link href="/privacy" className="ft__link">Privacy</Link>
            <Link href="/terms" className="ft__link">Terms</Link>
            <Link href="/contact" className="ft__link">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
