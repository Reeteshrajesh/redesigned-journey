import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Finscann',
  description: 'Get answers to common questions about financial news, stock market investing, IPOs, and using Finscann for market insights.',
  keywords: 'FAQ, financial news questions, stock market help, investing questions, Finscann help',
}

const faqs = [
  {
    question: 'What is Finscann?',
    answer: 'Finscann is a real-time financial news platform that provides stock market updates, IPO alerts, cryptocurrency news, and comprehensive investment insights. We deliver verified financial news from trusted sources to help investors stay informed and make better decisions.',
  },
  {
    question: 'Is Finscann free to use?',
    answer: 'Yes, Finscann is completely free to use. You can access all our financial news, market analysis, and investment insights without any subscription fees. We believe in democratizing financial information for all investors.',
  },
  {
    question: 'How often is the news updated?',
    answer: 'Our news is updated in real-time throughout the trading day. We monitor multiple trusted sources and publish breaking financial news within minutes of occurrence. You can rely on Finscann for the latest market-moving information.',
  },
  {
    question: 'Does Finscann provide investment advice?',
    answer: 'No, Finscann does not provide personalized investment advice. We are a financial news and information platform. All content is for educational and informational purposes only. Please consult a certified financial advisor before making investment decisions.',
  },
  {
    question: 'What categories of news does Finscann cover?',
    answer: 'Finscann covers Stock News, Market Updates, IPO News, Cryptocurrency, Commodities, Global Financial News, Budget & Policy, and General Business News. Each category is updated regularly with the latest developments.',
  },
  {
    question: 'How can I stay updated with Finscann news?',
    answer: 'You can join our WhatsApp group or Telegram channel for instant news alerts. We also publish regular updates on our website and social media channels (Twitter and LinkedIn). Visit our Contact page to join our communities.',
  },
  {
    question: 'Can I trust the news on Finscann?',
    answer: 'Yes, we source our news from verified and reputable sources. Each article includes proper attribution and we maintain strict editorial standards. However, we recommend cross-referencing important information before making investment decisions.',
  },
  {
    question: 'Does Finscann use AI to generate content?',
    answer: 'Yes, some articles on Finscann are generated using AI technology. All AI-generated articles are clearly labeled and reviewed by our editorial team for accuracy. We use AI to provide timely coverage of breaking financial news while maintaining quality through human oversight. You can identify AI-generated content by the author attribution and disclosure notice.',
  },
  {
    question: 'What is the difference between Stock News and Market News?',
    answer: 'Stock News focuses on individual company-specific updates like earnings, mergers, dividends, and management changes. Market News covers broader market trends, indices performance, sector movements, and macroeconomic factors affecting the overall market.',
  },
  {
    question: 'How do I search for specific stocks or companies?',
    answer: 'Use our Search feature (available in the top menu or footer) to search by company name, stock symbol, ticker, or keywords. You can also filter results by category and date range for more precise results.',
  },
  {
    question: 'Does Finscann have a mobile app?',
    answer: 'Currently, Finscann is optimized as a Progressive Web App (PWA) which works seamlessly on mobile browsers. You can add it to your home screen for an app-like experience. A dedicated mobile app may be launched in the future.',
  },
  {
    question: 'What are IPO alerts and how do I get them?',
    answer: 'IPO (Initial Public Offering) alerts notify you about upcoming and ongoing IPOs, including subscription dates, price bands, and listing information. Join our WhatsApp or Telegram communities to receive instant IPO alerts.',
  },
  {
    question: 'How can I contact Finscann for queries or feedback?',
    answer: 'You can reach us via email at contact@finscann.com, join our WhatsApp community, or connect through our Telegram channel. Visit our Contact page for all communication options. We typically respond within 24-48 hours.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <FAQSchema faqs={faqs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about Finscann and financial news
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <h2 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h2>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-blue-100 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> The information provided in these FAQs is for general
            informational purposes only. Finscann does not provide investment, legal, or tax
            advice. Please consult qualified professionals for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  )
}
