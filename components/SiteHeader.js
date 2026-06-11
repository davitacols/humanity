"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingLink } from "./LoadingLink";

const nav = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" }
];

// Big poster links for the full-screen overlay menu.
const menuPrimary = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Journal" },
  { href: "/gallery", label: "Gallery" }
];

// Real trust routes only (contact/social intentionally omitted — not yet confirmed).
const menuTrust = [
  { href: "/donate/transparency", label: "Transparency" },
  { href: "/health", label: "Health" },
  { href: "/sports", label: "Sports" },
  { href: "/arts", label: "Arts" }
];

function isActive(pathname, href) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand({ onClick, className = "" }) {
  return (
    <Link href="/" className={`site-brand ${className}`.trim()} onClick={onClick}>
      <Image src="/logo/HFI%20(1).png" alt="" width={46} height={46} className="site-brand__logo" priority />
      <span className="site-brand__lockup">
        <span className="site-brand__name">Humanity First</span>
        <span className="site-brand__sub">Initiative</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", open);
    return () => document.body.classList.remove("is-menu-open");
  }, [open]);

  // Condense the header from transparent → solid once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}>
        <div className="site-header__inner">
          <Brand />

          <nav className="site-nav" aria-label="Main">
            {nav.map((item) => (
              <LoadingLink key={item.href} href={item.href} className={`site-nav__link${isActive(pathname, item.href) ? " is-active" : ""}`} loadingLabel={item.label} preserveLabelOnLoad>
                <span>{item.label}</span>
              </LoadingLink>
            ))}
          </nav>

          <div className="site-header__right">
            <LoadingLink href="/get-involved" className="site-header__secondary" loadingLabel="Opening">Get involved</LoadingLink>
            <LoadingLink href="/donate" className="site-header__donate" loadingLabel="Opening">Donate</LoadingLink>
            <button
              type="button"
              className={`site-burger${open ? " is-open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen poster overlay menu */}
      <div className={`site-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="site-menu__shell">
          <span className="site-menu__eyebrow">Explore the work</span>

          <nav className="site-menu__nav" aria-label="All pages">
            {menuPrimary.map((item, i) => (
              <LoadingLink
                key={item.href}
                href={item.href}
                className={`site-menu__link${isActive(pathname, item.href) ? " is-active" : ""}`}
                style={{ "--i": i }}
                loadingLabel={item.label}
                preserveLabelOnLoad
                onClick={() => setOpen(false)}
              >
                <i>{String(i + 1).padStart(2, "0")}</i>
                <span>{item.label}</span>
              </LoadingLink>
            ))}
          </nav>

          <div className="site-menu__foot">
            <div className="site-menu__trust">
              {menuTrust.map((item) => (
                <Link key={item.href + item.label} href={item.href} className="site-menu__trust-link" onClick={() => setOpen(false)}>{item.label}</Link>
              ))}
            </div>
            <div className="site-menu__actions">
              <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening" onClick={() => setOpen(false)}>Get involved</LoadingLink>
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening" onClick={() => setOpen(false)}>Donate now</LoadingLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
