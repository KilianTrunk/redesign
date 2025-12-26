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
        <Section ref={containerRef} className="py-12 lg:py-20 bg-[var(--color-ortecha-bg-subtle)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 lg:mb-12 gap-6 lg:gap-8">
                    <div className="max-w-2xl space-y-3 md:space-y-4">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Our people, your team</h3>
                        <p className="text-lg md:text-xl text-gray-700">
                            When you work with us, you don't get consultants who observe from a distance. You get teammates who get stuck in alongside you.
                        </p>
                        <p className="text-lg md:text-xl text-gray-700">
                            You'll know exactly who's on your team and they'll be there from day one all the way through to the end – no rotating cast.
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <Link
                            href="/about-us"
                            className="px-6 py-3 bg-[var(--color-ortecha-main)] text-white rounded-full font-semibold hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-md hover:shadow-lg inline-block w-full md:w-auto text-center"
                        >
                            Meet the team
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:overflow-x-auto lg:snap-x lg:snap-mandatory gap-4 md:gap-5 lg:gap-6 lg:pb-8 lg:-mx-4 lg:px-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {TEAM.map((member, index) => (
                        <div key={index} className="team-card lg:flex-shrink-0 lg:w-auto lg:flex-1 lg:snap-center">
                            <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-3 md:p-5 lg:p-6">
                                <div className="aspect-square relative">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-lg lg:rounded-xl transition-transform duration-500 hover:scale-105 hover:z-10 relative"
                                    />
                                </div>
                                <div className="pt-3 md:pt-4 pb-1 md:pb-2 px-1 md:px-2">
                                    <h4 className="font-bold text-sm md:text-base text-gray-900">{member.name}</h4>
                                    <p className="text-[10px] md:text-xs text-[var(--color-ortecha-main)] font-medium mt-1">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
