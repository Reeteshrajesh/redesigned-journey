import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle old article URL format: /articles/[id]/[slug]
  // Redirect to new format: /articles/[category]/[slug]
  const oldArticlePattern = /^\/articles\/(\d+)\/(.+)$/
  const match = pathname.match(oldArticlePattern)

  if (match) {
    const articleId = match[1]
    const slug = match[2]

    try {
      // Fetch article data to get the category
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://api.lqtisttist.shop/api'}/articles?limit=200`
      const response = await fetch(apiUrl, {
        next: { revalidate: 60 },
      })

      if (response.ok) {
        const data = await response.json()
        const article = data.data?.find((a: any) => a.id === parseInt(articleId, 10))

        if (article) {
          // Map news_type to category
          const newsType = article.news_type || ''
          let category = 'general'

          const categoryMap: Record<string, string> = {
            'stock-related': 'stock',
            'market-related': 'market',
            'ipo-related': 'ipo',
            'crypto-related': 'crypto',
            'commodities-related': 'commodities',
            'commodity-related': 'commodities',
            'global-news': 'global-news',
            'global-stocks': 'stock',
            budget: 'budget',
            'budget-related': 'budget',
            'dividend-related': 'stock',
            'merger-related': 'stock',
            'policy-related': 'general',
            'currency-markets': 'market',
            other: 'general',
            '': 'general',
          }

          const normalized = newsType.toLowerCase().trim()
          category = categoryMap[normalized] || categoryMap[newsType] || 'general'

          // Generate new slug from article title
          const newSlug = article.article_title_optimised
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')

          // Create new URL
          const newUrl = new URL(`/articles/${category}/${newSlug}`, request.url)

          // 308 Permanent Redirect (preserves method and body)
          return NextResponse.redirect(newUrl, 308)
        }
      }
    } catch (error) {
      console.error('Error in middleware redirect:', error)
    }

    // If article not found or error, redirect to home
    return NextResponse.redirect(new URL('/', request.url), 308)
  }

  return NextResponse.next()
}

// Configure which paths should be processed by middleware
export const config = {
  matcher: [
    '/articles/:id(\\d+)/:slug*', // Only match numeric IDs (old format)
  ],
}
