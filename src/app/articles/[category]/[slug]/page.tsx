import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowLeft } from 'lucide-react'
import { getArticleBySlug, fetchArticles } from '@/lib/api'
import { formatDate, mapCategoryToAPI, mapAPIToCategory, generateSlug } from '@/lib/utils'
import { CATEGORY_MAP } from '@/types'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleCard from '@/components/ArticleCard'
import { SocialShareBar } from '@/components/SocialShareBar'
import { getBestImageUrl } from '@/lib/imageMapping'
import ArticleStructuredData from '@/components/ArticleStructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import RelatedKeywordLinks from '@/components/RelatedKeywordLinks'
import EnhancedMarkdown from '@/components/EnhancedMarkdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import AuthorBio from '@/components/AuthorBio'
import FinancialDisclaimer from '@/components/FinancialDisclaimer'

export const revalidate = 60 // ISR: Revalidate every 60 seconds (reduced server load)
export const dynamicParams = true // Allow dynamic rendering for paths not in generateStaticParams

interface ArticlePageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

// Disable static generation to avoid API rate limiting during build
// Pages will be generated on-demand with ISR (60s revalidation)
export async function generateStaticParams() {
  return []
}

// Generate metadata
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  // Get the best image URL for social sharing (import at top)
  const { getBestImageUrl: getImageUrl } = await import('@/lib/imageMapping')
  const { SITE_URL } = await import('@/lib/config')
  const { cleanArticleTitle, cleanMetadataText } = await import('@/lib/textCleaner')
  const imageUrl = getImageUrl(article)
  const articleUrl = `${SITE_URL}/articles/${category}/${slug}`

  // Clean title and description for social sharing
  const cleanTitle = cleanArticleTitle(article.article_title_optimised)

  // Truncate title to optimal length (50-60 chars, under 580px)
  const truncateTitle = (title: string, maxLength: number = 55) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength).trim() + '...'
    }
    return title
  }

  const optimizedTitle = truncateTitle(cleanTitle)

  // Optimize description to 155 characters maximum (SEO best practice)
  const description = cleanMetadataText(article.synopsis || article.summary, 155)

  // Extract relevant tags for article:tag meta
  const articleTags = article.related_tags
    ? article.related_tags.split(/[,;|]+/).filter((tag) => tag.trim()).slice(0, 10)
    : [category, article.news_type, article.company_name].filter(Boolean) as string[]

  return {
    title: `${optimizedTitle} | Finscann`,
    description,
    // Remove keywords meta tag (deprecated for SEO)
    openGraph: {
      title: cleanTitle,
      description,
      type: 'article',
      url: articleUrl,
      publishedTime: article.created_at,
      modifiedTime: article.updated_at || article.created_at,
      authors: article.source ? [article.source] : undefined,
      tags: articleTags,
      section: category,
      images: [
        {
          url: imageUrl,
          alt: article.article_title_optimised,
          width: 1200,
          height: 630,
        },
      ],
      siteName: 'Finscann',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description,
      images: [imageUrl],
      creator: '@finscann',
      site: '@finscann',
    },
    // Additional metadata for Google Discover and News
    alternates: {
      canonical: articleUrl,
    },
    other: {
      'article:published_time': article.created_at,
      'article:modified_time': article.updated_at || article.created_at,
      'article:author': article.source || article.author || 'Finscann Editorial Team',
      'article:section': category,
      'article:tag': articleTags.join(', '),
      'news_keywords': articleTags.slice(0, 5).join(', '),
      // Publisher metadata
      'article:publisher': 'https://finscann.com',
      // Content type signals
      'og:type': 'article',
      'twitter:label1': 'Reading time',
      'twitter:data1': '3 min read',
      'twitter:label2': 'Published',
      'twitter:data2': new Date(article.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
    },
  }
}

