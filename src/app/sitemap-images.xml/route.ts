import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'
import { getBestImageUrl } from '@/lib/imageMapping'
import { SITE_URL } from '@/lib/config'
import { mapAPIToCategory, generateSlug } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  try {
    // Fetch recent articles with images
    const articles = await fetchArticles({ limit: 500 })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${articles
  .map((article) => {
    const category = mapAPIToCategory(article.news_type)
    const slug = generateSlug(article.article_title_optimised)
    const url = `${SITE_URL}/articles/${category}/${slug}`
    const imageUrl = getBestImageUrl(article)

    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(article.article_title_optimised)}</image:title>
      <image:caption>${escapeXml(article.synopsis || article.summary || article.article_title_optimised)}</image:caption>
    </image:image>
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
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
