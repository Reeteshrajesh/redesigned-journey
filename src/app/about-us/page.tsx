import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | welomoney',
  description:
    'welomoney provides financial news summaries and market insights for informational purposes only. We do not provide investment advice.',
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About welomoney</h1>
          <p className="text-xl text-gray-600">
            Your trusted source for real-time financial news and market insights
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 md:p-12 space-y-10">
            {/* Introduction */}
            <section>
              <p className="text-lg text-gray-700 leading-relaxed">
                welomoney is a financial news aggregation platform that helps you stay informed about
                markets, stocks, IPOs, cryptocurrencies, and economic trends.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* What We Provide */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Provide</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">News Aggregation</h3>
                    <p className="text-gray-600 text-sm">Financial news from various reputable sources</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Content</h3>
                    <p className="text-gray-600 text-sm">Articles generated using AI with human editorial oversight</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Summaries</h3>
                    <p className="text-gray-600 text-sm">Concise summaries of complex financial articles</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sentiment Analysis</h3>
                    <p className="text-gray-600 text-sm">Automated sentiment indicators</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Categorized Content</h3>
                    <p className="text-gray-600 text-sm">Organized by stocks, markets, IPOs, crypto, startups, and more</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real-Time Updates</h3>
                    <p className="text-gray-600 text-sm">Fresh news throughout the day</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* AI Content Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Generated Content</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3">Transparency Notice</h3>
                <p className="text-gray-700 mb-4">
                  welomoney uses advanced AI technology to generate some of our financial news articles. Our AI system analyzes real-time financial data, market trends, and news sources to create timely and relevant content.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">All AI-generated articles are:</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Reviewed by our editorial team for accuracy and quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Clearly labeled as AI-generated content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Based on verified data sources and market information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Designed to provide quick insights on breaking financial news</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-blue-200">
                  We believe in transparency and will always disclose when content is AI-generated. Human journalists review and fact-check all AI content before publication.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Mission */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To democratize access to financial information by making it easier for everyone to understand what's happening in financial markets.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Disclaimer */}
            <section>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Important Disclaimer</h2>
                <p className="font-semibold text-gray-900 mb-3">
                  We are NOT financial advisors. We do NOT provide investment advice.
                </p>
                <p className="text-gray-700 mb-4">All content is for informational and educational purposes only.</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>We do NOT recommend buying or selling any securities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Our sentiment analysis is automated and may contain errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>All investments carry risk - you may lose money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Always consult qualified financial professionals before investing</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
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
