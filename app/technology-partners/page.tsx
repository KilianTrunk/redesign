import { Section } from "@/components/ui/section";
import { CTA } from "@/components/landing/cta";
import { CheckCircle2, Beaker, Zap, Users } from "lucide-react";

export default function TechnologyPartnersPage() {
    return (
        <div className="pt-24">
            {/* Hero */}
            <Section className="bg-gray-50">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        The right technology, <span className="text-[var(--color-ortecha-main)]">implemented in the right way</span>.
                    </h1>
                    <p className="text-2xl text-gray-600 leading-relaxed mb-6">
                        Technology is only as good as the way in which you use it. We partner with some of the best in the business, applying the right tools in the right way so you move faster, adapt smarter and achieve more.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We’re not here to sell software. We’re here to understand what you’re trying to solve and find the best way to solve it. Sometimes that means bringing in a partner platform. Sometimes it’s getting far more from what you already own.
                    </p>
                </div>
            </Section>

            {/* Innovation Lab */}
            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-ortecha-pale-pink)]/20 text-[var(--color-ortecha-main)] rounded-full text-sm font-bold mb-6">
                            <Beaker className="w-5 h-5" />
                            Ortecha Innovation Lab
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovation in Real Time</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-[var(--color-ortecha-main)]" />
                                    Working systems you can see, touch and understand
                                </h3>
                                <p className="text-gray-600">No theory. We build working prototypes, not pretty presentations.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                    <Users className="w-5 h-5 text-[var(--color-ortecha-main)]" />
                                    We live what we teach
                                </h3>
                                <p className="text-gray-600">
                                    The Ortecha Innovation Lab is our proving ground – where we test and refine process and tool configurations that automate end-to-end data and business processes.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 transition-all group-hover:scale-105">
                            <img
                                src="https://ortecha.com/wp-content/uploads/2025/11/Data-Management-that-Thinks-Header-768x432.png"
                                alt="Innovation Lab"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white font-medium drop-shadow-md">
                            <p>Ortecha Innovation Lab</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Capabilities */}
            <Section className="bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-16 text-[var(--color-ortecha-main)]">Who we've worked with</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-80 text-center">
                    {[
                        { name: "HSBC", url: "https://ortecha.com/wp-content/uploads/2025/07/HSBC-Logo.png" },
                        { name: "John Lewis", url: "https://ortecha.com/wp-content/uploads/2025/11/John-Lewis-Partnership-Logo.png" },
                        { name: "Lloyds", url: "https://ortecha.com/wp-content/uploads/2025/11/Lloyds-Banking-Group-Logo.png" },
                        { name: "Fannie Mae", url: "https://ortecha.com/wp-content/uploads/2025/07/Fannie-Mae-Logo.png" },
                        { name: "Chanel", url: "https://ortecha.com/wp-content/uploads/2025/07/Chanel-Logo.png" },
                        { name: "BMO", url: "https://ortecha.com/wp-content/uploads/2025/07/Bank-of-Montreal-Logo.png" },
                        { name: "Citibank", url: "https://ortecha.com/wp-content/uploads/2025/07/Citibank-Logo.png" },
                        { name: "Mind", url: "https://ortecha.com/wp-content/uploads/2025/11/Mind-Logo.png" },
                        { name: "Schroders", url: "https://ortecha.com/wp-content/uploads/2025/11/Schroders-Logo.png" },
                        { name: "Investec", url: "https://ortecha.com/wp-content/uploads/2025/07/Investec-Logo.png" },
                        { name: "Compare the Market", url: "https://ortecha.com/wp-content/uploads/2025/11/Compare-the-Market-Logo.png" },
                        { name: "Sky", url: "https://ortecha.com/wp-content/uploads/2025/11/Sky-Logo.png" },
                        { name: "TIFF", url: "https://ortecha.com/wp-content/uploads/2025/11/TIFF-Investment-Management-Logo.png" },
                        { name: "TD Bank", url: "https://ortecha.com/wp-content/uploads/2025/11/TD-Bank-Logo.png" },
                        { name: "CIBC Mellon", url: "https://ortecha.com/wp-content/uploads/2025/07/CIBC-Mellon-Logo.png" }
                    ].map((partner, i) => (
                        <div key={i} className="flex justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                            {/* Using standard img tag for external clarity or Next Image if preferred - keeping standard for simplicity/compat as requested "links so it will work" */}
                            <img src={partner.url} alt={partner.name} className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105" />
                        </div>
                    ))}
                </div>
            </Section>

            <CTA />
        </div>
    );
}
