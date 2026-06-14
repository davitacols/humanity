"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingLink } from "./LoadingLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "./i18n/LanguageProvider";

const nav = [
  { href: "/about", key: "common.about" },
  { href: "/programs", key: "common.programs" },
  { href: "/education", key: "common.education" },
  { href: "/projects", key: "common.projects" },
  { href: "/team", key: "common.team" }
];

// Big poster links for the full-screen overlay menu.
const menuPrimary = [
  { href: "/about", key: "common.about" },
  { href: "/programs", key: "common.programs" },
  { href: "/education", key: "common.education" },
  { href: "/projects", key: "common.projects" },
  { href: "/team", key: "common.team" },
  { href: "/blog", key: "common.journal" },
  { href: "/gallery", key: "common.gallery" }
];

// Real trust routes only (contact/social intentionally omitted — not yet confirmed).
const menuTrust = [
  { href: "/donate/transparency", key: "common.transparency" },
  { href: "/health", key: "common.health" },
  { href: "/sports", key: "common.sports" },
  { href: "/arts", key: "common.arts" }
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
  const { t } = useTranslation();
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
              <LoadingLink key={item.href} href={item.href} className={`site-nav__link${isActive(pathname, item.href) ? " is-active" : ""}`} loadingLabel={t(item.key)} preserveLabelOnLoad>
                <span>{t(item.key)}</span>
              </LoadingLink>
            ))}
          </nav>

          <div className="site-header__right">
            <LanguageSwitcher variant="bar" />
            <LoadingLink href="/get-involved" className="site-header__secondary" loadingLabel={t("common.opening")}>{t("common.getInvolved")}</LoadingLink>
            <LoadingLink href="/donate" className="site-header__donate" loadingLabel={t("common.opening")}>{t("common.donate")}</LoadingLink>
            <button
              type="button"
              className={`site-burger${open ? " is-open" : ""}`}
              aria-label={open ? t("menu.closeMenu") : t("menu.openMenu")}
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
          <span className="site-menu__eyebrow">{t("menu.explore")}</span>

          <nav className="site-menu__nav" aria-label="All pages">
            {menuPrimary.map((item, i) => (
              <LoadingLink
                key={item.href}
                href={item.href}
                className={`site-menu__link${isActive(pathname, item.href) ? " is-active" : ""}`}
                style={{ "--i": i }}
                loadingLabel={t(item.key)}
                preserveLabelOnLoad
                onClick={() => setOpen(false)}
              >
                <i>{String(i + 1).padStart(2, "0")}</i>
                <span>{t(item.key)}</span>
              </LoadingLink>
            ))}
          </nav>

          <div className="site-menu__foot">
            <div className="site-menu__trust">
              {menuTrust.map((item) => (
                <Link key={item.href + item.key} href={item.href} className="site-menu__trust-link" onClick={() => setOpen(false)}>{t(item.key)}</Link>
              ))}
            </div>
            <LanguageSwitcher variant="menu" />
            <div className="site-menu__actions">
              <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel={t("common.opening")} onClick={() => setOpen(false)}>{t("common.getInvolved")}</LoadingLink>
              <LoadingLink href="/donate" className="button button--primary" loadingLabel={t("common.opening")} onClick={() => setOpen(false)}>{t("common.donateNow")}</LoadingLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
