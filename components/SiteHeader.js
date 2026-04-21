"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingLink } from "./LoadingLink";
import { headerUtilityItems, navItems } from "./siteData";

const desktopNavItems = navItems.filter((item) => !["/", "/donate", "/gallery", "/blog"].includes(item.href));

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.classList.toggle("is-menu-open", menuOpen);

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("is-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__utility">
          <div className="site-header__utility-inner">
            <span className="site-header__utility-label">How we work</span>
            {headerUtilityItems.map((item) => (
              <span key={item} className="site-header__utility-item">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="site-header__inner">
          <Link href="/" className="site-brand" aria-label="Humanity First Initiative home">
            <Image
              src="/logo.jpeg"
              alt=""
              width={44}
              height={44}
              className="site-brand__logo"
              priority
            />
            <div className="site-brand__text">
              <span className="site-brand__name">Humanity First</span>
              <span className="site-brand__sub">Initiative</span>
            </div>
          </Link>

          <nav className="site-nav site-nav--desktop" aria-label="Primary">
            {desktopNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav__link${isActive ? " is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <LoadingLink href="/donate" className="button button--header" loadingLabel="Opening">
              Donate
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
                <span className="site-brand__sub">Initiative</span>
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

          <nav className="site-nav site-nav--mobile" id="primary-navigation" aria-label="Primary">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav__link${isActive ? " is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-header__drawer-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Support the Mission
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
