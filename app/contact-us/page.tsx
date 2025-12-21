"use client";

import { Section } from "@/components/ui/section";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-24">
            <Section className="bg-gray-50 pb-16">
                <div className="max-w-4xl text-center mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        Get in <span className="text-[var(--color-ortecha-main)]">touch</span>
                    </h1>
                    <p className="text-2xl text-gray-600 leading-relaxed mb-6">
                        Ready to make your data work for you? We'd love to hear from you.
                    </p>
                </div>
            </Section>

            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Request a call</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)] focus:ring-1 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)] focus:ring-1 outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)] focus:ring-1 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)] focus:ring-1 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)] focus:ring-1 outline-none transition-all"></textarea>
                            </div>
                            <button className="w-full py-4 bg-[var(--color-ortecha-main)] text-white font-bold rounded-xl hover:bg-[var(--color-ortecha-dark-red)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                Send Message
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Locations */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Where finding us</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src="https://ortecha.com/wp-content/uploads/2025/12/UK-Flag-circle.png"
                                            alt="UK Flag"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ortecha HQ</h3>
                                        <p className="text-gray-600 mb-2">1 Fore Street Avenue, London EC2Y 9DT<br />United Kingdom</p>
                                        <a href="tel:+442087983637" className="text-[var(--color-ortecha-main)] font-bold hover:underline">+44 (0) 20 8798 3637</a>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src="https://ortecha.com/wp-content/uploads/2025/12/USA-Flag-circle.png"
                                            alt="USA Flag"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ortecha US</h3>
                                        <p className="text-gray-600 mb-2">Nashville & Boston, USA</p>
                                        <a href="tel:+16153086465" className="text-[var(--color-ortecha-main)] font-bold hover:underline">+1 615 308 6465</a>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-[var(--color-ortecha-main)]">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ortecha CA</h3>
                                        <p className="text-gray-600 mb-2">Toronto, Canada</p>
                                        <a href="tel:+16153086465" className="text-[var(--color-ortecha-main)] font-bold hover:underline">+1 615 308 6465</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-[var(--color-ortecha-main)] rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">General Enquiries</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="w-5 h-5" />
                                <a href="mailto:hello@ortecha.com" className="font-medium hover:underline">hello@ortecha.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
