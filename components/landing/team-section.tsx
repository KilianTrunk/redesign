"use client";

import { useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "Ben Clinch",
        role: "Partner & Chief Data Officer",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Ben-Clinch-Red-Donut-768x768.webp",
    },
    {
        name: "Araminta Huitson",
        role: "Head of People, Comms & Culture",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Araminta-Red-Donut-768x768.webp",
    },
    {
        name: "Tanya Wilson",
        role: "Global Head of Business Development",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Tanya-W-Red-Donut-768x768.webp",
    },
    {
        name: "Pete Youngs",
        role: "Managing Partner",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Pete-Red-Donut-768x768.webp",
    },
    {
        name: "Mark McQueen",
        role: "Managing Partner, North America",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Mark-Red-Donut-768x768.webp",
    },
];

export function TeamSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".team-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <Section ref={containerRef} className="py-20 bg-[var(--color-ortecha-bg-subtle)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="max-w-2xl space-y-4">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Our people, your team</h3>
                        <p className="text-xl text-gray-700">
                            When you work with us, you don’t get consultants who observe from a distance. You get teammates who get stuck in alongside you.
                        </p>
                        <p className="text-xl text-gray-700">
                            You’ll know exactly who’s on your team and they’ll be there from day one all the way through to the end – no rotating cast.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/about-us"
                            className="px-6 py-3 bg-[var(--color-ortecha-main)] text-white rounded-full font-semibold hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-md hover:shadow-lg inline-block"
                        >
                            Meet the team
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {TEAM.map((member, index) => (
                        <div key={index} className="team-card flex-shrink-0 w-[220px] snap-center">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-base text-gray-900">{member.name}</h4>
                                    <p className="text-xs text-[var(--color-ortecha-main)] font-medium mt-1">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
