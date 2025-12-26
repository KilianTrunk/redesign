"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/section";
import { CTA } from "@/components/landing/cta";

gsap.registerPlugin(ScrollTrigger);

interface Solution {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  features?: string[];
}

interface SolutionContentProps {
  solution: Solution;
}

export function SolutionContent({ solution }: SolutionContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const longDescriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3
      });

      // Animate badge
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
      // Animate title with stronger effect
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      }, "-=0.4")
      // Animate description
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      // Animate long description
      .from(longDescriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4");

      // Separate animation for features section
      if (solution.features) {
        gsap.fromTo(
          featuresRef.current!.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pt-24">
      {/* Hero */}
      <Section className="bg-gray-50 pb-20">
        <div className="max-w-4xl">
          <div ref={badgeRef} className="mb-4">
            <span className="text-sm font-medium text-[var(--color-ortecha-main)] bg-[var(--color-ortecha-main)]/10 px-3 py-1 rounded-full">
              {solution.category}
            </span>
          </div>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {solution.title}
          </h1>
          <p
            ref={descriptionRef}
            className="text-xl text-gray-600 leading-relaxed mb-8"
          >
            {solution.description}
          </p>
          <p
            ref={longDescriptionRef}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {solution.longDescription}
          </p>
        </div>
      </Section>

      {/* Features */}
      {solution.features && (
        <Section className="bg-white">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What You'll Get</h2>
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--color-ortecha-main)] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTA />
    </div>
  );
}
