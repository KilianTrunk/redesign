"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                { opacity: 0, x: -50 },
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
        <Section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
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
                <div ref={contentRef} className="px-4 space-y-8 order-2 lg:order-1">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                        Every data & AI journey looks different
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        We help you figure out where you are today, design where you need to get to and make change happen in a way that actually lasts.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="https://ortecha.com/solutions/"
                            className="text-[var(--color-ortecha-main)] font-bold text-lg hover:text-red-400 transition-colors inline-flex items-center gap-2 group"
                        >
                            Explore all solutions
                            <span className="transform group-hover:translate-x-1 transition-transform text-2xl">→</span>
                        </Link>
                    </div>
                </div>

                <div ref={visualRef} className="order-1 lg:order-2 flex justify-center items-center">
                    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
                            alt="AI and Technology Network"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
