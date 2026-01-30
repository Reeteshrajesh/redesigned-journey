import { Article } from '@/types'
import { SITE_URL } from '@/lib/config'
import { getBestImageUrl } from '@/lib/imageMapping'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'

interface ArticleStructuredDataProps {
  article: Article
}

export default function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const category = mapAPIToCategory(article.news_type)
  const slug = generateSlug(article.article_title_optimised)
  const articleUrl = `${SITE_URL}/articles/${category}/${slug}`
  const imageUrl = getBestImageUrl(article)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.article_title_optimised,
    description: article.synopsis || article.summary,
    image: [imageUrl],
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': 'Organization',
      name: article.source || article.author || 'Finscann Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Finscann',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/finscannlogo.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: category,
    keywords: article.related_tags || article.news_type,
    ...(article.company_name && {
      about: {
        '@type': 'Organization',
        name: article.company_name,
      },
    }),
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
