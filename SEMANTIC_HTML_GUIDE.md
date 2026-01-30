# 🎨 SEMANTIC HTML & ASSETS GUIDE

## ✅ Semantic HTML Implementation

### What is Semantic HTML?

Semantic HTML uses meaningful HTML5 tags instead of generic `<div>` tags. This helps:
- **Google** understand your content better (better SEO)
- **Screen readers** navigate easily (accessibility)
- **Developers** understand code structure

---

## Component Semantic Structure

### ❌ OLD WAY (Generic divs - BAD for SEO)

```tsx
<div className="article-page">
  <div className="article-header">
    <div className="article-title">Article Title</div>
    <div className="article-date">Jan 29, 2026</div>
    <div className="article-author">John Doe</div>
  </div>

  <div className="article-image">
    <img src="..." />
  </div>

  <div className="article-content">
    <div className="section">
      <div className="section-title">Key Points</div>
      <div className="section-text">Content here...</div>
    </div>
  </div>

  <div className="article-footer">
    <div className="share-buttons">Share</div>
  </div>
</div>
```

**Problems:**
- Google doesn't know what's what
- Screen readers confused
- No structure information
- Bad for SEO

---

### ✅ NEW WAY (Semantic HTML - GOOD for SEO)

```tsx
<article itemScope itemType="https://schema.org/NewsArticle">
  <header>
    <h1 itemProp="headline">Article Title</h1>

    <div className="metadata">
      <time
        dateTime="2026-01-29T14:30:00+05:30"
        itemProp="datePublished"
      >
        Jan 29, 2026
      </time>

      <address itemProp="author" itemScope itemType="https://schema.org/Person">
        <span itemProp="name">John Doe</span>
      </address>
    </div>
  </header>

  <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject">
    <img
      src="..."
      alt="Descriptive alt text"
      itemProp="url"
    />
    <figcaption itemProp="caption">Image description</figcaption>
  </figure>

  <section itemProp="articleBody">
    <h2>Key Points</h2>
    <p>Content here...</p>
  </section>

  <footer>
    <nav aria-label="Share article">
      <button>Share on WhatsApp</button>
      <button>Share on Twitter</button>
    </nav>
  </footer>
</article>
```

**Benefits:**
- ✅ Google knows exactly what each part is
- ✅ Screen readers can navigate properly
- ✅ Better SEO ranking
- ✅ Rich snippets in search results
- ✅ Structured data inline

---

## Semantic Tags We'll Use

### Page Structure Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<article>` | Main article content | Article detail page |
| `<section>` | Content section | Article body, related articles |
| `<header>` | Article/page header | Title, date, author |
| `<footer>` | Article/page footer | Share buttons, copyright |
| `<nav>` | Navigation menu | Header menu, breadcrumbs |
| `<aside>` | Sidebar content | Related articles, ads |
| `<main>` | Main page content | Wraps primary content |

### Content Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<h1>` | Main heading (ONE per page) | Article title |
| `<h2>` | Section heading | "Key Highlights", "Market Analysis" |
| `<h3>` | Subsection heading | "Q1 Results", "Revenue Breakdown" |
| `<p>` | Paragraph | Body text |
| `<time>` | Date/time | Publication date |
| `<address>` | Author info | Author name/email |
| `<figure>` | Image with caption | Article images |
| `<figcaption>` | Image caption | Image description |

### Semantic Attributes (Schema.org)

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `itemScope` | Define schema object | `<article itemScope>` |
| `itemType` | Schema type | `itemType="https://schema.org/NewsArticle"` |
| `itemProp` | Property name | `itemProp="headline"` |
| `dateTime` | ISO 8601 date | `dateTime="2026-01-29T14:30:00+05:30"` |
| `aria-label` | Accessibility label | `aria-label="Share article"` |

---

## Component Examples with Semantic HTML

### 1. ArticleCard Component

```tsx
// src/components/ArticleCard.tsx

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className="card"
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      {/* Image */}
      <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject">
        <img
          src={article.featured_image}
          alt={article.article_title_optimised}
          itemProp="url"
        />
      </figure>

      {/* Header */}
      <header>
        <h2 itemProp="headline">
          <a href={`/articles/${category}/${slug}`}>
            {article.article_title_optimised}
          </a>
        </h2>

        <div className="metadata">
          <time
            dateTime={article.upload_timestamp}
            itemProp="datePublished"
          >
            {formatDate(article.upload_timestamp)}
          </time>

          <span className="category" itemProp="articleSection">
            {article.news_type}
          </span>
        </div>
      </header>

      {/* Summary */}
      <section itemProp="description">
        <p>{article.synopsis}</p>
      </section>
    </article>
  )
}
```

