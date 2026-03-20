import Link from 'next/link'
import { Article } from '@/types'
import { mapAPIToCategory, generateSlug } from '@/lib/utils'

interface RelatedKeywordLinksProps {
  currentArticle: Article
  allArticles: Article[]
}

function extractKeywords(article: Article): Set<string> {
  const keywords: string[] = []
  if (article.related_tags) {
    keywords.push(...article.related_tags.split(',').map((tag) => tag.trim().toLowerCase()))
  }
  if (article.company_name) keywords.push(article.company_name.toLowerCase())
  if (article.symbol) keywords.push(article.symbol.toLowerCase())
  return new Set(keywords.filter((k) => k.length > 2))
}

export default function RelatedKeywordLinks({
  currentArticle,
  allArticles,
}: RelatedKeywordLinksProps) {
  const currentKeywords = extractKeywords(currentArticle)

  // Find related articles based on keyword overlap
  const relatedArticles = allArticles
    .filter((article) => article.id !== currentArticle.id)
    .map((article) => {
      const articleKeywords = extractKeywords(article)
      let overlap = 0
      for (const kw of currentKeywords) {
        if (articleKeywords.has(kw)) overlap++
      }
      return { article, overlap }
    })
    .filter((item) => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 5)
    .map((item) => item.article)

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics You Might Like</h3>
      <ul className="space-y-2">
        {relatedArticles.map((article) => {
          const category = mapAPIToCategory(article.news_type)
          const slug = generateSlug(article.article_title_optimised)

          return (
            <li key={article.id}>
              <Link
                href={`/articles/${category}/${slug}`}
                className="text-blue-700 hover:text-blue-900 hover:underline font-medium text-sm"
              >
                → {article.article_title_optimised}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
