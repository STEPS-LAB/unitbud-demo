import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/shared/Analytics";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unitbud.com"),
  title: {
    default: "Unitbud — Преміальне каркасне будівництво будинків під ключ",
    template: "%s | Unitbud",
  },
  description:
    "Unitbud — будівництво каркасних будинків під ключ по всій Україні. Від 75 днів, гарантія 10 років, прозорий процес. Безкоштовна консультація.",
  keywords: [
    "каркасні будинки",
    "будівництво будинків під ключ",
    "будинок під ключ Україна",
    "каркасне будівництво",
    "unitbud",
  ],
  authors: [{ name: "Unitbud" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://unitbud.com",
    siteName: "Unitbud",
    title: "Unitbud — Преміальне каркасне будівництво",
    description: "Будівництво будинків під ключ. Від 75 днів, гарантія 10 років.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Unitbud" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unitbud — Каркасне будівництво",
    description: "Будівництво будинків під ключ по всій Україні",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#728c4a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${montserrat.variable}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <body className="min-h-full antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
