"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PanelType = "task" | "ai" | null;

interface PanelContextValue {
  activePanel: PanelType;
  openTaskPanel: () => void;
  openAiPanel: () => void;
  closePanel: () => void;
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  return (
    <PanelContext.Provider
      value={{
        activePanel,
        openTaskPanel: () => setActivePanel("task"),
        openAiPanel: () => setActivePanel("ai"),
        closePanel: () => setActivePanel(null),
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanels() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanels must be used within PanelProvider");
  return ctx;
}
