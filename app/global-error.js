"use client";

// Root-level error boundary — replaces the whole document, so it carries its own
// styling (no access to the app layout / global CSS).
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem 1.25rem",
          background: "#0c0d08",
          color: "#f4efe0",
          fontFamily: "Archivo, Arial, Helvetica, sans-serif"
        }}
      >
        <div style={{ height: 4, width: 120, margin: "0 auto", borderRadius: 2, background: "linear-gradient(90deg,#e23b32 0 33%,#f4c318 33% 66%,#1ba34c 66% 100%)" }} />
        <h1 style={{ margin: 0, fontSize: "2rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "#fbf7ec" }}>
          Something went wrong
        </h1>
        <p style={{ margin: "0 auto", maxWidth: "42ch", color: "rgba(244,239,224,0.7)", lineHeight: 1.6 }}>
          The application hit an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            justifySelf: "center",
            padding: "0.7rem 1.4rem",
            borderRadius: 999,
            border: 0,
            cursor: "pointer",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "#11140f",
            background: "linear-gradient(135deg,#f4c318,#ffe066)"
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
