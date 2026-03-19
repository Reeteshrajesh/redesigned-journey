import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 900 // Revalidate every 15 minutes

export async function GET() {
  try {
    // Fetch recent articles for RSS feed
    const articles = await fetchArticles({ limit: 50 })

    // Generate RSS 2.0 feed XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>welomoney - Financial News &amp; Market Analysis</title>
    <link>${SITE_URL}</link>
    <description>Stay ahead with welomoney's real-time financial news, market analysis, stock updates, IPO insights, crypto trends, and commodity reports. Your trusted source for financial intelligence.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/finscannlogo.png</url>
      <title>welomoney</title>
      <link>${SITE_URL}</link>
    </image>
${articles
  .map((article) => {
    const category = mapAPIToCategory(article.news_type)
    const slug = generateSlug(article.article_title_optimised)
    const url = `${SITE_URL}/articles/${category}/${slug}`
    const author = article.author || 'welomoney Team'
    const pubDate = new Date(article.created_at).toUTCString()

    // Create description from summary or synopsis
    const description = article.summary
      ? escapeXml(article.summary)
      : article.synopsis
        ? escapeXml(article.synopsis)
        : escapeXml(article.article_title_optimised)

    return `    <item>
      <title>${escapeXml(article.article_title_optimised)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <dc:creator>${escapeXml(author)}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.news_type)}</category>
      ${article.related_tags ? `<category>${escapeXml(article.related_tags)}</category>` : ''}
      ${article.featured_image ? `<enclosure url="${escapeXml(article.featured_image)}" type="image/jpeg" />` : ''}
    </item>`
  })
  .join('\n')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, s-maxage=900',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
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
