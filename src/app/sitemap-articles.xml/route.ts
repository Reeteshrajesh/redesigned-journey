import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { SITE_URL } from '@/lib/config'
import { escapeXml } from '@/lib/xmlUtils'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Fetch all recent articles (up to 1000 for sitemap)
    const articles = await fetchArticles({ limit: 1000, noCache: true })

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${articles
  .map((article) => {
    const category = mapAPIToCategory(article.news_type)
    const slug = generateSlug(article.article_title_optimised)
    const url = `${SITE_URL}/articles/${category}/${slug}`
    const lastmod = article.updated_at || article.created_at

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>welomoney</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.created_at).toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.article_title_optimised)}</news:title>
    </news:news>
  </url>`
  })
  .join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating articles sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

