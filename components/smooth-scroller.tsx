"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScroller({ children }: { children: ReactNode }) {
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
