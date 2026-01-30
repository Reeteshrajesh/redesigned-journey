/**
 * Image Mapping Cache
 * In-memory cache for image mappings to improve performance
 * Follows the same pattern as the old news-react codebase
 */

import { getBestImageUrl } from './imageMapping'
import { Article } from '@/types'

// Simple in-memory cache
const cache = new Map<string, string>()

/**
 * Get image URL with caching
 * Creates a cache key from article ID
 */
export function getCachedImageUrl(article: Article): string {
  // Create cache key using article ID
  const cacheKey = `img:${article.id}`

  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }

  // Not in cache, compute it
  const imageUrl = getBestImageUrl(article)

  // Store in cache (limit cache size to prevent memory issues)
  if (cache.size > 500) {
    // Remove oldest entry (first entry in Map)
    const firstKey = cache.keys().next().value
    if (firstKey !== undefined) {
      cache.delete(firstKey)
    }
  }

  cache.set(cacheKey, imageUrl)

  return imageUrl
}

/**
 * Clear the cache (useful for testing or memory management)
 */
export function clearImageMappingCache(): void {
  cache.clear()
}

/**
 * Get cache statistics
 */
export function getImageMappingCacheStats() {
  return {
    size: cache.size,
    maxSize: 500,
  }
}
