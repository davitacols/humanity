"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        gap: "1.1rem",
        textAlign: "center",
        padding: "clamp(2rem, 6vw, 5rem) 1.25rem"
      }}
    >
      <p style={{ margin: 0, color: "var(--reggae-gold)", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "0.8rem" }}>
        Something broke
      </p>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)",
          fontWeight: 700,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: "var(--head, #fbf7ec)",
          lineHeight: 1
        }}
      >
        We hit an unexpected error.
      </h1>
      <p style={{ margin: "0 auto", maxWidth: "44ch", color: "var(--ink-soft)", lineHeight: 1.6 }}>
        Sorry about that — the issue has been logged. You can try again, or head back home.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <button type="button" onClick={() => reset()} className="button button--primary">Try again</button>
        <Link href="/" className="button button--ghost-light">Back to home</Link>
      </div>
    </main>
  );
}
