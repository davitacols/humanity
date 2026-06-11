"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/donations", label: "Donations" },
  { href: "/admin/platform", label: "Platform" },
  { href: "/admin/blog", label: "Blog CMS" },
  { href: "/admin/lms", label: "LMS" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/support", label: "Support" }
];

function isActivePath(pathname, href) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="admin-nav" aria-label="Admin navigation">
      <div className="admin-nav__brand">
        <p className="admin-nav__eyebrow">Humanity First</p>
        <h2>Admin</h2>
        <p>Manage content, courses, and operations.</p>
      </div>

      <nav className="admin-nav__links" aria-label="Admin sections">
        {adminLinks.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav__link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-nav__footer">
        <Link href="/" className="admin-nav__utility-link">View public site</Link>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="admin-nav__logout">Sign out</button>
        </form>
      </div>
    </aside>
  );
}
