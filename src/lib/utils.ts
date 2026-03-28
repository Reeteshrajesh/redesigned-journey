import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CATEGORY_MAP, REVERSE_CATEGORY_MAP, type CategorySlug } from '@/types'

// Merge class names (for Tailwind)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate URL slug from title
// IMPORTANT: Must match backend slug generation logic exactly
// Backend: REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^\\w\\s-]', '', 'g'), '\\s+', '-', 'g'), '-+', '-', 'g')
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Step 1: Remove special characters except word chars, spaces, and hyphens
    // \w = [a-zA-Z0-9_], so this keeps letters, numbers, underscores, spaces, hyphens
    .replace(/[^\w\s-]/g, '')
    // Step 2: Replace spaces (and underscores) with hyphens
    .replace(/[\s_]+/g, '-')
    // Step 3: Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Step 4: Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')
}

// Format date: "Jan 29, 2026"
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Format date with time: "Jan 29, 2026 14:30"
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Time ago: "2 hours ago"
export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
    }
  }

  return 'Just now'
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

// Format news type: "stock-related" → "Stock"
export function formatNewsType(type: string): string {
  return type
    .replace(/-related$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Map URL category to API category
export function mapCategoryToAPI(urlCategory: string): string {
  return CATEGORY_MAP[urlCategory as CategorySlug] || 'other'
}

// Map API category to URL category
export function mapAPIToCategory(apiCategory: string): string {
  // Handle empty or missing category
  if (!apiCategory || apiCategory.trim() === '') {
    return 'general'
  }

  // Normalize: lowercase, trim, and replace spaces with hyphens
  const normalized = apiCategory.toLowerCase().trim().replace(/\s+/g, '-')

  // If it maps to a known slug, use that
  const mapped = REVERSE_CATEGORY_MAP[normalized] || REVERSE_CATEGORY_MAP[apiCategory]
  if (mapped) return mapped

  // Otherwise use the normalized API category directly as URL segment
  // This handles subcategories like global-stocks, dividend-related etc.
  return normalized
}

// Get sentiment color class
export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600'
    case 'negative':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

// Get sentiment badge classes
export function getSentimentBadge(sentiment: string): string {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-700'
    case 'negative':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

// Get category color class
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    stock: 'bg-blue-100 text-blue-700',
    market: 'bg-purple-100 text-purple-700',
    ipo: 'bg-orange-100 text-orange-700',
    crypto: 'bg-yellow-100 text-yellow-700',
    commodity: 'bg-green-100 text-green-700',
    'global-news': 'bg-indigo-100 text-indigo-700',
    'startup-related': 'bg-pink-100 text-pink-700',
    general: 'bg-gray-100 text-gray-700',
  }
  return colors[category] || colors.general
}
