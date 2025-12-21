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

        const tl = gsap.timeline({ delay: index * 0.08 });

        gsap.set(groupRef.current.position, { y: -8 });
        gsap.set(bodyRef.current.scale, { y: 0, x: 0, z: 0 });
        gsap.set(wickRef.current.scale, { y: 0 });

        tl.to(groupRef.current.position, {
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
        })
        .to(bodyRef.current.scale, {
            y: 1,
            x: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(2)",
        }, "-=0.8")
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
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={0.5}
                    metalness={0.7}
                    roughness={0.2}
                />
            </mesh>

            <mesh ref={bodyRef} position={[0, bodyY, 0]}>
                <boxGeometry args={[0.35, bodyHeight * 1.5, 0.35]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            <mesh position={[0, bodyY, 0]}>
                <boxGeometry args={[0.4, bodyHeight * 1.5 + 0.1, 0.4]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
}


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

    const candlestickData: CandlestickData[] = useMemo(() => {
        const data: CandlestickData[] = [];
        let prevClose = 2;

        for (let i = 0; i < 15; i++) {
            const open = prevClose + (Math.random() - 0.5) * 0.3;
            const close = open + (Math.random() - 0.5) * 1.2;
            const high = Math.max(open, close) + Math.random() * 0.6;
            const low = Math.min(open, close) - Math.random() * 0.6;

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

        return data;
    }, []);

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
        camera.position.set(0, 1.5, 7);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        camera.position.x = Math.sin(time * 0.1) * 0.8;
        camera.position.y = 1.5 + Math.sin(time * 0.15) * 0.5;
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
        <div className={`w-full h-full min-h-[600px] ${className}`} style={{ backgroundColor: '#FEF8F9' }}>
            <Canvas
                camera={{ position: [0, 2, 8], fov: 50 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={["#FEF8F9"]} />
                <Scene />
            </Canvas>
        </div>
    );
}
