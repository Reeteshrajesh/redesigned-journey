import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | welomoney',
  description: 'Privacy Policy for welomoney - Learn how we collect, use, and protect your information',
  alternates: {
    canonical: 'https://welomoney.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            How we collect, use, and protect your information
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Last Updated:</strong> January 29, 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 md:p-12 space-y-10">
            {/* Introduction */}
            <section>
              <p className="text-gray-700">
                welomoney.com ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.
              </p>
            </section>

            {/* Quick Summary */}
            <section>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Summary</h2>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>We do NOT sell your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>We collect minimal data (usage statistics via cookies and analytics)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>We do NOT require account registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>You can use our site without providing personal information</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information:</h3>
                  <p className="text-gray-700 mb-3">When you visit welomoney, we automatically collect certain information through cookies and similar technologies:</p>
                  <ul className="space-y-1.5 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>IP address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Browser type and version</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Operating system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Pages visited and time spent on pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Referring website</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Device type (desktop, mobile, tablet)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>General location (country/city level based on IP)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Voluntarily Provided Information:</h3>
                  <p className="text-gray-700 mb-3">If you contact us via email, we collect:</p>
                  <ul className="space-y-1.5 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Your email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>Any information you include in your message</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 font-semibold">
                  We do NOT collect: Names, phone numbers, financial information, or any sensitive personal data.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the collected information to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Operate and maintain the website:</strong> Ensure proper functionality and performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Analyze usage:</strong> Understand how visitors use our site to improve content and features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Improve AI-generated content:</strong> Usage patterns help train and improve our AI content generation system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Monitor traffic:</strong> Track website traffic and user behavior patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Respond to inquiries:</strong> Answer questions or provide support when you contact us</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Prevent abuse:</strong> Detect and prevent spam, fraud, or malicious activity</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold mt-4">
                We do NOT use your information for marketing, advertising, or selling to third parties.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience and analyze site usage.
              </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Types of cookies we use:</h3>
                <ul className="space-y-1.5 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span><strong>Essential Cookies:</strong> Required for basic site functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span><strong>Performance Cookies:</strong> Improve site speed and performance</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 mt-4">
                <strong>Managing Cookies:</strong> You can control or disable cookies through your browser settings. Note that disabling cookies may affect site functionality.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Third Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-700 mb-3">We use third-party services to operate our website:</p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span><strong>Analytics Services:</strong> Google Analytics or similar tools to analyze traffic (these services have their own privacy policies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span><strong>Hosting Providers:</strong> Cloud hosting services to serve our website content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span><strong>Content Delivery Networks (CDNs):</strong> To deliver content faster globally</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold mt-3">
                These third parties may collect information as described in their own privacy policies.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700">
                We implement reasonable security measures to protect your information. However, no internet transmission is 100% secure. We cannot guarantee absolute security of data transmitted to our website.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700">
                We retain usage data for as long as necessary to fulfill the purposes outlined in this policy. Analytics data is typically retained for 12-24 months.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-3">Depending on your location, you may have the right to:</p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Access the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Object to processing of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Opt-out of cookies (via browser settings)</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
              </p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:welomoney@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  welomoney@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  )
}
