"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import type { Dictionary } from "@/content";
import { type Locale, alternatePath, waitlistPath } from "@/lib/i18n";
import { navLinks } from "@/lib/site";

export function SiteHeader({ t, locale }: { t: Dictionary["chrome"]; locale: Locale }) {
  const pathname = usePathname();
  const NAV_LINKS = navLinks(locale, t.nav);
  const WAITLIST_HREF = waitlistPath(locale);
  const other: Locale = locale === "pl" ? "en" : "pl";
  const switchHref = alternatePath(pathname, other);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(64);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    // Keep keyboard and screen-reader focus inside the menu while it covers the page.
    const behind = [document.getElementById("tresc"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    behind.forEach((el) => (el.inert = true));
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      behind.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  // Only real pages count as current; "/#section" links stay neutral.
  const isCurrent = (href: string) => !href.includes("#") && pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 border-b border-cloud/80 bg-mist/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
          <Logo href={NAV_LINKS[0].href.split("#")[0]} label={t.homeLabel} className="text-charcoal" />

          <nav aria-label={t.navLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="rounded-full px-3 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-cloud/60 hover:text-ink aria-[current=page]:bg-cloud/70 aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              hrefLang={t.languageSwitch.hrefLang}
              lang={t.languageSwitch.hrefLang}
              aria-label={t.languageSwitch.label}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-[15px] font-semibold text-ink-soft hover:bg-cloud/60 hover:text-ink"
            >
              {t.languageSwitch.short}
            </Link>
            <div className="hidden sm:block">
              <ButtonLink href={WAITLIST_HREF} className="min-h-11 px-5 text-[15px]">
                {t.cta}
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-charcoal hover:bg-cloud/60 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.closeMenu : t.openMenu}
              onClick={() => {
                // The funding bar sits above the header until it scrolls away, so place the menu under the header's real edge.
                setMenuTop(Math.max(0, headerRef.current?.getBoundingClientRect().bottom ?? 64));
                setOpen((v) => !v);
              }}
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Outside <header>: its backdrop-filter would become the containing block for `fixed`. */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label={t.navMobileLabel}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-mist md:hidden"
            style={{ top: menuTop }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-8 py-8">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="border-b border-cloud">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      className="block py-4 font-display text-3xl font-semibold text-ink aria-[current=page]:text-slate"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href={WAITLIST_HREF} onClick={close} className="w-full">
                {t.cta}
              </ButtonLink>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
