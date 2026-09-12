import { Container } from "./container";

type SectionProps = {
  id?: string;
  tone?: "straw" | "sand" | "bottle";
  /** "none" when the content sets its own vertical padding (e.g. the hero). */
  spacing?: "default" | "none";
  size?: "default" | "narrow";
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const tones = {
  straw: "bg-straw text-ink",
  sand: "bg-sand text-ink",
  bottle: "bg-bottle text-straw",
} as const;

export function Section({
  id,
  tone = "straw",
  spacing = "default",
  size = "default",
  labelledBy,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const padding = spacing === "default" ? "py-20 sm:py-28" : "";
  return (
    <section
      id={id}
      data-tone={tone === "bottle" ? "dark" : undefined}
      aria-labelledby={labelledBy}
      className={`${padding} ${tones[tone]} ${className}`}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
