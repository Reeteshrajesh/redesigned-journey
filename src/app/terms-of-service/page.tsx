import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Finscann',
  description: 'Terms of Service for Finscann - Read our terms and conditions for using our financial news aggregation platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-600">
          <strong>Last Updated:</strong> January 29, 2026
        </p>
        <p>
          Welcome to Finscann.com. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
          <h2 className="text-xl font-semibold text-red-900 mb-3">⚠️ CRITICAL DISCLAIMER</h2>
          <p className="text-red-800 font-bold mb-2">
            Finscann is NOT a financial advisor and does NOT provide investment advice.
          </p>
          <p className="text-red-800 mb-2">
            <strong>All information on this website is for informational and educational purposes ONLY.</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-red-800 ml-4">
            <li>We do NOT recommend buying or selling any securities, stocks, bonds, cryptocurrencies, or commodities</li>
            <li>We do NOT provide investment advice, tips, or personalized financial recommendations</li>
            <li>We do NOT suggest which assets to invest in or make investment decisions for you</li>
            <li>You are solely responsible for your own investment and trading decisions</li>
          </ul>
        </div>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Finscann.com ("the Website"), you accept and agree to be bound by these Terms of Service and our Privacy Policy.
        </p>
        <p>
          <strong>If you do not agree to these terms, you must not use this website.</strong>
        </p>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes constitutes acceptance of the modified terms.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Finscann is a <strong>financial news aggregation and summary platform</strong>. We provide:
        </p>
        <ul>
          <li>News summaries from publicly available financial sources</li>
          <li>Automated sentiment analysis of news articles</li>
          <li>Categorized financial news content</li>
          <li>Market information and updates</li>
        </ul>
        <p className="font-semibold">
          We do NOT provide financial advice, investment recommendations, or trading signals.
        </p>

        <h2>3. No Investment Advice</h2>
        <p className="font-bold">
          Nothing on this website constitutes professional financial advice, investment advice, trading advice, or recommendations.
        </p>
        <ul>
          <li>Content is for informational purposes only</li>
          <li>We are not registered financial advisors, brokers, or investment professionals</li>
          <li>You should NOT rely solely on information from Finscann for investment decisions</li>
          <li>Always consult qualified financial advisors before making investment decisions</li>
          <li>Always conduct your own research and due diligence</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
          <h2 className="text-xl font-semibold text-orange-900 mb-3">4. Investment Risk Warning</h2>
          <p className="text-orange-800 font-bold">
            Trading and investing in financial markets carries SIGNIFICANT RISK.
          </p>
          <ul className="list-disc list-inside space-y-1 text-orange-800 ml-4">
            <li>You may lose some or ALL of your invested capital</li>
            <li>Past performance is NOT indicative of future results</li>
            <li>Market conditions can change rapidly and unpredictably</li>
            <li>Only invest money you can afford to lose completely</li>
          </ul>
          <p className="text-orange-800 font-semibold mt-2">
            By using this website, you acknowledge that you understand these risks.
          </p>
        </div>

        <h2>5. No Warranties or Guarantees</h2>
        <p>
          <strong>This website and all content are provided "AS IS" without warranties of any kind, express or implied.</strong>
        </p>
        <p>We make NO guarantees regarding:</p>
        <ul>
          <li>Accuracy, completeness, or timeliness of information</li>
          <li>Reliability of sentiment analysis or automated summaries</li>
          <li>Availability or uninterrupted access to the website</li>
          <li>Freedom from errors, bugs, or technical issues</li>
          <li>Suitability for any particular purpose</li>
        </ul>
        <p className="font-semibold">
          You use this website entirely at your own risk.
        </p>

        <h2>6. Third-Party Content and Links</h2>
        <p>
          Our website may contain links to third-party websites and content from external sources.
        </p>
        <ul>
          <li>We do NOT control or endorse third-party websites or content</li>
          <li>We are NOT responsible for the accuracy of third-party information</li>
          <li>Third-party sites have their own terms and privacy policies</li>
          <li>Accessing third-party links is at your own risk</li>
        </ul>

        <h2>7. Limitation of Liability</h2>
        <p className="font-bold">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, Finscann, its owners, operators, employees, and affiliates SHALL NOT BE LIABLE for:
        </p>
        <ul>
          <li>Any financial losses or investment losses of any kind</li>
          <li>Direct, indirect, incidental, or consequential damages</li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>Errors, omissions, or inaccuracies in content</li>
          <li>Unauthorized access to or alteration of your data</li>
          <li>Technical failures, downtime, or service interruptions</li>
        </ul>
        <p className="font-semibold">
          Your use of this website is entirely at your own risk and responsibility.
        </p>

        <h2>8. User Responsibilities</h2>
        <p>By using this website, you agree to:</p>
        <ul>
          <li>Use the website only for lawful purposes</li>
          <li>Not attempt to harm, disrupt, or compromise the website</li>
          <li>Not scrape, copy, or reproduce content without permission</li>
          <li>Not use automated tools to access the website excessively</li>
          <li>Not misrepresent your identity or affiliation</li>
          <li>Verify all information independently before making decisions</li>
          <li>Take full responsibility for your own investment decisions</li>
        </ul>

        <h2>9. Intellectual Property</h2>
        <p>
          All content on Finscann.com, including text, graphics, logos, and software, is the property of Finscann or its content suppliers.
        </p>
        <ul>
          <li>You may view and use content for personal, non-commercial purposes</li>
          <li>You may NOT reproduce, distribute, or republish content without permission</li>
          <li>Original news articles remain the property of their respective sources</li>
        </ul>

        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Finscann, its owners, operators, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
        </p>
        <ul>
          <li>Your use of the website</li>
          <li>Your violation of these Terms of Service</li>
          <li>Your violation of any rights of another party</li>
          <li>Investment or trading decisions you make</li>
        </ul>

        <h2>11. Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our website immediately, without prior notice, for any reason, including:
        </p>
        <ul>
          <li>Violation of these Terms of Service</li>
          <li>Suspected fraudulent or illegal activity</li>
          <li>Technical or security concerns</li>
        </ul>

        <h2>12. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the website shall be resolved in accordance with local jurisdiction.
        </p>

        <h2>13. Severability</h2>
        <p>
          If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>

        <h2>14. Contact Information</h2>
        <p>
          If you have questions about these Terms of Service, please contact us:
        </p>
        <p>
          Email:{' '}
          <a href="mailto:finscannquery@gmail.com" className="text-blue-600 hover:underline font-semibold">
            finscannquery@gmail.com
          </a>
        </p>

        <div className="bg-gray-100 border border-gray-300 p-4 rounded text-center mt-8">
          <p className="text-sm">
            By using Finscann.com, you acknowledge that you have read, understood, and agreed to these Terms of Service and our Disclaimer.
          </p>
        </div>
      </div>
    </div>
  )
}
