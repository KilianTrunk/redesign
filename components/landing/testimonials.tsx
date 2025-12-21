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
        company: "Donegal Insurance"
    },
    {
        quote: "We love having the Ortecha team around, not just for their knowledge but because they are engaging, fun, intelligent and produce great work.",
        author: "Chief Data & Insight Officer",
        company: "John Lewis Partnership"
    },
    {
        quote: "Ortecha are my go-to partner and have never failed to deliver.",
        author: "Head of Data, Group Data Office",
        company: "Rathbones"
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
                        <div key={index} className="testimonial-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative">
                            {/* Quote Icon */}
                            <div className="text-6xl text-[var(--color-ortecha-main)] opacity-20 absolute top-4 left-6 font-serif leading-none">"</div>

                            <blockquote className="text-lg text-gray-700 italic flex-grow mb-6 relative z-10 pt-4">
                                "{item.quote}"
                            </blockquote>
                            <div className="border-t border-gray-100 pt-6">
                                <cite className="not-italic block">
                                    <span className="block font-bold text-gray-900 text-sm">{item.author}</span>
                                    <span className="block text-[var(--color-ortecha-main)] text-sm mt-1">{item.company}</span>
                                </cite>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
