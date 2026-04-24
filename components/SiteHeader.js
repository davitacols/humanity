"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

const desktopLeadingNavItems = navItems.filter((item) =>
  ["/", "/about"].includes(item.href)
);

const desktopTrailingNavItems = navItems.filter((item) =>
  ["/projects", "/blog"].includes(item.href)
);

const programDropdownItems = navItems.filter((item) =>
  ["/programs", "/education", "/arts", "/health", "/sports"].includes(item.href)
);

const headerUtilityItems = [
  { href: "/about", label: "Mission and public trust" },
  { href: "/blog", label: "Latest field updates" },
  { href: "/donate/transparency", label: "Transparency ledger" },
  { href: "/education", label: "Low-bandwidth learning access" }
];

const programMegaSections = [
  {
    title: "Core program routes",
    items: [
      {
        href: "/programs",
        label: "Programs overview",
        description: "Open the full program map and support routes."
      },
      {
        href: "/health",
        label: "Maternal and child health",
        description: "Outreach, kits, care support, and follow-up."
      },
      {
        href: "/education",
        label: "Education access",
        description: "Learning tracks, guides, and facilitator tools."
      }
    ]
  },
  {
    title: "Youth and advocacy",
    items: [
      {
        href: "/sports",
        label: "Youth sports development",
        description: "Training, mentorship, and equipment support."
      },
      {
        href: "/arts",
        label: "Creative advocacy",
        description: "Storytelling, arts, film, and campaign work."
      },
      {
        href: "/projects",
        label: "Projects archive",
        description: "Project pages, needs, outcomes, and priorities."
      }
    ]
  },
  {
    title: "Proof and participation",
    items: [
      {
        href: "/blog",
        label: "Field notes and updates",
        description: "Stories, evidence, and progress updates."
      },
      {
        href: "/gallery",
        label: "Photo gallery",
        description: "Respectful visual documentation from the work."
      },
      {
        href: "/get-involved",
        label: "Get involved",
        description: "Volunteer, partner, or open a support conversation."
      }
    ]
  }
];

const megaPanelQuickLinks = [
  { href: "/programs", label: "Open all programs" },
  { href: "/donate/transparency", label: "See transparency" }
];

