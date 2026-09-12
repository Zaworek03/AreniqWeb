import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absUrl("/o-nas/"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
