"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail, Sphere } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function DataParticle({ position, delay, color }: { position: THREE.Vector3; delay: number; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;
        gsap.from(meshRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.2,
            delay,
            ease: "elastic.out(1, 0.6)",
        });
    }, [delay]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time * 2 + delay * 10) * 0.002;
    });

    return (
        <Trail
            width={0.5}
            length={3}
            color={color}
            attenuation={(t) => t * t}
        >
            <Sphere ref={meshRef} args={[0.08, 16, 16]} position={position}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    metalness={0.5}
                    roughness={0.2}
                />
            </Sphere>
        </Trail>
    );
}

function DataHelix() {
    const groupRef = useRef<THREE.Group>(null);

    const helixData = useMemo(() => {
        const particles = [];
        const radius = 1.5;
        const height = 5;
        const turns = 3;
        const particlesPerTurn = 15;
        const totalParticles = turns * particlesPerTurn;

        for (let i = 0; i < totalParticles; i++) {
            const t = i / totalParticles;
            const angle = t * Math.PI * 2 * turns;
            const y = (t - 0.5) * height;

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const colors = ["#CE2E2F", "#00ff88", "#4488ff", "#ff88ff"];
            const color = colors[i % colors.length];

            particles.push({
                position: new THREE.Vector3(x, y, z),
                delay: i * 0.02,
                color,
            });
        }

        return particles;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.3;
    });

    return (
        <group ref={groupRef}>
            {helixData.map((data, index) => (
                <DataParticle
                    key={index}
                    position={data.position}
                    delay={data.delay}
                    color={data.color}
                />
            ))}
        </group>
    );
}

function CentralCore() {
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!coreRef.current) return;
        const time = state.clock.getElapsedTime();
        coreRef.current.rotation.x = time * 0.2;
        coreRef.current.rotation.z = time * 0.15;
    });

    return (
        <mesh ref={coreRef}>
            <torusGeometry args={[0.5, 0.15, 16, 50]} />
            <meshStandardMaterial
                color="#CE2E2F"
                emissive="#CE2E2F"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
                wireframe
            />
        </mesh>
    );
}

function EnergyRings() {
    const rings = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => ({
            radius: 1 + i * 0.5,
            delay: i * 0.2,
            color: i % 2 === 0 ? "#CE2E2F" : "#4488ff",
        }));
    }, []);

    return (
        <>
            {rings.map((ring, index) => (
                <EnergyRing key={index} radius={ring.radius} delay={ring.delay} color={ring.color} />
            ))}
        </>
    );
}

function EnergyRing({ radius, delay, color }: { radius: number; delay: number; color: string }) {
    const ringRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!ringRef.current) return;
        gsap.from(ringRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            delay,
            ease: "back.out(1.7)",
        });
    }, [delay]);

    useFrame((state) => {
        if (!ringRef.current) return;
        const time = state.clock.getElapsedTime();
        const material = ringRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.3 + Math.sin(time * 2 + delay) * 0.2;
        ringRef.current.rotation.x = Math.PI / 2;
        ringRef.current.rotation.z = time * (0.3 + delay * 0.1);
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius, 0.02, 16, 50]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 5, 15]} />

            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#CE2E2F" />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
            <spotLight
                position={[0, 5, 0]}
                angle={0.6}
                penumbra={1}
                intensity={1.5}
                color="#4488ff"
            />

            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                <CentralCore />
            </Float>

            <EnergyRings />
            <DataHelix />
        </>
    );
}

export function ThreeDataHelix({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full min-h-[500px] ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ alpha: false, antialias: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
