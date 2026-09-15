import Link from "next/link";

// Areniq wordmark: monoline, rounded strokes, redrawn from the team's hand sketch.
// The "A" is a single rising stroke meeting a vertical; the dot over "i" is the gold accent.
export const WORDMARK_VIEWBOX = "-6 6 320 138";

export const WORDMARK_PATHS = [
  "M6 100 L56 16 V100",
  "M80 100 V58 M80 78 C80 66 88 58 104 58",
  "M124 80 H162 C162 67 153 58 143 58 C131 58 122 68 122 79 C122 91 131 100 143 100 C151 100 157 97 160 92",
  "M184 100 V58 M184 75 C184 64 192 58 202 58 C214 58 220 65 220 76 V100",
  "M242 58 V100",
  "M304 58 V134 M304 79 C304 67 296 58 284 58 C272 58 264 67 264 79 C264 91 272 100 284 100 C296 100 304 91 304 79",
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        {WORDMARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle cx="242" cy="38" r="7.5" fill="var(--color-gold)" />
    </svg>
  );
}

/** The "A" from the wordmark on its own, for icons and decoration. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-4 6 70 104" className={className} aria-hidden="true">
      <path
        d="M6 100 L56 16 V100"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ href = "/", label = "Areniq, strona główna", className = "" }: { href?: string; label?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center ${className}`} aria-label={label}>
      <Wordmark className="h-9 w-auto sm:h-10" />
    </Link>
  );
}
