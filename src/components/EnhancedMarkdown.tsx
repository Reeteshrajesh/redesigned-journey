'use client'

import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import dynamic from 'next/dynamic'

// Dynamically import TradingViewChart with SSR disabled
const TradingViewChart = dynamic(() => import('@/components/TradingViewChart'), {
  ssr: false,
  loading: () => (
    <div className="my-8 bg-gray-100 rounded-lg p-8 text-center">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
      <p className="text-sm text-gray-600 mt-4">Loading chart...</p>
    </div>
  ),
})

interface ContentPart {
  type: 'text' | 'chart'
  content: string
}

interface EnhancedMarkdownProps {
  content: string
  className?: string
}

/**
 * Parse content and extract TradingView chart placeholders
 * Format: {{CHART:NSE:HDFCBANK}}
 */
function parseContentWithCharts(content: string): ContentPart[] {
  // Regex to match {{CHART:SYMBOL}} pattern
  // Supports formats like: NSE:HDFCBANK, MCX:GOLD1!, BSE:SENSEX
  const chartRegex = /\{\{CHART:([A-Z0-9:!]+)\}\}/g
  const parts: ContentPart[] = []
  let lastIndex = 0
  let match

  while ((match = chartRegex.exec(content)) !== null) {
    // Add text before the chart placeholder
    if (match.index > lastIndex) {
      const textContent = content.substring(lastIndex, match.index).trim()
      if (textContent) {
        parts.push({
          type: 'text',
          content: textContent,
        })
      }
    }

    // Add chart placeholder
    parts.push({
      type: 'chart',
      content: match[1], // The symbol (e.g., "NSE:HDFCBANK")
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text after last chart
  if (lastIndex < content.length) {
    const remainingText = content.substring(lastIndex).trim()
    if (remainingText) {
      parts.push({
        type: 'text',
        content: remainingText,
      })
    }
  }

  // If no charts found, return content as single text part
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content: content,
    })
  }

  return parts
}


const markdownComponents = {
  a({
    href,
    children,
    node,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: object }) {
    const isExternal = href
      ? new URL(
          href,
          `${process.env.NEXT_PUBLIC_SITE_URL || "https://finscann.com"}`,
        ).hostname !==
        new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://finscann.com")
          .hostname
      : false;
    if (isExternal) {
      return (
        <a
          href={href}
          rel="nofollow noopener noreferrer"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

export default function EnhancedMarkdown({ content, className = '' }: EnhancedMarkdownProps) {
  // Parse content into text and chart parts
  const contentParts = useMemo(() => parseContentWithCharts(content), [content])

  return (
    <div className={className}>
      {contentParts.map((part, index) => {
        if (part.type === 'chart') {
          return (
            <TradingViewChart
              key={`chart-${part.content}-${index}`}
              symbol={part.content}
              height={500}
            />
          )
        }

        return (
          <div key={`text-${index}`} className="prose prose-lg max-w-none">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{part.content}</ReactMarkdown>
          </div>
        )
      })}
    </div>
  )
}
