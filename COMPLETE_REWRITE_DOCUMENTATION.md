# 📋 COMPLETE FINSCANN FRONTEND REWRITE DOCUMENTATION

**Version:** 2.0 (Lightweight Rewrite)
**Current Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
**Target:** Ultra-lightweight, performance-optimized rebuild

---

## 📚 TABLE OF CONTENTS

1. [Complete Folder Structure](#1-complete-folder-structure)
2. [All Page Routes & Features](#2-all-page-routes--features)
3. [API Documentation](#3-api-documentation)
4. [Environment Variables & Credentials](#4-environment-variables--credentials)
5. [Third-Party Integrations](#5-third-party-integrations)
6. [Component Library](#6-component-library)
7. [Utility Functions Reference](#7-utility-functions-reference)
8. [Styling System](#8-styling-system)
9. [Image Handling Strategy](#9-image-handling-strategy)
10. [Performance Optimizations](#10-performance-optimizations)
11. [SEO Implementation](#11-seo-implementation)
12. [Rewrite Strategy](#12-rewrite-strategy)

---

## 1. COMPLETE FOLDER STRUCTURE

```
silver-broccoli/news-react/
├── public/
│   ├── images/                    # Static images
│   ├── finscannlogo.png          # Main logo (use in Header)
│   ├── finscannlogo-dark.png     # Dark theme logo
│   ├── favicon.ico               # Browser tab icon
│   ├── apple-touch-icon.png      # iOS home screen
│   ├── og-image.png              # Social share preview (1200x630)
│   ├── manifest.json             # PWA configuration
│   ├── robots.txt                # SEO crawler rules
│   ├── ads.txt                   # AdSense verification
│   └── sw.js                     # Service worker (PWA)
│
├── src/
│   ├── app/                      # Next.js routes
│   │   ├── layout.tsx            # Root layout (Header + Footer)
│   │   ├── page.tsx              # Homepage
│   │   ├── articles/
│   │   │   ├── page.tsx          # All articles grid
│   │   │   └── [id]/[slug]/page.tsx  # Article detail
│   │   ├── category/[slug]/page.tsx  # Category pages
│   │   ├── search/page.tsx       # Search results
│   │   ├── recent/page.tsx       # Recent articles
│   │   ├── about-us/page.tsx     # Static pages
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   ├── sitemap.xml/route.ts  # SEO sitemaps
│   │   ├── sitemap-news.xml/route.ts
│   │   ├── sitemap-articles.xml/route.ts
│   │   └── sitemap-static.xml/route.ts
│   │
│   ├── components/
│   │   ├── Ads/
│   │   │   └── GoogleAds.tsx     # AdSense integration
│   │   ├── Analytics/
│   │   │   ├── GoogleAnalytics.tsx  # GA4 tracking
│   │   │   └── ArticleTracker.tsx   # Article analytics
│   │   ├── Articles/
│   │   │   ├── ArticleCard.tsx   # Reusable card
│   │   │   ├── ArticleGrid.tsx   # Grid layout
│   │   │   ├── RelatedArticles.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx        # Navigation
│   │   │   ├── Footer.tsx        # Footer
│   │   │   ├── StickyBanner.tsx  # Promo banner
│   │   │   └── RepublicDayBanner.tsx
│   │   ├── Markdown/
│   │   │   └── MarkdownRenderer.tsx  # Render markdown
│   │   ├── SEO/
│   │   │   └── ArticleSEO.tsx    # Structured data
│   │   └── Share/
│   │       └── ShareButtons.tsx  # Social sharing
│   │
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   ├── analytics.ts          # GA4 functions
│   │   ├── imageUtils.ts         # Image handling
│   │   ├── share.ts              # Social sharing
│   │   └── utils.ts              # Common utils
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   │
│   └── globals.css               # Tailwind CSS
│
├── .env.local                    # Environment variables (DON'T COMMIT)
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 2. ALL PAGE ROUTES & FEATURES

### Main Pages

#### **`/` - Homepage** (`src/app/page.tsx`)
**Features:**
- Trending/Featured articles carousel (top 5)
- Grid of recent articles (12 articles)
- Market ticker in header
- TrendingNow widget
- Sticky promotional banner
- Google AdSense display ads

**Data Fetching:**
```typescript
const featured = await fetchFeaturedArticles()  // Top 5 trending
const recent = await fetchRecentArticles()      // Latest 12
```

**SEO:**
- Meta title: "Finscann - Real-Time Financial News & Market Insights"
- Meta description with keywords
- Open Graph tags
- Twitter Card

---

#### **`/articles` - All Articles** (`src/app/articles/page.tsx`)
**Features:**
- Paginated grid of all articles
- Filter by category
- Filter by sentiment (positive/negative/neutral)
- Sort by latest/oldest
- AdSense in-feed ads

**Data Fetching:**
```typescript
const articles = await fetchArticles({ limit: 50 })
```

---

#### **`/articles/[id]/[slug]` - Article Detail** (`src/app/articles/[id]/[slug]/page.tsx`)
**Features:**
- Full article content (markdown rendered)
- Synopsis (key points)
- Featured image (responsive)
- Company details (NSE code, sentiment)
- Author attribution
- Related tags
- Share buttons (WhatsApp, Twitter, Facebook, LinkedIn, Telegram, Email)
- Related articles section (4 articles)
- Breadcrumb navigation
- Google Analytics tracking
- AdSense in-article ads
- Back to home link

**Data Fetching:**
```typescript
const article = await fetchArticle(id)
const related = await fetchArticles()  // Filter by category/company
```

**SEO:**
- Dynamic meta title with article title
- Meta description from synopsis
- Keywords from tags + company + NSE code
- Open Graph type: "article"
- Structured data (JSON-LD): NewsArticle schema
- Canonical URL
- Published/Modified timestamps

---

#### **`/category/[slug]` - Category Pages** (`src/app/category/[slug]/page.tsx`)
**Supported Categories:**
- `stock-related` - Stock market news
- `market-related` - Market analysis
- `ipo-related` - IPO news
- `crypto-related` - Cryptocurrency
- `commodities-related` - Commodities

**Features:**
- Category-specific articles grid
- Category description
- Filter by sentiment
- Sort options
- AdSense ads

**Data Fetching:**
```typescript
const articles = await fetchCategoryArticles(slug)
```

**SEO:**
- Dynamic title: "{Category} News - Finscann"
- Category-specific description

---

#### **`/search` - Search Results** (`src/app/search/page.tsx`)
**Features:**
- Client-side search (React state)
- Search input with debounce
- Results grid
- "No results" message

**Data Fetching:**
```typescript
const results = await searchArticles(query)
```

---

#### **`/recent` - Recent Articles** (`src/app/recent/page.tsx`)
**Features:**
- Latest articles grid
- Sort by publish date (newest first)

**Data Fetching:**
```typescript
const recent = await fetchRecentArticles({ limit: 24 })
```

---

### Static Pages

#### `/about-us`, `/privacy-policy`, `/terms-of-service`, `/disclaimer`
**Features:**
- Static markdown content
- Standard layout
- Contact info

---

### SEO Sitemaps (XML)

#### **`/sitemap.xml`** - Main sitemap index
Links to all other sitemaps

#### **`/sitemap-news.xml`** - Google News sitemap
Recent articles (last 2 days) for Google News

#### **`/sitemap-articles.xml`** - All articles
Full article list with lastmod dates

#### **`/sitemap-static.xml`** - Static pages
About, Privacy, Terms, etc.

---

## 3. API DOCUMENTATION

### Base Configuration
```typescript
API_BASE_URL = "https://api.lqtisttist.shop/api"
UPLOADS_URL = "https://finscann-images.s3.ap-south-1.amazonaws.com"
```

### API Endpoints

| Endpoint | Method | Purpose | Cache | Returns |
|----------|--------|---------|-------|---------|
| `/articles` | GET | Fetch all articles | 60s | `Article[]` |
| `/articles?limit=X` | GET | Limit results | 60s | `Article[]` |
| `/articles?category=slug` | GET | Filter by category | 60s | `Article[]` |
| `/articles?sentiment=X` | GET | Filter by sentiment | 60s | `Article[]` |
| `/articles/{id}` | GET | Get single article | 60s | `Article` |
| `/featured` | GET | Featured/trending | 60s | `Article[]` |
| `/recent?limit=X&sort=latest` | GET | Recent articles | 60s | `Article[]` |
| `/trending` | GET | Trending articles | 60s | `Article[]` |
| `/categories` | GET | All categories | 60s | `Category[]` |
| `/category/{slug}` | GET | Category articles | 60s | `Article[]` |
| `/search?q={query}` | GET | Search articles | 0 | `Article[]` |
| `/stats` | GET | Site statistics | 300s | `Stats` |
| `/market` | GET | Market indices | 300s | `MarketData` |

### Article Response Structure

```typescript
interface Article {
  // Basic Info
  id: number
  article_title_optimised: string
  summary: string                    // Markdown content
  synopsis: string                   // Short key points summary

  // Company Info
  company_name: string
  nse_code: string

  // Classification
  news_type: string                  // "stock-related", "market-related", etc.
  sentiment: 'positive' | 'negative' | 'neutral'
  trending: boolean

  // Images
  featured_image: string             // S3 path or full URL
  image_data?: {                     // New responsive format
    sizes: {
      thumb: string                  // 300x200
      medium: string                 // 600x400
      large: string                  // 1200x800
      avif?: string                  // AVIF format
    }
    original: string
  }

  // Timestamps
  upload_timestamp: string           // ISO 8601: "2026-01-29T14:30:00Z"
  updated_at: string
  publish_time: string

  // SEO & Links
  related_tags: string               // "earnings-results, revenue-growth, ..."
  seo_tags: string
  website_link: string               // Source website
  article_link: string               // Original article URL

  // Author
  author: string
  source: string

  // Status
  status: string                     // "published", "draft", etc.
}
```

### Example API Call

```typescript
// Fetch featured articles
const response = await fetch('https://api.lqtisttist.shop/api/featured?limit=5')
const articles: Article[] = await response.json()

// Fetch single article
const response = await fetch('https://api.lqtisttist.shop/api/articles/57622')
const article: Article = await response.json()
```

### Caching Strategy

```typescript
// ISR (Incremental Static Regeneration)
export const revalidate = 60  // Revalidate every 60 seconds

// Client-side caching
- Market data: localStorage, 30 minutes
- Article list: React Query, 60 seconds
- Images: Browser cache, 1 year
```

---

## 4. ENVIRONMENT VARIABLES & CREDENTIALS

### `.env.local` File (DO NOT COMMIT!)

```bash
# ============================================
# API CONFIGURATION
# ============================================
NEXT_PUBLIC_API_URL=https://api.lqtisttist.shop/api
NEXT_PUBLIC_UPLOADS_URL=https://finscann-images.s3.ap-south-1.amazonaws.com

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_BASE_URL=https://finscann.com
NEXT_PUBLIC_SITE_URL=https://finscann.com
NEXT_PUBLIC_SITE_NAME=Finscann

# ============================================
# GOOGLE ANALYTICS 4
# ============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-L86S0YNF5M

# ============================================
# GOOGLE ADSENSE
# ============================================
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-4434937912141944

# ============================================
# PERFORMANCE
# ============================================
REVALIDATE_TIME=60
```

### `.env.example` (Commit this)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_UPLOADS_URL=

# Site Configuration
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=

# Performance
REVALIDATE_TIME=60
```

### Credentials Summary

| Service | Credential | Value | Location |
|---------|-----------|-------|----------|
| **Google Analytics** | Measurement ID | `G-L86S0YNF5M` | `.env.local` |
| **Google AdSense** | Publisher ID | `ca-pub-4434937912141944` | `.env.local` |
| **API** | Base URL | `https://api.lqtisttist.shop/api` | `.env.local` |
| **S3 Images** | CDN URL | `https://finscann-images.s3.ap-south-1.amazonaws.com` | `.env.local` |

---

## 5. THIRD-PARTY INTEGRATIONS

### Google Analytics 4 (GA4)

**Setup:** `src/components/Analytics/GoogleAnalytics.tsx`

```typescript
// Initialize in <head>
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
<Script id="google-analytics">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{GA_MEASUREMENT_ID}');
</Script>
```

**Events Tracked:**
- Page views (automatic)
- Article views (`article_view`)
- Search queries (`search`)
- Social shares (`share`)
- Related article clicks (`related_article_click`)
- External link clicks (`external_link_click`)
- Scroll depth (`scroll_depth_25`, `scroll_depth_50`, `scroll_depth_75`, `scroll_depth_100`)
- Time on article (`time_on_article`)
- Category views (`category_view`)

**Example Event:**
```typescript
gtag('event', 'article_view', {
  article_id: '57622',
  article_title: 'Gland Pharma Shares Skyrocket',
  category: 'stock-related'
})
```

---

### Google AdSense

**Setup:** `src/components/Ads/GoogleAds.tsx`

**Ad Formats:**

1. **Display Ad** (Rectangle/Vertical/Horizontal)
```tsx
<DisplayAd
  adSlot="1234567890"
  adFormat="rectangle"  // or "vertical", "horizontal"
/>
```

2. **In-Feed Ad** (Blends with article cards)
```tsx
<InFeedAd
  adSlot="1234567890"
  adLayout="fluid"
/>
```

3. **In-Article Ad** (Inline with content)
```tsx
<InArticleAd adSlot="1234567890" />
```

4. **Multiplex Ad** (Recommended content grid)
```tsx
<MultiplexAd adSlot="1234567890" />
```

5. **Anchor Ad** (Sticky bottom mobile)
```tsx
<AnchorAd />  // Auto-placed by AdSense
```

**Placement Strategy:**
- **Homepage:** Display ads between sections
- **Category pages:** In-feed ads every 6 articles
- **Article detail:** In-article ads after 3 paragraphs
- **Sidebar:** Display ads (desktop only)
- **Mobile:** Anchor ads at bottom

---

### TradingView Charts

**Setup:** Embedded via iframe or widget

```tsx
<TradingViewChart
  symbol="NIFTY"
  width="100%"
  height="400"
/>
```

Used in:
- Article content (if stock mentioned)
- Market summary widget

---

### Social Sharing

**Platforms Supported:**
- WhatsApp (Web & Mobile)
- Twitter/X
- Facebook
- LinkedIn
- Telegram
- Email
- Native Web Share API (fallback)

**Implementation:** `src/lib/share.ts`

```typescript
const shareUrl = getShareUrl('whatsapp', {
  url: 'https://finscann.com/articles/123/title',
  title: 'Article Title',
  text: 'Article summary...'
})
```

**Share URLs:**
```typescript
WhatsApp:  https://wa.me/?text={text}%20{url}
Twitter:   https://twitter.com/intent/tweet?text={text}&url={url}
Facebook:  https://www.facebook.com/sharer/sharer.php?u={url}
LinkedIn:  https://www.linkedin.com/sharing/share-offsite/?url={url}
Telegram:  https://t.me/share/url?url={url}&text={text}
Email:     mailto:?subject={title}&body={text}%20{url}
```

---

### Amazon S3 (Image CDN)

**Bucket:** `finscann-images`
**Region:** `ap-south-1` (Mumbai)
**URL:** `https://finscann-images.s3.ap-south-1.amazonaws.com`

**Folder Structure:**
```
/articles/              # Article images
/defaults/              # Default category images
/logos/                 # Logos
/uploads/               # Manual uploads
```

**CORS Configuration:** Enabled for Next.js Image optimization

---

## 6. COMPONENT LIBRARY

### Layout Components

#### **Header** (`src/components/Layout/Header.tsx`)
**Features:**
- Sticky navigation bar
- Logo with link to home
- Menu links (Home, Articles, Categories dropdown, Recent, About)
- Search icon (opens modal)
- Market ticker (NIFTY, SENSEX, GOLD, SILVER)
- Mobile responsive (hamburger menu)

**Props:** None (global component)

---

#### **Footer** (`src/components/Layout/Footer.tsx`)
**Features:**
- 4-column layout (desktop) → 1 column (mobile)
- About section with logo
- Quick links (Home, About, Privacy, Terms, Disclaimer)
- Categories links
- Social media icons (Twitter, Facebook, LinkedIn, Instagram)
- Newsletter signup form
- Contact info (email)
- Copyright notice

**Props:** None

---

#### **StickyBanner** (`src/components/Layout/StickyBanner.tsx`)
**Features:**
- Dismissible banner at top
- Promotional message
- Close button (stores in localStorage)

**Props:**
```typescript
{
  message: string
  bgColor?: string
  textColor?: string
}
```

---

### Article Components

#### **ArticleCard** (`src/components/Articles/ArticleCard.tsx`)
**Features:**
- Responsive card with hover effect
- Featured image (responsive, lazy loaded)
- Article title (truncated to 2 lines)
- Synopsis/summary preview (3 lines)
- Metadata (category, sentiment, date)
- Company name & NSE code
- Link to article detail

**Props:**
```typescript
{
  article: Article
  priority?: boolean  // For above-fold images
}
```

---

#### **ArticleGrid** (`src/components/Articles/ArticleGrid.tsx`)
**Features:**
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Gap spacing
- Auto-placement

**Props:**
```typescript
{
  articles: Article[]
  showAds?: boolean   // Insert ads between cards
}
```

---

#### **RelatedArticles** (`src/components/Articles/RelatedArticles.tsx`)
**Features:**
- Shows 4 related articles
- Filters by same category or company
- Horizontal scroll on mobile
- Grid on desktop

**Props:**
```typescript
{
  articles: Article[]
  currentArticleId: number
  title?: string
}
```

---

#### **CategoryFilter** (`src/components/Articles/CategoryFilter.tsx`)
**Features:**
- Dropdown to filter by category
- Sentiment filter (positive/negative/neutral)
- Sort options (latest/oldest)

**Props:**
```typescript
{
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}
```

---

### Utility Components

#### **ResponsiveImage** (`src/components/Images/ResponsiveImage.tsx`)
**Features:**
- Next.js Image with fallback strategy
- Supports multiple image sources (priority order):
  1. `image_data.sizes.large/medium/thumb`
  2. `image_data.original`
  3. `featured_image`
  4. Tag-based default image
- Lazy loading (default)
- Priority loading (above-fold)
- Alt text extraction from title

**Props:**
```typescript
{
  article: Article
  priority?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
}
```

---

#### **MarkdownRenderer** (`src/components/Markdown/MarkdownRenderer.tsx`)
**Features:**
- Converts markdown → HTML
- Syntax highlighting (code blocks)
- GFM support (tables, strikethrough, task lists)
- Auto-link headings
- Raw HTML support (sanitized)
- Responsive tables

**Props:**
```typescript
{
  content: string
}
```

**Dependencies:**
- `react-markdown`
- `rehype-highlight` (syntax highlighting)
- `rehype-raw` (HTML in markdown)
- `remark-gfm` (GitHub Flavored Markdown)

---

#### **ShareButtons** (`src/components/Share/ShareButtons.tsx`)
**Features:**
- Modal with share options
- 6 platforms + copy link
- WhatsApp auto-formats text
- Click tracking (GA4 events)

**Props:**
```typescript
{
  url: string
  title: string
  summary?: string
  articleId: number
}
```

---

### SEO Component

#### **ArticleSEO** (`src/components/SEO/ArticleSEO.tsx`)
**Features:**
- Generates JSON-LD structured data
- NewsArticle schema
- Organization schema (publisher)
- BreadcrumbList schema

**Props:**
```typescript
{
  article: Article
  imageUrl: string
}
```

**Output Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "image": "https://...",
  "datePublished": "2026-01-29T14:30:00Z",
  "dateModified": "2026-01-29T15:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Finscann",
    "logo": {
      "@type": "ImageObject",
      "url": "https://finscann.com/logo.png"
    }
  }
}
```

---

### Analytics Components

#### **GoogleAnalytics** (`src/components/Analytics/GoogleAnalytics.tsx`)
**Features:**
- Initializes GA4
- Loads gtag script
- Auto page view tracking

**Props:** None

---

#### **ArticleTracker** (`src/components/Analytics/ArticleTracker.tsx`)
**Features:**
- Tracks article view on mount
- Tracks scroll depth (25%, 50%, 75%, 100%)
- Tracks time on article (exit intent)

**Props:**
```typescript
{
  articleId: number
  articleTitle: string
  category: string
}
```

---

### Ad Components

#### **DisplayAd** (`src/components/Ads/GoogleAds.tsx`)
**Features:**
- Standard banner ads
- Multiple formats: rectangle (300x250), vertical (160x600), horizontal (728x90)

**Props:**
```typescript
{
  adSlot: string
  adFormat: 'rectangle' | 'vertical' | 'horizontal'
}
```

---

## 7. UTILITY FUNCTIONS REFERENCE

### `lib/utils.ts` - Common Utilities

```typescript
// Class name merge
cn(...classes: ClassValue[]): string

// Generate URL-friendly slug
generateSlug(text: string): string
// "Gland Pharma Shares" → "gland-pharma-shares"

// Format dates
formatDate(dateString: string): string
// "2026-01-29T14:30:00Z" → "Jan 29, 2026"

formatDateTime(dateString: string): string
// "2026-01-29T14:30:00Z" → "Jan 29, 2026 14:30"

timeAgo(dateString: string): string
// "2 hours ago", "3 days ago"

formatRelativeTime(dateString: string): string
// "2h ago", "3d ago"

// Truncate text
truncate(text: string, length: number): string
// "Long text here..." → "Long text..."

// Format news type
formatNewsType(type: string): string
// "stock-related" → "Stock"

// Get sentiment styling
getSentimentColor(sentiment: string): string
// "positive" → "text-green-600"

getSentimentBadge(sentiment: string): string
// "positive" → "bg-green-100 text-green-700"

// Get category color
getCategoryColor(category: string): string
// "stock-related" → "bg-blue-100 text-blue-700"
```

---

### `lib/api.ts` - API Client

```typescript
// Generic fetch wrapper
fetchWrapper<T>(url: string, options?: RequestInit): Promise<T>

// Article APIs
fetchArticles(params?: {
  limit?: number
  category?: string
  sentiment?: string
  search?: string
}): Promise<Article[]>

fetchArticle(id: string | number): Promise<Article>

fetchFeaturedArticles(limit?: number): Promise<Article[]>

fetchRecentArticles(params?: {
  limit?: number
  sort?: 'latest' | 'oldest'
}): Promise<Article[]>

fetchTrendingArticles(limit?: number): Promise<Article[]>

// Category APIs
fetchCategories(): Promise<Category[]>

fetchCategoryArticles(slug: string): Promise<Article[]>

// Search
searchArticles(query: string): Promise<Article[]>

// Stats
fetchStats(): Promise<Stats>
```

---

### `lib/analytics.ts` - GA4 Events

```typescript
// Track page view
trackPageView(url: string): void

// Generic event tracking
trackEvent(eventName: string, params?: Record<string, any>): void

// Specific events
trackArticleView(articleId: number, title: string, category: string): void

trackShare(platform: string, articleId: number, title: string): void

trackSearch(query: string, resultsCount: number): void

trackScrollDepth(depth: 25 | 50 | 75 | 100, articleId: number): void

trackTimeOnArticle(seconds: number, articleId: number): void

trackRelatedArticleClick(fromId: number, toId: number): void

trackExternalLink(url: string, linkText: string): void

trackCategoryView(category: string): void
```

---

### `lib/share.ts` - Social Sharing

```typescript
type SharePlatform = 'whatsapp' | 'twitter' | 'facebook' | 'linkedin' | 'telegram' | 'email' | 'native'

// Clean markdown from text
cleanShareText(text: string): string

// Format for WhatsApp
formatWhatsAppText(title: string, url: string): string

// Get platform-specific share URL
getShareUrl(platform: SharePlatform, params: {
  url: string
  title: string
  text?: string
}): string

// Use Web Share API (mobile)
nativeShare(data: {
  title: string
  text: string
  url: string
}): Promise<void>

// Copy to clipboard
copyToClipboard(text: string): Promise<boolean>
```

---

### `lib/imageUtils.ts` - Image Handling

```typescript
// Get best available image URL
getArticleImageUrl(article: Article): string

// Check for responsive image data
hasResponsiveImages(article: Article): boolean

// Detect manual vs AI images
isManualUpload(imageUrl: string): boolean
```

---

## 8. STYLING SYSTEM

### Tailwind CSS Configuration

**File:** `tailwind.config.ts`

```typescript
export default {
  darkMode: 'class',  // Toggle with .dark class
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#f87171',  // Red-400
          500: '#ef4444',  // Red-500
          600: '#dc2626',  // Red-600
          700: '#b91c1c',  // Red-700
        },
        dark: {
          bg: '#0f172a',     // Slate-900
          card: '#1e293b',   // Slate-800
          border: '#334155', // Slate-700
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
}
```

---

### Common Styling Patterns

#### **Card Style**
```tsx
<div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
```

#### **Button Style**
```tsx
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
  Click Me
</button>
```

#### **Grid Layout**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

#### **Typography**
```tsx
<h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Title</h1>
<p className="text-gray-600 leading-relaxed line-clamp-3">Text...</p>
```

#### **Responsive Padding/Margin**
```tsx
<div className="px-4 py-8 lg:px-8 lg:py-12">
  {/* Content */}
</div>
```

---

## 9. IMAGE HANDLING STRATEGY

### Image Priority System

1. **`image_data.sizes.large`** (WebP 1200x800)
2. **`image_data.sizes.medium`** (WebP 600x400)
3. **`image_data.sizes.thumb`** (WebP 300x200)
4. **`image_data.original`** (Original format)
5. **`featured_image`** (S3 full path or URL)
6. **Tag-based fallback** (Default image from `imageMapping`)

### Responsive Image Sizes

```typescript
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

**Breakpoints:**
- Mobile (< 640px): Full width
- Tablet (640-1024px): Half width
- Desktop (> 1024px): One-third width

### Image Formats

- **WebP** (primary, smallest size)
- **AVIF** (next-gen, if available)
- **JPG** (fallback for compatibility)

### Lazy Loading

```tsx
<Image
  src={imageUrl}
  alt={altText}
  loading="lazy"  // Default for below-fold
  priority={false}  // Set true for above-fold (LCP)
/>
```

### Image Optimization

**Next.js Config:**
```typescript
images: {
  remotePatterns: [
    { hostname: 'finscann-images.s3.ap-south-1.amazonaws.com' },
    { hostname: 'api.lqtisttist.shop' },
  ],
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 31536000,  // 1 year
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

---

## 10. PERFORMANCE OPTIMIZATIONS

### Next.js Features Used

1. **App Router** - File-based routing, automatic code splitting
2. **ISR (Incremental Static Regeneration)** - Cache pages, revalidate every 60s
3. **Edge Runtime** - Deploy to Cloudflare Edge (low latency)
4. **Dynamic Imports** - Lazy load components
5. **Image Optimization** - Automatic WebP/AVIF conversion, responsive sizing
6. **Font Optimization** - Automatic font subsetting, preloading

### Caching Strategy

```typescript
// Page-level ISR
export const revalidate = 60  // Cache for 60 seconds

// API caching
const response = await fetch(url, {
  next: { revalidate: 60 }
})

// Client-side caching (React Query)
queryClient.setQueryData('articles', articles, {
  cacheTime: 60000,  // 60 seconds
})

// Browser caching (images)
Cache-Control: public, max-age=31536000, immutable
```

### Code Splitting

```tsx
// Dynamic import for below-fold components
const MarkdownRenderer = dynamic(() => import('@/components/Markdown/MarkdownRenderer'), {
  loading: () => <Skeleton />,
  ssr: true,
})

const MarketSummary = dynamic(() => import('@/components/Market/MarketSummary'), {
  ssr: false,  // Client-side only
})
```

### Bundle Size Optimization

1. **Tree shaking** - Remove unused code (automatic)
2. **Minification** - Compress JS/CSS (automatic)
3. **Compression** - Gzip/Brotli enabled
4. **Icon optimization** - Use lucide-react (tree-shakeable icons)
5. **Remove unused dependencies** - Check with `next build`

---

## 11. SEO IMPLEMENTATION

### Meta Tags (Every Page)

```tsx
export const metadata: Metadata = {
  title: 'Page Title | Finscann',
  description: 'Page description (150-160 chars)',
  keywords: 'keyword1, keyword2, keyword3',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'article',
    title: 'Page Title',
    description: 'Page description',
    url: 'https://finscann.com/page',
    siteName: 'Finscann',
    images: [
      {
        url: 'https://finscann.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image description',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['https://finscann.com/og-image.png'],
  },

  alternates: {
    canonical: '/page',
  },
}
```

### Structured Data (Articles)

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "image": "https://...",
  "datePublished": "2026-01-29T14:30:00Z",
  "dateModified": "2026-01-29T15:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Finscann",
    "logo": {
      "@type": "ImageObject",
      "url": "https://finscann.com/logo.png"
    }
  },
  "description": "Article summary"
}
</script>
```

### Sitemaps

1. **Main Sitemap** (`sitemap.xml`)
2. **News Sitemap** (`sitemap-news.xml`) - Last 2 days
3. **Articles Sitemap** (`sitemap-articles.xml`) - All articles
4. **Static Sitemap** (`sitemap-static.xml`) - About, Privacy, etc.

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://finscann.com/sitemap.xml
Sitemap: https://finscann.com/sitemap-news.xml
Sitemap: https://finscann.com/sitemap-articles.xml
Sitemap: https://finscann.com/sitemap-static.xml
```

---

## 12. REWRITE STRATEGY

### Phase 1: Setup (Day 1)

#### Step 1: Create New Folder
```bash
mkdir news-react-v2
cd news-react-v2
npx create-next-app@latest . --typescript --tailwind --app --use-npm
```

#### Step 2: Install Dependencies
```bash
npm install \
  lucide-react \
  react-markdown \
  rehype-highlight rehype-raw rehype-slug rehype-autolink-headings \
  remark-gfm \
  clsx tailwind-merge \
  @tanstack/react-query \
  next-pwa \
  sharp
```

#### Step 3: Copy Environment Variables
```bash
cp ../news-react/.env.local .env.local
```

#### Step 4: Copy Static Assets
```bash
cp -r ../news-react/public/* public/
```

---

### Phase 2: Core Setup (Day 1-2)

#### 1. Setup Tailwind Config
Copy `tailwind.config.ts` from old project

#### 2. Setup Next.js Config
Copy `next.config.ts` (remove unnecessary parts)

#### 3. Setup TypeScript Types
Create `src/types/index.ts` with Article, Category interfaces

#### 4. Create Utility Functions
Copy `src/lib/utils.ts`, `src/lib/api.ts`

---

### Phase 3: Layout (Day 2-3)

#### 1. Create Root Layout
- Copy `src/app/layout.tsx`
- Simplify (remove unnecessary components)

#### 2. Create Header Component
- Copy `src/components/Layout/Header.tsx`
- Optimize (remove unused features)

#### 3. Create Footer Component
- Copy `src/components/Layout/Footer.tsx`

---

### Phase 4: Pages (Day 3-5)

#### 1. Homepage
- Copy `src/app/page.tsx`
- Use ArticleCard component
- Add loading states

#### 2. Article Detail Page
- Copy `src/app/articles/[id]/[slug]/page.tsx`
- Simplify markdown rendering
- Add SEO components

#### 3. Category Pages
- Copy `src/app/category/[slug]/page.tsx`

#### 4. Static Pages
- Copy About, Privacy, Terms, Disclaimer

---

### Phase 5: Components (Day 5-7)

#### Essential Components (Keep):
1. ArticleCard
2. ArticleGrid
3. ResponsiveImage
4. MarkdownRenderer (lightweight version)
5. ShareButtons
6. GoogleAnalytics
7. ArticleSEO

#### Optional Components (Add if needed):
1. RelatedArticles
2. CategoryFilter
3. TrendingNow
4. MarketSummary
5. GoogleAds (if monetizing)

---

### Phase 6: SEO & Analytics (Day 7-8)

#### 1. Setup Google Analytics
- Copy `src/components/Analytics/GoogleAnalytics.tsx`
- Add tracking events

#### 2. Create Sitemaps
- Copy sitemap routes from `src/app/`

#### 3. Add Structured Data
- Copy `src/components/SEO/ArticleSEO.tsx`

---

### Phase 7: Testing & Optimization (Day 8-10)

#### 1. Lighthouse Audit
```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

#### 2. Bundle Analysis
```bash
npm install @next/bundle-analyzer
# Add to next.config.ts
npm run build
```

**Optimization Targets:**
- First Load JS: < 200 KB
- Page Size: < 500 KB
- Total Images: < 2 MB

#### 3. Test on Real Devices
- Mobile (iOS/Android)
- Tablet
- Desktop

---

### Lightweight Checklist

**Remove These (Not Essential):**
- ❌ StickyBanner (unless needed)
- ❌ RepublicDayBanner (remove after event)
- ❌ TradingView charts (heavy embed)
- ❌ Multiple ad formats (keep 1-2 only)
- ❌ Heavy animations (use simple transitions)
- ❌ Unused fonts (keep Inter only)
- ❌ Unused icons (tree-shake lucide-react)

**Keep These (Essential):**
- ✅ ArticleCard
- ✅ ArticleGrid
- ✅ Header & Footer
- ✅ MarkdownRenderer (lightweight)
- ✅ ResponsiveImage
- ✅ ShareButtons
- ✅ Google Analytics
- ✅ SEO components

**Optimize These:**
- 🔧 Reduce header height (mobile)
- 🔧 Simplify footer (fewer columns)
- 🔧 Use CSS instead of Framer Motion
- 🔧 Inline critical CSS
- 🔧 Remove unnecessary API calls

---

### Performance Targets

| Metric | Target | Current | Priority |
|--------|--------|---------|----------|
| **First Contentful Paint (FCP)** | < 1.8s | ? | High |
| **Largest Contentful Paint (LCP)** | < 2.5s | ? | High |
| **Total Blocking Time (TBT)** | < 200ms | ? | Medium |
| **Cumulative Layout Shift (CLS)** | < 0.1 | ? | High |
| **Time to Interactive (TTI)** | < 3.8s | ? | Medium |
| **First Load JS** | < 200 KB | ? | High |
| **Page Size** | < 500 KB | ? | Medium |

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Pages
```bash
npm install -g wrangler
npm run pages:build
wrangler pages deploy
```

---

## Summary

This documentation contains:
- ✅ Complete folder structure
- ✅ All page routes & features
- ✅ API documentation with response structures
- ✅ Environment variables & credentials
- ✅ Third-party integrations (GA4, AdSense, S3)
- ✅ Component library reference
- ✅ Utility functions reference
- ✅ Styling system (Tailwind)
- ✅ Image handling strategy
- ✅ Performance optimizations
- ✅ SEO implementation
- ✅ Step-by-step rewrite strategy

**Total Documentation:** 12 sections, 150+ references

---

## Next Steps

1. Read this documentation fully
2. Set up new project folder
3. Copy environment variables
4. Start with Phase 1-2 (core setup)
5. Build incrementally (test after each phase)
6. Deploy to staging first
7. Test thoroughly
8. Deploy to production

**Estimated Rewrite Time:** 7-10 days (for 1 developer)

Good luck with your rewrite! 🚀
