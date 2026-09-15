import { Analytics } from "@/components/analytics";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

/** Header, footer, motion and analytics for public pages (the admin panel renders without them). */
export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale).chrome;
  return (
    <>
      <MotionProvider>
        <SiteHeader t={t} locale={locale} />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <SiteFooter t={t} locale={locale} />
      </MotionProvider>
      <Analytics />
    </>
  );
}
