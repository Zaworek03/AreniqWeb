import Link from "next/link";

type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out-soft active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-bottle text-straw hover:bg-bottle-deep",
  secondary: "text-bottle shadow-[inset_0_0_0_2px_var(--color-bottle)] hover:bg-bottle hover:text-straw",
  light: "bg-straw text-bottle hover:bg-hay",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
