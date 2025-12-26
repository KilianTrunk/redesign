"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { TeamGrid } from "@/components/about/team-grid";
import { CTA } from "@/components/landing/cta";
import { Timeline } from "@/components/about/timeline";
import { LatestNews } from "@/components/about/latest-news";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const newsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Section Animation
        const heroChildren = gsap.utils.toArray(heroRef.current!.children);
        gsap.fromTo(
            heroChildren,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
            }
        );

        // Story Section Animation
        const storyChildren = gsap.utils.toArray(storyRef.current!.children);
        gsap.fromTo(
            storyChildren,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Values Section Animation
        gsap.fromTo(
            valuesRef.current,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Timeline Section Animation
        const timelineChildren = gsap.utils.toArray(timelineRef.current!.children);
        gsap.fromTo(
            timelineChildren,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Team Section Animation
        const teamChildren = gsap.utils.toArray(teamRef.current!.children);
        gsap.fromTo(
            teamChildren,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // News Section Animation
        const newsChildren = gsap.utils.toArray(newsRef.current!.children);
        gsap.fromTo(
            newsChildren,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: newsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, { scope: pageRef });

    return (
        <div ref={pageRef} className="pt-24 overflow-x-hidden">
            {/* Hero Section */}
            <Section className="bg-gray-50">
                <div ref={heroRef} className="max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        We love what we do.
                    </h1>
                    <p className="text-2xl text-gray-600 leading-relaxed">
                        For us, nothing beats helping our clients take the power of their data to a new level.
                    </p>
                </div>
            </Section>

            {/* Our Story */}
            <Section className="bg-white" id="ourstory">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div ref={storyRef}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="space-y-6 text-lg text-gray-600">
                            <p>
                                <b>Ortecha started because we spotted a problem we couldn’t ignore.</b>
                            </p>
                            <p>
                                Data teams were getting dragged into transformation projects that promised everything but delivered technology-first fixes that missed what actually mattered. The result? Expensive complexity, confused teams, and a growing gap between people and the data they needed to trust.
                            </p>
                            <p>
                                There had to be a better way. <em>So we built it.</em>
                            </p>
                            <p>
                                From the start, we did things differently. We paired deep technical expertise with a people-first mindset – helping teams not just implement data solutions but actually thrive with them. It was never just about the tech for us – it’s about making data and AI make sense, building real capability, and giving clients a clear path forward.
                            </p>
                            <p>
                                We cut our teeth in financial services, helping major institutions deal with post-crisis regulations. Then we partnered with the EDM Association to build the DCAM framework – now used by thousands of data teams globally. That partnership shaped how we think about data management: practical, scalable, and rooted in what actually works.
                            </p>
                            <p>
                                Since then, we’ve expanded internationally with teams across the UK, US and Canada. We work with global organisations to design and build modern data ecosystems where data actually works harder, projects move faster, and business value shows up clearly.
                            </p>
                            <p>
                                <b>What hasn’t changed?</b> We’re still real people solving real data problems for other real people. Because when you trust your data, everything else opens up.
                            </p>
                        </div>

                    </div>

                    <div ref={valuesRef} className="space-y-12" id="values">
                        <div className="bg-[var(--color-ortecha-main)] rounded-3xl p-6 md:p-10 text-white flex flex-col justify-center">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">What drives us?</h3>
                            <p className="mb-6 md:mb-8 font-medium italic opacity-90 text-base md:text-lg">
                                Our values aren't corporate wallpaper. They're how we actually work – with each other, with clients, with our communities.
                            </p>
                            <ul className="space-y-4 md:space-y-6">
                                <li className="flex gap-3 md:gap-4">
                                    <div className="font-bold shrink-0 text-sm md:text-base">01</div>
                                    <div>
                                        <strong className="block text-base md:text-lg">People first</strong>
                                        <span className="opacity-90 text-sm md:text-base">Strong relationships and real partnerships are everything.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="font-bold shrink-0 text-sm md:text-base">02</div>
                                    <div>
                                        <strong className="block text-base md:text-lg">We own every challenge</strong>
                                        <span className="opacity-90 text-sm md:text-base">Your problems become our problems. We're in this together.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="font-bold shrink-0 text-sm md:text-base">03</div>
                                    <div>
                                        <strong className="block text-base md:text-lg">Practitioners, not theorists</strong>
                                        <span className="opacity-90 text-sm md:text-base">We've done this before, and we know what it takes.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="font-bold shrink-0 text-sm md:text-base">04</div>
                                    <div>
                                        <strong className="block text-base md:text-lg">Eyes on the horizon</strong>
                                        <span className="opacity-90 text-sm md:text-base">We keep learning, adapting, and sharing what's coming so you're ready.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="font-bold shrink-0 text-sm md:text-base">05</div>
                                    <div>
                                        <strong className="block text-base md:text-lg">Integrity in everything</strong>
                                        <span className="opacity-90 text-sm md:text-base">We do what's right, not what's easy.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Industry Recognition */}
                        <div className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-200">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Industry recognition</h3>
                            <p className="text-gray-600 mb-3 md:mb-4 text-base md:text-lg">
                                We don't just follow best practices – we help create them.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                                We're active members of the EDM Association, the global body for data management. And not just members – we're involved in shaping standards and promoting excellence. That's why clients trust us to help navigate complex challenges and prepare for what's ahead.
                            </p>
                            <a href="#" className="text-[var(--color-ortecha-main)] font-semibold hover:underline inline-flex items-center gap-2 text-sm md:text-base">
                                More about EDM Association <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>

            {/* How we got here */}
            <Section className="bg-gray-50" id="timeline">
                <div ref={timelineRef} className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">How we got here</h2>
                    <p className="text-xl text-gray-600">
                        From our founding in the UK to our global expansion, here's our journey of growth and innovation.
                    </p>
                </div>
                <Timeline />
            </Section>

            {/* Team Section */}
            <Section className="bg-gray-50" id="ourpeople">
                <div ref={teamRef} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our People</h2>
                    <p className="text-xl text-gray-600 hidden md:block">
                        Our leadership team brings a great range of diverse backgrounds. What unites them? A drive to make data make sense and to be truly valuable.
                    </p>
                </div>
                <TeamGrid />
            </Section>

            {/* Latest News */}
            <Section className="bg-white" id="latestnews">
                <div ref={newsRef} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest news</h2>
                </div>
                <LatestNews />
            </Section>

            <CTA />
        </div>
    );
}
