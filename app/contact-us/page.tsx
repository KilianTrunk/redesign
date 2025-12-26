"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

    // Handle cooldown countdown
    useEffect(() => {
        if (cooldownTimeLeft > 0) {
            const timer = setTimeout(() => {
                setCooldownTimeLeft(cooldownTimeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldownTimeLeft]);

    const validateForm = (formData: FormData) => {
        const newErrors: Record<string, string> = {};
        const data = Object.fromEntries(formData.entries());

        if (!data.firstName?.toString().trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!data.lastName?.toString().trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!data.email?.toString().trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.toString())) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!data.company?.toString().trim()) {
            newErrors.company = "Company is required";
        }
        if (!data.message?.toString().trim()) {
            newErrors.message = "Message is required";
        }

        return newErrors;
    };

    const clearError = (fieldName: string) => {
        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // If in cooldown, don't allow submission
        if (cooldownTimeLeft > 0) {
            return;
        }

        const formData = new FormData(e.currentTarget);
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        // Simulate form processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get form data
        const data = Object.fromEntries(formData.entries());

        // Log the form data (instead of sending to SMTP)
        console.log("Contact form submission:", data);

        setIsSubmitting(false);
        setIsSubmitted(true);
        setCooldownTimeLeft(30); // Start 30 second cooldown

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        onChange={() => clearError('firstName')}
                                        className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                                            errors.firstName
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)]'
                                        }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        onChange={() => clearError('lastName')}
                                        className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                                            errors.lastName
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)]'
                                        }`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Work Email <span className="text-red-500">*</span></label>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={() => clearError('email')}
                                    className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                                        errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)]'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Company <span className="text-red-500">*</span></label>
                                <input
                                    name="company"
                                    type="text"
                                    onChange={() => clearError('company')}
                                    className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                                        errors.company
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)]'
                                    }`}
                                />
                                {errors.company && (
                                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    onChange={() => clearError('message')}
                                    className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                                        errors.message
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:border-[var(--color-ortecha-main)] focus:ring-[var(--color-ortecha-main)]'
                                    }`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || isSubmitted || cooldownTimeLeft > 0}
                                className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                                    isSubmitted
                                        ? 'bg-green-600 text-white cursor-not-allowed'
                                        : cooldownTimeLeft > 0
                                            ? 'bg-orange-500 text-white cursor-not-allowed'
                                            : isSubmitting
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-[var(--color-ortecha-main)] text-white hover:bg-[var(--color-ortecha-dark-red)] hover:shadow-xl'
                                }`}
                            >
                                {isSubmitted
                                    ? "Message Sent Successfully!"
                                    : cooldownTimeLeft > 0
                                        ? `Send Another Message (${cooldownTimeLeft}s)`
                                        : isSubmitting
                                            ? "Sending..."
                                            : "Send Message"}
                                {!isSubmitted && cooldownTimeLeft === 0 && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>

                    {/* Locations */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Where to find us</h2>
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
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src="https://ortecha.com/wp-content/uploads/2025/09/Canada-flag-circle-transparent-300x300.png"
                                            alt="Canada Flag"
                                            className="w-full h-full object-cover"
                                        />
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
