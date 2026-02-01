import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchArticles } from '@/lib/api'
import { mapCategoryToAPI } from '@/lib/utils'
import { CATEGORY_MAP } from '@/types'
import ArticleGrid from '@/components/ArticleGrid'
import TrendingNow from '@/components/TrendingNow'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 10 // ISR: Revalidate every 10 seconds for real-time news

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Disable static generation to avoid API rate limiting during build
export async function generateStaticParams() {
  return []
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  if (!(slug in CATEGORY_MAP)) {
    return {
      title: 'Category Not Found',
    }
  }

  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryTitle} News | Finscann`,
    description: `Latest ${categoryTitle.toLowerCase()} news, updates, and market insights from Finscann.`,
    keywords: `${categoryTitle}, financial news, market updates, ${slug}`,
    openGraph: {
      title: `${categoryTitle} News | Finscann`,
      description: `Latest ${categoryTitle.toLowerCase()} news, updates, and market insights.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  // Validate category
  if (!(slug in CATEGORY_MAP)) {
    notFound()
  }

  const apiCategory = mapCategoryToAPI(slug)
  const articles = await fetchArticles({ category: apiCategory, limit: 24 })

  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Filter trending articles from this category
  const trendingArticles = articles.filter((article) => article.trending === true).slice(0, 5)

  // Show remaining articles in the grid
  const gridArticles = articles.slice(0, 18)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Trending Now Section - Shows trending articles from this category */}
      {trendingArticles.length > 0 && <TrendingNow articles={trendingArticles} />}

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: `${categoryTitle} News` }]} />

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryTitle} News</h1>
          <p className="text-xl text-gray-600">
            Latest {categoryTitle.toLowerCase()} news, updates, and market insights.
          </p>
        </header>

        {/* Articles */}
        {gridArticles.length > 0 ? (
          <ArticleGrid articles={gridArticles} priority />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
