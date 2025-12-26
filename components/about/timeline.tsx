"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout>();
    const isAnimatingRef = useRef(false);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const startAnimation = () => {
            const totalWidth = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            const remainingDistance = totalWidth - currentScroll;

            // Calculate duration based on remaining distance (proportional speed)
            const speed = totalWidth / 25; // pixels per second
            const duration = remainingDistance / speed;

            if (remainingDistance <= 0) return; // Already at the end

            isAnimatingRef.current = true;
            tweenRef.current = gsap.to(container, {
                scrollLeft: totalWidth,
                duration: duration,
                ease: "none",
                onComplete: () => {
                    isAnimatingRef.current = false;
                }
            });
        };

        const stopAnimation = () => {
            if (tweenRef.current) {
                tweenRef.current.kill();
                tweenRef.current = null;
            }
            isAnimatingRef.current = false;
        };

        const handleUserInteraction = () => {
            if (!isAnimatingRef.current) return;

            stopAnimation();

            // Clear existing timeout
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }

            // Set new timeout to restart animation after 2 seconds
            inactivityTimeoutRef.current = setTimeout(() => {
                startAnimation();
            }, 2000);
        };

        const handleMouseDown = (e: MouseEvent) => {
            isDraggingRef.current = true;
            startXRef.current = e.pageX - container.offsetLeft;
            scrollLeftRef.current = container.scrollLeft;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            handleUserInteraction();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
            container.scrollLeft = scrollLeftRef.current - walk;
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            container.style.cursor = 'grab';
            container.style.userSelect = 'auto';
        };

        const handleMouseLeave = () => {
            isDraggingRef.current = false;
            container.style.cursor = 'grab';
            container.style.userSelect = 'auto';
        };

        // Set initial cursor
        container.style.cursor = 'grab';

        // Listen to user interaction
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('touchstart', handleUserInteraction);
        container.addEventListener('wheel', handleUserInteraction);

        // Start initial animation
        startAnimation();

        return () => {
            stopAnimation();
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('touchstart', handleUserInteraction);
            container.removeEventListener('wheel', handleUserInteraction);
        };
    }, []);

    return (
        <div className="py-8">
            <div
                ref={scrollRef}
                className="overflow-x-auto pb-12 custom-scrollbar"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#CE2E2F #E5E7EB',
                }}
            >
                <div className="flex gap-4 md:gap-8 min-w-max px-4">
                    {TIMELINE_EVENTS.map((event, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-[280px] md:w-[320px] flex-shrink-0 relative overflow-hidden group hover:border-[var(--color-ortecha-main)]/30 hover:shadow-md transition-all"
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
        </div>
    );
}
