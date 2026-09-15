import { Analytics } from "@/components/analytics";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Header, footer, motion and analytics for public pages (the admin panel renders without them). */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionProvider>
        <SiteHeader />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </MotionProvider>
      <Analytics />
    </>
  );
}
