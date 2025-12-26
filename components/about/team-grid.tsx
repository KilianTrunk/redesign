"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Linkedin, X } from "lucide-react";

type TeamMember = {
    name: string;
    role: string;
    image?: string;
    description: string;
    linkedin?: string;
};

const TEAM: TeamMember[] = [
    {
        name: "Pete Youngs",
        role: "Managing Partner & CEO",
        image: "/images/team/pete-youngs.png",
        description: "Pete’s one of our founding partners and will probably be the first person you talk to if you get in contact with us in the UK or Europe. He’s a DCAM expert and heads up the company as a whole. In his spare time he’ll usually be found near a car!",
        linkedin: "https://www.linkedin.com/in/peteyoungs/",
    },
    {
        name: "Mark McQueen",
        role: "Managing Partner & CEO, Head of North America",
        image: "/images/team/mark-mcqueen.png",
        description: "Mark will normally be your first point of contact if you’re getting in touch in North America. He’s a DCAM expert (former Senior Advisor at the EDM Council) and leads the US side of the business. He enjoys travelling and hopes to visit the Greek Islands one day.",
        linkedin: "https://www.linkedin.com/in/marktmcqueen/",
    },
    {
        name: "Paul Slattery",
        role: "CFO & COO",
        image: "/images/team/paul-slattery.png",
        description: "You'll find Paul balancing the books while keeping the whole show running smoothly.",
        linkedin: "#",
    },
    {
        name: "Ben Clinch",
        role: "Partner & Chief Data Officer",
        image: "/images/team/ben-clinch.png",
        description: "Ben is a data and AI thought leader who makes complex ideas click. Alongside working with clients, you can often find him at events sharing his experiences or leading experiments within our Cloud-based Innovation Lab.",
        linkedin: "https://www.linkedin.com/in/benclinch/",
    },
    {
        name: "Brian McConnell",
        role: "Partner",
        image: "/images/team/brian-mcconnell.png",
        description: "Brian is a seasoned data and transformation leader who’s seen it all — from IBM to founding his own consultancy. Now leading Ortecha Canada, he helps client solve complex challenges with calm confidence, sharp thinking and just the right dash of curiosity and humour.",
        linkedin: "https://www.linkedin.com/in/brian--mcconnell/",
    },
    {
        name: "Richard Gale",
        role: "Partner",
        image: "/images/team/richard-gale.png",
        description: "Richard specializes in driving business value through effective data management and analytics.",
        linkedin: "#",
    },
    {
        name: "John Vincent",
        role: "Partner",
        image: "/images/team/john-vincent.png",
        description: "John is a highly experienced data leader helping organizations transform their data capabilities.",
        linkedin: "#",
    },
    {
        name: "Marie Wigmore",
        role: "Partner",
        image: "/images/team/marie-wigmore.png",
        description: "Marie is a data and AI leader. She's known for managing multi-million-pound data programmes and leading transformational change and has a passion for getting things done.",
        linkedin: "https://www.linkedin.com/in/marie-wigmore-6804613b/",
    },
    {
        name: "Stephen Gatchell",
        role: "Partner, Head of AI Strategy",
        image: "/images/team/stephen-gatchell.png",
        description: "Stephen is more than a strategist - he builds. He's spent his career turning big ideas into real solutions and helped define how large, complex enterprises get data and AI ready.",
        linkedin: "https://www.linkedin.com/in/stephengatchell/",
    },
    {
        name: "Angie Livingstone",
        role: "Partner, Head of Analytics",
        image: "/images/team/angie-livingstone.png",
        description: "Angie leads key client engagements with a focus on people-first data transformation.",
        linkedin: "#",
    },
    {
        name: "Charles Ivie",
        role: "Partner, Head of Data & AI Engineering",
        image: "/images/team/charles-ivie.png",
        description: "Charles brings deep expertise in data governance and strategy for global enterprises.",
        linkedin: "#",
    },
    {
        name: "Araminta Huitson",
        role: "Head of People, Comms & Culture",
        image: "/images/team/araminta-huitson.png",
        description: "Araminta is the heartbeat behind how we work. As a Principal Consultant and the founder of the Data Culture Club, she’s on a mission to make data feel human, collaboration feel natural and work feel a little more fun for everyone.",
        linkedin: "https://www.linkedin.com/in/araminta-huitson/",
    },
    {
        name: "Steve Prokopiou",
        role: "Head of Data Literacy & Enablement",
        image: "/images/team/steve-prokopiou.png",
        description: "Steve is all about turning data curiosity into confidence. With a career spanning global software firms and major enterprises, he helps people at every level get real value from data.",
        linkedin: "https://www.linkedin.com/in/steveprokopiou/",
    },
    {
        name: "Sean Russell",
        role: "Managing Principal",
        image: "/images/team/sean-russell.png",
        description: "Sean has a sharp mind for all things data & AI, and a soft spot for good food, travel and tech. He has a knack for blending structure with creativity - whether he’s helping clients solve complex challenges, composing music or building an AI bot for fun.",
        linkedin: "https://www.linkedin.com/in/theseanrussell/",
    },
    {
        name: "Tanya Wilson",
        role: "Global Head of Sales & Business Development",
        image: "/images/team/tanya-wilson.png",
        description: "Tanya is our Business Development dynamo - the first friendly face (or voice) you’ll likely meet at Ortecha. She is powered by building meaningful relationships with our clients and supporting them all the way on their data excellence journey (and a healthy dose of river life in her spare time).",
        linkedin: "https://www.linkedin.com/in/tanya-wilson-acim-2382822a/",
    },
];

