import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/shared/Analytics";
import { DocumentLang } from "@/components/shared/DocumentLang";

// next/font навмисно ВИМКНЕНО. Після переходу всіх секцій на system-ui
// Inter і Montserrat більше не споживаються жодним CSS-правилом, але
// next/font все одно інжектить 165 @font-face-декларацій (~60 КБ) у
// inlined CSS і навіть за preload:false час від часу генерує preload-
// хінти в _document. Це бʼє по LCP (зайві woff2 у мережевому критичному
// шляху) і роздуває HTML. Повернути власні шрифти можна буде через
// @font-face з конкретним підмножиною гліфів, якщо дизайн цього вимагатиме.

export const metadata: Metadata = {
  metadataBase: new URL("https://unitbud.com"),
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
  },
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
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <body className="min-h-full antialiased">
        <DocumentLang />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
