import { Hero } from "@/components/landing/hero";
import { ValueProp } from "@/components/landing/value-prop";
import { SolutionsIntro } from "@/components/landing/solutions-intro";
import { ParallaxCards } from "@/components/landing/parallax-cards";
import { TeamSection } from "@/components/landing/team-section";
import { ClientLogos } from "@/components/landing/client-logos";
import { Testimonials } from "@/components/landing/testimonials";
import { Resources } from "@/components/landing/resources";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden w-full">
      <Hero />
      <ValueProp />
      <SolutionsIntro />
      <ParallaxCards />
      <TeamSection />
      <ClientLogos />
      <Testimonials />
      <Resources />
      <CTA />
    </div>
  );
}
