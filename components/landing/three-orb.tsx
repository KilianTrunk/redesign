"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ scale }: { scale: number }) {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!sphereRef.current) return;
        const time = state.clock.getElapsedTime();
        sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        sphereRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Torus ref={sphereRef} args={[1, 0.6, 128, 64]} scale={scale}>
                <MeshDistortMaterial
                    color="#CE2E2F"
                    attach="material"
                    distort={0.1}
                    speed={1}
                    roughness={0.1}
                    metalness={0.3}
                    emissive="#CE2E2F"
                    emissiveIntensity={0.3}
                />
            </Torus>
        </Float>
    );
}

// Fallback component when Three.js fails to load
function ThreeOrbFallback({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-300 to-red-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

// Loading component
function ThreeOrbLoading({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
            <div className="w-32 h-32 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
        </div>
    );
}

function ThreeOrbCanvas({ scale, className }: { scale: number; className?: string }) {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set loaded after a short delay to ensure DOM is ready and Lenis has settled
        const timer = setTimeout(() => setIsLoaded(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // Force a resize event to ensure Three.js canvas resizes properly
    useEffect(() => {
        if (isLoaded && !hasError) {
            const handleResize = () => {
                // Small delay to ensure DOM has updated
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 50);
            };

            // Trigger resize after component mounts
            handleResize();

            // Also listen for actual resize events
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isLoaded, hasError]);

    if (!isLoaded) {
        return <ThreeOrbLoading className={className} />;
    }

    if (hasError) {
        return <ThreeOrbFallback className={className} />;
    }

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false // Allow fallback if performance is poor
                }}
                onError={() => setHasError(true)}
                dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio
                frameloop="always" // Ensure continuous rendering
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none' // Don't capture pointer events to allow scrolling
                }}
            >
                <ambientLight intensity={3} />
                <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" />
                <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#ffcccc" />
                <pointLight position={[0, 0, 2]} intensity={1} color="#ff9999" />
                <AnimatedSphere scale={scale} />
            </Canvas>
        </div>
    );
}

export function ThreeOrb({ className }: { className?: string }) {
    const [scale, setScale] = useState(1.0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleResize = () => {
            if (window.innerWidth < 450) {
                setScale(0.75); // 25% smaller
            } else {
                setScale(1.0);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Don't render anything until component is mounted to prevent hydration issues
    if (!isMounted) {
        return <ThreeOrbLoading className={className} />;
    }

    return (
        <Suspense fallback={<ThreeOrbLoading className={className} />}>
            <ThreeOrbCanvas scale={scale} className={className} />
        </Suspense>
    );
}
