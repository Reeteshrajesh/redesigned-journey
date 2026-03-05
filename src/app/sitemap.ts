import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { fetchArticles } from '@/lib/api'
import { mapAPIToCategory, generateSlug } from '@/lib/utils'

export const dynamic = 'force-dynamic'; // added this option as the old sitemap was still being returned.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/category/stock`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/market`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/ipo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/crypto`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/commodity`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/global-news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/category/startup-related`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/recent`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.95,
    },
  ]

  // Fetch all articles dynamically
  let articlePages: MetadataRoute.Sitemap = []

  try {
    // Fetch latest 2000 articles (reduced to prevent API timeouts)
    const articles = await fetchArticles({ limit: 2000, noCache: true })

    articlePages = articles.map((article) => {
      const category = mapAPIToCategory(article.news_type)
      const slug = generateSlug(article.article_title_optimised)

      return {
        url: `${SITE_URL}/articles/${category}/${slug}`,
        lastModified: new Date(article.updated_at || article.created_at),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }
    })

    console.log(`✅ Sitemap generated with ${articlePages.length} articles`)
  } catch (error) {
    console.error('❌ Error fetching articles for sitemap:', error)
    // Continue with static pages even if article fetch fails
  }

  return [...staticPages, ...categoryPages, ...articlePages]
}

