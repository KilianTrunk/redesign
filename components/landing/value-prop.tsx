"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ValueProp() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

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
                        Real people making<br />
                        <span className="text-[var(--color-ortecha-main)]">data&nbsp;&amp;&nbsp;AI</span> work for real people
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
                            href="/solutions"
                            className="inline-block px-8 py-4 bg-[var(--color-ortecha-main)] text-white rounded-full font-semibold text-lg hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-lg hover:shadow-xl"
                        >
                            Let's get started
                        </Link>
                    </div>
                </div>

                <div ref={visualRef} className="order-1 lg:order-2 flex justify-center items-center">
                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-black">
                        {!isPlaying ? (
                            <div 
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => setIsPlaying(true)}
                            >
                                <Image
                                    src="https://ortecha.com/wp-content/uploads/2025/11/Data-AI-Strategy-Pocket-Guide-Overlay-Ortecha.png"
                                    alt="Ortecha's Pocket Guide to Data & AI Strategy"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="w-20 h-20 bg-[var(--color-ortecha-main)] text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-8 h-8 ml-1 fill-white" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <iframe 
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/N5DFe5qzx6s?autoplay=1&rel=0" 
                                title="Ortecha's Pocket Guide to Data & AI Strategy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}
