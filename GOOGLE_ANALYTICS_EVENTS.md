# Google Analytics Events Documentation

## Overview

Finscann uses custom event tracking to understand user behavior and improve content. All events are sent to Google Analytics 4 (GA4) property: `G-8VSXF40K0E`

---

## 📊 Available Events

### 1. **article_view**
Tracks when a user views an article detail page.

**Parameters:**
- `article_id` - Unique article identifier
- `article_title` - Article headline
- `category` - Article category (stock, crypto, ipo, etc.)

**Example:**
```typescript
import { trackArticleView } from '@/lib/analytics'

trackArticleView(123, 'Reliance Stock Hits All-Time High', 'stock')
```

**Use Case:** Understand which articles are most popular and engaging.

---

### 2. **article_click**
Tracks when a user clicks on an article from a listing page.

**Parameters:**
- `article_id` - Unique article identifier
- `article_title` - Article headline
- `list_position` - Position in the list (1-based)

**Example:**
```typescript
import { trackArticleClick } from '@/lib/analytics'

trackArticleClick(123, 'Bitcoin Reaches $60K', 3)
```

**Use Case:** Analyze which positions get the most clicks, optimize article placement.

---

### 3. **category_view**
Tracks when a user views a category page.

**Parameters:**
- `category` - Category name (stock, crypto, ipo, market, global-news)

**Example:**
```typescript
import { trackCategoryView } from '@/lib/analytics'

trackCategoryView('crypto')
```

**Use Case:** Understand which categories are most popular.

---

### 4. **search**
Tracks search queries and results.

**Parameters:**
- `search_term` - The search query
- `results_count` - Number of results found

**Example:**
```typescript
import { trackSearch } from '@/lib/analytics'

trackSearch('reliance stock', 45)
```

**Use Case:** Understand what users are searching for, identify content gaps.

---

### 5. **share_article**
Tracks when users share articles on social media.

**Parameters:**
- `article_id` - Article being shared
- `platform` - Share platform (whatsapp, telegram, twitter, linkedin, copy_link)

**Example:**
```typescript
import { trackShareArticle } from '@/lib/analytics'

trackShareArticle(123, 'whatsapp')
```

**Use Case:** Measure article virality, understand preferred share platforms.

---

### 6. **newsletter_signup**
Tracks newsletter subscription attempts.

**Parameters:**
- `source` - Where signup was initiated (footer, popup, banner)

**Example:**
```typescript
import { trackNewsletterSignup } from '@/lib/analytics'

trackNewsletterSignup('footer')
```

**Use Case:** Optimize newsletter signup placement.

---

### 7. **whatsapp_click**
Tracks clicks on WhatsApp community links.

**Parameters:**
- `source` - Click origin (banner, footer, article)

**Example:**
```typescript
import { trackWhatsAppClick } from '@/lib/analytics'

trackWhatsAppClick('banner')
```

**Use Case:** Measure WhatsApp community growth sources.

---

### 8. **telegram_click**
Tracks clicks on Telegram community links.

**Parameters:**
- `source` - Click origin (banner, footer, article)

**Example:**
```typescript
import { trackTelegramClick } from '@/lib/analytics'

trackTelegramClick('banner')
```

**Use Case:** Measure Telegram community growth sources.

---

### 9. **social_click**
Tracks social media icon clicks.

**Parameters:**
- `platform` - Social platform (twitter, linkedin)
- `source` - Click location (header, footer)

**Example:**
```typescript
import { trackSocialClick } from '@/lib/analytics'

trackSocialClick('twitter', 'footer')
```

**Use Case:** Understand which social platforms drive engagement.

---

### 10. **contact_click**
Tracks contact interactions.

**Parameters:**
- `method` - Contact method (email, form)

**Example:**
```typescript
import { trackContactClick } from '@/lib/analytics'

trackContactClick('email')
```

**Use Case:** Measure user interest in contacting the team.

---

### 11. **read_more_click**
Tracks "Load More" / pagination clicks.

**Parameters:**
- `location` - Page location (articles_page, category_page, home_page)
- `page_number` - Page number being loaded

**Example:**
```typescript
import { trackLoadMoreClick } from '@/lib/analytics'

trackLoadMoreClick('articles_page', 2)
```

**Use Case:** Understand content consumption depth, optimize pagination.

---

## 🎯 How to Use in Components

### Example 1: Track Article View (Article Detail Page)

```typescript
'use client'

import { useEffect } from 'react'
import { trackArticleView } from '@/lib/analytics'

export default function ArticlePage({ article }: { article: Article }) {
  useEffect(() => {
    // Track article view when page loads
    trackArticleView(article.id, article.title, article.category)
  }, [article.id])

  return (
    <div>
      <h1>{article.title}</h1>
      {/* ... */}
    </div>
  )
}
```

