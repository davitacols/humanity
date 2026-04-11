"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isModifiedEvent(event) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function LoadingLink({
  href,
  className,
  children,
  loadingLabel = "Loading",
  ...props
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a href={href} className={className} {...props}>
        <span className="button__label">{children}</span>
      </a>
    );
  }

  function handleClick(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || typeof href !== "string") {
      return;
    }

    const [targetPath] = href.split("#");

    if (!targetPath || targetPath === pathname) {
      return;
    }

    setIsLoading(true);
  }

  return (
    <Link
      href={href}
      className={`${className}${isLoading ? " is-loading" : ""}`}
      aria-busy={isLoading}
      onClick={handleClick}
      {...props}
    >
      <span className="button__label">{isLoading ? loadingLabel : children}</span>
      <span className="button__spinner" aria-hidden="true" />
    </Link>
  );
}
