import { Section } from "@/components/ui/section";
import { TeamGrid } from "@/components/about/team-grid";
import { CTA } from "@/components/landing/cta";

import { Timeline } from "@/components/about/timeline";
import { LatestNews } from "@/components/about/latest-news";

export default function AboutPage() {
    return (
        <div className="pt-24">
            {/* Hero Section */}
            <Section className="bg-gray-50">
                <div className="max-w-4xl">
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
                    <div>
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

                        {/* Timeline */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">How we got here</h2>
                            <Timeline />
                        </div>
                    </div>

                    <div className="space-y-12" id="values">
                        <div className="bg-[var(--color-ortecha-main)] rounded-3xl p-10 text-white flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">What drives us?</h3>
                            <p className="mb-8 font-medium italic opacity-90 text-lg">
                                Our values aren’t corporate wallpaper. They’re how we actually work – with each other, with clients, with our communities.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="font-bold shrink-0">01</div>
                                    <div>
                                        <strong className="block text-lg">People first</strong>
                                        <span className="opacity-90">Strong relationships and real partnerships are everything.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="font-bold shrink-0">02</div>
                                    <div>
                                        <strong className="block text-lg">We own every challenge</strong>
                                        <span className="opacity-90">Your problems become our problems. We're in this together.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="font-bold shrink-0">03</div>
                                    <div>
                                        <strong className="block text-lg">Practitioners, not theorists</strong>
                                        <span className="opacity-90">We've done this before, and we know what it takes.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="font-bold shrink-0">04</div>
                                    <div>
                                        <strong className="block text-lg">Eyes on the horizon</strong>
                                        <span className="opacity-90">We keep learning, adapting, and sharing what's coming so you're ready.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="font-bold shrink-0">05</div>
                                    <div>
                                        <strong className="block text-lg">Integrity in everything</strong>
                                        <span className="opacity-90">We do what's right, not what's easy.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Industry Recognition */}
                        <div className="bg-gray-50 rounded-3xl p-10 border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry recognition</h3>
                            <p className="text-gray-600 mb-4 text-lg">
                                We don’t just follow best practices – we help create them.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We’re active members of the EDM Association, the global body for data management. And not just members – we’re involved in shaping standards and promoting excellence. That’s why clients trust us to help navigate complex challenges and prepare for what’s ahead.
                            </p>
                            <a href="#" className="text-[var(--color-ortecha-main)] font-semibold hover:underline inline-flex items-center gap-2">
                                More about EDM Association <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Team Section */}
            <Section className="bg-gray-50" id="ourpeople">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our People</h2>
                    <p className="text-xl text-gray-600">
                        Our leadership team brings a great range of diverse backgrounds. What unites them? A drive to make data make sense and to be truly valuable.
                    </p>
                </div>
                <TeamGrid />
            </Section>

            {/* Latest News */}
            <Section className="bg-white" id="latestnews">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest news</h2>
                </div>
                <LatestNews />
            </Section>

            <CTA />
        </div>
    );
}
