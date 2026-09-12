import Link from "next/link";

// Placeholder wordmark until the real logo arrives.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="Areniq, strona główna">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="currentColor" />
        <path d="M16 7v9l6 4" stroke="var(--color-hay)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-tight">areniq</span>
    </Link>
  );
}
