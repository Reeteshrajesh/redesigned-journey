import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { fetchArticles } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | welomoney',
  description: 'The page you are looking for could not be found. Browse our latest financial news and market insights.',
}

export default async function NotFound() {
  // Fetch some related articles to show
  const articles = await fetchArticles({ limit: 6 })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          {/* 404 Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
            <p className="text-gray-600 text-lg mb-4">
              Sorry, we couldn't find the page you're looking for. The article may have been moved, updated, or deleted.
            </p>
            <p className="text-sm text-gray-500">
              If you believe this is an error, please{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              Go to Homepage
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Browse All Articles
            </Link>
          </div>

          {/* Quick Category Links */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 mb-4">Or explore by category:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/category/stock"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Stocks
              </Link>
              <Link
                href="/category/market"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Market
              </Link>
              <Link
                href="/category/ipo"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                IPO
              </Link>
              <Link
                href="/category/crypto"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Crypto
              </Link>
              <Link
                href="/category/global-news"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Global News
              </Link>
              <Link
                href="/category/startup-related"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Startup
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {articles.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
