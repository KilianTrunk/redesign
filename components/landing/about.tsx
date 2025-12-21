"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: "top 80%",
                },
            });

            tl.from(".about-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
                .from(".about-text", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                }, "-=0.5");
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div ref={textContainerRef} className="space-y-8">
                    <h2 className="about-title text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        When you trust your <span className="text-[var(--color-ortecha-main)]">data</span>,<br />
                        everything else becomes possible.
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p className="about-text">
                            At Ortecha, we believe that data is more than just numbers and records—it's the lifeblood of your organization. But without trust, data is a liability.
                        </p>
                        <p className="about-text">
                            We specialize in making data human. That means creating frameworks, strategies, and cultures where people understand, value, and confidently use data to drive innovation.
                        </p>
                        <p className="about-text font-medium text-gray-900">
                            From global banks to healthcare providers, we help complex organizations find clarity in chaos.
                        </p>
                    </div>
                </div>

                <div className="relative h-full min-h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="/images/about-us.png"
                        alt="Ortecha Team"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </Section>
    );
}
