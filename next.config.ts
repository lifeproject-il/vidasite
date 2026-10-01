import type { NextConfig } from "next";

// Security headers applied to every page.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Serve the smallest modern format the browser supports.
    formats: ["image/avif", "image/webp"],
    // Optimized images are cached for a year (file names change when images change).
    minimumCacheTTL: 31536000,
    // Fallback: images not copied locally are optimized straight from WordPress.
    remotePatterns: [{ protocol: "https", hostname: "vidahome.co.il", pathname: "/wp-content/uploads/**" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
