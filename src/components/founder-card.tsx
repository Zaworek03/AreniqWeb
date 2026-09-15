import Image from "next/image";
import type { Founder } from "@/content";
import { LogoMark } from "./logo";

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5] rounded-[1.5rem] bg-cloud">
        {founder.photo ? (
          <Image
            src={founder.photo}
            alt={founder.name}
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="size-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="bg-deck-glow relative flex size-full items-end p-6 transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
          >
            <LogoMark className="absolute -top-6 -right-4 h-60 w-auto text-charcoal/10 transition-transform duration-500 ease-out-soft group-hover:-translate-y-2" />
            <span className="relative font-display text-8xl leading-none font-extrabold text-charcoal">
              {founder.initials}
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">{founder.name}</h3>
      <p className="mt-3 text-ink-soft">{founder.bio}</p>
    </article>
  );
}
