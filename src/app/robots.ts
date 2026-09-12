import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

// On a github.io project page crawlers read robots.txt from the domain root, not /AreniqWeb/.
// This file takes effect once the site moves to its own domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absUrl("/sitemap.xml"),
  };
}
