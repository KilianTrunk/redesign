"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ValueProp() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const children = gsap.utils.toArray(textRef.current!.children);

            gsap.fromTo(
                children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                visualRef.current,
                { opacity: 0, scale: 0.8, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(206,46,47,0.05)_0%,_transparent_50%)] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div ref={textRef} className="px-4 space-y-8 order-2 lg:order-1">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                        Real people making <span className="text-[var(--color-ortecha-main)]">data & AI</span><br />
                        work for real people
                    </h1>

                    <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                        <p>
                            We're not just consultants. We're practitioners who've done the work and lived through the same challenges and headaches you're facing.
                        </p>
                        <p>
                            We cut through the noise and bring battle-tested experience to design data & AI solutions that genuinely fit your business, are embraced by your people and scale without breaking.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="https://ortecha.com/solutions/"
                            className="inline-block px-8 py-4 bg-[var(--color-ortecha-main)] text-white rounded-full font-semibold text-lg hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Let's get started
                        </Link>
                    </div>
                </div>

                <div ref={visualRef} className="order-1 lg:order-2 flex justify-center items-center">
                    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                            alt="Data Analytics Dashboard"
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
