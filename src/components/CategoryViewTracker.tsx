'use client'

import { useEffect } from 'react'
import { trackCategoryView } from '@/lib/analytics'

interface CategoryViewTrackerProps {
  category: string
}

/**
 * Client-side component to track category page views
 */
export default function CategoryViewTracker({ category }: CategoryViewTrackerProps) {
  useEffect(() => {
    trackCategoryView(category)
  }, [category])

  return null
}
