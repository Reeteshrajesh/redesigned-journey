import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function FinancialDisclaimer() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-6 my-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">Financial Disclaimer</h4>
          <p className="text-sm text-gray-700 mb-3">
            The information provided in this article is for educational and informational purposes only and should not be
            construed as financial, investment, or legal advice. welomoney does not provide personalized investment
            recommendations.
          </p>
          <ul className="text-sm text-gray-700 space-y-2 mb-3">
            <li className="flex gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>
                <strong>Not Investment Advice:</strong> Content is for general information only. Always consult a
                qualified financial advisor before making investment decisions.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>
                <strong>Market Risk:</strong> Investments in stocks, IPOs, crypto, and commodities are subject to market
                risks. Past performance does not guarantee future results.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>
                <strong>Do Your Research:</strong> We encourage readers to conduct their own due diligence and research
                before acting on any information presented.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>
                <strong>No Liability:</strong> welomoney and its authors are not liable for any financial losses
                incurred based on the information provided in this article.
              </span>
            </li>
          </ul>
          <p className="text-xs text-gray-600 border-t border-yellow-200 pt-3">
            For detailed terms and conditions, please read our{' '}
            <Link href="/disclaimer" className="text-blue-600 hover:underline font-medium">
              Disclaimer
            </Link>
            {' '}and{' '}
            <Link href="/terms-of-service" className="text-blue-600 hover:underline font-medium">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
