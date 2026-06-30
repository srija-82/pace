"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconFlag3,
  IconCalendar,
  IconSettings,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/deadlines", label: "Deadlines", icon: IconFlag3 },
  { href: "/calendar", label: "Calendar", icon: IconCalendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      style={{
        width: 64,
        background: "var(--bg-sidebar)",
        borderRight: "0.5px solid var(--border-default)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        gap: 24,
        flexShrink: 0,
        height: "100%",
      }}
    >
      <Link href="/dashboard" aria-label="PACE home">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--accent-cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              background: "var(--bg-canvas)",
              transform: "rotate(45deg)",
              borderRadius: 1,
            }}
          />
        </div>
      </Link>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link key={href} href={href} aria-label={label} aria-current={active ? "page" : undefined}>
              <Icon
                size={20}
                stroke={1.75}
                color={active ? "var(--accent-cream)" : "var(--text-tertiary)"}
              />
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: "auto" }}>
        <Link href="/settings" aria-label="Settings" aria-current={pathname?.startsWith("/settings") ? "page" : undefined}>
          <IconSettings
            size={20}
            stroke={1.75}
            color={pathname?.startsWith("/settings") ? "var(--accent-cream)" : "var(--text-tertiary)"}
          />
        </Link>
      </div>
    </nav>
  );
}
