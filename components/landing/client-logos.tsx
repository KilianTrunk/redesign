"use client";

import { useRef, useEffect } from "react";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
    { name: "HSBC", url: "https://ortecha.com/wp-content/uploads/2025/07/HSBC-Logo.png" },
    { name: "John Lewis Partnerships", url: "https://ortecha.com/wp-content/uploads/2025/11/John-Lewis-Partnership-Logo.png" },
    { name: "Lloyds Banking Group", url: "https://ortecha.com/wp-content/uploads/2025/11/Lloyds-Banking-Group-Logo.png" },
    { name: "Fannie Mae", url: "https://ortecha.com/wp-content/uploads/2025/07/Fannie-Mae-Logo.png" },
    { name: "Chanel", url: "https://ortecha.com/wp-content/uploads/2025/07/Chanel-Logo.png" },
    { name: "Bank of Montreal", url: "https://ortecha.com/wp-content/uploads/2025/07/Bank-of-Montreal-Logo.png" },
    { name: "Citibank", url: "https://ortecha.com/wp-content/uploads/2025/07/Citibank-Logo.png" },
    { name: "Mind", url: "https://ortecha.com/wp-content/uploads/2025/11/Mind-Logo.png" },
    { name: "Schroders", url: "https://ortecha.com/wp-content/uploads/2025/11/Schroders-Logo.png" },
    { name: "Investec", url: "https://ortecha.com/wp-content/uploads/2025/07/Investec-Logo.png" },
    { name: "Compare the Market", url: "https://ortecha.com/wp-content/uploads/2025/11/Compare-the-Market-Logo.png" },
    { name: "Sky", url: "https://ortecha.com/wp-content/uploads/2025/11/Sky-Logo.png" },
    { name: "TIFF", url: "https://ortecha.com/wp-content/uploads/2025/11/TIFF-Investment-Management-Logo.png" },
    { name: "TD Bank", url: "https://ortecha.com/wp-content/uploads/2025/11/TD-Bank-Logo.png" },
    { name: "CIBC Mellon", url: "https://ortecha.com/wp-content/uploads/2025/07/CIBC-Mellon-Logo.png" },
];

export function ClientLogos() {
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    useEffect(() => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        let position = 0;
        const speed = 1; // pixels per frame

        function animate() {
            position -= speed;
            carousel.style.transform = `translateX(${position}px)`;

            // Reset position when we've scrolled one full set of logos
            const logoWidth = 192; // Approximate width per logo
            const gap = 80; // Gap between logos
            const setWidth = LOGOS.length * (logoWidth + gap) - gap;

            if (Math.abs(position) >= setWidth) {
                position = 0;
                carousel.style.transform = `translateX(0px)`;
            }

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            // Cleanup will happen naturally when component unmounts
        };
    }, []);

    // Create 2 copies for seamless infinite scroll with modifiers
    const duplicatedLogos = [...LOGOS, ...LOGOS];

    return (
        <Section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">Who we've worked with</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    We're partners of businesses from a variety of sectors - from global banks to high street retailers to national charities.
                </p>
            </div>

            <div className="relative overflow-hidden">
                <div ref={carouselRef} className="flex items-center gap-16 md:gap-20">
                    {duplicatedLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 relative flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        >
                            <img
                                src={logo.url}
                                alt={logo.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>
        </Section>
    );
}
