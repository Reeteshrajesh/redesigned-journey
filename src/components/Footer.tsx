import Link from 'next/link'
import Image from 'next/image'
import { Mail, TrendingUp, Shield, Clock, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t transition-colors border-gray-200 bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/finscannlogo.png"
                alt="Finscann"
                width={140}
                height={36}
                className="h-8 sm:h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted source for real-time financial news, market analysis, and investment insights.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                Real-time Updates
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1.5 text-blue-600" />
                Market Analysis
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1.5 text-blue-600" />
                Verified Sources
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-700 mb-3">Stay Connected with Finscann</p>
              <div className="flex gap-2">
                <a href="https://x.com/finscann" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-all duration-200" aria-label="Follow on X">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/finscann" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-200" aria-label="Follow on LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Latest News</Link></li>
              <li><Link href="/recent" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Recent Updates</Link></li>
              <li><Link href="/category/stock" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Stock News</Link></li>
              <li><Link href="/category/market" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Market Updates</Link></li>
              <li><Link href="/category/ipo" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">IPO News</Link></li>
              <li><Link href="/search" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Search</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</Link></li>
              <li><Link href="/about-us" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Get Finance News That Matters</h3>
              <p className="text-xs text-gray-600 mb-4">Join Finscann&apos;s newsletter for real-time market updates and insights.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="https://chat.whatsapp.com/E7ilDaGA4yr1wKTYFOQ63q?mode=gi_c" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Join WhatsApp
                </a>
                <a href="https://t.me/+UkWVI7tLj743NTI1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Join Telegram
                </a>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Contact Editorial Team</h3>
              <p className="text-xs text-gray-600 mb-4">Have a news tip, correction, or partnership query? Reach out to us.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="mailto:finscannquery@gmail.com?subject=News%20Tip%20Submission" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors">
                  <Send className="h-3.5 w-3.5" />
                  Submit News Tip
                </a>
                <a href="mailto:finscannquery@gmail.com" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>© {currentYear} Finscann. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              Trusted by thousands of readers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
