import { Metadata } from 'next'
import { fetchArticles } from '@/lib/api'
import ArticleGrid from '@/components/ArticleGrid'
import { Clock } from 'lucide-react'

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

export const revalidate = 30 // Revalidate every 30 seconds for very fresh content

export default async function RecentPage() {
  // Fetch the most recent articles
  const articles = await fetchArticles({ limit: 50 })

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
              <p className="text-gray-600 mt-1">Last 50 articles • Updated every 30 seconds</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay ahead with the latest financial news, market updates, and breaking business stories.
            Real-time coverage of stocks, IPOs, cryptocurrencies, and global markets.
          </p>
        </header>

        {/* Live Indicator */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-gray-600 font-medium">Live Updates</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">Showing {articles.length} most recent articles</span>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} priority />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent articles found.</p>
          </div>
        )}

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
