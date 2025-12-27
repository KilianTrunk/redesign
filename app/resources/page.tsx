"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/ui/section";
import { CTA } from "@/components/landing/cta";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "News", "Articles", "Events", "Case Studies", "Papers", "Videos"];

const RESOURCES = [
    {
        category: "News",
        title: "Ortecha & OBG Press Release",
        description: "Ortecha and OBG announce strategic partnership to deliver data excellence.",
        date: "Oct 2025",
        image: "https://ortecha.com/wp-content/uploads/2025/10/OBG-Press-Release.png",
        href: "/news/ortecha-obg-press-release",
    },
    {
        category: "News",
        title: "Ortecha Appoints Two UK Partners",
        description: "Ortecha continues its expansion with key leadership appointments in the UK as growth momentum continues.",
        date: "Dec 2025",
        image: "/images/news/london-skyline.png",
        href: "/news/ortecha-appoints-two-uk-partners",
    },
    {
        category: "News",
        title: "Ortecha welcomes Stephen Gatchell",
        description: "Stephen brings deep expertise to lead our AI strategy practice as Partner and Head of AI Strategy.",
        date: "Nov 2025",
        image: "/images/news/obg-press-release.png",
        href: "/news/ortecha-welcomes-stephen-gatchell",
    },
    {
        category: "Events",
        title: "Mastering Data Lineage for Risk, Compliance and AI Governance",
        description: "Join us for this on-demand webinar where we explore how to master data lineage.",
        date: "On Demand",
        image: "https://ortecha.com/wp-content/uploads/2023/11/The-Data-Leadership-Series-A-festive-fireside-splat-tn.png",
        href: "/webinars/mastering-data-lineage",
    },
    {
        category: "Articles",
        title: "DCAM® v3: The New Gold Standard for Data Management",
        description: "The EDM Association recently released their DCAM v3 framework. This blogs outlines why it should be on the radar of every data leader today.",
        date: "Dec 2024",
        image: "https://ortecha.com/wp-content/uploads/2025/07/DCAM-v3-Blog-Header-1024x576.png",
        href: "/blog/dcam-v3-new-gold-standard",
    },
    {
        category: "Articles",
        title: "What Toy Story, Pixar, Steve Jobs and Data Functions Have In Common",
        description: "This blog explores how data teams can move beyond numbers to create narratives that connect, inspire action, and make insights unforgettable.",
        date: "Nov 2024",
        image: "https://ortecha.com/wp-content/uploads/2025/06/Storytelling-blog-1024x576.png",
        href: "/blog/data-storytelling-pixar",
    },
    {
        category: "Case Studies",
        title: "Supporting Africa’s Standard Bank on its Data Excellence journey",
        description: "How a global bank transformed its data management capability.",
        date: "2024",
        image: "https://ortecha.com/wp-content/uploads/2024/11/monty-allen-7_gpgj69CrY-unsplash-1024x683.jpg",
        href: "/case-studies/standard-bank",
    },
    {
        category: "Papers",
        title: "From Data Architecture to Knowledge Architecture",
        description: "Knowledge Architecture transforms information into intelligence – unlocking explainable AI, unified insights and strategic advantage.",
        date: "Whitepaper",
        image: "https://ortecha.com/wp-content/uploads/2025/08/Data-Arch-to-Knowledge-Arch-Blog-Header-1024x576.png",
        href: "/whitepapers/knowledge-architecture",
    },
    {
        category: "Videos",
        title: "Have you got your data under control?",
        description: "Claudia's got her data under control, and she seems pretty happy about it! How do you feel about yours?",
        date: "Video",
        image: "https://ortecha.com/wp-content/uploads/2021/09/Claudia-4-1024x574.png",
        href: "/videos/data-control",
    },
];

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredResources = activeCategory === "All"
        ? RESOURCES
        : RESOURCES.filter(r => r.category === activeCategory);

    // Initial page load animations (run once)
    useGSAP(() => {
        // Hero Animation
        const heroChildren = gsap.utils.toArray(heroRef.current!.children);
        gsap.fromTo(
            heroChildren,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
            }
        );

        // Filter Animation (only on initial load)
        gsap.fromTo(
            filterRef.current,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.6,
            }
        );
    }, []);

    // Grid animation when category changes
    useGSAP(() => {
        if (!shouldAnimate) return;

        const gridItems = gsap.utils.toArray(gridRef.current!.children);

        gsap.fromTo(
            gridItems,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                onComplete: () => setShouldAnimate(false),
            }
        );
    }, [filteredResources, shouldAnimate]);

    return (
        <div className="pt-24">
            {/* Hero */}
            <Section className="bg-gray-50 pb-16">
                <div ref={heroRef} className="max-w-4xl text-center mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        Resources & <span className="text-[var(--color-ortecha-main)]">Insights</span>
                    </h1>
                    <p className="text-2xl text-gray-600 leading-relaxed mb-6">
                        Latest thinking, news and practical guides from the Ortecha team.
                    </p>
                </div>
            </Section>

            {/* Filter */}
            <div className="sticky top-24 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 md:py-6">
                <div className="container mx-auto px-4 md:px-6">
                    <div ref={filterRef} className="grid grid-cols-4 md:flex md:items-center md:justify-center gap-1.5 md:gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    if (cat === activeCategory) return;

                                    setShouldAnimate(true);
                                    setActiveCategory(cat);

                                    // Only scroll if grid is not in view
                                    if (gridRef.current) {
                                        const rect = gridRef.current.getBoundingClientRect();
                                        const isInView = rect.top >= 0 && rect.top <= window.innerHeight;

                                        if (!isInView) {
                                            const yOffset = -250; // Offset to scroll more up
                                            const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                        }
                                    }
                                }}
                                className={cn(
                                    "px-2 py-1.5 md:px-6 md:py-2 rounded-full text-[11px] md:text-sm font-bold transition-all",
                                    activeCategory === cat
                                        ? "bg-[var(--color-ortecha-main)] text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <Section className="bg-white min-h-[50vh]">
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource, index) => (
                        <Link
                            key={index}
                            href={resource.href}
                            className="group block bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-[var(--color-ortecha-main)]/20 transition-all duration-300 flex flex-col min-h-[500px]"
                        >
                            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl flex-shrink-0">
                                <img
                                    src={resource.image}
                                    alt={resource.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                                    {resource.date}
                                </div>
                            </div>

                            <div className="mb-4 flex-shrink-0">
                                <span className="text-[var(--color-ortecha-main)] text-xs font-bold uppercase tracking-wide">
                                    {resource.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-[var(--color-ortecha-main)] transition-colors line-clamp-2">
                                    {resource.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                {resource.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-[var(--color-ortecha-main)] flex-shrink-0">
                                Read More <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <CTA />
        </div>
    );
}
