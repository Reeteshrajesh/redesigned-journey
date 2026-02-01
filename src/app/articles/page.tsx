import { Metadata } from 'next'
import { fetchRecentArticles } from '@/lib/api'
import CategoryFilter from '@/components/Articles/CategoryFilter'

export const revalidate = 10 // ISR: Revalidate every 10 seconds for real-time news

export const metadata: Metadata = {
  title: 'All Financial News Articles - Latest Market Updates | Finscann',
  description:
    'Browse all financial news articles, market updates, and investment insights. Stay informed with comprehensive coverage of stocks, IPOs, and business news.',
  keywords: 'financial news, all articles, market updates, stock news, business news, investment insights',
  openGraph: {
    title: 'All Articles | Finscann',
    description: 'Browse all financial news articles and market updates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Articles | Finscann',
    description: 'Browse all financial news articles and market updates',
  },
}

export default async function ArticlesPage() {
  const articles = await fetchRecentArticles(200)

  // Sort articles by latest first
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.updated_at || a.upload_timestamp || a.created_at || 0)
    const dateB = new Date(b.updated_at || b.upload_timestamp || b.created_at || 0)
    return dateB.getTime() - dateA.getTime()
  })

  if (sortedArticles.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No articles available</h2>
            <p className="text-gray-600">Please check back later for updates.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">All Financial News</h1>
        </div>

        {/* Category Filter with Articles */}
        <CategoryFilter articles={sortedArticles} />
      </section>
    </div>
  )
}
