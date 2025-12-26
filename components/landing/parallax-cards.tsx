"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        title: "Assess & Benchmark",
        subtitle: "See exactly where you stand. Measure your data and AI maturity with clarity, confidence and proof, not guesswork.",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Assessments-Benchmarking-Header-Ortecha-Solutions.webp",
        href: "/solutions",
    },
    {
        title: "Strategy & Operating Model",
        subtitle: "Build your vision and lay foundations that turn plans into progress and keep pace as you grow.",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Strategy-Operating-Model-Header.webp",
        href: "/solutions",
    },
    {
        title: "Enterprise Architecture",
        subtitle: "Stop your systems fighting each other and get your whole organisation pulling in the same direction.",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Enterprise-Architecture-Header-Ortecha-Solutions-no-donut.webp",
        href: "/solutions",
    },
    {
        title: "Literacy & Culture",
        subtitle: "You’ve invested in data and AI. Now turn your people into the advantage that drives your next wave of growth.",
        image: "https://ortecha.com/wp-content/uploads/2025/10/Training-Adoption-Header.webp",
        href: "/solutions",
    },
];

export function ParallaxCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const wrappers = gsap.utils.toArray(".parallax-wrapper");

            wrappers.forEach((wrapper: any, index: number) => {
                const card = wrapper.querySelector(".parallax-card-item");

                // Entrance Animation on the WRAPPER (Opacity, Scale, Rotation)
                gsap.fromTo(
                    wrapper,
                    {
                        opacity: 0,
                        y: 50,
                        rotationX: -15,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: wrapper,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none none", // Ensure it stays visible
                        },
                    }
                );

                // Parallax Scrub on the INNER CARD
                gsap.to(card, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            });
        },
        { scope: containerRef }
    );

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const content = card.querySelector('.card-content') as HTMLElement;
        const bg = card.querySelector('.card-bg') as HTMLElement;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        // Use precise properties instead of CSS string for better interpolation
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02, // Subtle scale up on hover
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Parallax effect for content
        gsap.to(content, {
            x: (x - centerX) * 0.05,
            y: (y - centerY) * 0.05,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Inverse/Depth effect for background
        gsap.to(bg, {
            scale: 1.1,
            x: (x - centerX) * -0.05,
            y: (y - centerY) * -0.05,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const content = card.querySelector('.card-content') as HTMLElement;
        const bg = card.querySelector('.card-bg') as HTMLElement;

        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });

        gsap.to([content, bg], {
            x: 0,
            y: 0,
            scale: 1, // Reset bg scale specifically or handled by CSS class? bg was scaled to 1.1 on move
            duration: 0.8,
            ease: "power3.out", // Elastic might be too much for content/bg
            overwrite: "auto"
        });
    };

    return (
        <Section ref={containerRef} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {CARDS.map((card, index) => (
                        <div key={index} className="parallax-wrapper">
                            <Link href={card.href} className="block parallax-card-item">
                                <div
                                    className="relative h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Background Image */}
                                    <div
                                        className="card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                        style={{ backgroundImage: `url(${card.image})` }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />

                                    {/* Content */}
                                    <div className="card-content absolute bottom-0 left-0 w-full p-8 text-white transform transition-transform">
                                        <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                                        <p className="text-sm text-gray-200 leading-relaxed transition-all duration-300 ease-in-out">
                                            {card.subtitle}
                                        </p>
                                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ortecha-main)] transition-all duration-300 ease-in-out">
                                            Explore <span className="text-lg">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
