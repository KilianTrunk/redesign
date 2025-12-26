"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        quote: "Our engagements with Ortecha have provided a strong foundation and education that has enabled the success of our data management programme.",
        author: "Chief Analytics Officer",
        company: "Donegal Insurance",
        logo: "https://investors.donegalgroup.com/sites/g/files/knoqqb84136/themes/site/client_site/dist/images/logo.jpg"
    },
    {
        quote: "We love having the Ortecha team around, not just for their knowledge but because they are engaging, fun, intelligent and produce great work.",
        author: "Chief Data & Insight Officer",
        company: "John Lewis Partnership",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/John_Lewis_Partnership_logo_2025.svg/1200px-John_Lewis_Partnership_logo_2025.svg.png"
    },
    {
        quote: "Ortecha are my go-to partner and have never failed to deliver.",
        author: "Head of Data, Group Data Office",
        company: "Rathbones",
        logo: "https://cumbriachamber.co.uk/wp-content/uploads/2024/12/Rathbones_Lockup_Blue_RGB.png"
    }
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".testimonial-card",
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
        <Section ref={containerRef} className="py-24 bg-[var(--color-ortecha-bg-subtle)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold text-gray-900">What our clients say</h2>
                    <p className="text-xl text-gray-600">Don't just take it from us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item, index) => (
                        <div key={index} className="testimonial-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative group">
                            {/* Quote Icon */}
                            <div className="text-6xl text-[var(--color-ortecha-main)] opacity-10 absolute top-4 right-6 font-serif leading-none group-hover:opacity-20 transition-opacity">"</div>

                            {/* Logo */}
                            <div className="h-12 mb-6 flex items-center">
                                <img 
                                    src={item.logo} 
                                    alt={`${item.company} Logo`} 
                                    className="h-full w-auto object-contain max-w-[140px]"
                                />
                            </div>

                            <blockquote className="text-lg text-gray-700 italic flex-grow mb-8 relative z-10 leading-relaxed">
                                "{item.quote}"
                            </blockquote>
                            
                            <div className="border-t border-gray-100 pt-6 mt-auto">
                                <cite className="not-italic block">
                                    <span className="block font-bold text-gray-900 text-sm tracking-wide uppercase">{item.company}</span>
                                    <span className="block text-gray-500 text-sm mt-1">{item.author}</span>
                                </cite>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
