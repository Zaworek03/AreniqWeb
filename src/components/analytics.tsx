import Script from "next/script";
import { UMAMI_WEBSITE_ID } from "@/lib/analytics";

export function Analytics() {
  if (!UMAMI_WEBSITE_ID) return null;
  return <Script src="https://cloud.umami.is/script.js" data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />;
}
