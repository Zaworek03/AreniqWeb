import { Container } from "./container";

type SectionProps = {
  id?: string;
  tone?: "straw" | "sand" | "bottle";
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
};

const tones = {
  straw: "bg-straw text-ink",
  sand: "bg-sand text-ink",
  bottle: "bg-bottle text-straw",
} as const;

export function Section({ id, tone = "straw", labelledBy, className = "", children }: SectionProps) {
  return (
    <section id={id} data-tone={tone === "bottle" ? "dark" : undefined} aria-labelledby={labelledBy} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
