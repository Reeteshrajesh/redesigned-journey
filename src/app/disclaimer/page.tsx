import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Finscann',
  description: 'Important disclaimer - Finscann provides information only, not investment advice. Read carefully before using our services.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
          <p className="text-yellow-900 font-bold text-xl mb-3">⚠️ PLEASE READ CAREFULLY</p>
          <p className="text-yellow-800 font-semibold">
            The information on Finscann.com is for informational and educational purposes ONLY and is NOT financial advice, investment advice, trading advice, or any other sort of professional advice.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
          <h2 className="text-xl font-semibold text-red-900 mb-3">🚫 What We Are NOT</h2>
          <p className="text-red-800 font-bold mb-2">We are NOT financial advisors, brokers, or investment professionals.</p>
          <ul className="list-disc list-inside space-y-1 text-red-800 ml-4">
            <li><strong>We do NOT recommend buying or selling</strong> any stocks, bonds, cryptocurrencies, commodities, or other securities</li>
            <li><strong>We do NOT provide investment advice</strong> or personalized financial recommendations</li>
            <li><strong>We do NOT suggest which assets to invest in</strong> or make investment decisions for you</li>
            <li><strong>We are NOT responsible for your trading or investment decisions</strong></li>
            <li><strong>We do NOT guarantee profits</strong> or promise any financial returns</li>
          </ul>
        </div>

        <h2>What We Provide</h2>
        <p>
          Finscann is a <strong>news aggregation and summary platform</strong>. We collect publicly available financial news from various sources and present summaries to help you stay informed.
        </p>
        <p>
          Our <strong>sentiment analysis</strong> is automated using algorithms and may contain errors. It reflects the tone of news articles, not our opinion or recommendation.
        </p>
        <p className="font-semibold">
          All content is provided "as is" without any warranties, express or implied.
        </p>

        <h2>No Accuracy Guarantee</h2>
        <p>
          <strong>We make no guarantees</strong> about the accuracy, completeness, or timeliness of information on Finscann.
        </p>
        <ul>
          <li>News summaries may contain errors or omissions</li>
          <li>Sentiment analysis is automated and may be inaccurate</li>
          <li>Market data may be delayed or incorrect</li>
          <li>Third-party content may be outdated or false</li>
        </ul>
        <p className="font-semibold">
          Always verify information from original sources before making any decisions.
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
          <h2 className="text-xl font-semibold text-orange-900 mb-3">⚠️ Investment Risk Warning</h2>
          <p className="text-orange-800 font-bold">
            Trading and investing in financial markets carries a HIGH LEVEL OF RISK and may not be suitable for all investors.
          </p>
          <p className="text-orange-800">
            Before deciding to trade or invest, you should carefully consider:
          </p>
          <ul className="list-disc list-inside space-y-1 text-orange-800 ml-4">
            <li>Your investment objectives and financial goals</li>
            <li>Your level of experience and knowledge</li>
            <li>Your risk tolerance and ability to sustain losses</li>
            <li>The amount of capital you can afford to lose</li>
          </ul>
          <p className="text-orange-800 font-bold mt-3">
            You could lose some or ALL of your initial investment. Only invest money you can afford to lose completely.
          </p>
        </div>

        <h2>Past Performance Warning</h2>
        <p className="font-semibold">
          Past performance is NOT indicative of future results. Historical returns, data, or analysis do not guarantee future performance or returns.
        </p>

        <h2>Your Responsibility</h2>
        <p><strong>You are solely responsible for your own investment and trading decisions.</strong></p>
        <ul>
          <li>Conduct your own research and due diligence</li>
          <li>Consult with qualified financial advisors, accountants, and legal professionals</li>
          <li>Understand the risks involved before investing</li>
          <li>Never invest based solely on information from Finscann or any single source</li>
          <li>Verify all information independently</li>
        </ul>

        <h2>No Liability</h2>
        <p>
          Finscann, its owners, operators, employees, and affiliates are <strong>NOT LIABLE</strong> for any losses, damages, or consequences arising from your use of this website or any investment decisions you make.
        </p>

        <h2>Questions or Concerns?</h2>
        <p>
          If you have questions about this disclaimer, contact us at:{' '}
          <a href="mailto:contact@finscann.com" className="text-blue-600 hover:underline font-semibold">
            contact@finscann.com
          </a>
        </p>

        <div className="bg-gray-100 border border-gray-300 p-4 rounded text-center mt-8">
          <p className="text-sm">
            By using Finscann.com, you acknowledge that you have read, understood, and agreed to this disclaimer.
          </p>
        </div>
      </div>
    </div>
  )
}
