import { Metadata } from 'next'
import { fetchArticles } from '@/lib/api'
import { Clock } from 'lucide-react'
import RecentArticlesClient from '@/components/RecentArticlesClient'

export const metadata: Metadata = {
  title: 'Recent Financial News | Finscann',
  description: 'Latest financial news, stock market updates, and breaking business stories. Stay updated with real-time market news from Finscann.',
  keywords: 'recent financial news, latest market news, breaking financial news, real-time updates',
  openGraph: {
    title: 'Recent Financial News | Finscann',
    description: 'Latest financial news, stock market updates, and breaking business stories.',
    type: 'website',
  },
}

export const revalidate = 5 // Revalidate every 5 seconds for real-time breaking news

export default async function RecentPage() {
  // Fetch 500 most recent articles as per user requirement
  const articles = await fetchArticles({ limit: 500 })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Recent News</h1>
              <p className="text-gray-600 mt-1">Latest articles • Updated in real-time</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay ahead with the latest financial news, market updates, and breaking business stories.
            Real-time coverage of stocks, IPOs, cryptocurrencies, and global markets.
          </p>
        </header>

        {/* Client-side pagination component */}
        <RecentArticlesClient initialArticles={articles} />

        {/* Categories CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Explore by Category</h2>
          <p className="text-blue-100 mb-6">
            Find news specific to your interests across our specialized categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="/category/stock"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold transition-colors"
            >
              Stock News
            </a>
            <a
              href="/category/market"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold transition-colors"
            >
              Market Updates
            </a>
            <a
              href="/category/ipo"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold transition-colors"
            >
              IPO News
            </a>
            <a
              href="/category/crypto"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold transition-colors"
            >
              Crypto
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