---

### 2. Article Detail Page

```tsx
// src/app/articles/[category]/[slug]/page.tsx

export default function ArticlePage({ article }) {
  return (
    <article
      className="article-detail"
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        <ol>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a href="/" itemProp="item">
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a href="/articles" itemProp="item">
              <span itemProp="name">Articles</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{article.article_title_optimised}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header>
        <h1 itemProp="headline">{article.article_title_optimised}</h1>

        <div className="metadata">
          <time
            dateTime={article.upload_timestamp}
            itemProp="datePublished"
          >
            {formatDate(article.upload_timestamp)}
          </time>

          <time
            dateTime={article.updated_at}
            itemProp="dateModified"
          >
            Updated: {formatDate(article.updated_at)}
          </time>

          <address itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{article.author}</span>
          </address>
        </div>
      </header>

      {/* Featured Image */}
      <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject">
        <img
          src={article.featured_image}
          alt={article.article_title_optimised}
          width="1200"
          height="630"
          itemProp="url"
        />
        <meta itemProp="width" content="1200" />
        <meta itemProp="height" content="630" />
      </figure>

      {/* Synopsis */}
      {article.synopsis && (
        <aside className="synopsis">
          <h2>Synopsis</h2>
          <p>{article.synopsis}</p>
        </aside>
      )}

      {/* Main Content */}
      <section itemProp="articleBody">
        <Markdown content={article.summary} />
      </section>

      {/* Publisher Info (for schema) */}
      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
        <meta itemProp="name" content="Finscann" />
        <meta itemProp="logo" content="https://finscann.com/logo.png" />
      </div>

      {/* Footer with Share Buttons */}
      <footer>
        <nav aria-label="Share article">
          <h3>Share this article</h3>
          <Share url={articleUrl} title={article.article_title_optimised} />
        </nav>
      </footer>

      {/* Related Articles */}
      <aside aria-label="Related articles">
        <h2>Related Articles</h2>
        <ArticleGrid articles={relatedArticles} />
      </aside>
    </article>
  )
}
```

---

### 3. Header Component

```tsx
// src/components/Header.tsx

export function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <a href="/" aria-label="Finscann home">
            <img src="/logo.png" alt="Finscann" width="150" height="40" />
          </a>
        </div>

        {/* Navigation */}
        <nav className="main-nav" role="navigation" aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/articles">Articles</a></li>
            <li>
              <button aria-haspopup="true" aria-expanded="false">
                Categories
              </button>
              <ul role="menu">
                <li role="menuitem"><a href="/category/stock">Stock</a></li>
                <li role="menuitem"><a href="/category/market">Market</a></li>
                <li role="menuitem"><a href="/category/ipo">IPO</a></li>
              </ul>
            </li>
            <li><a href="/search">Search</a></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          aria-label="Toggle mobile menu"
          aria-expanded="false"
        >
          Menu
        </button>
      </div>
    </header>
  )
}
```

---

### 4. Footer Component

```tsx
// src/components/Footer.tsx

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* About */}
        <section aria-labelledby="about-heading">
          <h2 id="about-heading">About Finscann</h2>
          <p>Real-time financial news and market insights.</p>
        </section>

        {/* Quick Links */}
        <nav aria-label="Footer navigation">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </nav>

        {/* Social Media */}
        <nav aria-label="Social media">
          <h2>Follow Us</h2>
          <ul>
            <li>
              <a href="https://twitter.com/finscann" aria-label="Follow us on Twitter">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://facebook.com/finscann" aria-label="Follow us on Facebook">
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Finscann. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

---

## ✅ All Assets Copied

### Public Folder Contents:

```
new-news-react/public/
├── favicon.ico                 # Browser tab icon
├── favicon-16x16.png          # Small favicon
├── favicon-32x32.png          # Medium favicon
├── apple-touch-icon.png       # iOS home screen icon
├── logo.png                   # Main logo
├── finscannlogo.png           # Brand logo
├── finscannlogo-dark.png      # Dark mode logo
├── og-image.png               # Social share image
├── manifest.json              # PWA manifest
├── robots.txt                 # SEO crawler rules
├── ads.txt                    # AdSense verification
├── ai.txt                     # AI crawler config
│
└── images/                    # Default category images (22 images)
    ├── general-news.png       # Default fallback
    ├── Earnings_results.png
    ├── revenue-growth.png
    ├── Dividend_Announcement.png
    ├── Ipo-launch.png
    ├── merger_Acquisition.png
    ├── stock-spilit.png
    ├── bonus_issue.png
    ├── rights_issue.png
    ├── credit-ranking.png
    ├── Debt_Restructuring.png
    ├── management-Change.png
    ├── Partnership-deal.png
    ├── Market_expansion.png
    ├── new_product_launch.png
    ├── new-plant-launch.png
    ├── order-win.png
    ├── regulatory_warning.png
    ├── court-case.png
    ├── share-buyback.png
    ├── profit-warning.png
    └── README.md
