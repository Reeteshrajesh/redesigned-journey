import type { Article, ArticlesResponse } from '@/types'
import { API_BASE_URL, REVALIDATE_TIME } from './config'
import { mapCategoryToAPI } from './utils'

// Generic fetch wrapper with error handling and Next.js ISR caching
async function fetchWrapper<T>(url: string, cacheOptions?: RequestInit['cache'] | { revalidate: number }): Promise<T> {
  const nextOptions = cacheOptions === 'no-store'
    ? { cache: 'no-store' as const }
    : { next: { revalidate: typeof cacheOptions === 'number' ? cacheOptions : REVALIDATE_TIME } }

  const response = await fetch(url, nextOptions)

  if (!response.ok) {
    if (response.status === 429) {
      console.warn('API rate limit hit, returning empty response')
      return { data: [], success: false } as T
    }
    throw new Error(`API Error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}

// Fetch all articles with optional filters (cached via Next.js ISR)
export async function fetchArticles(params?: {
  limit?: number
  category?: string
  sentiment?: string
  noCache?: boolean  // 👈 add this
}): Promise<Article[]> {
  const searchParams = new URLSearchParams()

  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.category) searchParams.append('category', params.category)
  if (params?.sentiment) searchParams.append('sentiment', params.sentiment)

  const url = `${API_BASE_URL}/articles?${searchParams.toString()}`
  const response = await fetchWrapper<ArticlesResponse>(
    url,
    params?.noCache ? 'no-store' : undefined
  )

  return response.data || []
}

// Get single article by category + slug
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  try {
    // Use the new backend endpoint that supports category + slug lookup
    // Backend handles both short categories (market) and full names (market-related)
    // Backend also handles different slug formats (25-454 vs 25454)
    const url = `${API_BASE_URL}/articles/${category}/${slug}`

    const response = await fetchWrapper<{ success: boolean; data: Article }>(url)

    if (response.success && response.data) {
      return response.data
    }

    return null
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