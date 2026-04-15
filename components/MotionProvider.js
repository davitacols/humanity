"use client";

import { useEffect } from "react";

export function MotionProvider() {
  useEffect(() => {
    document.documentElement.classList.add("js-motion");

    return () => {
      document.documentElement.classList.remove("js-motion");
    };
  }, []);

  return null;
}
