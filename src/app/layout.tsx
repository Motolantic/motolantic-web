import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motolantic | Global Parts. Local Confidence.",
  description:
    "Motolantic membantu bengkel dan pemilik mobil di Indonesia menemukan serta memesan suku cadang lintas negara melalui pemeriksaan kebutuhan, pencarian sumber, dan informasi biaya yang jelas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-motolantic-warmWhite text-motolantic-navy antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
