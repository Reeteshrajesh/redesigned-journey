import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { fetchArticles } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'

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
            <p className="text-gray-600 text-lg">
              Sorry, we couldn't find the page you're looking for. The article may have been moved or deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