```

### Image Mapping Reference:

These images are used as fallbacks when articles don't have uploaded images. They map to article tags:

| Tag | Image File | Use Case |
|-----|-----------|----------|
| `earnings-results` | Earnings_results.png | Quarterly results |
| `revenue-growth` | revenue-growth.png | Revenue increase |
| `dividend-announcement` | Dividend_Announcement.png | Dividend declared |
| `ipo-launch` | Ipo-launch.png | IPO news |
| `merger-acquisition` | merger_Acquisition.png | M&A deals |
| `stock-split` | stock-spilit.png | Stock splits |
| `bonus-issue` | bonus_issue.png | Bonus shares |
| `rights-issue` | rights_issue.png | Rights offering |
| `credit-rating` | credit-ranking.png | Rating changes |
| `debt-restructuring` | Debt_Restructuring.png | Debt updates |
| `management-change` | management-Change.png | Leadership changes |
| `partnership-deal` | Partnership-deal.png | Partnerships |
| `market-expansion` | Market_expansion.png | Market growth |
| `new-product-launch` | new_product_launch.png | Product launches |
| `new-plant-launch` | new-plant-launch.png | Factory openings |
| `order-win` | order-win.png | Contract wins |
| `regulatory-warning` | regulatory_warning.png | Regulatory issues |
| `court-case` | court-case.png | Legal matters |
| `share-buyback` | share-buyback.png | Buyback programs |
| `profit-warning` | profit-warning.png | Profit warnings |
| **default** | general-news.png | All other news |

---

## Accessibility (ARIA) Labels

### When to Use ARIA:

```tsx
// Navigation
<nav aria-label="Main navigation">
<nav aria-label="Breadcrumb">
<nav aria-label="Social media">

// Interactive elements
<button aria-label="Toggle mobile menu">
<button aria-label="Close dialog">
<button aria-expanded="false" aria-haspopup="true">

// Sections
<section aria-labelledby="section-heading">
<aside aria-label="Related articles">

// Live regions (for dynamic content)
<div role="status" aria-live="polite">
<div role="alert" aria-live="assertive">
```

---

## SEO Benefits Summary

### With Semantic HTML:

1. **Rich Snippets** in Google search:
   - Article title
   - Publication date
   - Author name
   - Featured image
   - Star ratings (if reviews)

2. **Better Rankings**:
   - Google understands content structure
   - Content categorization is clear
   - Better indexing speed

3. **Accessibility**:
   - Screen readers work properly
   - Keyboard navigation works
   - Better for disabled users

4. **Mobile-Friendly**:
   - Semantic HTML works better on mobile
   - Voice assistants understand it better

---

## Testing Semantic HTML

### Tools to Use:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test individual article URLs

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Validates JSON-LD and microdata

3. **Lighthouse (Chrome DevTools)**
   - Check Accessibility score
   - Check SEO score

4. **WAVE (Web Accessibility Evaluation Tool)**
   - URL: https://wave.webaim.org/
   - Check accessibility issues

---

## Implementation Checklist

### Phase 1: Components
- [ ] ArticleCard with semantic tags
- [ ] Article detail page with semantic tags
- [ ] Header with proper nav structure
- [ ] Footer with proper structure

### Phase 2: Schema Markup
- [ ] Add itemScope/itemType to articles
- [ ] Add itemProp to all relevant fields
- [ ] Add JSON-LD structured data
- [ ] Add breadcrumb schema

### Phase 3: Accessibility
- [ ] Add ARIA labels to navigation
- [ ] Add ARIA labels to buttons
- [ ] Test with screen reader
- [ ] Test keyboard navigation

### Phase 4: Testing
- [ ] Run Lighthouse audit (90+ SEO score)
- [ ] Test with Google Rich Results
- [ ] Validate schema markup
- [ ] Test on real devices

---

## Summary

✅ **All assets copied** (logos, icons, default images)
✅ **Semantic HTML planned** (article, section, header, footer, nav)
✅ **Schema.org microdata** (itemScope, itemProp)
✅ **Accessibility** (ARIA labels, roles)
✅ **SEO optimized** (proper heading hierarchy, meta tags)

This will give you **MUCH better SEO** than the old version! 🚀
