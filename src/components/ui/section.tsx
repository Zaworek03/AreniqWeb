import { Container } from "./container";

type SectionProps = {
  id?: string;
  tone?: "mist" | "cloud" | "charcoal";
  /** "none" when the content sets its own vertical padding (e.g. the hero). */
  spacing?: "default" | "none";
  size?: "default" | "narrow";
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const tones = {
  mist: "bg-mist text-ink",
  cloud: "bg-cloud text-ink",
  charcoal: "bg-charcoal text-mist",
} as const;

export function Section({
  id,
  tone = "mist",
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
      data-tone={tone === "charcoal" ? "dark" : undefined}
      aria-labelledby={labelledBy}
      className={`${padding} ${tones[tone]} ${className}`}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
