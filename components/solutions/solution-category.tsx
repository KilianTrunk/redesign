"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface SolutionItem {
    title: string;
    href: string;
}

interface SolutionCategoryProps {
    title: string;
    items: SolutionItem[];
    description?: string;
}

export function SolutionCategory({ title, items, description }: SolutionCategoryProps) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            {description && <p className="text-gray-600 mb-6">{description}</p>}
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-ortecha-main)]" />
                                <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[var(--color-ortecha-main)] transition-all" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
