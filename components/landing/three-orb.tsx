"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function FirstFrame({ onFirstFrame }: { onFirstFrame: () => void }) {
    const didFireRef = useRef(false);
    useFrame(() => {
        if (didFireRef.current) return;
        didFireRef.current = true;
        onFirstFrame();
    });
    return null;
}

function AnimatedSphere({ scale }: { scale: number }) {
    const sphereRef = useRef<THREE.Mesh>(null);
    const accRef = useRef(0);

    // Throttle updates (~45fps) to keep motion smooth without burning CPU/GPU.
    useFrame((state, delta) => {
        if (!sphereRef.current) return;
        accRef.current += delta;
        if (accRef.current < 1 / 45) return;
        accRef.current = 0;
        const time = state.clock.getElapsedTime();
        sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        sphereRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Higher segments = smoother silhouette/rounded edges */}
            <Torus ref={sphereRef} args={[1, 0.6, 128, 64]} scale={scale}>
                <MeshDistortMaterial
                    color="#CE2E2F"
                    attach="material"
                    distort={0.12}
                    speed={1.15}
                    flatShading={false}
                    roughness={0.1}
                    metalness={0.3}
                    emissive="#CE2E2F"
                    emissiveIntensity={0.35}
                />
            </Torus>
        </Float>
    );
}

export function ThreeOrb({ className }: { className?: string }) {
    const [scale, setScale] = useState(1.0);
    const [isReady, setIsReady] = useState(false);
    const [hasFirstFrame, setHasFirstFrame] = useState(false);

    useEffect(() => {
        // Prevent hydration issues by ensuring component only renders after mount
        setIsReady(true);
        setHasFirstFrame(false);

        const handleResize = () => {
            if (window.innerWidth < 450) {
                setScale(0.75);
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

    // R3F sometimes needs an explicit resize after mount (especially with smooth-scrollers that
    // apply transforms). This is cheap and avoids the “blank canvas for ~10s” symptom.
    useEffect(() => {
        if (!isReady) return;
        const raf = window.requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
        const t = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 250);
        return () => {
            window.cancelAnimationFrame(raf);
            window.clearTimeout(t);
        };
    }, [isReady]);

    if (!isReady) {
        return <div className={`w-full h-full ${className ?? ""}`} />;
    }

    return (
        <div
            className={`w-full h-full relative transition-all duration-700 ease-out ${
                hasFirstFrame ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
            } ${className ?? ""}`}
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                // Slightly higher floor so edges stay smooth on high-DPI displays
                dpr={[1.25, 2]}
                frameloop="always"
                // Don't allocate/observe events we don't use
                eventSource={undefined}
                style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }}
            >
                <FirstFrame onFirstFrame={() => setHasFirstFrame(true)} />
                <ambientLight intensity={2.6} />
                <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" />
                <directionalLight position={[-5, -5, -5]} intensity={1.2} color="#ffcccc" />
                <pointLight position={[0, 0, 2]} intensity={0.8} color="#ff9999" />
                <AnimatedSphere scale={scale} />
            </Canvas>
        </div>
    );
}
