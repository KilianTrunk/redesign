"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

const TEAM = [
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[var(--color-ortecha-main)]/20 transition-all duration-300">
                    <div className="mb-6 flex items-start justify-between">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 group-hover:border-2 group-hover:border-[var(--color-ortecha-main)] transition-all">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="group-hover:text-[var(--color-ortecha-main)]">{member.name.charAt(0)}</span>
                            )}
                        </div>
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[var(--color-ortecha-main)] font-medium text-sm mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
            ))}
        </div>
    );
}
