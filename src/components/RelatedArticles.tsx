import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Article } from '@/types'
import { formatDate, generateSlug, mapAPIToCategory } from '@/lib/utils'

interface RelatedArticlesProps {
  articles: Article[]
  currentArticleId: number
  title?: string
}

function getImageUrl(article: Article): string | null {
  const image =
    article.image_data?.sizes?.medium ||
    article.image_data?.sizes?.large ||
    article.featured_image ||
    article.image_data?.original

  if (!image) return null
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  if (image.startsWith('articles/')) {
    return `https://finscann-images.s3.ap-south-1.amazonaws.com/${image}`
  }
  return null
}

export default function RelatedArticles({
  articles,
  currentArticleId,
  title = 'Related Articles',
}: RelatedArticlesProps) {
  // Filter out current article and limit to 4
  const relatedArticles = articles.filter((article) => article.id !== currentArticleId).slice(0, 4)

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {relatedArticles.map((article) => {
          const slug = generateSlug(article.article_title_optimised)
          const category = mapAPIToCategory(article.news_type)
          const imageUrl = getImageUrl(article)
          const categoryName = category
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return (
            <Link
              key={article.id}
              href={`/articles/${category}/${slug}`}
              className="group flex gap-3 rounded-lg p-2 hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              {imageUrl && (
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={article.article_title_optimised}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
                  <span className="uppercase tracking-wide font-semibold text-blue-600">{categoryName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(article.created_at)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-700">
                  {article.article_title_optimised}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
