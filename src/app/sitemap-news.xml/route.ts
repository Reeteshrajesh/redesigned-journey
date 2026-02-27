import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 900 // Revalidate every 15 minutes

// Helper function to get valid keywords (no generic fallbacks)
function getValidKeywords(article: any): string {
  // If related_tags exists and is not a generic category name, use it
  if (article.related_tags) {
    const tags = article.related_tags.trim()

    // Reject generic/category keywords that provide no SEO value
    const genericKeywords = [
      'market-related',
      'stock-related',
      'general news',
      'market news',
      'stock news',
      'financial news',
      'crypto news',
      'ipo news',
      'global news',
    ]

    const lowerTags = tags.toLowerCase()
    const isGeneric = genericKeywords.some(
      (generic) => lowerTags === generic || lowerTags.includes(generic)
    )

    if (!isGeneric && tags.length > 3) {
      // Split by comma, take max 10 keywords, clean up spacing
      return tags
        .split(',')
        .map((k: string) => k.trim())
        .filter((k: string) => k.length > 0)
        .slice(0, 10)
        .join(', ')
    }
  }

  // Generate keywords from company name and article title as last resort
  const fallbackKeywords: string[] = []

  if (article.company_name) {
    fallbackKeywords.push(article.company_name)
  }

  if (article.symbol) {
    fallbackKeywords.push(article.symbol)
  }

  // Extract meaningful words from title (avoid generic words)
  if (article.article_title_optimised) {
    const titleWords = article.article_title_optimised
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (word: string) =>
          word.length > 4 && !['about', 'today', 'latest', 'breaking', 'update'].includes(word)
      )
      .slice(0, 3)

    fallbackKeywords.push(...titleWords)
  }

  return fallbackKeywords.slice(0, 10).join(', ') || 'India finance'
}

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  try {
    // Fetch recent articles (last 48 hours for Google News)
    const articles = await fetchArticles({ limit: 100 })

    // Filter articles from last 48 hours
    const twoDaysAgo = new Date()
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48)

    const recentArticles = articles.filter((article) => {
      const articleDate = new Date(article.created_at)
      return articleDate >= twoDaysAgo
    })

    // Generate Google News sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentArticles
  .map((article) => {
    const category = mapAPIToCategory(article.news_type)
    const slug = generateSlug(article.article_title_optimised)
    const url = `${SITE_URL}/articles/${category}/${slug}`

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>Finscann</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.created_at).toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.article_title_optimised)}</news:title>
      <news:keywords>${escapeXml(getValidKeywords(article))}</news:keywords>
    </news:news>
  </url>`
  })
  .join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=900, s-maxage=900',
      },
    })
  } catch (error) {
    console.error('Error generating news sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
