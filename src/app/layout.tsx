import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PACE",
  description:
    "PACE is an AI companion that doesn't just remind you of deadlines — it builds your day for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
