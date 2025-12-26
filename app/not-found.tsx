"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ArrowLeft, Home, Mail, Search, Trophy, Shield, Rocket } from "lucide-react";

export default function NotFound() {
    return (
        <div className="pt-24">
            <Section className="bg-gray-50">
                <div className="text-center max-w-4xl mx-auto">

                    {/* Main Content */}
                    <div className="relative">
                        <div className="w-16 h-16 bg-[var(--color-ortecha-main)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Search className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Oops! Page Not Found
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                            The page you're looking for seems to have wandered off. Don't worry though -
                            our data might be well-organized, but even we lose a page sometimes!
                        </p>

                        <p className="text-gray-500 mb-8 text-lg">
                            Here are a few helpful options to get you back on track:
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-ortecha-main)] text-white font-semibold rounded-xl hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-lg hover:shadow-xl text-lg"
                            >
                                <Home className="w-5 h-5" />
                                Go Home
                            </Link>

                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                            >
                                <Mail className="w-5 h-5" />
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
