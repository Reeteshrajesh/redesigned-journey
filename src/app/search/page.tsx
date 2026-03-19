import { Metadata } from 'next'
import { fetchArticles } from '@/lib/api'
import { Article } from '@/types'
import SearchClient from '@/components/SearchClient'

export const metadata: Metadata = {
  title: 'Search Articles | welomoney',
  description: 'Search for financial news, stock market updates, and investment insights with advanced filters.',
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    days?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q?.trim() || ''
  const categoryFilter = params.category || 'all'
  const daysFilter = params.days ? parseInt(params.days, 10) : 0

  let articles: Article[] = []
  let searchPerformed = false

  if (query) {
    searchPerformed = true
    // Fetch more articles for better search results
    const allArticles = await fetchArticles({ limit: 300 })

    const lowerQuery = query.toLowerCase()

    // Filter by search query
    let filteredArticles = allArticles.filter(
      (article) =>
        article.article_title_optimised.toLowerCase().includes(lowerQuery) ||
        article.synopsis?.toLowerCase().includes(lowerQuery) ||
        article.summary?.toLowerCase().includes(lowerQuery) ||
        article.company_name?.toLowerCase().includes(lowerQuery) ||
        article.symbol?.toLowerCase().includes(lowerQuery) ||
        article.related_tags?.toLowerCase().includes(lowerQuery)
    )

    // Filter by category
    if (categoryFilter && categoryFilter !== 'all') {
      filteredArticles = filteredArticles.filter(
        (article) => article.news_type === categoryFilter
      )
    }

    // Filter by date range
    if (daysFilter > 0) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysFilter)

      filteredArticles = filteredArticles.filter((article) => {
        const articleDate = new Date(article.created_at)
        return articleDate >= cutoffDate
      })
    }

    articles = filteredArticles
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchClient
        initialQuery={query}
        initialCategory={categoryFilter}
        initialDays={daysFilter}
        articles={articles}
        searchPerformed={searchPerformed}
      />
    </div>
  )
}
