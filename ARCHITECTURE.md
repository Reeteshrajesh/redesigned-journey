# 🏗️ NEW FINSCANN ARCHITECTURE

## Visual Folder Structure

```
new-news-react/
│
├── 📁 public/                          # Static files
│   ├── logo.png                        # Finscann logo
│   ├── favicon.ico                     # Browser icon
│   ├── og-image.png                    # Social share image (1200x630)
│   ├── robots.txt                      # SEO crawler rules
│   └── manifest.json                   # PWA manifest
│
├── 📁 src/
│   │
│   ├── 📁 app/                         # Pages (Next.js App Router)
│   │   │
│   │   ├── layout.tsx                  # 🌟 Root layout (Header + Footer wrapper)
│   │   ├── page.tsx                    # 🏠 Homepage
│   │   ├── loading.tsx                 # ⏳ Loading skeleton
│   │   ├── not-found.tsx               # 404 page
│   │   │
│   │   ├── 📁 articles/
│   │   │   ├── page.tsx                # All articles grid
│   │   │   └── 📁 [category]/          # 🆕 Category-based routing
│   │   │       └── 📁 [slug]/
│   │   │           └── page.tsx        # Article detail page
│   │   │                               # URL: /articles/{category}/{slug}
│   │   │
│   │   ├── 📁 category/
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx            # Category listing page
│   │   │                               # URL: /category/{stock|market|ipo|crypto|commodities}
│   │   │
│   │   ├── 📁 search/
│   │   │   └── page.tsx                # Search results
│   │   │
│   │   ├── 📁 recent/
│   │   │   └── page.tsx                # Recent articles
│   │   │
│   │   ├── 📁 about/
│   │   │   └── page.tsx                # About page
│   │   │
│   │   ├── 📁 privacy/
│   │   │   └── page.tsx                # Privacy policy
│   │   │
│   │   ├── 📁 terms/
│   │   │   └── page.tsx                # Terms of service
│   │   │
│   │   └── 📁 disclaimer/
│   │       └── page.tsx                # Disclaimer
│   │
│   ├── 📁 components/                  # Reusable components (8 files only!)
│   │   ├── ArticleCard.tsx             # Article card component
│   │   ├── ArticleGrid.tsx             # Grid layout wrapper
│   │   ├── Header.tsx                  # Navigation header
│   │   ├── Footer.tsx                  # Footer with links
│   │   ├── Image.tsx                   # Image wrapper (next/image)
│   │   ├── Markdown.tsx                # Markdown renderer
│   │   ├── Share.tsx                   # Social share buttons
│   │   └── SEO.tsx                     # SEO meta tags + JSON-LD
│   │
│   ├── 📁 lib/                         # Utilities (3 files only!)
│   │   ├── api.ts                      # API client functions
│   │   ├── utils.ts                    # Common utilities
│   │   └── config.ts                   # Constants & config
│   │
│   ├── 📁 types/
│   │   └── index.ts                    # TypeScript interfaces
│   │
│   └── 📁 styles/
│       └── globals.css                 # Global CSS (Tailwind)
│
├── .env.local                          # Environment variables (SECRET!)
├── .env.example                        # Example env file (commit this)
├── .gitignore                          # Git ignore rules
├── next.config.js                      # Next.js configuration
├── tailwind.config.js                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies
├── README.md                           # Project documentation
├── DEVELOPMENT_PLAN.md                 # This plan document
└── ARCHITECTURE.md                     # This architecture document
```

---

## Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                         Root Layout                          │
│                      (src/app/layout.tsx)                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      Header                          │   │
│  │                  (components/Header.tsx)             │   │
│  │  - Logo                                              │   │
│  │  - Navigation menu                                   │   │
│  │  - Mobile menu                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Page Content                       │   │
│  │                   (children prop)                    │   │
│  │                                                       │   │
│  │  Pages use these components:                         │   │
│  │  - ArticleCard                                       │   │
│  │  - ArticleGrid                                       │   │
│  │  - Image                                             │   │
│  │  - Markdown                                          │   │
│  │  - Share                                             │   │
│  │  - SEO                                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      Footer                          │   │
│  │                  (components/Footer.tsx)             │   │
│  │  - Quick links                                       │   │
│  │  - Social media                                      │   │
│  │  - Copyright                                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Page Component Structure

