"use client";

import { useRef } from "react";
import Link from "next/link";
// Lucide icons removed in favor of authentic images
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
    {
        title: "Data & AI Strategy",
        description: "Define a clear path to value with a strategy that aligns with your business goals.",
        image: "/images/strategy-donut.png",
        href: "/solutions/strategy",
    },
    {
        title: "Data Governance",
        description: "Build trust and ensure compliance with robust governance frameworks.",
        image: "/images/strategy-donut.png", // Using Strategy donut as it relates to frameworks
        href: "/solutions/governance",
    },
    {
        title: "Operating Models",
        description: "Design the right people, processes, and technology structure for your data.",
        image: "/images/strategy-donut.png",
        href: "/solutions/operating-models",
    },
    {
        title: "Data Quality",
        description: "Ensure your data is accurate, complete, and reliable for decision making.",
        image: "/images/strategy-donut.png",
        href: "/solutions/quality",
    },
    {
        title: "Data Literacy",
        description: "Empower your workforce to speak data and drive adoption.",
        image: "/images/literacy-donut.png",
        href: "/solutions/literacy",
    },
    {
        title: "AI Readiness",
        description: "Prepare your data foundation for advanced analytics and AI implementation.",
        image: "/images/strategy-donut.png",
        href: "/solutions/ai-readiness",
    },
    {
        title: "Master Data Management",
        description: "Create a single source of truth for your most critical business data.",
        image: "/images/strategy-donut.png",
        href: "/solutions/mdm",
    },
    {
        title: "Training & Certification",
        description: "Upskill your team with DCAM, CDMC, and custom data training programs.",
        image: "/images/training-donut.png",
        href: "/solutions/training",
    },
];

export function Solutions() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Card Stagger Animation
            gsap.from(".solution-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            });

            // Parallax Shapes Animation (Tutorial technique)
            const parallaxTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            parallaxTl
                .to("#shape-1", { y: 200, duration: 2 }, 0)
                .to("#shape-2", { y: -150, duration: 2 }, 0)
                .to("#shape-3", { y: 100, rotation: 45, duration: 2 }, 0);
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="bg-[var(--color-ortecha-bg-subtle)] relative overflow-hidden">
            {/* Parallax Floating Elements - Increased opacity for visibility */}
            <div className="absolute inset-0 pointer-events-none">
                <div id="shape-1" className="absolute top-20 -left-20 w-96 h-96 bg-[var(--color-ortecha-main)]/10 rounded-full blur-3xl mix-blend-multiply filter"></div>
                <div id="shape-2" className="absolute top-1/2 -right-20 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl mix-blend-multiply filter"></div>
                <div id="shape-3" className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl mix-blend-multiply filter"></div>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
                >
                    Our <span className="text-[var(--color-ortecha-main)]">Solutions</span>
                </h2>
                <p className="text-xl text-gray-600 font-light">
                    Comprehensive data and AI services designed to turn your information into your greatest asset.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {SOLUTIONS.map((solution, index) => (
                    <Link
                        key={index}
                        href={solution.href}
                        className="solution-card glass-card group p-8 rounded-2xl flex flex-col h-full hover:bg-white/90 transition-all duration-300 border border-white/20 hover:border-[var(--color-ortecha-main)]/30 hover:shadow-xl"
                    >
                        <div className="relative z-10">
                            <div className="mb-6 w-20 h-20 relative">
                                <div className="absolute inset-0 bg-[var(--color-ortecha-main)]/10 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500" />
                                <img
                                    src={solution.image}
                                    alt={solution.title}
                                    className="w-full h-full object-contain relative z-10 transform group-hover:rotate-12 transition-transform duration-500"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-ortecha-main)] transition-colors duration-300">
                                {solution.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow font-medium text-opacity-80">
                            {solution.description}
                        </p>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-ortecha-main)] text-sm font-bold flex items-center gap-2">
                            Learn more <span className="text-lg">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
