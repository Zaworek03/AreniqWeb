import { RootDocument, rootMetadata } from "@/components/root-document";
import { SiteChrome } from "@/components/site-chrome";
import { getDictionary } from "@/content";
import "../globals.css";

export { viewport } from "@/components/root-document";

export const metadata = rootMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument lang="en" skipLink={getDictionary("en").chrome.skipLink}>
      <SiteChrome locale="en">{children}</SiteChrome>
    </RootDocument>
  );
}
