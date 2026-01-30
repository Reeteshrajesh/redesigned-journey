import { Article } from '@/types'
import ArticleCard from './ArticleCard'

interface ArticleGridProps {
  articles: Article[]
  title?: string
  priority?: boolean
}

export default function ArticleGrid({ articles, title, priority = false }: ArticleGridProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            priority={priority && index < 3}
          />
        ))}
      </div>
    </section>
  )
}
