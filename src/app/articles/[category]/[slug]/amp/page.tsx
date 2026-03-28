import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getArticleBySlug } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { getBestImageUrl } from '@/lib/imageMapping'
import { SITE_URL } from '@/lib/config'

export const revalidate = 60

interface AMPArticlePageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateMetadata({ params }: AMPArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const imageUrl = getBestImageUrl(article)

  return {
    title: `${article.article_title_optimised} - AMP | welomoney`,
    description: article.synopsis || article.summary,
    alternates: {
      canonical: `${SITE_URL}/articles/${category}/${slug}`,
    },
    openGraph: {
      title: article.article_title_optimised,
      description: article.synopsis || article.summary,
      type: 'article',
      images: [imageUrl],
    },
  }
}

export default async function AMPArticlePage({ params }: AMPArticlePageProps) {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    notFound()
  }

  const imageUrl = getBestImageUrl(article)
  const articleUrl = `${SITE_URL}/articles/${category}/${slug}`

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
      name: article.source || article.author || 'welomoney Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'welomoney',
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
  }

  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Format content - strip HTML for AMP version
  const contentText = article.summary || article.synopsis || ''

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '16px', lineHeight: 1.6, color: '#333' }}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '16px', marginBottom: '24px' }}>
        <a href={articleUrl} style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
          ← View Full Interactive Version
        </a>
        <br />
        <a href={SITE_URL} style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
          welomoney
        </a>
      </div>

      {/* Article */}
      <article>
        <span style={{ display: 'inline-block', background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
          {categoryName}
        </span>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: 1.2, margin: '16px 0', color: '#111827' }}>
          {article.article_title_optimised}
        </h1>

        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
          <span>By {article.source || article.author || 'welomoney Team'}</span>
          <span> • </span>
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
        </div>

        {/* Featured Image */}
        <img
          src={imageUrl}
          alt={article.article_title_optimised}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', margin: '24px 0' }}
        />

        {/* Synopsis */}
        {(article.synopsis || article.summary) && (
          <div style={{ fontSize: '18px', fontWeight: 500, color: '#374151', margin: '24px 0', padding: '16px', background: '#f9fafb', borderLeft: '4px solid #2563eb', borderRadius: '4px' }}>
            {article.synopsis || article.summary}
          </div>
        )}

        {/* Content */}
        <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#1f2937' }}>
          <p>{contentText}</p>
        </div>
      </article>

      {/* Footer */}
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <a
          href={articleUrl}
          style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, margin: '24px 0' }}
        >
          View Full Article with Comments & Interactions
        </a>
        <p>© {new Date().getFullYear()} welomoney. All rights reserved.</p>
        <p>
          <a href={`${SITE_URL}/privacy-policy`} style={{ color: '#2563eb', textDecoration: 'none' }}>Privacy Policy</a>
          {' | '}
          <a href={`${SITE_URL}/disclaimer`} style={{ color: '#2563eb', textDecoration: 'none' }}>Disclaimer</a>
        </p>
        <p style={{ fontSize: '12px', marginTop: '16px', color: '#9ca3af' }}>
          This is a simplified AMP version for faster loading on mobile devices.
        </p>
      </div>
    </div>
  )
}
