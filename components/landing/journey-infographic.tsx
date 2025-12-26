"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Route, Rocket, TrendingUp, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STAGES = [
    {
        id: 1,
        title: "Set the vision",
        subtitle: "Listen & define success",
        description: "We uncover your value story and define what success looks like using assessments like DCAM to keep things grounded.",
        icon: Target,
        color: "#CE2E2F",
        gradient: "from-[#CE2E2F] to-[#A82426]",
        stats: ["Value story discovery", "Success definition"],
        position: { x: 25, y: 1 },
    },
    {
        id: 2,
        title: "Design a blueprint",
        subtitle: "Framework for action",
        description: "We shape a framework connecting objectives to capabilities, controls and culture. Built for action, never your shelf.",
        icon: Route,
        color: "#CE2E2F",
        gradient: "from-[#CE2E2F] to-[#A82426]",
        stats: ["Actionable framework", "Adoption-focused"],
        position: { x: 75, y: 33 },
    },
    {
        id: 3,
        title: "From plan to practice",
        subtitle: "Roadmap & metrics",
        description: "We identify priority actions, define a roadmap and set metrics to measure your success.",
        icon: TrendingUp,
        color: "#CE2E2F",
        gradient: "from-[#CE2E2F] to-[#A82426]",
        stats: ["Clear roadmap", "Success metrics"],
        position: { x: 25, y: 67 },
    },
    {
        id: 4,
        title: "Keep it alive",
        subtitle: "Sustained partnership",
        description: "We turn your why and what into how through coaching, communications, advisory, and operating model implementation.",
        icon: Rocket,
        color: "#CE2E2F",
        gradient: "from-[#CE2E2F] to-[#A82426]",
        stats: ["Ongoing coaching", "Operating model"],
        position: { x: 75, y: 99 },
    },
];

