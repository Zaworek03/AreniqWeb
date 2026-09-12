type Feature = { title: string; text: string };

/** Two-column list of short title + text items, used on dark (bottle) sections. */
export function FeatureList({ items }: { items: readonly Feature[] }) {
  return (
    <ul className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="border-t border-straw/25 pt-6">
          <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
          <p className="mt-3 max-w-md text-lg text-straw/80">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
