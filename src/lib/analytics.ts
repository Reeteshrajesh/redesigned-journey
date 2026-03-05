// Google Analytics Event Tracking
// This file provides helper functions to track custom events in GA4

// Define event types for type safety
export type GAEventName =
  | 'article_view'
  | 'article_click'
  | 'category_view'
  | 'search'
  | 'share_article'
  | 'newsletter_signup'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'social_click'
  | 'contact_click'
  | 'read_more_click'

// Type for event parameters
interface GAEventParams {
  [key: string]: string | number | boolean
}

/**
 * Send custom event to Google Analytics
 * @param eventName - Name of the event
 * @param params - Event parameters
 */
export const trackEvent = (eventName: GAEventName, params?: GAEventParams): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

/**
 * Track article view
 * @param articleId - Article ID
 * @param articleTitle - Article title
 * @param category - Article category
 */
export const trackArticleView = (
  articleId: string | number,
  articleTitle: string,
  category: string
): void => {
  trackEvent('article_view', {
    article_id: articleId,
    article_title: articleTitle,
    category: category,
  })
}

/**
 * Track article click from listing page
 * @param articleId - Article ID
 * @param articleTitle - Article title
 * @param position - Position in the list (for understanding which articles get clicks)
 */
export const trackArticleClick = (
  articleId: string | number,
  articleTitle: string,
  position: number
): void => {
  trackEvent('article_click', {
    article_id: articleId,
    article_title: articleTitle,
    list_position: position,
  })
}

/**
 * Track category view
 * @param category - Category name
 */
export const trackCategoryView = (category: string): void => {
  trackEvent('category_view', {
    category: category,
  })
}

/**
 * Track search query
 * @param searchTerm - Search term used
 * @param resultsCount - Number of results found
 */
export const trackSearch = (searchTerm: string, resultsCount: number): void => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  })
}

/**
 * Track article share
 * @param articleId - Article ID
 * @param platform - Share platform (whatsapp, telegram, twitter, etc.)
 */
export const trackShareArticle = (articleId: string | number, platform: string): void => {
  trackEvent('share_article', {
    article_id: articleId,
    platform: platform,
  })
}

/**
 * Track newsletter signup attempt
 * @param source - Where the signup was initiated (footer, popup, etc.)
 */
export const trackNewsletterSignup = (source: string): void => {
  trackEvent('newsletter_signup', {
    source: source,
  })
}

/**
 * Track WhatsApp community click
 * @param source - Where the click originated (banner, footer, etc.)
 */
export const trackWhatsAppClick = (source: string): void => {
  trackEvent('whatsapp_click', {
    source: source,
  })
}

/**
 * Track Telegram community click
 * @param source - Where the click originated (banner, footer, etc.)
 */
export const trackTelegramClick = (source: string): void => {
  trackEvent('telegram_click', {
    source: source,
  })
}

/**
 * Track social media clicks
 * @param platform - Social platform (twitter, linkedin, etc.)
 * @param source - Where the click originated
 */
export const trackSocialClick = (platform: string, source: string): void => {
  trackEvent('social_click', {
    platform: platform,
    source: source,
  })
}

/**
 * Track contact form submission or contact click
 * @param method - Contact method (email, form, etc.)
 */
export const trackContactClick = (method: string): void => {
  trackEvent('contact_click', {
    method: method,
  })
}

/**
 * Track "Read More" / "Load More" clicks
 * @param location - Where the click happened (articles_page, category_page, etc.)
 * @param currentPage - Current page number being loaded
 */
export const trackLoadMoreClick = (location: string, currentPage: number): void => {
  trackEvent('read_more_click', {
    location: location,
    page_number: currentPage,
  })
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: GAEventParams
    ) => void
  }
}
