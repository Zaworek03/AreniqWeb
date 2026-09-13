import { CircleIcon } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { PROBLEMS } from "@/content/product";

export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <h2 id="problem-title" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        Koń potrzebuje regularności. Grafik stajni nie zawsze na to pozwala.
      </h2>

      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {PROBLEMS.map((p) => (
          <li key={p.title} className="flex gap-5">
            <CircleIcon name={p.icon} className="text-charcoal" />
            <div>
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 max-w-md text-lg text-ink-soft">{p.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
