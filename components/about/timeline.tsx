"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_EVENTS = [
    { year: "2010", title: "Founded in the UK" },
    { year: "2015", title: "Founding DCAM Partner with EDM Association" },
    { year: "2017", title: "Expanded to USA" },
    { year: "2021", title: "One of the first CDMC Partners with EDM Association" },
    { year: "2023", title: "Founding Partner of EDM Association's Data Excellence Program" },
    { year: "2024", title: "Enter growth partnership with Debrett's" },
    { year: "2025", title: "Wellington joined to create Ortecha Canada" },
    { year: "2025", title: "Joined forces with Novus-i2" },
    { year: "2025", title: "Appointed first Chief Data Officer" },
    { year: "2025", title: "Announced merger with Broadgate Consultants" },
];

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Horizontal scroll animation
        const container = containerRef.current;
        if (!container) return;

        // Simple enter animation for items
        gsap.from(".timeline-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="py-8 overflow-x-auto pb-12 hide-scrollbar">
            <div className="flex gap-4 md:gap-8 min-w-max px-4">
                {TIMELINE_EVENTS.map((event, index) => (
                    <div
                        key={index}
                        className="timeline-item bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-[280px] md:w-[320px] flex-shrink-0 relative overflow-hidden group hover:border-[var(--color-ortecha-main)]/30 hover:shadow-md transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-[var(--color-ortecha-main)] group-hover:opacity-20 transition-opacity">
                            {event.year}
                        </div>
                        <div className="relative z-10 pt-2">
                            <div className="text-[var(--color-ortecha-main)] font-bold text-2xl mb-3">
                                {event.year}
                            </div>
                            <div className="text-gray-800 font-medium text-lg leading-relaxed">
                                {event.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
