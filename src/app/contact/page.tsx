import { Metadata } from 'next'
import { Mail, MessageCircle, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | welomoney',
  description: 'Contact welomoney for inquiries, feedback, or support. Join our WhatsApp and Telegram communities for real-time market updates.',
  alternates: {
    canonical: 'https://welomoney.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Choose your preferred way to connect with us.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp */}
          <a
            href="https://chat.whatsapp.com/E7ilDaGA4yr1wKTYFOQ63q?mode=gi_c"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-500 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-green-500 transition-colors">
                <MessageCircle className="h-8 w-8 text-green-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">WhatsApp</h2>
              <p className="text-gray-600 text-center mb-4">
                Join our WhatsApp community for instant market updates and discussions
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-semibold group-hover:bg-green-600 transition-colors">
                  Join Group →
                </span>
              </div>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+UkWVI7tLj743NTI1"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500 transition-colors">
                <Send className="h-8 w-8 text-blue-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Telegram</h2>
              <p className="text-gray-600 text-center mb-4">
                Follow our Telegram channel for breaking news and market alerts
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold group-hover:bg-blue-600 transition-colors">
                  Join Channel →
                </span>
              </div>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:welomoney@gmail.com" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-500 transition-colors">
                <Mail className="h-8 w-8 text-purple-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Email</h2>
              <p className="text-gray-600 text-center mb-4">
                Send us an email for business inquiries and support
              </p>
              <div className="text-center">
                <span className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold group-hover:bg-purple-600 transition-colors">
                  Send Email →
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">welomoney@gmail.com</p>
            </div>
          </a>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Information</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p>We typically respond to emails within 24-48 hours on business days.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Guidelines</h3>
              <p>
                Our WhatsApp and Telegram groups are for sharing market insights and news. Please be
                respectful and avoid spam.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM IST (We provide 24/7 news updates)</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> welomoney provides financial news and information for
            educational purposes only. We do not provide investment advice. Please consult a
            certified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
