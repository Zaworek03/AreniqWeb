type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow";
};

export function Container({ size = "default", className = "", ...props }: ContainerProps) {
  const width = size === "narrow" ? "max-w-3xl" : "max-w-6xl";
  return <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className}`} {...props} />;
}
