'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { MarketData, GainersLosersResponse } from '@/lib/api'
import type { Article, GainerLoser } from '@/types'
import { generateSlug, mapAPIToCategory } from '@/lib/utils'
import { timeAgoWithTooltip } from '@/lib/timeAgo'

const TradingViewChart = dynamic(() => import('@/components/TradingViewChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading chart...</div>
    </div>
  ),
})

const CHART_OPTIONS = [
  { label: 'SENSEX', symbol: 'BSE:SENSEX' },
  { label: 'GOLD', symbol: 'GOLD' },
  { label: 'SILVER', symbol: 'SILVER' },
  { label: 'CRUDE OIL', symbol: 'USOIL' },
  { label: 'USD/INR', symbol: 'FX_IDC:USDINR' },
]

interface Props {
  marketData: MarketData
  gainersRes: GainersLosersResponse
  losersRes: GainersLosersResponse
  articles: Article[]
}

function getSentiment(percent: string) {
  const val = parseFloat(percent)
  if (val > 0.5) return { label: 'Bullish', color: 'bg-green-100 text-green-700' }
  if (val < -0.5) return { label: 'Bearish', color: 'bg-red-100 text-red-700' }
  return { label: 'Neutral', color: 'bg-yellow-100 text-yellow-700' }
}

function ChangeDisplay({ value, percent }: { value: string; percent: string }) {
  const isPositive = !value.startsWith('-')
  const isNeutral = parseFloat(percent) === 0
  const color = isNeutral ? 'text-gray-500' : isPositive ? 'text-green-600' : 'text-red-500'
  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown
  return (
    <span className={`flex items-center gap-1 text-sm font-semibold ${color}`}>
      <Icon className="h-4 w-4" />
      {isPositive && !isNeutral ? '+' : ''}{percent}%
    </span>
  )
}

function AssetCard({ asset, isCommodity = false }: { asset: MarketData['indices'][0]; isCommodity?: boolean }) {
  const sentiment = getSentiment(asset.change_percent)
  const price = parseFloat(asset.current_price)
  const formattedPrice = isCommodity
    ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-1">
        <p className="text-xs text-gray-500 font-medium truncate flex-1">{asset.asset_name}</p>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ml-1 ${sentiment.color}`}>
          {sentiment.label}
        </span>
      </div>
      <p className="text-xl font-bold text-gray-900 mt-1">{formattedPrice}</p>
      <ChangeDisplay value={asset.change_value} percent={asset.change_percent} />
      <p className="text-xs text-gray-400 mt-1">
        H: {isCommodity ? '$' : ''}{parseFloat(asset.day_high).toLocaleString('en-IN')} &nbsp;
        L: {isCommodity ? '$' : ''}{parseFloat(asset.day_low).toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default function MarketClient({ marketData, gainersRes, losersRes, articles }: Props) {
  const [selectedChart, setSelectedChart] = useState(CHART_OPTIONS[0].symbol)

  const gainers = gainersRes.data || []
  const losers = losersRes.data || []
  const hasGainers = gainers.length > 0
  const hasLosers = losers.length > 0
  const marketOpen = gainersRes.marketOpen

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
          {marketOpen ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-gray-400 rounded-full" /> Market Closed
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Live indices, commodities, top movers & market news
        </p>
      </div>

      {/* Indices */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Indices</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {marketData.indices.map((asset) => (
            <AssetCard key={asset.asset_code} asset={asset} />
          ))}
        </div>
      </section>

      {/* Commodities */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Commodities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {marketData.commodities.map((asset) => (
            <AssetCard key={asset.asset_code} asset={asset} isCommodity />
          ))}
        </div>
      </section>

      {/* TradingView Chart */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Charts</h2>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            {CHART_OPTIONS.map((opt) => (
              <option key={opt.symbol} value={opt.symbol}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <TradingViewChart symbol={selectedChart} height={500} />
        </div>
      </section>

      {/* Gainers & Losers */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-green-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-green-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Top Gainers
            </h2>
            {!hasGainers && (
              <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full border">Last session</span>
            )}
          </div>
          {!hasGainers ? (
            <div className="p-5">
              <p className="text-sm text-gray-500 font-medium mb-1">Market is closed</p>
              <p className="text-xs text-gray-400">Live data available 9:15 AM – 3:30 PM IST. Check back during market hours.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left px-5 py-2">Symbol</th>
                  <th className="text-right px-5 py-2">LTP</th>
                  <th className="text-right px-5 py-2">Change</th>
                  <th className="text-right px-5 py-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {gainers.map((g: GainerLoser) => (
                  <tr key={g.symbol} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-gray-800">{g.symbol}</td>
                    <td className="px-5 py-3 text-right text-gray-700">{g.ltp.toFixed(2)}</td>
                    <td className="px-5 py-3 text-right text-green-600 font-semibold">
                      +{g.change_percent.toFixed(2)}%
                    </td>
                    <td className="px-5 py-3 text-right text-gray-400">
                      {g.volume >= 1000000
                        ? `${(g.volume / 1000000).toFixed(1)}M`
                        : `${(g.volume / 1000).toFixed(0)}K`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Top Losers */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-red-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-red-700 flex items-center gap-2">
              <TrendingDown className="h-5 w-5" /> Top Losers
            </h2>
            {!hasLosers && (
              <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full border">Last session</span>
            )}
          </div>
          {!hasLosers ? (
            <div className="p-5">
              <p className="text-sm text-gray-500 font-medium mb-1">Market is closed</p>
              <p className="text-xs text-gray-400">Live data available 9:15 AM – 3:30 PM IST. Check back during market hours.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left px-5 py-2">Symbol</th>
                  <th className="text-right px-5 py-2">LTP</th>
                  <th className="text-right px-5 py-2">Change</th>
                  <th className="text-right px-5 py-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {losers.map((l: GainerLoser) => (
                  <tr key={l.symbol} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-gray-800">{l.symbol}</td>
                    <td className="px-5 py-3 text-right text-gray-700">{l.ltp.toFixed(2)}</td>
                    <td className="px-5 py-3 text-right text-red-600 font-semibold">
                      {l.change_percent.toFixed(2)}%
                    </td>
                    <td className="px-5 py-3 text-right text-gray-400">
                      {l.volume >= 1000000
                        ? `${(l.volume / 1000000).toFixed(1)}M`
                        : `${(l.volume / 1000).toFixed(0)}K`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Market News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Market News</h2>
          <Link href="/category/market" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        {articles.length === 0 ? (
          <p className="text-sm text-gray-400">No market news available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => {
              const category = mapAPIToCategory(article.news_type)
              const slug = generateSlug(article.article_title_optimised)
              const time = timeAgoWithTooltip(article.created_at)
              const isPositive = article.sentiment === 'positive'
              const isNegative = article.sentiment === 'negative'
              return (
                <Link
                  key={article.id}
                  href={`/articles/${category}/${slug}`}
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-400 transition-all"
                >
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
                    {article.article_title_optimised}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium ${
                        isPositive
                          ? 'bg-green-50 text-green-600'
                          : isNegative
                          ? 'bg-red-50 text-red-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {article.sentiment || 'neutral'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span title={time.tooltip}>{time.display}</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
