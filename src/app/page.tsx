import Link from 'next/link'
import { TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { fetchFeaturedArticles, fetchRecentArticles } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch trending articles for the top 3 featured section
  const featuredArticles = await fetchFeaturedArticles(3)

  // Fetch recent articles for the grid section
  const articles = await fetchRecentArticles(40)

  const visibleArticles = articles.slice(0, 18)

  return (
    <>
      {/* Hero Section with Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            ></div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/95"></div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            {/* Hero Text */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Real-Time Financial News & Market Insights
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4">
                Your trusted source for real-time financial news, market analysis, and investment insights. Stay ahead
                with comprehensive coverage of Indian and global markets.
              </p>

              {/* Status Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 text-gray-600 text-sm">
                <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-red-400 font-semibold text-xs">LIVE UPDATES</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>Latest News</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Updated 24/7</span>
                </div>
              </div>
            </div>

            {/* Featured Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
              {featuredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} variant="featured" priority={index < 3} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href="/category/stock"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* All Articles Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              All News Articles
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Browse through all our latest business news and updates
            </p>
          </div>

          {/* Articles Grid */}
          {visibleArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.id} article={article} priority={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
