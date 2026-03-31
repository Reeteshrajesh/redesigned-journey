import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | welomoney',
  description: 'Get answers to common questions about financial news, stock market investing, IPOs, and using welomoney for market insights.',
  alternates: {
    canonical: 'https://welomoney.com/faq',
  },
}

const faqs = [
  {
    question: 'What is welomoney?',
    answer: 'welomoney is a platform where you can find the latest financial news in one place. It covers stock market updates, IPO news, crypto trends, and other important business topics so you can stay aware of what\'s happening in the market.',
  },
  {
    question: 'Is welomoney free to use?',
    answer: 'Yes, you don\'t have to pay anything to use welomoney. All the news and updates are available for free, so anyone can access financial information without any cost.',
  },
  {
    question: 'How often is the news updated?',
    answer: 'News on welomoney is updated regularly throughout the day. Whenever something important happens in the market, it gets published quickly so users can stay up to date.',
  },
  {
    question: 'Does welomoney provide investment advice?',
    answer: 'No, welomoney does not give personal investment advice. It only shares news and information. Before investing your money, it\'s always better to talk to a financial expert.',
  },
  {
    question: 'What categories of news does welomoney cover?',
    answer: 'welomoney shares different types of financial news like stock updates, IPO details, crypto news, commodities, global market updates, government policies, and general business news.',
  },
  {
    question: 'How can I stay updated with welomoney news?',
    answer: 'You can stay updated by joining our WhatsApp or Telegram groups where news is shared instantly. You can also follow the website and social media pages for regular updates.',
  },
  {
    question: 'Can I trust the news on welomoney?',
    answer: 'welomoney shares information from reliable and verified sources. However, financial markets can change rapidly, so always verify important details before making any financial decisions.',
  },
  {
    question: 'Does welomoney use AI to generate content?',
    answer: 'Yes, some content is created using AI to share updates faster. But every such article is checked by the team before publishing, and it is clearly mentioned when AI is used.',
  },
  {
    question: 'What is the difference between Stock News and Market News?',
    answer: 'Stock news is about specific companies, like their results or major announcements. Market news talks about the bigger picture, like how the overall market or different sectors are performing.',
  },
  {
    question: 'How do I search for specific stocks or companies?',
    answer: 'You can use the search option on the website and type the company name or stock symbol. It helps you quickly find related news and updates.',
  },
  {
    question: 'Does welomoney have a mobile app?',
    answer: 'Right now, there is no separate app, but the website works very well on mobile. You can open it in your browser and add it to your home screen for quick access.',
  },
  {
    question: 'What are IPO alerts and how do I get them?',
    answer: 'IPO alerts are updates about new companies launching in the stock market. You can get these alerts by joining welomoney\'s WhatsApp or Telegram groups.',
  },
  {
    question: 'How can I contact welomoney for queries or feedback?',
    answer: 'If you have any questions or feedback, you can email at welomoney@gmail.com or connect through the WhatsApp or Telegram channels. We usually reply within a day or two.',
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
            Everything you need to know about welomoney and financial news
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
            informational purposes only. welomoney does not provide investment, legal, or tax
            advice. Please consult qualified professionals for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  )
}
