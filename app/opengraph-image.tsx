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
          padding: "80px",
          background: "#0a0a12",
          backgroundImage:
            "radial-gradient(900px 500px at 80% -10%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(700px 500px at 0% 120%, rgba(99,102,241,0.18), transparent 55%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a5b4fc",
          }}
        >
          abinael.xyz
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Abinael Sarungallo Lumempouw
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#a1a1aa",
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
                borderRadius: 999,
                border: "1px solid rgba(165,180,252,0.4)",
                color: "#c7d2fe",
                background: "rgba(99,102,241,0.08)",
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
