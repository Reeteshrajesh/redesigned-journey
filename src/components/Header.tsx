'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import CommunityBanner from './CommunityBanner'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [marketData, setMarketData] = useState<any[]>([])
  const [isLoadingMarket, setIsLoadingMarket] = useState(true)
  const [marketError, setMarketError] = useState(false)
  const [isTickerPaused, setIsTickerPaused] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Fetch market data with retry logic and localStorage caching
  useEffect(() => {
    const CACHE_KEY = 'welomoney_market_data'
    const CACHE_TIMESTAMP_KEY = 'welomoney_market_timestamp'
    const CACHE_EXPIRY = 30 * 60 * 1000 // 30 minutes
    const FETCH_TIMEOUT = 8000 // 8 seconds
    const MAX_RETRIES = 3

    // Load cached data on mount
    const loadCachedData = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)

        if (cached && timestamp) {
          const age = Date.now() - parseInt(timestamp)
          const data = JSON.parse(cached)

          // Show cached data immediately
          setMarketData(data)
          setMarketError(false)
          setIsLoadingMarket(false)

          // Mark as stale if older than 30 minutes
          if (age > CACHE_EXPIRY) {
            console.log('Market data cache is stale (>30 min old)')
          }

          return true
        }
      } catch (error) {
        console.error('Failed to load cached market data:', error)
      }
      return false
    }

    // Save data to localStorage
    const cacheData = (data: any[]) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
      } catch (error) {
        console.error('Failed to cache market data:', error)
      }
    }

    // Fetch with timeout
    const fetchWithTimeout = async (url: string, timeout: number) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        const response = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        return response
      } catch (error) {
        clearTimeout(timeoutId)
        throw error
      }
    }

    // Fetch market data with retry logic
    const fetchMarketData = async (retryCount = 0): Promise<void> => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.lqtisttist.shop/api'
        const response = await fetchWithTimeout(`${apiUrl}/market`, FETCH_TIMEOUT)

        if (!response.ok) {
          // Retry on 5xx errors or 429 (rate limit)
          if ((response.status >= 500 || response.status === 429) && retryCount < MAX_RETRIES) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000) // Exponential backoff: 1s, 2s, 4s
            console.log(`Retrying market data fetch in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`)
            await new Promise((resolve) => setTimeout(resolve, delay))
            return fetchMarketData(retryCount + 1)
          }

          throw new Error(`Failed to fetch market data: ${response.status}`)
        }

        const result = await response.json()

        if (result.success && result.data) {
          // Combine indices and commodities
          const allAssets = [...(result.data.indices || []), ...(result.data.commodities || [])]

          // Update state
          setMarketData(allAssets)
          setMarketError(false)

          // Cache the fresh data
          cacheData(allAssets)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error: any) {
        console.error('Failed to fetch market data:', error)

        // Retry on network errors (timeout, connection failed)
        if ((error.name === 'AbortError' || error.message.includes('fetch')) && retryCount < MAX_RETRIES) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000)
          console.log(`Retrying market data fetch in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`)
          await new Promise((resolve) => setTimeout(resolve, delay))
          return fetchMarketData(retryCount + 1)
        }

        // Don't overwrite existing data on error - preserve old data
        if (marketData.length === 0) {
          setMarketError(true)
        }
      } finally {
        setIsLoadingMarket(false)
      }
    }

    // Load cached data first
    const hasCachedData = loadCachedData()

    // Fetch fresh data (even if we have cache)
    if (!hasCachedData) {
      setIsLoadingMarket(true)
    }
    fetchMarketData()

    // Update every 5 minutes (300000ms)
    const interval = setInterval(() => fetchMarketData(), 300000)

    return () => clearInterval(interval)
    // marketData.length is intentionally not in deps to avoid infinite re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const categories = [
    { name: 'Latest', path: '/', available: true, isNew: false },
    { name: 'Stocks', path: '/category/stock', available: true, isNew: false },
    { name: 'Market', path: '/category/market', available: true, isNew: false },
    { name: 'IPO', path: '/category/ipo', available: true, isNew: false },
    { name: 'Crypto', path: '/category/crypto', available: true, isNew: false },
    { name: 'Global News', path: '/category/global-news', available: true, isNew: true },
    { name: 'Startup', path: '/category/startup-related', available: true, isNew: true },
    { name: 'All News', path: '/articles', available: true, isNew: false },
    { name: 'About', path: '/about-us', available: true, isNew: false },
  ]

  return (
    <header className="sticky top-0 z-40 bg-gray-50 border-b border-gray-200 transition-all duration-300">
      {/* Community Banner */}
      <CommunityBanner />

      {/* Market Ticker */}
      <div className="bg-gray-100 border-b border-gray-200 py-2 overflow-hidden min-h-[44px]">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex animate-marquee whitespace-nowrap text-sm text-gray-700"
            style={{ animationPlayState: isTickerPaused ? 'paused' : 'running' }}
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            {isLoadingMarket ? (
              <span className="mx-8 text-gray-500">Loading market data...</span>
            ) : marketError || marketData.length === 0 ? (
              <span className="mx-8 text-gray-500">Market data temporarily unavailable</span>
            ) : (
              <>
                {/* Duplicate data for seamless loop */}
                {[...marketData, ...marketData].map((asset, index) => {
                  const changePercent = parseFloat(asset.change_percent || '0')
                  const changeValue = parseFloat(asset.change_value || '0')
                  const currentPrice = parseFloat(asset.current_price || '0')
                  const isPositive = changePercent >= 0
                  const isNegative = changePercent < 0

                  const colorClass = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'

                  return (
                    <Link key={`${asset.asset_code}-${index}`} href="/market" className="mx-8 flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity">
                      <strong className="text-blue-600">{asset.asset_name}</strong>
                      <span className="text-gray-900 font-semibold">
                        {currentPrice.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className={`${colorClass} font-medium flex items-center gap-1`}>
                        {isPositive ? '▲' : isNegative ? '▼' : '●'}
                        {isPositive ? '+' : ''}
                        {changeValue.toFixed(2)} ({isPositive ? '+' : ''}
                        {changePercent.toFixed(2)}%)
                      </span>
                    </Link>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo with LIVE Badge */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/finscannlogo.png"
            alt="welomoney Logo"
            width={160}
            height={54}
            className="h-8 md:h-10 w-auto object-contain"
            priority
            unoptimized
          />
          <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full animate-ping absolute"></span>
            <span className="w-2 h-2 bg-white rounded-full relative"></span>
            LIVE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
          {categories.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`transition-all duration-300 flex items-center gap-1 whitespace-nowrap relative py-1 group ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="flex items-center gap-1">
                  {item.name}
                  {item.isNew && (
                    <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                      NEW
                    </span>
                  )}
                </span>
                {/* Active indicator with gradient and shadow */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-lg shadow-blue-500/50'
                      : 'bg-blue-600 scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
          <nav className="space-y-2 px-6">
            {categories.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    {item.name}
                    {item.isNew && (
                      <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                        NEW
                      </span>
                    )}
                  </span>
                </Link>
              )
            })}

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="pt-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </nav>
        </div>
      )}
    </header>
  )
}
