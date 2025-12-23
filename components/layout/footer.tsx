import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Image
                            src="/assets/logo.png"
                            alt="Ortecha Footer Logo"
                            width={160}
                            height={36}
                            className="h-auto w-40"
                        />
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Ortecha – Data Made Human. We help organizations build trust in their data through governance, quality, and strategy.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-white rounded-full text-gray-600 hover:text-[#0077b5] hover:shadow-md transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-gray-600 hover:text-[#1da1f2] hover:shadow-md transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-gray-600 hover:text-[#ff0000] hover:shadow-md transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about-us" className="text-gray-600 hover:text-black transition-colors">About Us</Link></li>
                            <li><Link href="/solutions" className="text-gray-600 hover:text-black transition-colors">Solutions</Link></li>
                            <li><Link href="/resources" className="text-gray-600 hover:text-black transition-colors">Resources</Link></li>
                            <li><Link href="/careers" className="text-gray-600 hover:text-black transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Solutions</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Data Governance</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Data Quality</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Data Strategy</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Master Data Management</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-600">
                                <MapPin className="w-5 h-5 text-[var(--color-ortecha-blue)] shrink-0 mt-0.5" />
                                <span className="text-sm">London, UK (HQ)<br />New York, USA</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Mail className="w-5 h-5 text-[var(--color-ortecha-blue)] shrink-0" />
                                <a href="mailto:info@ortecha.com" className="text-sm hover:text-black">info@ortecha.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Phone className="w-5 h-5 text-[var(--color-ortecha-blue)] shrink-0" />
                                <a href="tel:+442087983637" className="text-sm hover:text-black">+44 (0) 20 8798 3637</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Ortecha. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-gray-900">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