### Homepage (`src/app/page.tsx`)
```tsx
┌─────────────────────────────────────────┐
│           Homepage                       │
├─────────��───────────────────────────────┤
│  SEO Component                           │
│  (title, description, og tags)           │
├─────────────────────────────────────────┤
│  Featured Articles Section               │
│  ┌───────┐ ┌───────┐ ┌───────┐         │
│  │ Card  │ │ Card  │ │ Card  │         │
│  └───────┘ └───────┘ └───────┘         │
├─────────────────────────────────────────┤
│  Recent Articles Grid                    │
│  ┌─────────────────────────────────┐   │
│  │      ArticleGrid                 │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐    │   │
│  │  │ Card │ │ Card │ │ Card │    │   │
│  │  └──────┘ └──────┘ └──────┘    │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐    │   │
│  │  │ Card │ │ Card │ │ Card │    │   │
│  │  └──────┘ └──────┘ └──────┘    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Article Detail (`src/app/articles/[category]/[slug]/page.tsx`)
```tsx
┌─────────────────────────────────────────┐
│       Article Detail Page                │
├─────────────────────────────────────────┤
│  SEO Component (enhanced for articles)   │
│  - JSON-LD (NewsArticle schema)          │
│  - Open Graph (article type)             │
│  - Twitter Card                           │
├─────────────────────────────────────────┤
│  Breadcrumbs                             │
│  Home > Articles > Category > Title      │
├─────────────────────────────────────────┤
│  Article Header                          │
│  - Category badge                        │
│  - Title (H1)                            │
│  - Date, Author, Sentiment               │
├─────────────────────────────────────────┤
│  Featured Image                          │
│  (responsive, lazy loaded)               │
├─────────────────────────────────────────┤
│  Article Content                         │
│  - Synopsis (if available)               │
│  - Markdown rendered content             │
├─────────────────────────────────────────┤
│  Share Buttons                           │
│  WhatsApp, Twitter, Facebook, LinkedIn   │
├─────────────────────────────────────────┤
│  Related Articles                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Card │ │ Card │ │ Card │ │ Card │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────┘
```

---

## Data Flow Architecture

```
┌──────────────┐
│   Browser    │
│   Request    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│      Next.js App Router              │
│   /articles/{category}/{slug}        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│    Page Component                    │
│  (Server Component)                  │
│                                       │
│  1. Extract params: {category, slug} │
│  2. Call getArticleBySlug()          │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│    API Client (lib/api.ts)           │
│                                       │
│  1. Map category to API format       │
│     "stock" → "stock-related"        │
│                                       │
│  2. Fetch category articles          │
│     GET /api/articles?category=...   │
│                                       │
│  3. Filter by slug (client-side)     │
│     generateSlug(title) === slug     │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   External API                        │
│   api.lqtisttist.shop                │
│                                       │
│   Returns: Article[]                 │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   Page Component (continued)         │
│                                       │
│  4. Render article with components   │
│     - SEO (meta tags + JSON-LD)      │
│     - Image (responsive)             │
│     - Markdown (content)             │
│     - Share (buttons)                │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   HTML Response to Browser           │
│   (Server-rendered)                  │
└──────────────────────────────────────┘
```

---

## URL Routing Flow

### Old URL Format (with ID):
```
User visits: /articles/57882/gland-pharma-shares-skyrocket
                        ↓
            Next.js Route: /articles/[id]/[slug]
                        ↓
            Extract params: { id: "57882", slug: "..." }
                        ↓
            Fetch: GET /api/articles/57882
                        ↓
            Direct fetch (fast!)
```

### New URL Format (category-based):
```
User visits: /articles/stock/gland-pharma-shares-skyrocket
                        ↓
            Next.js Route: /articles/[category]/[slug]
                        ↓
            Extract params: { category: "stock", slug: "..." }
                        ↓
            Map category: "stock" → "stock-related"
                        ↓
            Fetch: GET /api/articles?category=stock-related
                        ↓
            Filter by slug: articles.find(a => slug === generateSlug(a.title))
                        ↓
            Return matched article
```

**Performance Note:**
- Old: 1 API call (direct ID lookup)
- New: 1 API call + client-side filtering

**Optimization Options:**
1. Cache category articles (60s ISR)
2. Backend adds endpoint: `/api/articles/{category}/{slug}`
3. Backend adds slug field to database

---

## Component Props Interface

### ArticleCard.tsx
```typescript
interface ArticleCardProps {
  article: {
    article_title_optimised: string
    synopsis?: string
    featured_image: string
    news_type: string
    sentiment: string
    upload_timestamp: string
    company_name?: string
  }
  href: string  // e.g., "/articles/stock/article-slug"
}
```

### ArticleGrid.tsx
```typescript
interface ArticleGridProps {
  articles: Article[]
  columns?: 1 | 2 | 3  // Default: responsive
}
```

### Image.tsx
```typescript
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean  // For above-fold images
  className?: string
}
```

### Markdown.tsx
```typescript
interface MarkdownProps {
  content: string
  className?: string
}
```

### Share.tsx
```typescript
interface ShareProps {
  url: string
  title: string
  description?: string
}
```

### SEO.tsx
```typescript
interface SEOProps {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  tags?: string[]
}
```

---

## API Client Functions

### lib/api.ts
```typescript
// Fetch all articles (with filters)
export async function fetchArticles(params?: {
  limit?: number
  category?: string
  sentiment?: string
}): Promise<Article[]>

