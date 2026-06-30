"use client";

import { IconX, IconPlus } from "@tabler/icons-react";

export function TaskPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Tasks"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: 380,
        background: "var(--bg-sidebar)",
        borderLeft: "0.5px solid var(--border-input)",
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "0.5px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-primary)" }}>Tasks</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <IconPlus size={18} color="var(--text-primary)" aria-label="Add task" />
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", padding: 0 }}>
            <IconX size={18} color="var(--text-tertiary)" />
          </button>
        </div>
      </div>

      {/* TODO: task list view, filter tabs, and add/edit form per pace_task_management_panel mockup.
          Placeholder until Task Management build step. */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Task list coming soon</p>
      </div>
    </div>
  );
}
