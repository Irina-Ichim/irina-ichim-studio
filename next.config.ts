import type { NextConfig } from "next";
import { COMING_SOON_PATH } from "./src/contenido/comingSoon";

// Railway sets RAILWAY_ENVIRONMENT_NAME in every environment. Anything that is not production
// (today, dev) stays out of search engines.
const isPreviewDeployment = Boolean(process.env.RAILWAY_ENVIRONMENT_NAME) && process.env.RAILWAY_ENVIRONMENT_NAME !== "production";

// COMING_SOON=true in Railway shows the coming-soon page at every address while the full site
// waits behind it. Assets stay reachable so that page keeps its logo, icons and styles.
const isComingSoon = process.env.COMING_SOON === "true";
const ASSETS = String.raw`_next/|marca/|iconos/|favicon\.ico|icon\.svg|apple-icon\.png|manifest\.webmanifest`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    if (!isPreviewDeployment) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  async rewrites() {
    if (!isComingSoon) return [];
    const page = COMING_SOON_PATH.slice(1);
    return {
      beforeFiles: [
        { source: "/", destination: COMING_SOON_PATH },
        { source: `/:path((?!${page}$|${ASSETS}).+)`, destination: COMING_SOON_PATH },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
