import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchArticles } from '@/lib/api'
import { mapCategoryToAPI } from '@/lib/utils'
import { CATEGORY_MAP } from '@/types'
import TrendingNow from '@/components/TrendingNow'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryArticlesClient from '@/components/CategoryArticlesClient'
import CategoryViewTracker from '@/components/CategoryViewTracker'

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

// Category-specific metadata with unique descriptions
const CATEGORY_METADATA: Record<string, { title: string; description: string; keywords: string }> = {
  'stock': {
    title: 'Stock Market News & Analysis',
    description: 'Real-time stock market news, company updates, earnings reports, and investment insights. Track top performers and market-moving stocks.',
    keywords: 'stock market news, stock analysis, company earnings, share prices, stock picks, equity news, market performance'
  },
  'market': {
    title: 'Market News & Trends',
    description: 'Latest market trends, indices updates, sector analysis, and economic indicators. Stay informed about BSE, NSE, and global market movements.',
    keywords: 'market news, market trends, BSE, NSE, Sensex, Nifty, indices, sector analysis, market outlook'
  },
  'ipo': {
    title: 'IPO News & Updates',
    description: 'Upcoming IPOs, listings, subscription status, grey market premiums, and IPO reviews. Complete coverage of new public offerings in India.',
    keywords: 'IPO news, upcoming IPOs, IPO listing, GMP, subscription status, mainboard IPO, SME IPO, public offering'
  },
  'crypto': {
    title: 'Cryptocurrency News & Updates',
    description: 'Breaking crypto news, Bitcoin prices, altcoin updates, blockchain technology, and cryptocurrency regulations. Your crypto news hub.',
    keywords: 'cryptocurrency news, Bitcoin, Ethereum, altcoins, crypto prices, blockchain, crypto regulation, DeFi'
  },
  'global-news': {
    title: 'Global Financial News',
    description: 'International market news, global economic trends, forex updates, and worldwide financial developments affecting investors.',
    keywords: 'global news, international markets, world economy, forex, global stocks, international finance'
  },
  'startup-related': {
    title: 'Startup News & Funding Updates',
    description: 'Latest startup funding rounds, unicorn news, venture capital deals, and entrepreneurship insights from India and worldwide.',
    keywords: 'startup news, funding news, unicorn startups, venture capital, Series A, Series B, startup ecosystem'
  },
  'commodity': {
    title: 'Commodity Market News',
    description: 'Gold prices, crude oil updates, agricultural commodity news, and precious metals market analysis. Track commodity trends.',
    keywords: 'commodity news, gold price, silver price, crude oil, MCX, commodity trading, precious metals'
  },
  'recent': {
    title: 'Recent Financial News',
    description: 'Latest breaking financial news, real-time market updates, and trending stories across stocks, IPOs, crypto, and commodities.',
    keywords: 'recent news, breaking news, latest updates, real-time news, trending financial news'
  }
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

  const { SITE_URL } = await import('@/lib/config')
  const categoryUrl = `${SITE_URL}/category/${slug}`

  // Get unique metadata for this category, fallback to generic
  const categoryMeta = CATEGORY_METADATA[slug] || {
    title: `${categoryTitle} News`,
    description: `Latest ${categoryTitle.toLowerCase()} news, updates, and market insights from welomoney.`,
    keywords: `${categoryTitle}, financial news, market updates, ${slug}`
  }

  return {
    title: `${categoryMeta.title} | welomoney`,
    description: categoryMeta.description,
    // Remove keywords meta tag (deprecated)
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${categoryMeta.title} | welomoney`,
      description: categoryMeta.description,
      type: 'website',
      url: categoryUrl,
      siteName: 'welomoney',
      locale: 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${categoryTitle} News - welomoney`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryMeta.title} | welomoney`,
      description: categoryMeta.description,
      images: ['/og-image.png'],
      creator: '@finscann',
      site: '@finscann'
    },
    other: {
      'news_keywords': categoryMeta.keywords
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  // Validate category
  if (!(slug in CATEGORY_MAP)) {
    notFound()
  }

  const apiCategory = mapCategoryToAPI(slug)
  // Fetch 500 articles initially as per user requirement
  const articles = await fetchArticles({ category: apiCategory, limit: 500 })

  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Filter trending articles from this category
  const trendingArticles = articles.filter((article) => article.trending === true).slice(0, 5)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Analytics Tracking */}
      <CategoryViewTracker category={slug} />

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

        {/* Client-side pagination component */}
        <CategoryArticlesClient
          initialArticles={articles}
          categoryTitle={categoryTitle}
        />
      </div>
    </div>
  )
}
