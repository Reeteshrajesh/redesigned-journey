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

// Category Mapping
export type CategorySlug = 'stock' | 'market' | 'ipo' | 'crypto' | 'commodities' | 'general' | 'global-news' | 'budget'

export const CATEGORY_MAP: Record<CategorySlug, string> = {
  stock: 'stock-related',
  market: 'market-related',
  ipo: 'ipo-related',
  crypto: 'crypto-related',
  commodities: 'commodities-related',
  general: 'other',
  'global-news': 'global-news',
  budget: 'budget-related',
}

export const REVERSE_CATEGORY_MAP: Record<string, CategorySlug> = {
  'stock-related': 'stock',
  'market-related': 'market',
  'ipo-related': 'ipo',
  'crypto-related': 'crypto',
  'commodities-related': 'commodities',
  'commodity-related': 'commodities', // Handle singular form
  other: 'general',
  'global-news': 'global-news',
  'global-stocks': 'stock', // Map global stocks to stock category
  budget: 'budget',
  'budget-related': 'budget',
  'dividend-related': 'stock', // Dividends are stock-related
  'merger-related': 'stock', // Mergers are stock-related
  'policy-related': 'general', // Policy news goes to general
  'currency-markets': 'market', // Currency markets to market category
  '': 'general', // Handle empty news_type
}
