'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'
import { timeAgo, generateSlug, mapAPIToCategory } from '@/lib/utils'
import { getBestImageUrl } from '@/lib/imageMapping'

interface TrendingNowProps {
  articles: Article[]
}

export default function TrendingNow({ articles }: TrendingNowProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || articles.length === 0) {
    return null
  }

  // Take the first 5 articles for trending
  const trendingArticles = articles.slice(0, 5)
  const topArticle = trendingArticles[0]
  const sideArticles = trendingArticles.slice(1, 5)

  // Get article URL
  const getArticleUrl = (article: Article) => {
    const category = mapAPIToCategory(article.news_type)
    const slug = generateSlug(article.article_title_optimised)
    return `/articles/${category}/${slug}`
  }

  // Get plain text preview from summary
  const getPlainTextPreview = (text: string, maxLength: number) => {
    if (!text) return ''
    // Remove markdown and HTML tags
    const plain = text.replace(/(<([^>]+)>)/gi, '').replace(/[*_~`#]/g, '')
    return plain.length > maxLength ? plain.substring(0, maxLength) + '...' : plain
  }

  return (
    <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 sm:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(249 115 22) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
            <svg
              className="h-5 w-5 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-300 via-red-300 to-transparent"></div>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Trending Article */}
          <div className="lg:col-span-2">
            <Link href={getArticleUrl(topArticle)} className="group block h-full">
              <article className="relative h-full min-h-[400px] sm:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group-hover:scale-[1.02]">
                {/* Background Image */}
                <Image
                  src={getBestImageUrl(topArticle)}
                  alt={topArticle.article_title_optimised}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay - Stronger for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  {/* Trending Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        />
                      </svg>
                      <span className="text-xs font-bold">#1 TRENDING</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-xs font-semibold">Hot Topic</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 line-clamp-3 leading-tight group-hover:text-blue-300 transition-colors">
                    {topArticle.article_title_optimised}
                  </h3>

                  {/* Summary */}
                  {topArticle.summary && (
                    <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
                      {getPlainTextPreview(topArticle.summary, 200)}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span className="font-semibold text-orange-300">
                      {topArticle.company_name || 'welomoney'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span suppressHydrationWarning>
                        {timeAgo(topArticle.updated_at || topArticle.upload_timestamp || topArticle.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Side Trending Articles (with images) */}
          <div className="space-y-4">
            {sideArticles.map((article) => (
              <Link key={article.id} href={getArticleUrl(article)} className="group block">
                <article className="flex gap-4 bg-white rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200 hover:border-blue-500/40 group-hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={getBestImageUrl(article)}
                      alt={article.article_title_optimised}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {article.article_title_optimised}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span suppressHydrationWarning>
                        {timeAgo(article.updated_at || article.upload_timestamp || article.created_at)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