function isItemActive(pathname, href) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownCloseTimerRef = useRef(null);
  const programsMenuActive = programDropdownItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  function handleMobileNavigate() {
    setMenuOpen(false);
  }

  function clearDropdownCloseTimer() {
    if (dropdownCloseTimerRef.current) {
      window.clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
  }

  function openDesktopDropdown() {
    clearDropdownCloseTimer();
    setDesktopDropdownOpen(true);
  }

  function closeDesktopDropdown() {
    clearDropdownCloseTimer();
    setDesktopDropdownOpen(false);
  }

  function scheduleDesktopDropdownClose() {
    clearDropdownCloseTimer();
    dropdownCloseTimerRef.current = window.setTimeout(() => {
      setDesktopDropdownOpen(false);
      dropdownCloseTimerRef.current = null;
    }, 180);
  }

  useEffect(() => {
    setMenuOpen(false);
    closeDesktopDropdown();
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        closeDesktopDropdown();
      }
    };

    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDesktopDropdown();
      }
    };

    document.body.classList.toggle("is-menu-open", menuOpen);

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    if (desktopDropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      document.body.classList.remove("is-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
      clearDropdownCloseTimer();
    };
  }, [desktopDropdownOpen, menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__utility">
          <div className="site-header__utility-inner">
            <span className="site-header__utility-label">Platform signals</span>
            {headerUtilityItems.map((item) => (
              <LoadingLink
                key={item.href}
                href={item.href}
                className="site-header__utility-item"
                loadingLabel={item.label}
                preserveLabelOnLoad
              >
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
              <Image
                src="/logo.jpeg"
                alt=""
                width={48}
                height={48}
                className="site-brand__logo"
                priority
              />
              <div className="site-brand__text">
                <span className="site-brand__name">Humanity First</span>
                <span className="site-brand__sub">Community aid platform</span>
              </div>
            </Link>

            <nav className="site-nav site-nav--desktop" aria-label="Primary">
              {desktopLeadingNavItems.map((item) => {
                const isActive = isItemActive(pathname, item.href);
                return (
                  <LoadingLink
                    key={item.href}
                    href={item.href}
                    className={`site-nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    loadingLabel={item.label}
                    preserveLabelOnLoad
                  >
                    {item.label}
                  </LoadingLink>
                );
              })}

              <div
                ref={dropdownRef}
                className={`site-nav__item site-nav__item--dropdown${desktopDropdownOpen ? " is-open" : ""}`}
                onMouseEnter={openDesktopDropdown}
                onMouseLeave={scheduleDesktopDropdownClose}
                onFocus={openDesktopDropdown}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    scheduleDesktopDropdownClose();
                  }
                }}
              >
                <button
                  type="button"
                  className={`site-nav__trigger${programsMenuActive ? " is-active" : ""}`}
                  aria-expanded={desktopDropdownOpen}
                  aria-haspopup="dialog"
                  aria-controls="programs-mega-panel"
                  onClick={() => {
                    if (desktopDropdownOpen) {
                      closeDesktopDropdown();
                    } else {
                      openDesktopDropdown();
                    }
                  }}
                >
                  <span>Programs</span>
                  <span className="site-nav__caret" aria-hidden="true" />
                </button>

                <div
                  id="programs-mega-panel"
                  className="site-nav__dropdown"
                  aria-label="Programs navigation panel"
                >
                  <div className="site-nav__mega-grid">
                    <div className="site-nav__mega-aside">
                      <p className="site-nav__mega-kicker">Programs in view</p>
                      <h2 className="site-nav__mega-title">
                        Explore trusted program routes.
                      </h2>
                      <p className="site-nav__mega-body">
                        Health, learning, youth development, and advocacy are organized into clear
                        public pathways supporters can understand quickly.
                      </p>
                      <div className="site-nav__mega-actions">
                        {megaPanelQuickLinks.map((item) => (
                          <LoadingLink
                            key={item.href}
                            href={item.href}
                            className="site-nav__mega-action"
                            loadingLabel={item.label}
                            preserveLabelOnLoad
                            onClick={closeDesktopDropdown}
                          >
                            {item.label}
                          </LoadingLink>
                        ))}
                      </div>
                    </div>

                    {programMegaSections.map((section) => (
                      <div key={section.title} className="site-nav__mega-section">
                        <p className="site-nav__mega-section-title">{section.title}</p>
                        <div className="site-nav__mega-links">
                          {section.items.map((item) => {
                            const isActive = isItemActive(pathname, item.href);
                            return (
                              <LoadingLink
                                key={item.href}
                                href={item.href}
                                className={`site-nav__dropdown-link${isActive ? " is-active" : ""}`}
                                aria-current={isActive ? "page" : undefined}
                                loadingLabel={item.label}
                                preserveLabelOnLoad
                                onClick={closeDesktopDropdown}
                              >
                                <span className="site-nav__dropdown-link-title">{item.label}</span>
                                <span className="site-nav__dropdown-link-desc">
                                  {item.description}
                                </span>
                              </LoadingLink>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {desktopTrailingNavItems.map((item) => {
                const isActive = isItemActive(pathname, item.href);
                return (
                  <LoadingLink
                    key={item.href}
                    href={item.href}
                    className={`site-nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    loadingLabel={item.label}
                    preserveLabelOnLoad
                  >
                    {item.label}
                  </LoadingLink>
                );
              })}
            </nav>

            <div className="site-header__actions">
              <LoadingLink
                href="/get-involved"
                className="button button--header-secondary"
                loadingLabel="Opening"
              >
                Contact Team
              </LoadingLink>

              <LoadingLink href="/donate" className="button button--header" loadingLabel="Opening">
                Donate Now
              </LoadingLink>

              <button
                type="button"
                className={`site-header__menu-button${menuOpen ? " is-open" : ""}`}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="site-header__menu-icon" aria-hidden="true">
                  <span className="site-header__menu-line" />
                  <span className="site-header__menu-line" />
                  <span className="site-header__menu-line" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        className={`site-header__backdrop${menuOpen ? " is-open" : ""}`}
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`site-header__drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="site-header__drawer-shell">
          <div className="site-header__drawer-top">
            <div className="site-header__drawer-brand">
              <Image
                src="/logo.jpeg"
                alt=""
                width={40}
                height={40}
                className="site-brand__logo"
              />
              <div className="site-brand__text">
                <span className="site-brand__name">Humanity First</span>
                <span className="site-brand__sub">Community aid platform</span>
              </div>
            </div>

            <button
              type="button"
              className="site-header__drawer-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <p className="site-header__drawer-body">
            Find field stories, program routes, project updates, and simple ways to support the work.
          </p>

          <div className="site-header__drawer-utility">
            {headerUtilityItems.map((item) => (
              <LoadingLink
                key={item.href}
                href={item.href}
                className="site-header__drawer-chip"
                loadingLabel={item.label}
                preserveLabelOnLoad
                onClick={handleMobileNavigate}
              >
                {item.label}
              </LoadingLink>
            ))}
          </div>

          <nav className="site-nav site-nav--mobile" id="primary-navigation" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = isItemActive(pathname, item.href);
              return (
                <LoadingLink
                  key={item.href}
                  href={item.href}
                  className={`site-nav__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  loadingLabel={item.label}
                  preserveLabelOnLoad
                  onClick={handleMobileNavigate}
                >
                  {item.label}
                </LoadingLink>
              );
            })}
          </nav>

          <div className="site-header__drawer-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate now
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
              Get Involved
            </LoadingLink>
          </div>
        </div>
      </aside>
    </>
  );
}
