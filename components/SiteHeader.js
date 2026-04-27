"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

const desktopLeadingNavItems = navItems.filter((item) =>
  ["/"].includes(item.href)
);

const desktopTrailingNavItems = navItems.filter((item) =>
  ["/projects", "/blog"].includes(item.href)
);

const aboutDropdownItems = ["/about", "/get-involved", "/gallery"];

const programDropdownItems = navItems.filter((item) =>
  ["/programs", "/education", "/arts", "/health", "/sports"].includes(item.href)
);

const headerUtilityItems = [
  { href: "/about", label: "Mission and public trust" },
  { href: "/blog", label: "Latest field updates" },
  { href: "/donate/transparency", label: "Transparency ledger" },
  { href: "/education", label: "Low-bandwidth learning access" }
];

const aboutMegaSections = [
  {
    title: "The initiative",
    items: [
      { href: "/about", label: "About us", description: "Mission, standards, and how the platform works." },
      { href: "/about#mission", label: "Mission and values", description: "Why the initiative exists and what it stands for." },
      { href: "/about#standards", label: "Operating standards", description: "Trust, dignity, and accountability principles." }
    ]
  },
  {
    title: "People",
    items: [
      { href: "/about#network", label: "Team and collaborators", description: "Strategy, regional partners, and creative contributors." },
      { href: "/gallery", label: "Photo gallery", description: "Respectful visual documentation from the field." },
      { href: "/get-involved", label: "Get involved", description: "Volunteer, partner, or open a support conversation." }
    ]
  }
];

const aboutQuickLinks = [
  { href: "/about", label: "Open about page" },
  { href: "/get-involved", label: "Get involved" }
];

const programMegaSections = [
  {
    title: "Core program routes",
    items: [
      { href: "/programs", label: "Programs overview", description: "Open the full program map and support routes." },
      { href: "/health", label: "Maternal and child health", description: "Outreach, kits, care support, and follow-up." },
      { href: "/education", label: "Education access", description: "Learning tracks, guides, and facilitator tools." }
    ]
  },
  {
    title: "Youth and advocacy",
    items: [
      { href: "/sports", label: "Youth sports development", description: "Training, mentorship, and equipment support." },
      { href: "/arts", label: "Creative advocacy", description: "Storytelling, arts, film, and campaign work." },
      { href: "/projects", label: "Projects archive", description: "Project pages, needs, outcomes, and priorities." }
    ]
  },
  {
    title: "Proof and participation",
    items: [
      { href: "/blog", label: "Field notes and updates", description: "Stories, evidence, and progress updates." },
      { href: "/gallery", label: "Photo gallery", description: "Respectful visual documentation from the work." },
      { href: "/get-involved", label: "Get involved", description: "Volunteer, partner, or open a support conversation." }
    ]
  }
];

const megaPanelQuickLinks = [
  { href: "/programs", label: "Open all programs" },
  { href: "/donate/transparency", label: "See transparency" }
];

