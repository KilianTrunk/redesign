import { Section } from "@/components/ui/section";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Cookie Policy
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p className="text-xl text-gray-600 leading-relaxed">
              This Cookie Policy explains how Ortecha uses cookies and similar technologies on our website.
              By using our website, you consent to the use of cookies in accordance with this policy.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                They allow us to remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function properly. They enable core functionality
                    such as page navigation, access to secure areas, and basic site features. The website cannot function
                    properly without these cookies, and they cannot be disabled.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    These cookies help us understand how visitors interact with our website by collecting and
                    reporting information anonymously. This helps us improve our website's performance and user experience.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are used to track visitors across websites to display ads that are relevant
                    and engaging for individual users. They remember that you have visited a website and this
                    information is shared with other organizations such as advertisers.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p className="mb-4">
                You can manage your cookie preferences at any time by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Using the cookie banner that appears when you first visit our site</li>
                <li>Clicking the "Manage Preferences" button in our cookie banner</li>
                <li>Adjusting your browser settings to block or delete cookies</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p>
                Some cookies on our website are set by third-party services that appear on our pages.
                We have no control over these cookies, and they are subject to the respective third party's
                privacy policy. We use these services to enhance your experience and provide additional functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at{" "}
                <a href="mailto:privacy@ortecha.com" className="text-[var(--color-ortecha-main)] hover:text-[var(--color-ortecha-dark-red)]">
                  privacy@ortecha.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational,
                legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </Section>
    </div>
  );
}
