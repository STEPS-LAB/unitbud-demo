import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/shared/Analytics";
import { DocumentLang } from "@/components/shared/DocumentLang";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// Montserrat used only for display headings. `preload: false` keeps it OUT of
// the critical request chain; text first paints in Inter (preloaded) and
// swaps to Montserrat when ready (display: swap). Same visual end state,
// ~50KB and one network chain removed from LCP path.
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
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
  themeColor: "#77d14d",
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
        <DocumentLang />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
