// Article Type
export interface Article {
  id: number
  article_title_optimised: string
  summary: string
  synopsis?: string
  trending: boolean
  company_name?: string
  nse_code?: string
  symbol?: string
  news_type: string
  sentiment: 'positive' | 'negative' | 'neutral'
  featured_image?: string
  image_data?: {
    sizes?: {
      thumb?: string
      medium?: string
      large?: string
      avif?: string
    }
    original?: string
  }
  upload_timestamp: string
  created_at: string
  updated_at?: string
  publish_time?: string
  website_link?: string
  article_link?: string
  source_url?: string
  related_tags?: string
  seo_tags?: string
  author?: string
  source?: string
  status?: string
}

// Category Type
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

// API Response Types
export interface ArticlesResponse {
  success: boolean
  data: Article[]
  count: number
  pagination?: {
    page: number
    limit: number
    hasMore: boolean
  }
}

// Market Types
export interface MarketAsset {
  asset_code: string
  asset_name: string
  asset_type: 'index' | 'commodity'
  current_price: string
  previous_close: string
  change_value: string
  change_percent: string
  day_high: string
  day_low: string
  updated_at: string
}

export interface MarketData {
  indices: MarketAsset[]
  commodities: MarketAsset[]
  lastUpdated: string
}

export interface GainerLoser {
  symbol: string
  name: string
  ltp: number
  change_percent: number
  open: number
  high: number
  low: number
  prev_close: number
  volume: number
}

export interface GainersLosersResponse {
  success: boolean
  marketOpen: boolean
  updatedAt: string
  data: GainerLoser[]
}

// Category Mapping
export type CategorySlug = 'stock' | 'market' | 'ipo' | 'crypto' | 'commodity' | 'general' | 'global-news' | 'startup-related' | 'global-stocks' | 'dividend-related' | 'currency-markets' | 'policy-related'

export const CATEGORY_MAP: Record<CategorySlug, string> = {
  stock: 'stock-related',
  market: 'market-related',
  ipo: 'ipo-related',
  crypto: 'crypto-related',
  commodity: 'commodity-related',
  general: 'other',
  'global-news': 'global-news',
  'startup-related': 'startup-related',
  'global-stocks': 'global-stocks',
  'dividend-related': 'dividend-related',
  'currency-markets': 'currency-markets',
  'policy-related': 'policy-related',
}

export const REVERSE_CATEGORY_MAP: Record<string, CategorySlug> = {
  // Primary category mappings
  'stock-related': 'stock',
  'market-related': 'market',
  'ipo-related': 'ipo',
  'crypto-related': 'crypto',
  'commodity-related': 'commodity',
  'startup-related': 'startup-related',
  'global-news': 'global-news',

  // Stock-related subcategories (intentionally NOT mapped — use API category directly in URL)
  'dividend-related': 'stock',
  'merger-related': 'stock',
  'earnings-related': 'stock',
  'corporate-action': 'stock',
  'corporate-governance': 'stock',
  'quarterly-results': 'stock',

  // Market-related subcategories
  'currency-markets': 'market',
  'economic-related': 'market',
  'mutual-funds': 'market',
  'market-analysis': 'market',

  // IPO variations
  'ipo': 'ipo',

  // Global news variations
  'global-politics': 'global-news',

  // General/other categories
  'policy-related': 'general',
  'general-news': 'general',
  other: 'general',
  '': 'general', // Handle empty news_type

  // Legacy/backward compatibility
  'commodities-related': 'commodity', // Handle legacy plural form
  'budget-related': 'startup-related', // Map budget to startup for legacy support
}
