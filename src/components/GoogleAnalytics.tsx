'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/config'

export default function GoogleAnalytics() {
  // Don't render if no GA_MEASUREMENT_ID is configured
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics gtag.js - SEO team requirement: load in head section */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}
