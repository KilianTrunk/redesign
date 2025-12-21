"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!sphereRef.current) return;
        const time = state.clock.getElapsedTime();
        sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        sphereRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Torus ref={sphereRef} args={[1, 0.6, 128, 64]} scale={1.0}>
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

export function ThreeOrb({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full min-h-[400px] ${className}`}>
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={3} />
                <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" />
                <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#ffcccc" />
                <pointLight position={[0, 0, 2]} intensity={1} color="#ff9999" />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}
