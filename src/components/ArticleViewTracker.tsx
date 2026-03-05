'use client'

import { useEffect } from 'react'
import { trackArticleView } from '@/lib/analytics'

interface ArticleViewTrackerProps {
  articleId: number | string
  articleTitle: string
  category: string
}

/**
 * Client-side component to track article views
 * Must be used in server components that render article pages
 */
export default function ArticleViewTracker({
  articleId,
  articleTitle,
  category,
}: ArticleViewTrackerProps) {
  useEffect(() => {
    // Track article view when component mounts
    trackArticleView(articleId, articleTitle, category)
  }, [articleId, articleTitle, category])

  // This component renders nothing
  return null
}
