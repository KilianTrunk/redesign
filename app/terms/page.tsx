import { Section } from "@/components/ui/section";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p className="text-xl text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Ortecha's website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using Ortecha's website and services, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Ortecha's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
                this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on Ortecha's website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p className="mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated
                by Ortecha at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p>
                The materials on Ortecha's website are provided on an 'as is' basis. Ortecha makes no warranties, expressed
                or implied, and hereby disclaims and negates all other warranties including without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
              <p className="mt-4">
                Further, Ortecha does not warrant or make any representations concerning the accuracy, likely results,
                or reliability of the use of the materials on its website or otherwise relating to such materials or on
                any sites linked to this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
              <p>
                In no event shall Ortecha or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Ortecha's website, even if Ortecha or a Ortecha authorized representative has been
                notified orally or in writing of the possibility of such damage.
              </p>
              <p className="mt-4">
                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability
                for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
              <p>
                The materials appearing on Ortecha's website could include technical, typographical, or photographic errors.
                Ortecha does not warrant that any of the materials on its website are accurate, complete, or current.
                Ortecha may make changes to the materials contained on its website at any time without notice.
                However, Ortecha does not make any commitment to update the materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
              <p>
                Ortecha has not reviewed all of the sites linked to its website and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by Ortecha of the site.
                Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
              <p>
                Ortecha may revise these terms of service for its website at any time without notice. By using this website
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of England and Wales
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@ortecha.com" className="text-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-dark-red)]">
                  legal@ortecha.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Last Updated</h2>
              <p>
                These terms and conditions were last updated on {new Date().toLocaleDateString()}.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
