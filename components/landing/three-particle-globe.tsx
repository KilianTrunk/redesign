"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function ParticleGlobe() {
    const pointsRef = useRef<THREE.Points>(null);
    const globeRef = useRef<THREE.Group>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const radius = 2;

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x + (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;

            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i * 3] = 0.8;
                colors[i * 3 + 1] = 0.18;
                colors[i * 3 + 2] = 0.18;
            } else if (colorChoice < 0.66) {
                colors[i * 3] = 0.0;
                colors[i * 3 + 1] = 1.0;
                colors[i * 3 + 2] = 0.53;
            } else {
                colors[i * 3] = 0.27;
                colors[i * 3 + 1] = 0.53;
                colors[i * 3 + 2] = 1.0;
            }
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geo;
    }, []);

    useEffect(() => {
        if (!pointsRef.current) return;
        gsap.from(pointsRef.current.material, {
            opacity: 0,
            duration: 2,
            ease: "power2.out",
        });
    }, []);

    useFrame((state) => {
        if (!globeRef.current || !pointsRef.current) return;
        const time = state.clock.getElapsedTime();

        globeRef.current.rotation.y = time * 0.1;
        globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const distance = Math.sqrt(x * x + y * y + z * z);
            const wave = Math.sin(time * 2 + distance * 2) * 0.05;

            positions[i] = x + Math.sin(time + i) * 0.001;
            positions[i + 1] = y + wave * 0.01;
            positions[i + 2] = z + Math.cos(time + i) * 0.001;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={globeRef}>
            <points ref={pointsRef} geometry={geometry}>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

function ConnectionLines() {
    const linesRef = useRef<THREE.Group>(null);

    const lines = useMemo(() => {
        const lineData = [];
        const radius = 2;
        const lineCount = 30;

        for (let i = 0; i < lineCount; i++) {
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            const theta2 = Math.random() * Math.PI * 2;
            const phi2 = Math.acos(2 * Math.random() - 1);

            const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
            const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
            const z1 = radius * Math.cos(phi1);

            const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
            const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
            const z2 = radius * Math.cos(phi2);

            lineData.push({
                start: new THREE.Vector3(x1, y1, z1),
                end: new THREE.Vector3(x2, y2, z2),
            });
        }

        return lineData;
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;
        const time = state.clock.getElapsedTime();
        linesRef.current.rotation.y = time * 0.05;
    });

    return (
        <group ref={linesRef}>
            {lines.map((lineData, index) => {
                const points = [lineData.start, lineData.end];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                return (
                    <primitive key={index} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
                        color: "#CE2E2F",
                        transparent: true,
                        opacity: 0.2
                    }))} />
                );
            })}
        </group>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={["#ffffff"]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} />
            <pointLight position={[0, 0, 5]} intensity={1} color="#CE2E2F" />

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <ParticleGlobe />
                <ConnectionLines />
            </Float>
        </>
    );
}

export function ThreeParticleGlobe({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full min-h-[500px] ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