// Get sentiment icon (matching old design)
function getSentimentIcon(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return '📈'
    case 'negative':
      return '📉'
    default:
      return '➖'
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    notFound()
  }

  // Fetch related articles
  // Priority: Same company_name > Same news_type (category)
  const allArticles = await fetchArticles({ limit: 100 })
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.company_name === article.company_name || a.news_type === article.news_type)
    )
    .sort((a, b) => {
      // Prioritize same company
      const aCompanyMatch = a.company_name === article.company_name ? 1 : 0
      const bCompanyMatch = b.company_name === article.company_name ? 1 : 0
      return bCompanyMatch - aCompanyMatch
    })
    .slice(0, 4)

  // Additional related list strictly by category (news_type)
  const categoryArticles = allArticles
    .filter((a) => a.id !== article.id && a.news_type === article.news_type)
    .slice(0, 5)

  // Get the best image URL with fallback
  const imageUrl = getBestImageUrl(article)

  // Format category name
  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="bg-white min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Structured Data for SEO */}
      <ArticleStructuredData article={article} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: categoryName, href: `/category/${category}` },
                { label: article.article_title_optimised },
              ]}
            />

            {/* Article Header */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {categoryName}
                </span>
                <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-2">{getSentimentIcon(article.sentiment)}</span>
                <span className="capitalize">{article.sentiment}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.article_title_optimised}
            </h1>

            {/* Author and Social Sharing Bar */}
            <div className="mb-8 py-4 border-y border-gray-200">
              {/* Mobile Layout - Traditional */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {article.author || 'Finscann Team'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Published at: {new Date(article.created_at).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}, {new Date(article.created_at).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SocialShareBar
                    title={article.article_title_optimised}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://finscann.com'}/articles/${category}/${slug}`}
                  />
                </div>
              </div>

              {/* Desktop Layout - Compact */}
              <div className="hidden sm:flex sm:items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Reviewed by</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {article.author || 'Finscann Team'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <SocialShareBar
                    title={article.article_title_optimised}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://finscann.com'}/articles/${category}/${slug}`}
                  />
                </div>
              </div>
            </div>

            {/* Synopsis */}
            {article.synopsis && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  Synopsis
                </h2>
                <div className="text-gray-700 leading-relaxed prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.synopsis}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-10">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-100 aspect-video">
                <Image
                  src={imageUrl}
                  alt={article.article_title_optimised}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Article Summary */}
          <div className="mb-10">
            <EnhancedMarkdown
              content={article.summary}
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-6 prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-6 prose-ul:my-6 prose-ul:space-y-3 prose-ol:my-6 prose-ol:space-y-3 prose-li:text-gray-700 prose-li:leading-[1.8] prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6"
            />
          </div>

          {/* Author Bio - E-E-A-T Signal */}
          <AuthorBio author={article.author} source={article.source} />

          {/* Financial Disclaimer - YMYL Compliance */}
          <FinancialDisclaimer />

          {/* Related Keyword Links - Internal SEO */}
          {allArticles && allArticles.length > 0 && (
            <RelatedKeywordLinks currentArticle={article} allArticles={allArticles} />
          )}

          {/* Essential Article Information */}
          <div className="border-t border-gray-200 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Company & News Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Company Details</h3>
                <div className="space-y-3">
                  {article.company_name && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-medium text-gray-900">{article.company_name}</span>
                    </div>
                  )}
                  {article.symbol && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Symbol:</span>
                      <span className="font-medium text-gray-900">{article.symbol}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">News Type:</span>
                    <span className="font-medium text-gray-900">{categoryName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sentiment:</span>
                    <div className="flex items-center space-x-2">
                      <span>{getSentimentIcon(article.sentiment)}</span>
                      <span className="font-medium text-gray-900 capitalize">{article.sentiment}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Topics */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Related Topics</h3>
                {article.related_tags ? (
                  <div className="flex flex-wrap gap-2">
                    {article.related_tags
                      .split(/[,;|]+/)
                      .filter((tag) => tag.trim())
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No related topics available</p>
                )}
              </div>
            </div>
          </div>

            {/* Category-based Related Articles */}
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {categoryName}</h2>
              {categoryArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {categoryArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No additional articles in this category yet.</p>
              )}
            </div>

            {/* Back to Home Link */}
            <div className="mt-16 text-center">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Related Articles Sidebar */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
            <RelatedArticles articles={relatedArticles} currentArticleId={article.id} title="You May Also Like" />
          </div>
        </div>
      </div>
    </div>
  )
}
