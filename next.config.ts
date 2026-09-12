import type { NextConfig } from "next";

// GitHub Pages (project page): NEXT_PUBLIC_BASE_PATH=/AreniqWeb, set in the deploy workflow.
// Custom domain later: set it to "" and add public/CNAME.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
