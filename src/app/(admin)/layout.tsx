import type { Metadata } from "next";
import { RootDocument } from "@/components/root-document";
import { SITE } from "@/lib/site";
import "../globals.css";

export { viewport } from "@/components/root-document";

// Unlinked and kept out of search engines. Not a security measure: access is enforced by Supabase.
export const metadata: Metadata = {
  metadataBase: new URL(`${SITE.url}/`),
  title: "Panel | Areniq",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument lang="pl" skipLink="Przejdź do treści">
      <main id="tresc" className="flex-1 bg-mist">
        {children}
      </main>
    </RootDocument>
  );
}