### Example 2: Track Article Click (Article Card)

```typescript
'use client'

import { trackArticleClick } from '@/lib/analytics'

export default function ArticleCard({ article, position }: Props) {
  const handleClick = () => {
    trackArticleClick(article.id, article.title, position)
  }

  return (
    <Link href={`/articles/${article.slug}`} onClick={handleClick}>
      <h2>{article.title}</h2>
    </Link>
  )
}
```

### Example 3: Track WhatsApp Click (Header Banner)

```typescript
'use client'

import { trackWhatsAppClick } from '@/lib/analytics'

export default function CommunityBanner() {
  return (
    <a
      href="https://chat.whatsapp.com/..."
      onClick={() => trackWhatsAppClick('banner')}
    >
      Join WhatsApp
    </a>
  )
}
```

---

## 📈 Viewing Events in Google Analytics

### Access GA4 Dashboard:
1. Go to https://analytics.google.com/
2. Select property: `G-8VSXF40K0E`

### View Events:
1. **Reports** → **Engagement** → **Events**
2. You'll see all custom events with counts

### View Event Parameters:
1. Click on any event name
2. View breakdown by parameters (article_id, category, etc.)

### Create Custom Reports:
1. **Explore** → **Blank**
2. Add dimensions (event_name, article_id, category)
3. Add metrics (event_count, total_users)
4. Create visualizations

---

## 🎨 Example Custom Reports

### 1. **Top Articles Report**
**Dimensions:** article_id, article_title
**Metrics:** article_view count
**Sort by:** article_view count (descending)

Shows which articles are most popular.

### 2. **Category Performance**
**Dimensions:** category
**Metrics:** article_view count, article_click count
**Calculate:** CTR = clicks / views

Shows which categories perform best.

### 3. **Search Terms Analysis**
**Dimensions:** search_term
**Metrics:** search count, results_count (average)

Shows what users search for and if they find content.

### 4. **Community Growth Sources**
**Dimensions:** source
**Metrics:** whatsapp_click count, telegram_click count

Shows which placements drive community signups.

### 5. **Article Position Analysis**
**Dimensions:** list_position
**Metrics:** article_click count

Shows which positions get most clicks (optimize article order).

---

## 🔧 Technical Notes

### Client-Side Tracking
All events use client-side tracking via gtag.js:
```javascript
window.gtag('event', 'article_view', {
  article_id: 123,
  article_title: 'Example',
  category: 'stock'
})
```

### Type Safety
All functions are TypeScript-typed for safety:
```typescript
export type GAEventName =
  | 'article_view'
  | 'article_click'
  // ...
```

### Performance
Events are sent asynchronously and don't block page rendering.

---

## 🎯 Next Steps for Implementation

### Phase 1: Core Events (Immediate)
- [ ] Add `trackArticleView` to article detail pages
- [ ] Add `trackCategoryView` to category pages
- [ ] Add `trackWhatsAppClick` to banner and footer
- [ ] Add `trackTelegramClick` to banner and footer

### Phase 2: Engagement Events (Week 2)
- [ ] Add `trackArticleClick` to all article cards
- [ ] Add `trackSearch` to search functionality
- [ ] Add `trackLoadMoreClick` to pagination

### Phase 3: Conversion Events (Week 3)
- [ ] Add `trackShareArticle` to share buttons
- [ ] Add `trackNewsletterSignup` to email forms
- [ ] Add `trackContactClick` to contact links

---

## 📊 Expected Insights

After implementing these events, you'll be able to answer:

1. **Content Performance:**
   - Which articles drive the most engagement?
   - Which categories are most popular?
   - Do users prefer crypto or stock news?

2. **User Behavior:**
   - How deep do users scroll (pagination clicks)?
   - Do users prefer top or bottom articles?
   - What do users search for?

3. **Community Growth:**
   - Does the banner or footer drive more WhatsApp signups?
   - Which pages convert best for Telegram?
   - What's the overall community conversion rate?

4. **Content Gaps:**
   - What searches return no results?
   - Which categories need more content?
   - What topics are trending in searches?

---

## 🚀 Benefits for Finscann

1. **Data-Driven Decisions:** Know exactly what content works
2. **Optimize Layout:** Place popular content where users click most
3. **Content Strategy:** Write more of what users want
4. **Community Growth:** Optimize signup button placement
5. **SEO Insights:** Understand search intent
6. **Revenue Potential:** Identify high-engagement content for monetization

---

**File:** `src/lib/analytics.ts`
**GA4 Property:** `G-8VSXF40K0E`
**GTM Container:** `GTM-5LNRW9B8`
**Last Updated:** March 5, 2026
