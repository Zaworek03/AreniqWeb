import type { NextConfig } from "next";

// GitHub Pages (project page): NEXT_PUBLIC_BASE_PATH=/AreniqWeb, set in the deploy workflow.
// Custom domain later: set it to "" and add public/CNAME.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // Three root layouts ((site) pl, (en) en, (admin)) leave no single layout for the 404 page.
  experimental: { globalNotFound: true },
};

export default nextConfig;
