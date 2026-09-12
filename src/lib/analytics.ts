// Umami (cookieless, no consent banner needed). Website ID comes from the build env;
// empty = analytics off, and every call below becomes a no-op.
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";

type Umami = { track: (event: string, data?: Record<string, string | number>) => void };

export function trackEvent(event: string, data?: Record<string, string | number>) {
  (window as Window & { umami?: Umami }).umami?.track(event, data);
}
