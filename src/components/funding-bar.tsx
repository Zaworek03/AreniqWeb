import Image from "next/image";
import fundingLogos from "@/assets/fepw-rp-ue.png";
import { Container } from "./ui/container";

export const FUNDING_ALT =
  "Fundusze Europejskie dla Polski Wschodniej, Rzeczpospolita Polska, Dofinansowane przez Unię Europejską";

// EU funding marking (FEPW 2021–2027, horizontal full-colour version). Shown above the header
// so it is visible on arrival without scrolling. Keep it on a white background, unmodified.
export function FundingBar() {
  return (
    <div className="bg-white">
      <Container className="flex justify-center py-2 sm:py-3">
        <Image src={fundingLogos} alt={FUNDING_ALT} priority sizes="(min-width: 640px) 680px, 100vw" className="h-auto w-full max-w-[680px]" />
      </Container>
    </div>
  );
}
