import { Benefits } from "@/components/sections/benefits";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problem } from "@/components/sections/problem";
import { Specs } from "@/components/sections/specs";
import { Waitlist } from "@/components/sections/waitlist";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Specs />
      <Faq />
      <Waitlist />
    </>
  );
}
