import type { Article, ArticlesResponse } from '@/types'
import { API_BASE_URL, REVALIDATE_TIME } from './config'
import { generateSlug, mapCategoryToAPI } from './utils'

// Generic fetch wrapper with error handling and Next.js ISR caching
async function fetchWrapper<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME }, // ISR: Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}

// Fetch all articles with optional filters (cached via Next.js ISR)
export async function fetchArticles(params?: {
  limit?: number
  category?: string
  sentiment?: string
}): Promise<Article[]> {
  const searchParams = new URLSearchParams()

  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.category) searchParams.append('category', params.category)
  if (params?.sentiment) searchParams.append('sentiment', params.sentiment)

  const url = `${API_BASE_URL}/articles?${searchParams.toString()}`
  const response = await fetchWrapper<ArticlesResponse>(url)

  return response.data || []
}

// Get single article by category + slug
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  try {
    // Map category slug to API format
    const apiCategory = mapCategoryToAPI(category)

    // Fetch all articles in this category
    const articles = await fetchArticles({ category: apiCategory })

    // Find article by matching slug
    const article = articles.find(
      (a) => generateSlug(a.article_title_optimised) === slug
    )

    if (article) {
      return article
    }

    // If not found in the specified category, search across all articles
    // This handles cases where articles may have been miscategorized or the URL category is wrong
    const allArticles = await fetchArticles({ limit: 200 })
    const fallbackArticle = allArticles.find(
      (a) => generateSlug(a.article_title_optimised) === slug
    )

    return fallbackArticle || null
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }
}

// Fetch featured/trending articles
export async function fetchFeaturedArticles(limit = 5): Promise<Article[]> {
  try {
    // Fallback to regular articles filtered by trending
    const articles = await fetchArticles({ limit: 50 })
    return articles.filter((a) => a.trending).slice(0, limit)
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }
}

// Fetch recent articles
export async function fetchRecentArticles(limit = 12): Promise<Article[]> {
  try {
    // Just fetch regular articles (they come sorted by newest first)
    return fetchArticles({ limit })
  } catch (error) {
    console.error('Error fetching recent articles:', error)
    return []
  }
}

// Fetch articles by category
export async function fetchCategoryArticles(category: string): Promise<Article[]> {
  const apiCategory = mapCategoryToAPI(category)
  return fetchArticles({ category: apiCategory })
}

// Search articles
export async function searchArticles(query: string): Promise<Article[]> {
  if (!query.trim()) return []

  try {
    const url = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    const response = await fetchWrapper<ArticlesResponse>(url)
    return response.data || []
  } catch (error) {
    console.error('Error searching articles:', error)
    return []
  }
}

// Get related articles (same category or company)
export async function getRelatedArticles(
  article: Article,
  limit = 4
): Promise<Article[]> {
  try {
    const articles = await fetchArticles({ category: article.news_type })

    // Filter out current article and get related ones
    const related = articles
      .filter((a) => a.id !== article.id)
      .filter(
        (a) =>
          a.news_type === article.news_type ||
          (article.company_name && a.company_name === article.company_name)
      )
      .slice(0, limit)

    return related
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}
