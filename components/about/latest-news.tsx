
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NEWS_ITEMS = [
    {
        title: "Ortecha Appoints Two UK Partners as Growth Momentum Continues",
        date: "15 Dec",
        image: "/images/news/london-skyline.png",
        excerpt: "Ortecha continues its expansion with key leadership appointments in the UK.",
        href: "/resources",
    },
    {
        title: "Ortecha welcomes Stephen Gatchell as Partner and Head of AI Strategy",
        date: "17 Nov",
        image: "/images/news/obg-press-release.png",
        excerpt: "Stephen brings deep expertise to lead our AI strategy practice.",
        href: "/resources",
    },
    {
        title: "Ortecha and Broadgate Consultants have today announced their merger",
        date: "04 Nov",
        image: "/images/news/obg-press-release.png",
        excerpt: "Uniting data and technology expertise to deliver a unified business transformation approach.",
        href: "/resources",
    },
    {
        title: "Ortecha and Data Booster Partner to Make Data & AI Upskilling More Human",
        date: "11 Sep",
        image: "/images/news/data-booster.png",
        excerpt: "A new partnership focused on the human side of data and AI literacy.",
        href: "/resources",
    },
    {
        title: "Ortecha Appoints its First-Ever Chief Data Officer to Launch Innovation Lab",
        date: "14 Jul",
        image: "/images/news/ai-header.png",
        excerpt: "Leading our new Cloud-Based Innovation Lab to drive data excellence.",
        href: "/resources",
    },
    {
        title: "Ortecha and Novus-i2 join forces to help businesses get more value from data",
        date: "30 Mar",
        image: "/images/news/data-product.png",
        excerpt: "Collaborating to deliver enhanced value through data products.",
        href: "/resources",
    },
    {
        title: "Wellington Consulting Group joins the Ortecha family as Ortecha Canada",
        date: "28 Jan",
        image: "/images/news/wellington.png",
        excerpt: "Expanding our North American footprint with the addition of Wellington Consulting Group.",
        href: "/resources",
    },
];

export function LatestNews() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS_ITEMS.slice(0, 6).map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                            {item.date}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[var(--color-ortecha-main)] transition-colors line-clamp-3">
                            {item.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center text-[var(--color-ortecha-main)] font-semibold text-sm">
                            Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
