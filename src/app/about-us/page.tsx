import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Finscann',
  description:
    'Finscann provides financial news summaries and market insights for informational purposes only. We do not provide investment advice.',
}

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Finscann</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-xl">
          Finscann is a financial news aggregation platform that helps you stay informed about
          markets, stocks, IPOs, cryptocurrencies, and economic trends.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">What We Provide</h2>
        <ul className="space-y-2">
          <li>
            <strong>News Aggregation:</strong> Financial news from various reputable sources
          </li>
          <li>
            <strong>AI-Powered Summaries:</strong> Concise summaries of complex financial articles
          </li>
          <li>
            <strong>Sentiment Analysis:</strong> Automated sentiment indicators
          </li>
          <li>
            <strong>Categorized Content:</strong> Organized by stocks, markets, IPOs, crypto, and
            more
          </li>
          <li>
            <strong>Real-Time Updates:</strong> Fresh news throughout the day
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Our Mission</h2>
        <p>
          To democratize access to financial information by making it easier for everyone to
          understand what's happening in financial markets.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Important Disclaimer</h2>
          <p className="font-semibold mb-3">
            We are NOT financial advisors. We do NOT provide investment advice.
          </p>
          <p className="mb-2">All content is for informational and educational purposes only.</p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>We do NOT recommend buying or selling any securities</li>
            <li>Our sentiment analysis is automated and may contain errors</li>
            <li>All investments carry risk - you may lose money</li>
            <li>Always consult qualified financial professionals before investing</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Contact Us</h2>
        <p>
          Email:{' '}
          <a href="mailto:contact@finscann.com" className="text-blue-600 hover:underline">
            contact@finscann.com
          </a>
        </p>
      </div>
    </div>
  )
}
