"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 80 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    // Generate random particle positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        // Rotate the whole system slightly
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update positions
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // Update scaling
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#CE2E2F" emissive="#CE2E2F" emissiveIntensity={0.5} />
            </instancedMesh>
        </>
    );
}

function Connections({ count = 20 }) {
    const linesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * count * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, [count]);

    const lineRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        if (!lineRef.current) return;
        const time = state.clock.getElapsedTime();
        lineRef.current.rotation.y = time * 0.02; // Rotate lines slowly
    });


    return (
        <lineSegments ref={lineRef}>
            <wireframeGeometry args={[new THREE.IcosahedronGeometry(10, 1)]} />
            <lineBasicMaterial color="#CE2E2F" transparent opacity={0.1} />
        </lineSegments>
    )
}

export function DataConstellation({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
            <Canvas camera={{ position: [0, 0, 30], fov: 60 }} gl={{ alpha: true }}>
                <fog attach="fog" args={['#ffffff', 20, 50]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} color="#CE2E2F" intensity={1} />

                {/* Floating Nodes */}
                <Particles count={60} />

                {/* Subtle geometric connections */}
                <Connections count={15} />

            </Canvas>
        </div>
    );
}
