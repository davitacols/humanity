"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingLink } from "./LoadingLink";
import { navItems } from "./siteData";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-brand" aria-label="Humanity First Initiative home">
          <span className="site-brand__name">Humanity First</span>
          <span className="site-brand__sub">Initiative</span>
        </Link>

        <button
          type="button"
          className={`site-header__menu-button${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__menu-line" />
          <span className="site-header__menu-line" />
          <span className="site-header__menu-line" />
        </button>

        <div className={`site-header__panel${menuOpen ? " is-open" : ""}`}>
          <nav className="site-nav" id="primary-navigation" aria-label="Primary">
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

          <LoadingLink href="/donate" className="site-header__cta" loadingLabel="Opening">
            Donate Now
          </LoadingLink>
        </div>
      </div>
    </header>
  );
}
