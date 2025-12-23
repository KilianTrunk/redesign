"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export function SmoothScroller({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const lenis = useLenis();
    const previousPathname = useRef(pathname);
    const lastScrollPosition = useRef(0);

    // Capture scroll position before navigation
    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]') as HTMLAnchorElement;

            if (link && link.href.startsWith(window.location.origin) && link.href !== window.location.href) {
                // Store current scroll position before navigation
                lastScrollPosition.current = window.scrollY;
                console.log('Captured scroll position before navigation:', lastScrollPosition.current);
            }
        };

        document.addEventListener('click', handleLinkClick, true); // Use capture phase
        return () => document.removeEventListener('click', handleLinkClick, true);
    }, []);

    // Scroll to top when navigating to a new page
    useEffect(() => {
        // Only scroll if pathname actually changed (not on initial mount)
        if (previousPathname.current !== pathname) {
            console.log('Pathname changed from', previousPathname.current, 'to', pathname);
            console.log('Last scroll position was:', lastScrollPosition.current);

            // Use a more aggressive approach to ensure scroll happens
            const scrollToTop = () => {
                console.log('Attempting to scroll to top, lenis available:', !!lenis);
                console.log('Current scroll position:', window.scrollY);

                if (lenis) {
                    console.log('Calling lenis.scrollTo(0)');
                    // If user was scrolled down, do smooth animation
                    if (lastScrollPosition.current > 50) {
                        lenis.scrollTo(0, { duration: 0.8 });
                    } else {
                        // If user was already near top, still do a subtle animation
                        lenis.scrollTo(1, { duration: 0.1, immediate: true });
                        setTimeout(() => lenis.scrollTo(0, { duration: 0.3 }), 50);
                    }
                } else {
                    // Fallback to native scroll if lenis isn't ready
                    console.log('Using native scroll fallback');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            // Try immediately, then again after delays
            scrollToTop();
            const timeout1 = setTimeout(scrollToTop, 100);
            const timeout2 = setTimeout(scrollToTop, 300);
            const timeout3 = setTimeout(scrollToTop, 500); // Extra attempt

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                clearTimeout(timeout3);
            };
        }

        // Update the ref to current pathname
        previousPathname.current = pathname;
    }, [pathname, lenis]);


    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.2,
                smoothWheel: true,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false
            }}
        >
            {children}
        </ReactLenis>
    );
}
