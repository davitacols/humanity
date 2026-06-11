"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageLoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      setLoading(false);
      setProgress(100);
      const t = setTimeout(() => setProgress(0), 300);
      prevPath.current = pathname;
      return () => clearTimeout(t);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(e) {
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
      const [targetPath] = href.split("#");
      if (targetPath === pathname) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      setLoading(true);
      setProgress(30);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setProgress((p) => p >= 90 ? 90 : p + Math.random() * 15);
      }, 300);
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      clearInterval(timerRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (!loading) clearInterval(timerRef.current);
  }, [loading]);

  if (progress === 0) return null;

  return (
    <div className="page-loading-bar" aria-hidden="true">
      <div className="page-loading-bar__fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
