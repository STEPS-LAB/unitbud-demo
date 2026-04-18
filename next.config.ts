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
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@hookform/resolvers",
      "react-hook-form",
      "zod",
    ],
  },
};

export default nextConfig;
