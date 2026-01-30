import { Article } from '@/types'

/**
 * Generate descriptive alt text for article images
 * Improves accessibility and SEO
 */
export function generateImageAltText(article: Article): string {
  const parts: string[] = []

  // Add company name if available
  if (article.company_name) {
    parts.push(article.company_name)
  }

  // Add symbol if available
  if (article.symbol) {
    parts.push(`(${article.symbol})`)
  }

  // Add descriptive context based on news type
  const newsTypeContext: Record<string, string> = {
    'stock-related': 'stock market news',
    'market-related': 'market analysis',
    'ipo-related': 'IPO announcement',
    'crypto-related': 'cryptocurrency update',
    'commodities-related': 'commodity prices',
    'global-news': 'global financial news',
    budget: 'budget announcement',
    other: 'financial news',
  }

  const context = newsTypeContext[article.news_type] || 'financial news'

  // Build alt text
  if (parts.length > 0) {
    return `${parts.join(' ')} - ${context} illustration`
  }

  // Fallback: use truncated title
  const truncatedTitle = article.article_title_optimised.slice(0, 100)
  return `${truncatedTitle} - financial news image`
}

/**
 * Generate SEO-optimized image caption
 */
export function generateImageCaption(article: Article): string {
  if (article.synopsis) {
    return article.synopsis.slice(0, 150)
  }
  if (article.summary) {
    return article.summary.slice(0, 150)
  }
  return article.article_title_optimised
}
