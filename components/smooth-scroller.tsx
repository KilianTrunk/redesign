"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroller({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenis = useLenis();

    // Scroll to top when navigating to a new page
    useEffect(() => {
        if (lenis) {
            // Small delay to ensure the new page content has loaded
            const timeout = setTimeout(() => {
                lenis.scrollTo(0);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [pathname, lenis]);

    return (
        <ReactLenis root options={{
            lerp: 0.08,
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        }}>
            {children}
        </ReactLenis>
    );
}