export function JourneyInfographic() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [activeStage, setActiveStage] = useState<number | null>(null);

    useGSAP(
        () => {
            // Animate the path drawing
            if (pathRef.current) {
                const pathLength = pathRef.current.getTotalLength();

                gsap.set(pathRef.current, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });

                gsap.to(pathRef.current, {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            // Animate stage nodes
            JOURNEY_STAGES.forEach((stage, index) => {
                const node = containerRef.current?.querySelector(`[data-stage="${stage.id}"]`);
                if (node) {
                    gsap.fromTo(
                        node,
                        {
                            scale: 0,
                            opacity: 0,
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top 60%",
                                toggleActions: "play none none reverse",
                            },
                            delay: 0.5 + index * 0.3,
                        }
                    );
                }
            });

            // Animate floating particles
            const particles = containerRef.current?.querySelectorAll(".particle");
            particles?.forEach((particle, i) => {
                gsap.to(particle, {
                    y: "random(-30, 30)",
                    x: "random(-30, 30)",
                    duration: "random(3, 5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2,
                });
            });
        },
        { scope: containerRef }
    );

    const handleStageClick = (stageId: number) => {
        setActiveStage(activeStage === stageId ? null : stageId);
    };

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center p-12 sm:p-16 md:p-20">
            {/* Floating Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                    { left: 6.4, top: 60.9 },
                    { left: 78.8, top: 32.2 },
                    { left: 24.8, top: 65.6 },
                    { left: 76.2, top: 28.1 },
                    { left: 53.4, top: 66.7 },
                    { left: 33.5, top: 75.1 },
                    { left: 16.9, top: 29.3 },
                    { left: 46.2, top: 49.6 },
                    { left: 94.6, top: 84.1 },
                    { left: 89.3, top: 23.2 },
                    { left: 81.2, top: 95.6 },
                    { left: 49.3, top: 82.1 },
                ].map((position, i) => (
                    <div
                        key={i}
                        className="particle absolute w-1.5 md:w-2 h-1.5 md:h-2 bg-red-500/20 rounded-full blur-sm"
                        style={{
                            left: `${position.left}%`,
                            top: `${position.top}%`,
                        }}
                    />
                ))}
            </div>

            {/* SVG Path Container */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#CE2E2F" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#CE2E2F" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#CE2E2F" stopOpacity="0.9" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Animated Journey Path */}
                <path
                    ref={pathRef}
                    d="M 25 1 Q 50 17, 75 33 Q 50 50, 25 67 Q 50 83, 75 99"
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="0.5"
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                />

                {/* Glowing dots along the path */}
                {[20, 40, 60, 80].map((offset, i) => (
                    <circle
                        key={i}
                        r="0.5"
                        fill="#CE2E2F"
                        opacity="0.6"
                        className="animate-pulse"
                        style={{
                            animationDelay: `${i * 0.3}s`,
                        }}
                    >
                        <animateMotion
                            dur="8s"
                            repeatCount="indefinite"
                            path="M 25 1 Q 50 17, 75 33 Q 50 50, 25 67 Q 50 83, 75 99"
                            begin={`${i * 2}s`}
                        />
                    </circle>
                ))}
            </svg>

            {/* Journey Stages */}
            <div className="relative w-full h-full">
                {JOURNEY_STAGES.map((stage, index) => {
                    const Icon = stage.icon;
                    const isActive = activeStage === stage.id;

                    return (
                        <div
                            key={stage.id}
                            data-stage={stage.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{
                                left: `${stage.position.x}%`,
                                top: `${stage.position.y}%`,
                            }}
                            onClick={() => handleStageClick(stage.id)}
                        >
                            {/* Stage Number Badge */}
                            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-20">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#CE2E2F] to-[#A82426] rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
                                    {stage.id}
                                </div>
                            </div>

                            {/* Main Node */}
                            <div
                                className={`
                                    relative bg-gradient-to-br ${stage.gradient}
                                    rounded-xl md:rounded-2xl shadow-2xl
                                    transition-all duration-300 ease-out
                                    p-4 md:p-6
                                    ${isActive ? 'scale-105 ring-2 ring-white/30' : 'hover:scale-105'}
                                    ${isActive ? 'w-52 md:w-60 h-auto' : 'w-40 h-40 md:w-52 md:h-52'}
                                `}
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-white/10 rounded-xl md:rounded-2xl blur-xl group-hover:bg-white/20 transition-all duration-300" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center text-center h-full">
                                    {/* Icon */}
                                    <div className={`
                                        bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl group-hover:bg-white/30 transition-all duration-300
                                        ${isActive ? 'p-1.5 md:p-2 mb-1.5 md:mb-2' : 'p-2 md:p-4 mb-2 md:mb-3'}
                                    `}>
                                        <Icon className={`text-white ${isActive ? 'w-5 h-5 md:w-7 md:h-7' : 'w-6 h-6 md:w-10 md:h-10'}`} strokeWidth={2.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className={`font-bold text-white ${isActive ? 'text-base md:text-lg mb-0.5' : 'text-lg md:text-2xl mb-0.5 md:mb-1'}`}>
                                        {stage.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className={`text-white/90 font-medium ${isActive ? 'text-[10px] md:text-xs mb-1' : 'text-xs md:text-sm mb-1 md:mb-2'}`}>
                                        {stage.subtitle}
                                    </p>

                                    {/* Divider */}
                                    <div className={`h-0.5 bg-white/40 transition-all duration-300 ${isActive ? 'w-6 md:w-8 mb-1.5 md:mb-2' : 'w-8 md:w-12 mb-2 md:mb-3 group-hover:w-12 md:group-hover:w-16'}`} />

                                    {/* Description - Shows on active or hover */}
                                    <div className={`
                                        transition-all duration-300 overflow-hidden
                                        ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100'}
                                    `}>
                                        <p className={`text-white/80 leading-relaxed ${isActive ? 'text-[10px] md:text-xs mb-2' : 'text-xs mb-3'}`}>
                                            {stage.description}
                                        </p>

                                        {/* Stats */}
                                        <div className={`${isActive ? 'space-y-1' : 'space-y-1.5'}`}>
                                            {stage.stats.map((stat, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg ${isActive ? 'px-2 py-1' : 'px-3 py-1.5'}`}
                                                >
                                                    <Sparkles className={`text-white/70 ${isActive ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
                                                    <span className={`text-white/90 font-medium ${isActive ? 'text-[10px] md:text-xs' : 'text-xs'}`}>
                                                        {stat}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Click hint - only show when not active */}
                                    {!isActive && (
                                        <div className={`mt-auto ${stage.id === 1 || stage.id === 4 ? 'pt-6' : 'pt-3'}`}>
                                            <span className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Click to explore
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Pulse Ring Animation */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-2xl">
                                        <div className="absolute inset-0 rounded-2xl bg-white/10 animate-pulse" style={{ animationDuration: '2s' }} />
                                    </div>
                                )}
                            </div>

                            {/* Arrow to next stage */}
                            {index < JOURNEY_STAGES.length - 1 && (
                                <div className={`
                                    absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    ${index % 2 === 0 ? 'left-full top-1/2 transform -translate-y-1/2 ml-2' : 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'}
                                `}>
                                    <TrendingUp className={`w-6 h-6 text-red-400/60 ${index % 2 === 1 ? 'rotate-[-135deg]' : ''}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
