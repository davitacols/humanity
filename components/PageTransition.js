"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setVisible(false);
      const t = setTimeout(() => {
        setCurrentPath(pathname);
        setVisible(true);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [pathname, currentPath]);

  return (
    <div className={`page-transition${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}
