'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Article } from '@/types'
import ArticleGrid from '@/components/ArticleGrid'
import { Search, Filter, Calendar, X } from 'lucide-react'

interface SearchClientProps {
  initialQuery: string
  initialCategory: string
  initialDays: number
  articles: Article[]
  searchPerformed: boolean
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'stock-related', label: 'Stock News' },
  { value: 'market-related', label: 'Market News' },
  { value: 'ipo-related', label: 'IPO News' },
  { value: 'crypto-related', label: 'Crypto News' },
  { value: 'commodities-related', label: 'Commodities' },
  { value: 'global-news', label: 'Global News' },
  { value: 'budget-related', label: 'Budget News' },
  { value: 'other', label: 'General News' },
]

const DATE_OPTIONS = [
  { value: '0', label: 'All Time' },
  { value: '1', label: 'Last 24 Hours' },
  { value: '7', label: 'Last 7 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
]

export default function SearchClient({
  initialQuery,
  initialCategory,
  initialDays,
  articles,
  searchPerformed,
}: SearchClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [days, setDays] = useState(initialDays.toString())
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const params = new URLSearchParams()
    params.set('q', query.trim())
    if (category !== 'all') params.set('category', category)
    if (days !== '0') params.set('days', days)

    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    setCategory('all')
    setDays('0')
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const hasActiveFilters = category !== 'all' || days !== '0'

  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Search Articles</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for articles, companies, symbols, tags..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 border rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                hasActiveFilters
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {(category !== 'all' ? 1 : 0) + (days !== '0' ? 1 : 0)}
                </span>
              )}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DATE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>
      </header>

      {/* Active Filters Display */}
      {hasActiveFilters && searchPerformed && (
        <div className="mb-6 flex flex-wrap gap-2">
          {category !== 'all' && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label}
              <button
                onClick={() => {
                  setCategory('all')
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('category')
                  router.push(`/search?${params.toString()}`)
                }}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {days !== '0' && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {DATE_OPTIONS.find((opt) => opt.value === days)?.label}
              <button
                onClick={() => {
                  setDays('0')
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('days')
                  router.push(`/search?${params.toString()}`)
                }}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results */}
      {searchPerformed && (
        <>
          {initialQuery && (
            <div className="mb-6">
              <p className="text-gray-700">
                {articles.length > 0 ? (
                  <>
                    Found <span className="font-semibold text-blue-600">{articles.length}</span>{' '}
                    result
                    {articles.length !== 1 ? 's' : ''} for{' '}
                    <span className="font-semibold">&ldquo;{initialQuery}&rdquo;</span>
                  </>
                ) : (
                  <>
                    No results found for{' '}
                    <span className="font-semibold">&ldquo;{initialQuery}&rdquo;</span>
                  </>
                )}
              </p>
            </div>
          )}

          {articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-300">
              <div className="max-w-md mx-auto px-4">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find any articles matching your search criteria.
                </p>
                <div className="text-left bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Try:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Using different or more general keywords</li>
                    <li>• Checking your spelling</li>
                    <li>• Removing filters to broaden your search</li>
                    <li>• Searching by company name or stock symbol</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!searchPerformed && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter keywords to search across thousands of financial news articles, market updates, and
            investment insights.
          </p>
        </div>
      )}
    </>
  )
}
