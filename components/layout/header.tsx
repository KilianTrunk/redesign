"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                {
                    y: -100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2,
                    clearProps: "all"
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const headerRef = useRef<HTMLElement>(null);

    return (
        <header
            ref={headerRef}
            style={{ transform: 'translateY(-100px)', opacity: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between min-h-[56px] md:min-h-[64px]">
                <Link href="/" className="relative z-[70] flex items-center gap-2">
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
                <nav className="hidden lg:flex items-center gap-6 xl:gap-12">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "text-base xl:text-xl font-semibold transition-colors relative group",
                                    isActive ? "text-[var(--color-ortecha-main)]" : "text-[#343434] hover:text-[var(--color-ortecha-main)]"
                                )}
                            >
                                {item.label}
                                <span
                                    className={cn(
                                        "absolute left-1/2 -bottom-1 h-0.5 bg-[var(--color-ortecha-main)] transition-all duration-300",
                                        isActive ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"
                                    )}
                                />
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/contact-us"
                        className="px-6 xl:px-9 py-3 xl:py-4 bg-[var(--color-ortecha-main)] text-white text-base xl:text-xl font-bold rounded-full hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-md hover:shadow-lg duration-200"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden relative z-[70] p-2"
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
                    className="lg:hidden"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100vh',
                        backgroundColor: '#FFFFFF',
                        zIndex: 60,
                        transition: 'transform 500ms ease-in-out',
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        overflow: 'auto'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFFFFF',
                        minHeight: '100vh'
                    }}>
                        {/* Navigation Links */}
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            paddingTop: '8rem',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            backgroundColor: '#FFFFFF'
                        }}>
                            {NAV_ITEMS.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "text-3xl md:text-4xl font-bold transition-all duration-300 transform hover:translate-x-2",
                                            isActive ? "text-[var(--color-ortecha-main)]" : "text-gray-900 hover:text-[var(--color-ortecha-main)]"
                                        )}
                                        style={{
                                            transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Button */}
                        <div style={{
                            marginTop: 'auto',
                            paddingTop: '3rem',
                            paddingBottom: '4rem',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            backgroundColor: '#FFFFFF'
                        }}>
                            <Link
                                href="/contact-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-center px-10 py-5 bg-[var(--color-ortecha-main)] text-white text-xl font-bold rounded-full hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-lg hover:shadow-xl"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
