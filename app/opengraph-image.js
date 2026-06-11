import { ImageResponse } from "next/og";

export const alt = "Humanity First Initiative — grassroots humanitarian work across Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #131509 0%, #0a0b05 100%)",
          color: "#fbf7ec",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            height: 12,
            width: 260,
            borderRadius: 6,
            marginBottom: 44,
            background:
              "linear-gradient(90deg, #e23b32 0 33%, #f4c318 33% 66%, #1ba34c 66% 100%)"
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            maxWidth: 940
          }}
        >
          Humanity First Initiative
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "rgba(244, 239, 224, 0.78)",
            marginTop: 30,
            maxWidth: 860,
            lineHeight: 1.35
          }}
        >
          Health · Education · Sports · Arts — grassroots humanitarian work across Africa.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 50,
            fontSize: 28,
            fontWeight: 700,
            color: "#f4c318"
          }}
        >
          Support a visible need →
        </div>
      </div>
    ),
    { ...size }
  );
}
