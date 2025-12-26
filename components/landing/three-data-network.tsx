"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface Node {
    position: THREE.Vector3;
    color: string;
    scale: number;
}

interface Connection {
    start: THREE.Vector3;
    end: THREE.Vector3;
}

function DataNode({ position, color, scale, delay }: { position: THREE.Vector3; color: string; scale: number; delay: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;
        gsap.from(meshRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            delay,
            ease: "elastic.out(1, 0.5)",
        });
    }, [delay]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time + delay) * 0.001;
    });

    return (
        <Sphere ref={meshRef} args={[scale, 32, 32]} position={position}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
            />
        </Sphere>
    );
}

function ConnectionLine({ start, end, delay }: { start: THREE.Vector3; end: THREE.Vector3; delay: number }) {
    const materialRef = useRef<THREE.LineBasicMaterial>(null);

    useEffect(() => {
        if (!materialRef.current) return;
        gsap.from(materialRef.current, {
            opacity: 0,
            duration: 1.5,
            delay,
            ease: "power2.out",
        });
    }, [delay]);

    useFrame((state) => {
        if (!materialRef.current) return;
        const time = state.clock.getElapsedTime();
        materialRef.current.opacity = 0.3 + Math.sin(time * 2 + delay) * 0.2;
    });

    return (
        <Line
            points={[start, end]}
            color="#CE2E2F"
            lineWidth={1}
        >
            <lineBasicMaterial ref={materialRef} transparent opacity={0.3} />
        </Line>
    );
}

function NetworkSphere() {
    const groupRef = useRef<THREE.Group>(null);

    const { nodes, connections } = useMemo(() => {
        const nodeList: Node[] = [];
        const connectionList: Connection[] = [];

        const radius = 2.5;
        const nodeCount = 25;

        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            nodeList.push({
                position: new THREE.Vector3(x, y, z),
                color: i % 3 === 0 ? "#CE2E2F" : i % 3 === 1 ? "#00ff88" : "#4488ff",
                scale: 0.08 + Math.random() * 0.08,
            });
        }

        for (let i = 0; i < nodeList.length; i++) {
            for (let j = i + 1; j < nodeList.length; j++) {
                const distance = nodeList[i].position.distanceTo(nodeList[j].position);
                if (distance < 2.5 && Math.random() > 0.7) {
                    connectionList.push({
                        start: nodeList[i].position,
                        end: nodeList[j].position,
                    });
                }
            }
        }

        return { nodes: nodeList, connections: connectionList };
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {connections.map((connection, index) => (
                <ConnectionLine
                    key={`line-${index}`}
                    start={connection.start}
                    end={connection.end}
                    delay={index * 0.02}
                />
            ))}
            {nodes.map((node, index) => (
                <DataNode
                    key={`node-${index}`}
                    position={node.position}
                    color={node.color}
                    scale={node.scale}
                    delay={index * 0.03}
                />
            ))}
        </group>
    );
}

function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = 200;
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (!particlesRef.current) return;
        const time = state.clock.getElapsedTime();
        particlesRef.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.02}
                color="#CE2E2F"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={["#ffffff"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#CE2E2F" />
            <pointLight position={[0, 0, 5]} intensity={1} color="#4488ff" />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <NetworkSphere />
            </Float>

            <ParticleField />
        </>
    );
}

export function ThreeDataNetwork({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full min-h-[400px] ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
