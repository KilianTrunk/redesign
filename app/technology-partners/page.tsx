"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { CTA } from "@/components/landing/cta";
import { ClientLogos } from "@/components/landing/client-logos";
import { CheckCircle2, Beaker, Zap, Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyPartnersPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const innovationTextRef = useRef<HTMLDivElement>(null);
    const innovationImageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Animation
        const heroChildren = gsap.utils.toArray(heroRef.current!.children);
        gsap.fromTo(
            heroChildren,
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

        // Innovation Text Animation
        const innovationTextChildren = gsap.utils.toArray(innovationTextRef.current!.children);
        gsap.fromTo(
            innovationTextChildren,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: innovationTextRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Innovation Image Animation
        gsap.fromTo(
            innovationImageRef.current,
            { opacity: 0, scale: 0.9, x: 30 },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: innovationImageRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    });

    return (
        <div className="pt-24">
            {/* Hero */}
            <Section className="bg-gray-50">
                <div ref={heroRef} className="max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        The right technology, <span className="text-[var(--color-ortecha-main)]">implemented in the right way</span>.
                    </h1>
                    <p className="text-2xl text-gray-600 leading-relaxed mb-6">
                        Technology is only as good as the way in which you use it. We partner with some of the best in the business, applying the right tools in the right way so you move faster, adapt smarter and achieve more.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We’re not here to sell software. We’re here to understand what you’re trying to solve and find the best way to solve it. Sometimes that means bringing in a partner platform. Sometimes it’s getting far more from what you already own.
                    </p>
                </div>
            </Section>

            {/* Innovation Lab */}
            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div ref={innovationTextRef}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-ortecha-pale-pink)]/20 text-[var(--color-ortecha-main)] rounded-full text-sm font-bold mb-6">
                            <Beaker className="w-5 h-5" />
                            Ortecha Innovation Lab
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovation in Real Time</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-[var(--color-ortecha-main)]" />
                                    Working systems you can see, touch and understand
                                </h3>
                                <p className="text-gray-600">No theory. We build working prototypes, not pretty presentations.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                    <Users className="w-5 h-5 text-[var(--color-ortecha-main)]" />
                                    We live what we teach
                                </h3>
                                <p className="text-gray-600">
                                    The Ortecha Innovation Lab is our proving ground – where we test and refine process and tool configurations that automate end-to-end data and business processes.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div ref={innovationImageRef} className="relative h-full min-h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 transition-all group-hover:scale-105">
                            <img
                                src="https://ortecha.com/wp-content/uploads/2025/11/Data-Management-that-Thinks-Header-768x432.png"
                                alt="Innovation Lab"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white font-medium drop-shadow-md">
                            <p>Ortecha Innovation Lab</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Who we've worked with */}
            <ClientLogos />

            <CTA />
        </div>
    );
}
