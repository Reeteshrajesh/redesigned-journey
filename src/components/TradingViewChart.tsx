'use client'

import { useEffect, useRef, memo, useState } from 'react'

interface TradingViewChartProps {
  symbol: string
  height?: number
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: any) => any
    }
  }
}

const TradingViewChart = memo(({ symbol, height = 500 }: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer to load chart only when visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { rootMargin: '100px' } // Load 100px before visible
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return // Don't load until visible
    // Create unique container ID based on symbol
    const containerId = `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`

    // Load TradingView script if not already loaded
    const loadTradingViewScript = () => {
      if (scriptLoadedRef.current || document.getElementById('tradingview-script')) {
        initWidget()
        return
      }

      const script = document.createElement('script')
      script.id = 'tradingview-script'
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = () => {
        scriptLoadedRef.current = true
        initWidget()
      }
      document.head.appendChild(script)
    }

    // Initialize TradingView widget
    const initWidget = () => {
      if (!window.TradingView || !containerRef.current) return

      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }

      // Create widget
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: 'D',
        timezone: 'Asia/Kolkata',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: containerId,
        // Disable features not needed
        disabled_features: [
          'header_saveload',
          'header_compare',
          'header_screenshot',
          'timeframes_toolbar', // Prevents intraday trading
        ],
        enabled_features: ['study_templates', 'hide_left_toolbar_by_default'],
      })
    }

    loadTradingViewScript()

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, isVisible])

  const containerId = `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`

  return (
    <div className="my-8 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Live Chart: {symbol}
        </h3>
      </div>
      <div
        ref={containerRef}
        id={containerId}
        style={{ height: `${height}px` }}
        className="relative"
      />
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          <strong>Disclaimer:</strong> Chart powered by TradingView. Market data may be delayed.
          For informational purposes only. Not financial advice.
        </p>
      </div>
    </div>
  )
})

TradingViewChart.displayName = 'TradingViewChart'

export default TradingViewChart
