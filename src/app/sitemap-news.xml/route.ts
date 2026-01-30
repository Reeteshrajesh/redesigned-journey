import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 900 // Revalidate every 15 minutes

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
      <news:keywords>${escapeXml(article.related_tags || article.news_type || 'financial news')}</news:keywords>
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

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
