import { Article } from '@/types'
import { SITE_URL } from '@/lib/config'
import { getBestImageUrl } from '@/lib/imageMapping'
import { generateSlug } from '@/lib/utils'

interface ArticleStructuredDataProps {
  article: Article
  // Pass the actual URL category from the page (not derived from news_type)
  urlCategory?: string
}

export default function ArticleStructuredData({ article, urlCategory }: ArticleStructuredDataProps) {
  const slug = generateSlug(article.article_title_optimised)
  // Use the URL category if provided; fall back to news_type directly so canonical matches the actual page URL
  const category = urlCategory || article.news_type
  const articleUrl = `${SITE_URL}/articles/${category}/${slug}`
  const imageUrl = getBestImageUrl(article)

  // Determine if author is AI or human
  const authorName = article.source || article.author || 'welomoney Editorial Team'
  const isAIAuthor = authorName.toLowerCase().includes('ai')

  // Extract clean description for structured data
  const cleanDescription = (article.synopsis || article.summary)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n/g, ' ') // Remove newlines
    .trim()
    .substring(0, 250) // Limit to 250 chars

  // Clean article body for structured data
  const articleBody = (article.summary || '')
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n/g, ' ') // Remove newlines
    .trim()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.article_title_optimised,
    description: cleanDescription,
    articleBody: articleBody, // Added for better indexing
    image: [imageUrl],
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': isAIAuthor ? 'Organization' : 'Person',
      name: authorName,
      url: SITE_URL,
      ...(isAIAuthor && {
        description: 'AI-powered financial news generation system with human editorial oversight'
      })
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'welomoney',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/finscannlogo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.linkedin.com/company/finscann',
        'https://x.com/finscann',
        'https://t.me/+UkWVI7tLj743NTI1'
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: category,
    keywords: article.related_tags || article.news_type,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    genre: 'Financial News',
    url: articleUrl,
    thumbnailUrl: imageUrl,
    ...(article.company_name && {
      about: {
        '@type': 'Organization',
        name: article.company_name,
      },
    }),
    // Add more E-E-A-T signals
    backstory: 'welomoney provides real-time financial news and market insights.',
    // Editorial review disclosure
    ...(isAIAuthor && {
      creativeWorkStatus: 'AI-Generated with Editorial Review'
    }),
    // Reading time estimate (approx 3-5 min for financial articles)
    timeRequired: 'PT3M',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
