"use client";

import { createElement, useEffect, useRef, useState } from "react";

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  threshold = 0.16
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return createElement(
    as,
    {
      ref,
      className: `${className} motion-reveal${isVisible ? " is-visible" : ""}`.trim(),
      style: { "--enter-delay": `${delay}ms` }
    },
    children
  );
}
