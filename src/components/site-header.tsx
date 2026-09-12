"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import { NAV_LINKS, WAITLIST_HREF } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
      <header className="sticky top-0 z-40 border-b border-sand/80 bg-straw/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
          <Logo className="text-bottle" />

          <nav aria-label="Główna" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="rounded-full px-3 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-sand/60 hover:text-ink aria-[current=page]:bg-sand/70 aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href={WAITLIST_HREF} className="min-h-11 px-5 text-[15px]">
                Zapisz się na listę
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-bottle hover:bg-sand/60 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setOpen((v) => !v)}
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
            aria-label="Główna (mobilna)"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-straw md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-8 py-8">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="border-b border-sand">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      className="block py-4 font-display text-3xl font-semibold text-ink aria-[current=page]:text-leather"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href={WAITLIST_HREF} onClick={close} className="w-full">
                Zapisz się na listę
              </ButtonLink>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
