"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ThreeOrb } from "@/components/landing/three-orb";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                contentRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    }
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-12 sm:py-20 lg:py-32 bg-gray-50 relative overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(206,46,47,0.1)_0%,_transparent_50%)] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex justify-center items-center min-h-[280px] sm:min-h-[400px] lg:min-h-[500px] order-2 lg:order-1 px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-16 lg:py-24">
                    <div className="w-full h-[280px] sm:h-[400px] lg:h-[500px]">
                        <ThreeOrb className="w-full h-full" />
                    </div>
                </div>

                <div
                    ref={contentRef}
                    className="space-y-6 sm:space-y-8 px-4 order-1 lg:order-2 opacity-100"
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-400 uppercase tracking-widest">Let's talk</h2>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Ready to make your data work for you?
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        Join leading organizations around the world who trust us to transform their data into their greatest asset.
                    </p>

                    <div className="pt-2 sm:pt-4">
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[var(--color-ortecha-main)] text-white rounded-full font-bold text-lg sm:text-xl hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-xl hover:shadow-2xl group"
                        >
                            Book a call with us
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}
