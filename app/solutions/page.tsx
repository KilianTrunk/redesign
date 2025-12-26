"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SolutionCategory } from "@/components/solutions/solution-category";
import { CTA } from "@/components/landing/cta";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "Assess & Benchmark",
    description: "Understand where you stand against industry standards.",
    items: [
      { title: "DCAM® Assessment", href: "/solutions/dcam-assessment" },
      { title: "CDMC Assessment", href: "/solutions/cdmc-assessment" },
      { title: "DAMA® Assessment", href: "/solutions/dama-assessment" },
    ],
  },
  {
    title: "Strategy & Operating Model",
    description: "Define a clear path and structure for data success.",
    items: [
      { title: "Data & AI Strategy", href: "/solutions/data-ai-strategy" },
      { title: "Data & AI Operating Model", href: "/solutions/data-ai-operating-model" },
      { title: "Data & AI Governance", href: "/solutions/data-ai-governance" },
      { title: "Ortecha Trust", href: "/solutions/ortecha-trust" },
    ],
  },
  {
    title: "Enterprise Architecture & Tooling",
    description: "Build the right technical foundation.",
    items: [
      { title: "Enterprise Architecture", href: "/solutions/enterprise-architecture" },
      { title: "Zero Trust Data Entitlements", href: "/solutions/zero-trust-data-entitlements" },
      { title: "Data Tooling", href: "/solutions/data-tooling" },
      { title: "Data Lineage", href: "/solutions/data-lineage" },
      { title: "Metadata Management", href: "/solutions/metadata-management" },
    ],
  },
  {
    title: "Literacy & Culture",
    description: "Empower your people to use data effectively.",
    items: [
      { title: "Data Literacy & Culture", href: "/solutions/data-literacy-culture" },
      { title: "Data Culture Assessment", href: "/solutions/data-culture-assessment" },
      { title: "Data & AI Literacy Scan", href: "/solutions/data-ai-literacy-scan" },
    ],
  },
  {
    title: "Training & Adoption",
    description: "Build capability through expert training.",
    items: [
      { title: "Data & AI Training", href: "/solutions/data-ai-training" },
      { title: "DCAM® Training", href: "/solutions/dcam-training" },
      { title: "CDMC Training", href: "/solutions/cdmc-training" },
    ],
  },
];

export default function SolutionsPage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const solutionsGridRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Animation
    const heroTextChildren = gsap.utils.toArray(heroTextRef.current!.children);
    gsap.fromTo(
      heroTextChildren,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // Hero Image Animation
    gsap.fromTo(
      heroImageRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5,
      }
    );

    // Solutions Grid Animation
    const gridItems = gsap.utils.toArray(solutionsGridRef.current!.children);
    gsap.fromTo(
      gridItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: solutionsGridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Approach Section Animation
    const approachChildren = gsap.utils.toArray(approachRef.current!.children);
    gsap.fromTo(
      approachChildren,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: approachRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <div className="pt-24">

      {/* Hero */}
      <Section className="bg-gray-50 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={heroTextRef} className="max-w-4xl order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Practical, no-jargon solutions that turn data complexity into <span className="text-[var(--color-ortecha-main)]">clarity</span>.
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed mb-6">
              Your data is the most valuable asset you hold. But it only delivers value when you’ve built the right foundations and when people actually trust it enough to use it.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              That’s our speciality. We take a human-first approach – cutting through the complexity in data, analytics and AI to focus on what actually works for your business.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div ref={heroImageRef} className="relative w-full max-w-md aspect-square animate-float">
              <Image
                src="https://ortecha.com/wp-content/uploads/2025/10/Assess-Benchmark-Donut-Ortecha-Solutions-1022x1024.png"
                alt="Ortecha Solutions Model"
                width={600}
                height={600}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Solutions Grid */}
      <Section className="bg-white">
        <div ref={solutionsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <SolutionCategory key={index} {...category} />
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-gray-50">
        <div ref={approachRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How we work with you</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Every organisation’s path is different, so we stay agile at every stage. You get solutions that work now and keep working as you evolve.
              </p>
              <p>
                We keep it simple: a four-step approach to find where you stand, shape what success looks like, build solutions that work for real people and embed lasting change so value sticks.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What makes us different?</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">What works, not just what looks good</h3>
                <p className="text-gray-600">Frameworks built to work in the real world, not only impress in presentations.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">People are everything</h3>
                <p className="text-gray-600">Solutions only deliver value when people use them. We make sure yours do.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build for the long haul</h3>
                <p className="text-gray-600">We design for lasting impact, not quick wins that fade fast.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTA />
    </div>
  );
}
