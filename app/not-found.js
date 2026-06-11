import Link from "next/link";

export const metadata = {
  title: "Page not found"
};

export default function NotFound() {
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
        Error 404
      </p>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: "var(--head, #fbf7ec)",
          lineHeight: 1
        }}
      >
        This page wandered off.
      </h1>
      <p style={{ margin: "0 auto", maxWidth: "44ch", color: "var(--ink-soft)", lineHeight: 1.6 }}>
        The link may be broken, or the page may have moved. Let&apos;s get you back to the work.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <Link href="/" className="button button--primary">Back to home</Link>
        <Link href="/donate" className="button button--ghost-light">Support the work</Link>
      </div>
    </main>
  );
}