// Get single article by category + slug
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null>

// Fetch featured articles
export async function fetchFeaturedArticles(
  limit = 5
): Promise<Article[]>

// Fetch recent articles
export async function fetchRecentArticles(
  limit = 12
): Promise<Article[]>

// Search articles
export async function searchArticles(
  query: string
): Promise<Article[]>

// Fetch categories
export async function fetchCategories(): Promise<Category[]>
```

---

## Utility Functions

### lib/utils.ts
```typescript
// Generate URL slug from title
export function generateSlug(title: string): string

// Format date
export function formatDate(dateString: string): string

// Merge class names (for Tailwind)
export function cn(...classes: ClassValue[]): string

// Map URL category to API category
export function mapCategoryToAPI(urlCategory: string): string

// Map API category to URL category
export function mapAPIToCategory(apiCategory: string): string

// Truncate text
export function truncate(text: string, length: number): string

// Get sentiment color (Tailwind class)
export function getSentimentColor(sentiment: string): string

// Get category color (Tailwind class)
export function getCategoryColor(category: string): string
```

---

## Environment Variables

### .env.local (NOT committed)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.lqtisttist.shop/api
NEXT_PUBLIC_UPLOADS_URL=https://finscann-images.s3.ap-south-1.amazonaws.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://finscann.com
NEXT_PUBLIC_SITE_NAME=Finscann

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-L86S0YNF5M

# Google AdSense (optional)
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-4434937912141944
```

### .env.example (committed)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_UPLOADS_URL=

# Site Configuration
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=
```

---

## Build & Deployment

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
# Test production build locally
```

### Deploy to Vercel
```bash
vercel --prod
# Automatic deployment from Git
```

---

## File Size Budget

| File Type | Budget | Description |
|-----------|--------|-------------|
| **Page JS** | < 50 KB | JavaScript for individual page |
| **Shared JS** | < 100 KB | Common chunks (React, Next.js) |
| **First Load** | < 150 KB | Total JS on first page load |
| **CSS** | < 20 KB | Tailwind CSS (purged) |
| **Images** | < 200 KB | Per page (with lazy loading) |

---

## Performance Checklist

### Before Deployment:
- [ ] Run `npm run build` - check bundle sizes
- [ ] Run Lighthouse audit - score 90+
- [ ] Test on slow 3G network
- [ ] Optimize images (WebP, lazy loading)
- [ ] Remove console.logs
- [ ] Enable compression (Vercel handles this)
- [ ] Test on real mobile device
- [ ] Check Core Web Vitals

### After Deployment:
- [ ] Monitor with Google Analytics
- [ ] Check Google Search Console
- [ ] Monitor Vercel Analytics
- [ ] Check for 404 errors
- [ ] Test all old URL redirects

---

## Key Differences from Old Architecture

| Aspect | Old Version | New Version |
|--------|-------------|-------------|
| **Routing** | `/articles/[id]/[slug]` | `/articles/[category]/[slug]` |
| **Components** | 25+ files in subfolders | 8 files, flat structure |
| **Utilities** | 8 files, complex | 3 files, simple |
| **Deployment** | Cloudflare Pages | Vercel |
| **Bundle Size** | ~200 KB | ~150 KB (target) |
| **Complexity** | High (edge runtime, middleware) | Low (standard Next.js) |
| **Folder Depth** | 3-4 levels | 1-2 levels |
| **Dependencies** | 30+ packages | 15 packages |

---

## Summary

This architecture is designed to be:
- ✅ **Simple** - Flat structure, minimal nesting
- ✅ **Lightweight** - < 150 KB first load
- ✅ **SEO-friendly** - Category-based URLs
- ✅ **Maintainable** - Easy to understand
- ✅ **Scalable** - Can grow without complexity
- ✅ **Fast** - Optimized for performance

**Total Files:** ~30 files (vs 60+ in old version)
**Total Components:** 8 (vs 25+ in old version)
**Total Utilities:** 3 (vs 8 in old version)

Clean, simple, and fast! 🚀