export function TeamGrid() {
    const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

    const hasLinkedIn = useMemo(() => {
        return (m: TeamMember | null) => !!m?.linkedin && m.linkedin !== "#";
    }, []);

    useEffect(() => {
        if (!activeMember) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveMember(null);
        };
        window.addEventListener("keydown", onKeyDown);
        // Lock scroll behind modal (works with Lenis + mobile Safari better than body-only)
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [activeMember]);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
                {TEAM.map((member, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveMember(member)}
                        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[var(--color-ortecha-main)]/30 flex flex-col h-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ortecha-main)]/40 active:scale-[0.99]"
                        aria-label={`Open details for ${member.name}`}
                    >
                    {/* Image Section */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden p-4">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                                {member.name.charAt(0)}
                            </div>
                        )}

                        {/* Gradient Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ortecha-main)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* LinkedIn Icon */}
                        {member.linkedin && member.linkedin !== "#" && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-[#0077b5] hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Open ${member.name}'s LinkedIn`}
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5 flex flex-col">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-[var(--color-ortecha-main)] transition-colors duration-300 line-clamp-2">
                            {member.name}
                        </h3>
                        <p className="text-[var(--color-ortecha-main)] font-semibold text-[10px] sm:text-xs mt-1 uppercase tracking-wide leading-snug line-clamp-2">
                            {member.role}
                        </p>

                        {/* Clear affordance on mobile (icon-only was too subtle) */}
                        <div className="md:hidden mt-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">
                                View bio
                                <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Divider adds a lot of perceived empty space on mobile */}
                        <div className="hidden md:block h-px bg-gradient-to-r from-[var(--color-ortecha-main)] via-[var(--color-ortecha-main)]/50 to-transparent my-3" />
                        <p className="text-gray-600 text-sm leading-relaxed hidden md:block">
                            {member.description}
                        </p>
                    </div>
                    </button>
                ))}
            </div>

            {/* Details modal */}
            {activeMember && (
                <div
                    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeMember.name} details`}
                    onMouseDown={(e) => {
                        if (e.currentTarget === e.target) setActiveMember(null);
                    }}
                    // Prevent Lenis from scrolling the page behind
                    data-lenis-prevent
                >
                    <div
                        className="w-full max-w-lg max-h-[85vh] overflow-auto rounded-2xl bg-white shadow-2xl border border-black/5"
                        data-lenis-prevent
                    >
                        <div className="p-4 sm:p-6 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="text-2xl font-bold text-gray-900">{activeMember.name}</h3>
                                <p className="text-[var(--color-ortecha-main)] font-semibold text-sm uppercase tracking-wide mt-1">
                                    {activeMember.role}
                                </p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                {hasLinkedIn(activeMember) && (
                                    <a
                                        href={activeMember.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-sm"
                                        aria-label={`Open ${activeMember.name}'s LinkedIn`}
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setActiveMember(null)}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-gray-800" />
                                </button>
                            </div>
                        </div>

                        {activeMember.image && (
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                <div className="relative w-full h-[200px] sm:h-[240px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                                    <img
                                        src={activeMember.image}
                                        alt={activeMember.name}
                                        className="w-full h-full object-contain object-center p-3"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="px-4 sm:px-6 pb-5 sm:pb-6">
                            <p className="text-gray-700 leading-relaxed">{activeMember.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
