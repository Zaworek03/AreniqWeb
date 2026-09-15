// Shared admin styles, built on the site tokens (mist, cloud, charcoal, gold).

export const adminField =
  "mt-2 block h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-ink placeholder:text-ink-soft/70 " +
  "focus-visible:border-charcoal";

export const adminSelect = adminField + " pr-8";

export function Panel({ title, action, children }: { title?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-cloud p-4 text-ink">{children}</p>;
}