function isItemActive(pathname, href) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function useDropdown() {
  const ref = useRef(null);
  const timerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const clear = useCallback(() => {
    if (timerRef.current) { window.clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const doOpen = useCallback(() => { clear(); setOpen(true); }, [clear]);
  const doClose = useCallback(() => { clear(); setOpen(false); }, [clear]);
  const scheduleClose = useCallback(() => {
    clear();
    timerRef.current = window.setTimeout(() => { setOpen(false); timerRef.current = null; }, 180);
  }, [clear]);

  useEffect(() => () => clear(), [clear]);

  return { ref, open, doOpen, doClose, scheduleClose };
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const about = useDropdown();
  const programs = useDropdown();

  const aboutActive = aboutDropdownItems.some((href) => isItemActive(pathname, href));
  const programsActive = programDropdownItems.some((item) => isItemActive(pathname, item.href));

  function closeAll() { about.doClose(); programs.doClose(); }
  function handleMobileNavigate() { setMenuOpen(false); }

  useEffect(() => { setMenuOpen(false); closeAll(); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setMenuOpen(false); closeAll(); } };
    const onPointer = (e) => {
      if (about.ref.current && !about.ref.current.contains(e.target)) about.doClose();
      if (programs.ref.current && !programs.ref.current.contains(e.target)) programs.doClose();
    };

    document.body.classList.toggle("is-menu-open", menuOpen);
    if (menuOpen || about.open || programs.open) window.addEventListener("keydown", onKey);
    if (about.open || programs.open) window.addEventListener("pointerdown", onPointer);

    return () => {
      document.body.classList.remove("is-menu-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, about.open, programs.open]);

  function renderMegaDropdown(id, label, isActive, dropdown, sections, quickLinks, asideTitle, asideBody) {
    return (
      <div
        ref={dropdown.ref}
        className={`site-nav__item site-nav__item--dropdown${dropdown.open ? " is-open" : ""}`}
        onMouseEnter={() => { programs.doClose(); about.doClose(); dropdown.doOpen(); }}
        onMouseLeave={dropdown.scheduleClose}
        onFocus={dropdown.doOpen}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) dropdown.scheduleClose(); }}
      >
        <button
          type="button"
          className={`site-nav__trigger${isActive ? " is-active" : ""}`}
          aria-expanded={dropdown.open}
          aria-haspopup="dialog"
          aria-controls={id}
          onClick={() => dropdown.open ? dropdown.doClose() : dropdown.doOpen()}
        >
          <span>{label}</span>
          <span className="site-nav__caret" aria-hidden="true" />
        </button>

        <div id={id} className="site-nav__dropdown" aria-label={`${label} navigation panel`}>
          <div className="site-nav__mega-grid">
            <div className="site-nav__mega-aside">
              <p className="site-nav__mega-kicker">{label}</p>
              <h2 className="site-nav__mega-title">{asideTitle}</h2>
              <p className="site-nav__mega-body">{asideBody}</p>
              <div className="site-nav__mega-actions">
                {quickLinks.map((item) => (
                  <LoadingLink key={item.href} href={item.href} className="site-nav__mega-action" loadingLabel={item.label} preserveLabelOnLoad onClick={dropdown.doClose}>
                    {item.label}
                  </LoadingLink>
                ))}
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="site-nav__mega-section">
                <p className="site-nav__mega-section-title">{section.title}</p>
                <div className="site-nav__mega-links">
                  {section.items.map((item) => {
                    const active = isItemActive(pathname, item.href);
                    return (
                      <LoadingLink key={item.href} href={item.href} className={`site-nav__dropdown-link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} loadingLabel={item.label} preserveLabelOnLoad onClick={dropdown.doClose}>
                        <span className="site-nav__dropdown-link-title">{item.label}</span>
                        <span className="site-nav__dropdown-link-desc">{item.description}</span>
                      </LoadingLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__utility">
          <div className="site-header__utility-inner">
            <span className="site-header__utility-label">Platform signals</span>
            {headerUtilityItems.map((item) => (
              <LoadingLink key={item.href} href={item.href} className="site-header__utility-item" loadingLabel={item.label} preserveLabelOnLoad>
                {item.label}
              </LoadingLink>
            ))}
            <span className="site-header__utility-spacer" />
            <span className="site-header__utility-note">Built for visible humanitarian work</span>
          </div>
        </div>

        <div className="site-header__panel">
          <div className="site-header__inner">
            <Link href="/" className="site-brand" aria-label="Humanity First Initiative home">
              <Image src="/logo.jpeg" alt="" width={48} height={48} className="site-brand__logo" priority />
              <div className="site-brand__text">
                <span className="site-brand__name">Humanity First</span>
                <span className="site-brand__sub">Community aid platform</span>
              </div>
            </Link>

            <nav className="site-nav site-nav--desktop" aria-label="Primary">
              {desktopLeadingNavItems.map((item) => {
                const active = isItemActive(pathname, item.href);
                return (
                  <LoadingLink key={item.href} href={item.href} className={`site-nav__link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} loadingLabel={item.label} preserveLabelOnLoad>
                    {item.label}
                  </LoadingLink>
                );
              })}

              {renderMegaDropdown(
                "about-mega-panel", "About", aboutActive, about,
                aboutMegaSections, aboutQuickLinks,
                "Learn about the initiative.",
                "Mission, team, collaborators, standards, and ways to get involved — all in one place."
              )}

              {renderMegaDropdown(
                "programs-mega-panel", "Programs", programsActive, programs,
                programMegaSections, megaPanelQuickLinks,
                "Explore trusted program routes.",
                "Health, learning, youth development, and advocacy are organized into clear public pathways supporters can understand quickly."
              )}

              {desktopTrailingNavItems.map((item) => {
                const active = isItemActive(pathname, item.href);
                return (
                  <LoadingLink key={item.href} href={item.href} className={`site-nav__link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} loadingLabel={item.label} preserveLabelOnLoad>
                    {item.label}
                  </LoadingLink>
                );
              })}
            </nav>

            <div className="site-header__actions">
              <LoadingLink href="/get-involved" className="button button--header-secondary" loadingLabel="Opening">
                Contact Team
              </LoadingLink>
              <LoadingLink href="/donate" className="button button--header" loadingLabel="Opening">
                Donate Now
              </LoadingLink>
              <button
                type="button"
                className={`ham${menuOpen ? " is-open" : ""}`}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="ham__label">{menuOpen ? "Close" : "Menu"}</span>
                <span className="ham__icon" aria-hidden="true"><span /><span /></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <button type="button" className={`site-header__backdrop${menuOpen ? " is-open" : ""}`} aria-label="Close menu" onClick={() => setMenuOpen(false)} />

      <aside className={`site-header__drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="site-header__drawer-shell">
          <div className="site-header__drawer-top">
            <div className="site-header__drawer-brand">
              <Image src="/logo.jpeg" alt="" width={40} height={40} className="site-brand__logo" />
              <div className="site-brand__text">
                <span className="site-brand__name">Humanity First</span>
                <span className="site-brand__sub">Community aid platform</span>
              </div>
            </div>
            <button type="button" className="site-header__drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <p className="site-header__drawer-body">
            Find field stories, program routes, project updates, and simple ways to support the work.
          </p>

          <div className="site-header__drawer-utility">
            {headerUtilityItems.map((item) => (
              <LoadingLink key={item.href} href={item.href} className="site-header__drawer-chip" loadingLabel={item.label} preserveLabelOnLoad onClick={handleMobileNavigate}>
                {item.label}
              </LoadingLink>
            ))}
          </div>

          <nav className="site-nav site-nav--mobile" id="primary-navigation" aria-label="Primary">
            {navItems.map((item) => {
              const active = isItemActive(pathname, item.href);
              return (
                <LoadingLink key={item.href} href={item.href} className={`site-nav__link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} loadingLabel={item.label} preserveLabelOnLoad onClick={handleMobileNavigate}>
                  {item.label}
                </LoadingLink>
              );
            })}
          </nav>

          <div className="site-header__drawer-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">Get Involved</LoadingLink>
          </div>
        </div>
      </aside>
    </>
  );
}
