"use client";

import { useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JourneyInfographic } from "./journey-infographic";

gsap.registerPlugin(ScrollTrigger);

export function SolutionsIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                contentRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                }
            ).fromTo(
                visualRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=0.5"
            );

            gsap.to(backgroundRef.current, {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-20 bg-[#343434] relative overflow-hidden">
            <div
                ref={backgroundRef}
                className="absolute inset-0 opacity-30"
                style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(206,46,47,0.3) 0%, transparent 70%)",
                    backgroundSize: "100% 200%",
                    backgroundPosition: "50% 0%",
                }}
            ></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div ref={contentRef} className="px-4 space-y-6 md:space-y-8 order-2 lg:order-2 mt-28 lg:mt-0">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                        How we work with you
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Without a clear approach, data efforts fragment. "Urgent" drowns out "important." Investment leaks into silos and value gets lost.
                    </p>

                    <div className="space-y-3">
                        <p className="text-base md:text-lg font-semibold text-white">
                            What you'll get when you partner with us:
                        </p>
                        <ul className="space-y-2.5 text-base md:text-lg text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-ortecha-main)] mt-1 flex-shrink-0">→</span>
                                <span>A clear value path showing where Data & AI create tangible outcomes</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-ortecha-main)] mt-1 flex-shrink-0">→</span>
                                <span>Laser focus on initiatives that will actually move the dial</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-ortecha-main)] mt-1 flex-shrink-0">→</span>
                                <span>A roadmap that flexes and adapts as your business shifts</span>
                            </li>
                        </ul>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/solutions"
                            className="inline-flex items-center gap-2 px-8 md:px-9 py-3 md:py-4 bg-[var(--color-ortecha-main)] text-white text-lg md:text-xl font-bold rounded-full hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-md hover:shadow-lg duration-200 group"
                        >
                            Explore all solutions
                            <span className="transform group-hover:translate-x-1 transition-transform text-lg md:text-xl">→</span>
                        </Link>
                    </div>
                </div>

                <div ref={visualRef} className="order-1 lg:order-1 flex justify-center items-center">
                    <div className="relative w-full h-[800px] sm:h-[900px] md:h-[1000px] lg:h-[1000px] 2xl:h-[700px] rounded-2xl overflow-visible">
                        <JourneyInfographic />
                    </div>
                </div>
            </div>
        </Section>
    );
}
