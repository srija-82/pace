"use client";

import { IconPlayerPlay } from "@tabler/icons-react";
import { usePanels } from "./PanelContext";

interface TopbarProps {
  userInitial?: string;
}

export function Topbar({ userInitial = "U" }: TopbarProps) {
  const { activePanel, openTaskPanel, openAiPanel } = usePanels();

  return (
    <header
      style={{
        height: 52,
        borderBottom: "0.5px solid var(--border-default)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "var(--accent-cream)",
            letterSpacing: 0.5,
          }}
        >
          PACE
        </span>

        <div
          role="tablist"
          aria-label="Task view"
          style={{
            display: "flex",
            gap: 4,
            background: "var(--bg-input)",
            borderRadius: 8,
            padding: 3,
          }}
        >
          <button
            role="tab"
            aria-selected={activePanel === "task"}
            onClick={openTaskPanel}
            style={{
              padding: "5px 14px",
              borderRadius: 6,
              background: activePanel === "task" ? "var(--border-default)" : "transparent",
              border: "none",
              fontSize: 13,
              color: activePanel === "task" ? "var(--text-primary)" : "var(--text-tertiary)",
            }}
          >
            Task
          </button>
          <button
            role="tab"
            aria-selected={activePanel === "ai"}
            onClick={openAiPanel}
            style={{
              padding: "5px 14px",
              borderRadius: 6,
              background: activePanel === "ai" ? "var(--border-default)" : "transparent",
              border: "none",
              fontSize: 13,
              color: activePanel === "ai" ? "var(--text-primary)" : "var(--text-tertiary)",
            }}
          >
            AI task
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            border: "0.5px solid #34373d",
            borderRadius: 7,
            background: "transparent",
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          <IconPlayerPlay size={14} />
          Focus
        </button>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#3a3d44",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "var(--text-secondary)",
          }}
          aria-label="Account"
        >
          {userInitial}
        </div>
      </div>
    </header>
  );
}
