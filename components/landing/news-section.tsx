"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Newspaper } from "lucide-react";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray(".news-card");

            cards.forEach((card: any, index: number) => {
                const direction = index % 2 === 0 ? -100 : 100;

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        x: direction,
                        rotationY: direction > 0 ? 15 : -15,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.to(card, {
                    y: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-12 bg-white">
            <div ref={triggerRef} className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Merger News Card */}
                    <div className="news-card flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src="https://ortecha.com/wp-content/uploads/2025/10/OBG-Press-Release.png"
                                alt="Ortecha and Broadgate Merger"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-between p-8 flex-grow">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="p-2 bg-red-50 text-[var(--color-ortecha-main)] rounded-lg">
                                        <Newspaper className="w-5 h-5" />
                                    </span>
                                    <span className="text-sm font-bold tracking-wider text-[var(--color-ortecha-main)] uppercase">Latest News</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[var(--color-ortecha-main)] transition-colors">
                                    Ortecha and Broadgate Consultants Announce Merger
                                </h3>
                                <p className="text-gray-600">
                                    Uniting their Data & Technology Expertise to deliver unparalleled value.
                                </p>
                            </div>
                            <div className="pt-8 mt-auto">
                                <Link
                                    href="/resources"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-ortecha-main)] border border-gray-200 rounded-full font-semibold text-lg hover:border-[var(--color-ortecha-main)] hover:bg-red-50 transition-all group-hover:shadow-md"
                                >
                                    Read announcement <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Whitepaper Card */}
                    <div className="news-card flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src="https://ortecha.com/wp-content/uploads/2025/11/Data-Management-that-Thinks-Header.png"
                                alt="Data Management That Thinks"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-between p-8 flex-grow">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="p-2 bg-red-50 text-[var(--color-ortecha-main)] rounded-lg shadow-sm">
                                        <FileText className="w-5 h-5" />
                                    </span>
                                    <span className="text-sm font-bold tracking-wider text-[var(--color-ortecha-main)] uppercase">Featured Whitepaper</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[var(--color-ortecha-main)] transition-colors">
                                    Data Management That Thinks
                                </h3>
                                <p className="text-gray-600">
                                    Leveraging AI and automation to deliver verifiable and intelligent governance at scale.
                                </p>
                            </div>
                            <div className="pt-8 mt-auto">
                                <Link
                                    href="/resources"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-ortecha-main)] border border-gray-200 rounded-full font-semibold text-lg hover:border-[var(--color-ortecha-main)] hover:bg-red-50 transition-all group-hover:shadow-md"
                                >
                                    Get your copy <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
