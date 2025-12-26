"use client";

import { useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESOURCES = [
    {
        title: "Ortecha Appoints Two UK Partners as Growth Momentum Continues",
        image: "https://ortecha.com/wp-content/uploads/2025/12/London-skyline-768x432.png",
        href: "/resources",
    },
    {
        title: "Data Management That Thinks",
        image: "https://ortecha.com/wp-content/uploads/2025/11/Data-Management-that-Thinks-Header-768x432.png",
        href: "/resources",
    },
    {
        title: "Ortecha welcomes Stephen Gatchell as Partner and Head of AI Strategy",
        image: "https://ortecha.com/wp-content/uploads/2025/10/OBG-Press-Release-768x432.png",
        href: "/resources",
    },
];

export function Resources() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".resource-card",
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
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-gray-900">Resources & Insights</h2>
                        <p className="text-xl text-gray-600">Useful resources for your data and AI journey.</p>
                    </div>
                    <Link
                        href="/resources"
                        className="px-6 py-3 bg-white text-[var(--color-ortecha-main)] border border-gray-200 rounded-full font-semibold hover:border-[var(--color-ortecha-main)] hover:bg-gray-50 transition-all"
                    >
                        Explore resources
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {RESOURCES.map((item, index) => (
                        <Link key={index} href={item.href} className="resource-card group block">
                            <div className="rounded-2xl overflow-hidden mb-4 relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    Read More
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-ortecha-main)] transition-colors leading-tight">
                                {item.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
}
