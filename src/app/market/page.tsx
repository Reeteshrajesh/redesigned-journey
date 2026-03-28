import { Metadata } from 'next'
import { fetchMarketData, fetchGainers, fetchLosers, fetchArticles } from '@/lib/api'
import MarketClient from '@/components/MarketClient'

export const metadata: Metadata = {
  title: 'Market Overview | welomoney',
  description: 'Live indices, commodities, top gainers & losers, and market news.',
  robots: { index: false, follow: true },
}

export const revalidate = 60

export default async function MarketPage() {
  const [marketData, gainersRes, losersRes, articles] = await Promise.all([
    fetchMarketData(),
    fetchGainers(5),
    fetchLosers(5),
    fetchArticles({ limit: 10, category: 'market-related' }),
  ])

  return (
    <MarketClient
      marketData={marketData}
      gainersRes={gainersRes}
      losersRes={losersRes}
      articles={articles}
    />
  )
}
