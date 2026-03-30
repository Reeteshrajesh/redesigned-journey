import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | welomoney',
  description: 'Important disclaimer - welomoney provides information only, not investment advice. Read carefully before using our services.',
  alternates: {
    canonical: 'https://welomoney.com/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-xl text-gray-600">
            Please read this carefully before using our services
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 md:p-12 space-y-10">
            {/* Critical Notice */}
            <section>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <p className="text-amber-900 font-bold text-lg mb-2">Please Read Carefully</p>
                <p className="text-gray-700">
                  The information on welomoney.com is for informational and educational purposes ONLY and is NOT financial advice, investment advice, trading advice, or any other sort of professional advice.
                </p>
              </div>
            </section>

            {/* What We Are NOT */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Are NOT</h2>
              <p className="font-semibold text-gray-900 mb-3">We are NOT financial advisors, brokers, or investment professionals.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>We do NOT recommend buying or selling</strong> any stocks, bonds, cryptocurrencies, commodities, or other securities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>We do NOT provide investment advice</strong> or personalized financial recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>We do NOT suggest which assets to invest in</strong> or make investment decisions for you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>We are NOT responsible for your trading or investment decisions</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>We do NOT guarantee profits</strong> or promise any financial returns</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* What We Provide */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h2>
              <p className="text-gray-700 mb-3">
                welomoney is a <strong>news aggregation and summary platform</strong>. We collect publicly available financial news from various sources and present summaries to help you stay informed.
              </p>
              <p className="text-gray-700">
                Our <strong>sentiment analysis</strong> is automated using algorithms and may contain errors. It reflects the tone of news articles, not our opinion or recommendation.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* AI Content */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Generated Content</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <p className="text-gray-700 mb-3">
                  Some articles on welomoney are generated using artificial intelligence (AI) technology:
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>AI-generated articles are clearly labeled as such</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>All AI content is reviewed by our editorial team before publication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>AI-generated content may contain errors or inaccuracies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>We are not responsible for decisions made based on AI-generated content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>AI content reflects data patterns, not professional financial analysis</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 font-semibold mt-4">
                All content is provided "as is" without any warranties, express or implied.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* No Accuracy Guarantee */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Accuracy Guarantee</h2>
              <p className="text-gray-700 mb-3">
                <strong>We make no guarantees</strong> about the accuracy, completeness, or timeliness of information on welomoney.
              </p>
              <ul className="space-y-1.5 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>News summaries may contain errors or omissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Sentiment analysis is automated and may be inaccurate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Market data may be delayed or incorrect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Third-party content may be outdated or false</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold mt-3">
                Always verify information from original sources before making any decisions.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Investment Risk */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risk Warning</h2>
              <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                <p className="text-gray-900 font-bold mb-3">
                  Trading and investing in financial markets carries a HIGH LEVEL OF RISK and may not be suitable for all investors.
                </p>
                <p className="text-gray-700 mb-3">
                  Before deciding to trade or invest, you should carefully consider:
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Your investment objectives and financial goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Your level of experience and knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Your risk tolerance and ability to sustain losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>The amount of capital you can afford to lose</span>
                  </li>
                </ul>
                <p className="text-gray-900 font-bold mt-4 pt-4 border-t border-red-200">
                  You could lose some or ALL of your initial investment. Only invest money you can afford to lose completely.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Past Performance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Performance Warning</h2>
              <p className="text-gray-700 font-semibold">
                Past performance is NOT indicative of future results. Historical returns, data, or analysis do not guarantee future performance or returns.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Your Responsibility */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibility</h2>
              <p className="text-gray-700 font-semibold mb-3">You are solely responsible for your own investment and trading decisions.</p>
              <ul className="space-y-1.5 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Conduct your own research and due diligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Consult with qualified financial advisors, accountants, and legal professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Understand the risks involved before investing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Never invest based solely on information from welomoney or any single source</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>Verify all information independently</span>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* No Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Liability</h2>
              <p className="text-gray-700">
                welomoney, its owners, operators, employees, and affiliates are <strong>NOT LIABLE</strong> for any losses, damages, or consequences arising from your use of this website or any investment decisions you make.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
              <p className="text-gray-700">
                If you have questions about this disclaimer, contact us at:{' '}
                <a href="mailto:welomoney@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  welomoney@gmail.com
                </a>
              </p>
            </section>

            {/* Acknowledgment */}
            <section>
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 text-center">
                <p className="text-sm text-gray-700">
                  By using welomoney.com, you acknowledge that you have read, understood, and agreed to this disclaimer.
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
