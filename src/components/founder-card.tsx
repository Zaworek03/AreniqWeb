import Image from "next/image";
import type { Founder } from "@/content/about";

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5] rounded-[1.5rem] bg-sand">
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
            className="flex size-full items-end bg-[repeating-linear-gradient(90deg,#dccaa4_0_3.5rem,#d6c39b_3.5rem_7rem)] p-6 transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
          >
            <span className="font-display text-8xl leading-none font-bold text-bottle/85 transition-colors duration-300 group-hover:text-leather">
              {founder.initials}
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold">{founder.name}</h3>
      <p className="mt-3 text-ink-soft">{founder.bio}</p>
    </article>
  );
}
