import Link from "next/link";

/** Areniq mark from the pitch deck: four overlapping outline circles. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="23 23 354 354" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="22">
        <circle cx="200" cy="121" r="88.5" />
        <circle cx="121" cy="200" r="88.5" />
        <circle cx="279" cy="200" r="88.5" />
        <circle cx="200" cy="279" r="88.5" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Areniq, strona główna">
      <LogoMark className="size-8" />
      <span className="font-display text-2xl font-extrabold tracking-tight">Areniq</span>
    </Link>
  );
}
