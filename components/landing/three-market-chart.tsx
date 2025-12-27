"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CandlestickData {
    open: number;
    close: number;
    high: number;
    low: number;
    x: number;
    color: string;
}

function Candlestick({ data, index }: { data: CandlestickData; index: number }) {
    const bodyRef = useRef<THREE.Mesh>(null);
    const wickRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!groupRef.current || !bodyRef.current || !wickRef.current) return;

        // Set initial positions immediately - no vertical movement to prevent jumping
        gsap.set(groupRef.current.position, { y: 0 });
        gsap.set(bodyRef.current.scale, { y: 0, x: 0, z: 0 });
        gsap.set(wickRef.current.scale, { y: 0 });

        // Only animate scale, not position - delayed for visual effect
        const tl = gsap.timeline({ delay: 1.0 + index * 0.08 });

        tl.to(bodyRef.current.scale, {
            y: 1,
            x: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(2)",
        })
        .to(wickRef.current.scale, {
            y: 1,
            duration: 0.5,
            ease: "power2.out",
        }, "-=0.5");
    }, [index]);

    useFrame((state) => {
        if (!groupRef.current || !bodyRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.position.y = Math.sin(time * 0.5 + index * 0.3) * 0.08;
        bodyRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.05;
    });

    const bodyHeight = Math.abs(data.close - data.open);
    const wickHeight = data.high - data.low;
    const bodyY = Math.min(data.open, data.close) + bodyHeight / 2 - 2;
    const wickY = data.low + wickHeight / 2 - 2;

    return (
        <group ref={groupRef} position={[data.x, 0, 0]}>
            <mesh ref={wickRef} position={[0, wickY, 0]}>
                <boxGeometry args={[0.05, wickHeight, 0.05]} />
                <meshBasicMaterial
                    color={data.color}
                />
            </mesh>

            <mesh ref={bodyRef} position={[0, bodyY, 0]}>
                <boxGeometry args={[0.4, bodyHeight * 2.5, 0.4]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            <mesh position={[0, bodyY, 0]}>
                <boxGeometry args={[0.45, bodyHeight * 2.5 + 0.1, 0.45]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
}

// ... (FloatingParticles and MarketChart functions remain unchanged)




function FloatingParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const count = 30;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = Math.random() * 10 - 5;
            positions[i * 3 + 1] = Math.random() * 6 - 3;
            positions[i * 3 + 2] = Math.random() * 10 - 5;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (!particlesRef.current) return;
        const time = state.clock.getElapsedTime();
        particlesRef.current.rotation.y = time * 0.05;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time * 0.5 + i) * 0.001;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.05}
                color="#CE2E2F"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function MarketChart() {
    const groupRef = useRef<THREE.Group>(null);

// Module-level cache for data persistence
let globalCandlestickData: CandlestickData[] | null = null;

function getCandlestickData(): CandlestickData[] {
    if (globalCandlestickData) return globalCandlestickData;

    const data: CandlestickData[] = [];
    let prevClose = 2;

    for (let i = 0; i < 15; i++) {
        // Default parameters
        let trend = 0.1;
        let volatility = 1.0;
        let forcedDirection: 'up' | 'down' | null = null;
        let minMove = 0.2;

        // Custom Pattern Logic (0-indexed)
        if (i === 0) { forcedDirection = 'up'; } // 1. Green, bottom
        else if (i === 1) { forcedDirection = 'up'; trend = 0.4; } // 2. Green, higher
        else if (i === 2) { forcedDirection = 'down'; } // 3. Red, down
        else if (i === 3) { forcedDirection = 'down'; } // 4. Red, down
        else if (i === 4) { forcedDirection = 'up'; trend = 0.6; minMove = 0.5; } // 5. Green, up high
        else if (i === 5) { forcedDirection = 'up'; trend = 0.6; minMove = 0.5; } // 6. Green, up high
        else if (i === 6) { forcedDirection = 'down'; } // 7. Red
        else if (i === 7) { forcedDirection = 'up'; trend = 0.8; minMove = 0.6; } // 8. Green, peak
        else {
            // Remainder: mild uptrend with randomness
            trend = 0.15;
            volatility = 1.4;
        }

        const open = prevClose + (Math.random() - 0.5) * 0.2;
        let change = (Math.random() - 0.5) * volatility + trend;

        // Apply Pattern Constraints
        if (forcedDirection === 'up') {
            change = Math.abs(change) + (Math.random() * 0.2); // Ensure positive
            if (change < minMove) change = minMove + Math.random() * 0.2;
        } else if (forcedDirection === 'down') {
            change = -Math.abs(change) - (Math.random() * 0.1); // Ensure negative
            if (Math.abs(change) < minMove) change = -minMove - Math.random() * 0.2;
        } else {
             // General min height enforcement
             if (Math.abs(change) < 0.2) change = change >= 0 ? 0.2 : -0.2;
        }

        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 0.4;
        const low = Math.min(open, close) - Math.random() * 0.4;

        data.push({
            open,
            close,
            high,
            low,
            x: (i - 7) * 0.7,
            color: close >= open ? "#00ff88" : "#ff3366",
        });

        prevClose = close;
    }

    // Calculate center of the data range
    const minLow = Math.min(...data.map(d => d.low));
    const maxHigh = Math.max(...data.map(d => d.high));
    const centerY = (minLow + maxHigh) / 2;

    // Shift all points to center around slightly higher than 0 (visual center)
    const verticalOffset = 2.0;
    const horizontalOffset = 1.0;

    globalCandlestickData = data.map(d => ({
        ...d,
        x: d.x + horizontalOffset,
        open: d.open - centerY + verticalOffset,
        close: d.close - centerY + verticalOffset,
        high: d.high - centerY + verticalOffset,
        low: d.low - centerY + verticalOffset,
    }));

    return globalCandlestickData;
}

    const candlestickData: CandlestickData[] = useMemo(() => getCandlestickData(), []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {candlestickData.map((data, index) => (
                <Candlestick key={index} data={data} index={index} />
            ))}
        </group>
    );
}

function Scene() {
    const { camera } = useThree();

    useEffect(() => {
        // Match the initial camera position from Canvas props - moved up higher
        camera.position.set(0, -0.3, 7);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        camera.position.x = Math.sin(time * 0.1) * 0.8;
        camera.position.y = -0.3 + Math.sin(time * 0.15) * 0.5;
    });

    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
            <directionalLight position={[-5, 3, -5]} intensity={2} color="#ffffff" />
            <pointLight position={[0, 5, 0]} intensity={2.5} color="#ffffff" distance={15} />
            <pointLight position={[3, 0, 3]} intensity={2} color="#ff88aa" distance={12} />
            <spotLight
                position={[0, 10, 0]}
                angle={0.6}
                penumbra={0.5}
                intensity={3.5}
                color="#ffffff"
            />

            <MarketChart />
            <FloatingParticles />
        </>
    );
}

export function ThreeMarketChart({ className }: { className?: string }) {
    return (
        <div
            className={`w-full h-full ${className}`}
            style={{
                background: 'transparent',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 80%, transparent)',
                minHeight: '780px',
                maxHeight: '780px'
            }}
        >
            <Canvas
                camera={{ position: [0, -0.3, 7], fov: 50 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
                resize={{ scroll: false }}
                dpr={[1, 2]}
            >
                {/* Removed background color for transparency */}
                <Scene />
            </Canvas>
        </div>
    );
}
