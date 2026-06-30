import { PanelProvider } from "@/components/PanelContext";
import { AppShell } from "@/components/AppShell";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <AppShell>{children}</AppShell>
    </PanelProvider>
  );
}
