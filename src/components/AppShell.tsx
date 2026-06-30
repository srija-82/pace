"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { usePanels } from "./PanelContext";
import { TaskPanel } from "./panels/TaskPanel";
import { AiPanel } from "./panels/AiPanel";

export function AppShell({ children }: { children: ReactNode }) {
  const { activePanel, closePanel } = usePanels();

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <main style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {children}

          {activePanel && (
            <>
              <div
                onClick={closePanel}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  zIndex: 10,
                }}
              />
              {activePanel === "task" && <TaskPanel onClose={closePanel} />}
              {activePanel === "ai" && <AiPanel onClose={closePanel} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
