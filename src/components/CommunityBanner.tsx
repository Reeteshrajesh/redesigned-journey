'use client'

import { useState, useEffect } from 'react'

export default function CommunityBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if banner was dismissed in last 7 days
    const dismissed = localStorage.getItem('community_banner_dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const sevenDays = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      if (Date.now() - dismissedTime < sevenDays) {
        setIsVisible(false)
      } else {
        // Clear old dismissal
        localStorage.removeItem('community_banner_dismissed')
      }
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('community_banner_dismissed', Date.now().toString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div id="community-banner" className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white py-2 px-2 sm:py-3 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-1 sm:gap-4 relative z-10">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="text-xs sm:text-base md:text-lg font-bold whitespace-nowrap">
            <span className="sm:hidden">📢 Join Our Community</span>
            <span className="hidden sm:inline">📢 Get Market News 5 Mins Faster – Join Now!</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* WhatsApp Button */}
          <a
            href="https://chat.whatsapp.com/E7ilDaGA4yr1wKTYFOQ63q?mode=gi_c"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 bg-white text-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-50 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Telegram Button */}
          <a
            href="https://t.me/+UkWVI7tLj743NTI1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            <span className="hidden sm:inline">Telegram</span>
          </a>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors p-0.5 sm:p-1"
            aria-label="Close banner"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </div>
  )
}
