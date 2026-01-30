import Link from 'next/link'
import Image from 'next/image'
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Article } from '@/types'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { getBestImageUrl } from '@/lib/imageMapping'
import { generateImageAltText } from '@/lib/imageAltText'
import { timeAgoWithTooltip } from '@/lib/timeAgo'

interface ArticleCardProps {
  article: Article
  priority?: boolean
  variant?: 'default' | 'featured'
}

export default function ArticleCard({ article, priority = false, variant = 'default' }: ArticleCardProps) {
  const slug = generateSlug(article.article_title_optimised)
  const category = mapAPIToCategory(article.news_type)
  const isFeatured = variant === 'featured'

  // Get sentiment display (matching old design)
  const getSentimentDisplay = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return {
          icon: <TrendingUp className="h-3.5 w-3.5" />,
          color: 'text-green-600',
          bg: 'bg-green-50',
        }
      case 'negative':
        return {
          icon: <TrendingDown className="h-3.5 w-3.5" />,
          color: 'text-red-600',
          bg: 'bg-red-50',
        }
      default:
        return {
          icon: <Minus className="h-3.5 w-3.5" />,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
        }
    }
  }

  const sentimentDisplay = getSentimentDisplay(article.sentiment)

  // Get the best image URL with tag-based fallback
  const imageUrl = getBestImageUrl(article)

  // Generate SEO-friendly alt text
  const imageAltText = generateImageAltText(article)

  // Format category name
  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  if (isFeatured) {
    // Featured variant (for hero section)
    return (
      <Link href={`/articles/${category}/${slug}`} className="group block">
        <article className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-md rounded-2xl border border-gray-200/60 overflow-hidden hover:from-gray-50/90 hover:to-gray-100/90 hover:border-blue-500/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/20">
          {imageUrl && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAltText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                priority={priority}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute bottom-3 left-3">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg ring-1 ring-white/20">
                  {categoryName}
                </span>
              </div>
            </div>
          )}
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              {article.article_title_optimised}
            </h3>
            <div className="flex items-center justify-between text-gray-600 text-xs">
              <div className="flex items-center gap-2">
                {article.company_name && (
                  <span className="font-semibold truncate mr-2 text-blue-600">{article.company_name}</span>
                )}
                {article.sentiment && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${sentimentDisplay.color} ${sentimentDisplay.bg}`}
                  >
                    {sentimentDisplay.icon}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                <span title={timeAgoWithTooltip(article.created_at).tooltip}>
                  {timeAgoWithTooltip(article.created_at).display}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Default variant (for regular article grids)
  return (
    <Link href={`/articles/${category}/${slug}`} className="group block">
      <article className="h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAltText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg ring-1 ring-white/20">
                {categoryName}
              </span>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col p-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {article.article_title_optimised}
          </h3>
          {(article.synopsis || article.summary) && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
              {article.synopsis || (article.summary ? article.summary.substring(0, 150) + '...' : '')}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {article.company_name && (
                <span className="font-semibold truncate mr-2 text-blue-600">{article.company_name}</span>
              )}
              {article.sentiment && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${sentimentDisplay.color} ${sentimentDisplay.bg}`}
                >
                  {sentimentDisplay.icon}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock className="h-3.5 w-3.5" />
              <span title={timeAgoWithTooltip(article.created_at).tooltip}>
                {timeAgoWithTooltip(article.created_at).display}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
