// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.lqtisttist.shop/api'

export const UPLOADS_URL =
  process.env.NEXT_PUBLIC_UPLOADS_URL ||
  'https://finscann-images.s3.ap-south-1.amazonaws.com'

// Site Configuration
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://finscann.com'
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Finscann'

// Analytics
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// AdSense
export const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''

// Cache revalidation (seconds)
// Reduced to 10 seconds for real-time news updates
export const REVALIDATE_TIME = 10
