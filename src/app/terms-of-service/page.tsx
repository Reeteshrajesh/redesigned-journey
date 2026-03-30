import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | welomoney',
  description: 'Terms of Service for welomoney - Read our terms and conditions for using our financial news aggregation platform.',
  alternates: {
    canonical: 'https://welomoney.com/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Terms and conditions for using our financial news platform
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
                Welcome to welomoney.com. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </section>

            {/* Critical Disclaimer */}
            <section>
              <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Critical Disclaimer</h2>
                <p className="text-gray-900 font-bold mb-2">
                  welomoney is NOT a financial advisor and does NOT provide investment advice.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>All information on this website is for informational and educational purposes ONLY.</strong>
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>We do NOT recommend buying or selling any securities, stocks, bonds, cryptocurrencies, or commodities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>We do NOT provide investment advice, tips, or personalized financial recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>We do NOT suggest which assets to invest in or make investment decisions for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>You are solely responsible for your own investment and trading decisions</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 1. Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-3">
                By accessing and using welomoney.com ("the Website"), you accept and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>If you do not agree to these terms, you must not use this website.</strong>
              </p>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 2. Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-3">
                welomoney is a <strong>financial news aggregation and summary platform</strong>. We provide:
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>News summaries from publicly available financial sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>AI-generated articles reviewed by our editorial team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Automated sentiment analysis of news articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Categorized financial news content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Market information and updates</span>
                </li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-4 mt-4 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">AI-Generated Content</h3>
                <p className="text-sm text-gray-700">
                  Some articles on welomoney are generated using AI technology. All AI-generated content is clearly labeled and reviewed by our editorial team. By using this website, you acknowledge that AI-generated content may contain errors or inaccuracies, and you agree not to rely solely on such content for investment decisions.
                </p>
              </div>

              <p className="text-gray-700 font-semibold mt-4">
                We do NOT provide financial advice, investment recommendations, or trading signals.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 3. No Investment Advice */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No Investment Advice</h2>
              <p className="text-gray-900 font-bold mb-3">
                Nothing on this website constitutes professional financial advice, investment advice, trading advice, or recommendations.
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Content is for informational purposes only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>We are not registered financial advisors, brokers, or investment professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>You should NOT rely solely on information from welomoney for investment decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Always consult qualified financial advisors before making investment decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Always conduct your own research and due diligence</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 4. Investment Risk */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Investment Risk Warning</h2>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <p className="text-gray-900 font-bold mb-3">
                  Trading and investing in financial markets carries SIGNIFICANT RISK.
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>You may lose some or ALL of your invested capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Past performance is NOT indicative of future results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Market conditions can change rapidly and unpredictably</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Only invest money you can afford to lose completely</span>
                  </li>
                </ul>
                <p className="text-gray-700 font-semibold mt-3 pt-3 border-t border-amber-200">
                  By using this website, you acknowledge that you understand these risks.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 5. No Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. No Warranties or Guarantees</h2>
              <p className="text-gray-900 font-bold mb-3">
                This website and all content are provided "AS IS" without warranties of any kind, express or implied.
              </p>
              <p className="text-gray-700 mb-3">We make NO guarantees regarding:</p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Accuracy, completeness, or timeliness of information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Reliability of sentiment analysis or automated summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Availability or uninterrupted access to the website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Freedom from errors, bugs, or technical issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Suitability for any particular purpose</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold mt-3">
                You use this website entirely at your own risk.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 6. Third Party */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Content and Links</h2>
              <p className="text-gray-700 mb-3">
                Our website may contain links to third-party websites and content from external sources.
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>We do NOT control or endorse third-party websites or content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>We are NOT responsible for the accuracy of third-party information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Third-party sites have their own terms and privacy policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Accessing third-party links is at your own risk</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 7. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-900 font-bold mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, welomoney, its owners, operators, employees, and affiliates SHALL NOT BE LIABLE for:
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Any financial losses or investment losses of any kind</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Direct, indirect, incidental, or consequential damages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Loss of profits, revenue, data, or business opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Errors, omissions, or inaccuracies in content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Unauthorized access to or alteration of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Technical failures, downtime, or service interruptions</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold mt-3">
                Your use of this website is entirely at your own risk and responsibility.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 8. User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Responsibilities</h2>
              <p className="text-gray-700 mb-3">By using this website, you agree to:</p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Use the website only for lawful purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Not attempt to harm, disrupt, or compromise the website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Not scrape, copy, or reproduce content without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Not use automated tools to access the website excessively</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Not misrepresent your identity or affiliation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Verify all information independently before making decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Take full responsibility for your own investment decisions</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 9. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 mb-3">
                All content on welomoney.com, including text, graphics, logos, and software, is the property of welomoney or its content suppliers.
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>You may view and use content for personal, non-commercial purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>You may NOT reproduce, distribute, or republish content without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Original news articles remain the property of their respective sources</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 10. Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-3">
                You agree to indemnify and hold harmless welomoney, its owners, operators, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Your use of the website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Your violation of these Terms of Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Your violation of any rights of another party</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Investment or trading decisions you make</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 11. Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-3">
                We reserve the right to terminate or suspend access to our website immediately, without prior notice, for any reason, including:
              </p>
              <ul className="space-y-1.5 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Violation of these Terms of Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Suspected fraudulent or illegal activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Technical or security concerns</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 12. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the website shall be resolved in accordance with local jurisdiction.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 13. Severability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* 14. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-3">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <p className="text-gray-700">
                Email:{' '}
                <a href="mailto:welomoney@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  welomoney@gmail.com
                </a>
              </p>
            </section>

            {/* Acknowledgment */}
            <section>
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 text-center">
                <p className="text-sm text-gray-700">
                  By using welomoney.com, you acknowledge that you have read, understood, and agreed to these Terms of Service and our Disclaimer.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  )
}
