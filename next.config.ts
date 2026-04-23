import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/house/:slug",
        destination: "/mb75",
        permanent: false,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/*.webp",
      },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unitbud.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    deviceSizes: [360, 400, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    // Інлайнить весь CSS у HTML через <style>, замість render-blocking <link>.
    // Потрібно разом з dynamic рендером (див. app/page.tsx "export const
    // dynamic"), бо для prerendered-сторінок Next.js свідомо пропускає інлайн
    // (щоб не дублювати CSS у статичному HTML + RSC payload).
    // Ефект за Lighthouse: зняття ~19 КБ render-blocking CSS, -700 мс LCP/FCP.
    inlineCss: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@hookform/resolvers",
      "react-hook-form",
      "zod",
    ],
  },
  // Проставляємо immutable-кешування для статичних зображень і шрифтів
  // з /public (інакше Vercel віддає max-age=0). Це допомагає повторним
  // візитам і не впливає на перший візит (PageSpeed), але корисно загалом.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(.*\\.(?:webp|avif|svg|png|jpg|jpeg|ico|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
