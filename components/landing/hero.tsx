"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ThreeMarketChart } from "@/components/landing/three-market-chart";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%", // improved start position
                    toggleActions: "play none none reverse", // Re-plays on enter, reverses on leave back
                }
            });

            // Initial Entrance Animation
            // Removed scrollTrigger scrub logic to prevent "disappearing content" bug on scroll up.
            // This ensures content is always visible after initial load.

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            })
                .from(textRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                }, "-=0.8")
                .from(btnRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.6")
                .from(imageRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    rotation: -10,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)",
                }, "-=1");
        },
        { scope: containerRef }
    );

    return (
        <Section
            ref={containerRef}
            // Apple-style: Subtle radial gradient highlight + mesh-like feel
            className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-12 pb-20 bg-[radial-gradient(circle_at_50%_50%,_rgb(255,245,245)_0%,_rgb(255,255,255)_50%,_rgb(249,250,251)_100%)] relative overflow-hidden"
        >
            {/* Subtle red tint overlay for atmosphere */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[var(--color-ortecha-main)]/5 via-transparent to-transparent opacity-50"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-500 uppercase tracking-widest">
                        Data made human
                    </h2>
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
                    >
                        When you trust your <span className="text-[var(--color-ortecha-main)]">data</span>,<br />
                        everything else becomes possible.
                    </h1>
                    <p
                        ref={textRef}
                        className="text-xl text-gray-600 max-w-lg leading-relaxed"
                    >
                        We help the world's leading organizations build a solid data
                        foundation. Governance, quality, and strategy tailored for real people.
                    </p>
                    <div ref={btnRef} className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/solutions"
                            className="group px-8 py-4 bg-[var(--color-ortecha-main)] text-white rounded-full font-semibold text-lg hover:bg-[var(--color-ortecha-dark-red)] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Our Solutions
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-8 py-4 bg-white text-[var(--color-ortecha-main)] border border-gray-200 rounded-full font-semibold text-lg hover:border-[var(--color-ortecha-main)] hover:bg-red-50 transition-all"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>

                <div className="order-1 lg:order-2 flex justify-center relative h-[600px] items-center">
                    <div ref={imageRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <ThreeMarketChart className="z-10" />
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FEF8F9] to-transparent pointer-events-none z-20"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FEF8F9] to-transparent pointer-events-none z-20"></div>
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FEF8F9] to-transparent pointer-events-none z-20"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FEF8F9] to-transparent pointer-events-none z-20"></div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
