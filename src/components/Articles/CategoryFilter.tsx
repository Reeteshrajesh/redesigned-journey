'use client'

import { useState, useMemo } from 'react'
import { Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'

interface CategoryFilterProps {
  articles: Article[]
}

// Categories for All News page filter
const categories = [
  { name: 'Budget', slug: 'budget' },
  { name: 'Global Stocks', slug: 'global-stocks' },
  { name: 'Global News', slug: 'global-news' },
  { name: 'Commodity', slug: 'commodity' },
  { name: 'Mutual Funds', slug: 'mutual-funds' },
  { name: 'Global Politics', slug: 'global-politics' },
]

export default function CategoryFilter({ articles }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') {
      return articles.slice(0, 45) // Show first 45 articles
    }

    const filtered = articles.filter((article) => {
      const newsType = (article.news_type || '').toLowerCase()
      const slug = activeCategory.toLowerCase()

      // Match category slug with news_type
      if (slug === 'budget') return newsType.includes('budget')
      if (slug === 'global-stocks') return newsType.includes('global') && newsType.includes('stock')
      if (slug === 'global-news') return newsType.includes('global')
      if (slug === 'commodity') return newsType.includes('commodity') || newsType.includes('commodities')
      if (slug === 'mutual-funds') return newsType.includes('mutual') || newsType.includes('fund')
      if (slug === 'global-politics') return newsType.includes('politic') || newsType.includes('government')

      return false
    })

    return filtered.slice(0, 45)
  }, [articles, activeCategory])

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
  }

  return (
    <div>
      {/* Category Filter Tabs - Single Row */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-gray-900'
            }`}
          >
            All News
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.slug
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-gray-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-4">No articles available in this category yet.</p>
          <button
            onClick={() => handleCategoryClick('all')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View All News
          </button>
        </div>
      )}
    </div>
  )
}
