import type { Metadata } from "next";

// Unlinked and kept out of search engines. Not a security measure: access is enforced by Supabase.
export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="tresc" className="flex-1 bg-mist">
      {children}
    </main>
  );
}
