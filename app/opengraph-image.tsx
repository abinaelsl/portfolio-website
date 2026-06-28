import { ImageResponse } from "next/og";

export const alt = "Abinael Sarungallo Lumempouw — Kyushu University · StatusMaxx · net-zero buildings";
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
          justifyContent: "space-between",
          padding: "72px",
          background: "#050506",
          backgroundImage:
            "radial-gradient(900px 600px at 88% -15%, rgba(109,94,252,0.32), transparent 60%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 48px 48px, 48px 48px",
          color: "#f3f3f5",
          fontFamily: "sans-serif",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9a9aa3",
          }}
        >
          <div style={{ display: "flex" }}>{`// ABINAEL.XYZ`}</div>
          <div style={{ display: "flex", color: "#6d5efc" }}>@abinaelsl</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
              maxWidth: 1000,
            }}
          >
            Abinael Sarungallo Lumempouw
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9a9aa3",
            }}
          >
            Student · Founder · Researcher
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Kyushu University", "StatusMaxx", "Net-Zero Buildings"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid rgba(109,94,252,0.45)",
                color: "#c4bdff",
                background: "rgba(109,94,252,0.10)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
