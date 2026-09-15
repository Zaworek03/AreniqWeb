import { Section } from "@/components/ui/section";
import type { FaqItem } from "@/lib/content";

export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <Section id="faq" size="narrow" labelledBy="faq-title">
      <h2 id="faq-title" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div className="mt-10 border-t border-ink/15">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-ink/15">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 shrink-0 text-charcoal transition-transform duration-200 group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="max-w-2xl pb-6 text-lg text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
