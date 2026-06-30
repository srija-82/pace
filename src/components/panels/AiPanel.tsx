"use client";

import { IconSparkles, IconX } from "@tabler/icons-react";

export function AiPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="PACE Intelligence"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: 400,
        background: "linear-gradient(165deg, #14111e 0%, #0f1016 55%, #0d0f12 100%)",
        borderLeft: "0.5px solid #2e2a40",
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
        boxShadow: "-30px 0 60px rgba(127,119,221,0.08)",
      }}
    >
      <div style={{ padding: "20px 22px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "var(--ai-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px var(--ai-glow)",
            }}
          >
            <IconSparkles size={13} color="#fff" />
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-primary)" }}>PACE Intelligence</span>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", padding: 0 }}>
          <IconX size={18} color="var(--text-tertiary)" />
        </button>
      </div>

      {/* TODO: chat bubbles, glowing plan cards, regenerate/apply buttons, input bar.
          Wired to POST /api/schedule/generate. Placeholder until AI panel build step. */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 12.5, color: "#b3acdf", padding: "0 22px", textAlign: "center" }}>
          Chat plan builder coming soon
        </p>
      </div>
    </div>
  );
}
