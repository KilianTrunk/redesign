"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_ITEMS = [
    { label: "Our Solutions", href: "/solutions" },
    { label: "Technology Partners", href: "/technology-partners" },
    { label: "Resources", href: "/resources" },
    { label: "About Us", href: "/about-us" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
                clearProps: "all"
            });
        });
        return () => ctx.revert();
    }, []);

    const headerRef = useRef<HTMLElement>(null);

    return (
        <header
            ref={headerRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md py-5 shadow-md border-b border-gray-100"
                    : "bg-transparent py-8 border-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="relative z-50 flex items-center gap-2">
                    <Image
                        src="/assets/logo.png"
                        alt="Ortecha Logo"
                        width={270}
                        height={60}
                        className="h-12 w-auto md:h-14"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-12">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-xl font-semibold text-gray-700 hover:text-[var(--color-ortecha-main)] transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-[var(--color-ortecha-main)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/contact-us"
                        className="px-9 py-4 bg-[var(--color-ortecha-main)] text-white text-xl font-bold rounded-lg hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden relative z-50 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-9 h-9 text-gray-900" />
                    ) : (
                        <Menu className="w-9 h-9 text-gray-900" />
                    )}
                </button>

                {/* Mobile Nav Overlay */}
                <div
                    className={cn(
                        "fixed inset-0 bg-white z-40 lg:hidden flex flex-col items-center justify-center gap-12 transition-transform duration-500 ease-in-out",
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-4xl font-bold text-gray-900 hover:text-[var(--color-ortecha-main)]"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact-us"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-12 py-5 bg-[var(--color-ortecha-main)] text-white text-2xl font-bold rounded-lg mt-6"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </header>
    );
}
