'use client'

import { useState } from 'react'
import { Article } from '@/types'
import ArticleGrid from '@/components/ArticleGrid'
import { Clock } from 'lucide-react'

interface RecentArticlesClientProps {
  initialArticles: Article[]
}

export default function RecentArticlesClient({
  initialArticles,
}: RecentArticlesClientProps) {
  const [displayCount, setDisplayCount] = useState(20) // Initially show 20 articles
  const [isLoading, setIsLoading] = useState(false)

  const displayedArticles = initialArticles.slice(0, displayCount)
  const hasMore = displayCount < initialArticles.length

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 20, initialArticles.length))
      setIsLoading(false)
    }, 300)
  }

  return (
    <>
      {/* Live Indicator */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-gray-600 font-medium">Live Updates</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">
          Showing {displayedArticles.length} of {initialArticles.length} articles
        </span>
      </div>

      {/* Articles Grid */}
      {displayedArticles.length > 0 ? (
        <ArticleGrid articles={displayedArticles} priority />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No recent articles found.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Load More Articles'
            )}
          </button>
        </div>
      )}

      {/* All articles loaded message */}
      {!hasMore && initialArticles.length > 20 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-medium">
            ✓ All {initialArticles.length} recent articles loaded
          </p>
        </div>
      )}
    </>
  )
}
