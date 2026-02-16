# Backend SEO Tasks - Finscann.com

## 🔴 CRITICAL PRIORITY (Do Immediately)

### 1. Thin AI Content Audit & Cleanup

**Problem**: 2,659 pages are "Crawled - currently not indexed" by Google. This indicates low-quality or duplicate AI-generated content.

**Database Query Needed**:
```sql
-- Find articles with zero or very low traffic after 6 months
SELECT
    id,
    article_title_optimised,
    news_type,
    created_at,
    COALESCE(page_views, 0) as views,
    COALESCE(impressions, 0) as impressions
FROM articles
WHERE created_at < NOW() - INTERVAL 6 MONTH
  AND (page_views IS NULL OR page_views < 10)
ORDER BY created_at DESC;

-- Find duplicate or very similar titles (potential thin content)
SELECT
    article_title_optimised,
    COUNT(*) as count
FROM articles
GROUP BY article_title_optimised
HAVING count > 1;

-- Find very short articles (potential thin content)
SELECT
    id,
    article_title_optimised,
    LENGTH(summary) as summary_length,
    created_at
FROM articles
WHERE LENGTH(summary) < 200
ORDER BY created_at DESC;
```

**Actions Required**:
1. Export list of low-performing articles
2. Either DELETE or MERGE similar articles
3. For kept articles, enhance with:
   - Unique market data/charts
   - Expert commentary
   - Updated information
   - Original analysis

**Expected Result**: Reduce total indexed pages by 30-50%, keeping only high-quality content

---

### 2. Fix 5xx Server Errors

**Problem**: API server errors causing Google to throttle crawling.

**Monitoring Needed**:
```bash
# Check API response times
# Target: < 500ms for all endpoints

# Monitor these endpoints:
GET /api/news
GET /api/news?limit=100
GET /api/news?category=stock-related
GET /api/market
```

**Error Logging Setup**:
```javascript
// Add to API error handler
app.use((err, req, res, next) => {
  // Log 5xx errors to monitoring service
  if (res.statusCode >= 500) {
    logger.error({
      statusCode: res.statusCode,
      endpoint: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
      error: err.message,
      stack: err.stack
    });
  }
  next(err);
});
```

**Actions Required**:
1. Set up error monitoring (Sentry, LogRocket, or similar)
2. Add API response time tracking
3. Implement rate limiting to prevent overload
4. Add database connection pooling if not already configured
5. Cache frequently accessed data (market data, popular articles)

---

### 3. Filter Deleted/Unpublished Articles from API

**Problem**: sitemap-articles.xml might include deleted or draft articles, causing 404 errors.

**API Filter Needed**:
```javascript
// Update /api/news endpoint
app.get('/api/news', async (req, res) => {
  const articles = await db.query(`
    SELECT * FROM articles
    WHERE status = 'published'  -- Only published
      AND deleted_at IS NULL    -- Not soft-deleted
      AND article_title_optimised IS NOT NULL  -- Has valid title
      AND featured_image IS NOT NULL  -- Has image
    ORDER BY created_at DESC
    LIMIT ?
  `, [limit]);

  res.json({ success: true, data: articles });
});
```

**Actions Required**:
1. Add `status` field filter (only 'published')
2. Exclude soft-deleted records
3. Ensure all required fields are present (title, image, etc.)
4. Return 404 for deleted article slugs instead of empty response

---

### 4. Identify and Fix 404 URLs

**Problem**: 92 pages returning 404 errors according to Google Search Console.

**Steps Required**:
1. Export list of 404 URLs from Google Search Console
2. Check database for these article IDs
3. For each 404:
   - If article exists but URL changed: Add 301 redirect
   - If article deleted: Redirect to relevant category page
   - If never existed: Remove from any sitemaps

**Database Check**:
```sql
-- Check if article exists by slug
SELECT id, article_title_optimised, status, deleted_at
FROM articles
WHERE article_title_optimised LIKE '%{slug_from_404}%';

-- Find articles that changed category
SELECT
    id,
    article_title_optimised,
    news_type,
    updated_at
FROM articles
WHERE updated_at > created_at
  AND news_type != original_news_type;
```

---

## 🟡 MEDIUM PRIORITY

### 5. Implement Google Indexing API

**Problem**: Financial news needs instant indexing, not 24-hour wait.

**Implementation**:
```javascript
// After publishing new article
const { google } = require('googleapis');

async function notifyGoogleIndexing(url) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/indexing']
  });

  const indexing = google.indexing({ version: 'v3', auth });

  await indexing.urlNotifications.publish({
    requestBody: {
      url: url,
      type: 'URL_UPDATED'
    }
  });
}

// Call after article publish
app.post('/api/articles/publish', async (req, res) => {
  const article = await publishArticle(req.body);
  const articleUrl = `https://finscann.com/articles/${category}/${slug}`;

  // Notify Google immediately
  await notifyGoogleIndexing(articleUrl);

  res.json({ success: true, article });
});
```

**Setup Required**:
1. Create Google Cloud Service Account
2. Enable Indexing API in Google Cloud Console
3. Download service account JSON key
4. Call API after every new article publish

---

### 6. Add Page View Tracking

**Problem**: Can't identify which articles are performing well vs. poorly.

**Database Schema Addition**:
```sql
ALTER TABLE articles
ADD COLUMN page_views INT DEFAULT 0,
ADD COLUMN impressions INT DEFAULT 0,
ADD COLUMN clicks INT DEFAULT 0,
ADD COLUMN last_viewed_at TIMESTAMP NULL;

-- Create analytics table for detailed tracking
CREATE TABLE article_analytics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  article_id INT NOT NULL,
  date DATE NOT NULL,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  avg_time_on_page INT DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  source VARCHAR(50),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  UNIQUE KEY unique_article_date (article_id, date)
);
```

**Tracking Implementation**:
```javascript
// Track page view
app.post('/api/analytics/pageview', async (req, res) => {
  const { articleId } = req.body;

  await db.query(`
    UPDATE articles
    SET page_views = page_views + 1,
        last_viewed_at = NOW()
    WHERE id = ?
  `, [articleId]);

  res.json({ success: true });
});
```

---

### 7. Content Quality Scoring System

**Problem**: Need automated way to identify thin content.

**Scoring Algorithm**:
```javascript
function calculateContentQualityScore(article) {
  let score = 0;

  // Length score (0-25 points)
  const summaryLength = article.summary?.length || 0;
  if (summaryLength > 500) score += 25;
  else if (summaryLength > 300) score += 15;
  else if (summaryLength > 150) score += 5;

  // Unique data score (0-25 points)
  if (article.nse_code) score += 10;
  if (article.company_name) score += 5;
  if (article.featured_image) score += 10;

  // Engagement score (0-25 points)
  if (article.page_views > 100) score += 25;
  else if (article.page_views > 50) score += 15;
  else if (article.page_views > 10) score += 5;

  // Freshness score (0-25 points)
  const daysSincePublish = (Date.now() - new Date(article.created_at)) / (1000 * 60 * 60 * 24);
  if (daysSincePublish < 7) score += 25;
  else if (daysSincePublish < 30) score += 15;
  else if (daysSincePublish < 90) score += 5;

  return score; // Total: 0-100
}

// Flag low-quality articles
const lowQualityArticles = articles.filter(a =>
  calculateContentQualityScore(a) < 40
);
```

**Database Update**:
```sql
ALTER TABLE articles ADD COLUMN quality_score INT DEFAULT 0;

-- Regularly update quality scores
UPDATE articles
SET quality_score = /* run scoring algorithm */
WHERE status = 'published';
```

---

## 🟢 LOW PRIORITY (Future Improvements)

### 8. Implement Article Versioning

Track content updates to show Google the article was enhanced, not just republished.

```sql
CREATE TABLE article_versions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  article_id INT NOT NULL,
  version INT NOT NULL,
  content_hash VARCHAR(64),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_type ENUM('minor', 'major', 'correction'),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);
```

---

### 9. Add Author Management System

**Database Schema**:
```sql
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  credentials TEXT,
  profile_image VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_handle VARCHAR(100),
  expertise JSON, -- ["Stock Market", "IPO Analysis", etc.]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE articles
ADD COLUMN author_id INT,
ADD FOREIGN KEY (author_id) REFERENCES authors(id);
```

**Default Authors to Create**:
1. "Finscann Editorial Team" - General news
2. "Market Analyst" - Market analysis
3. "IPO Expert" - IPO coverage
4. "Crypto Specialist" - Crypto news

---

### 10. Internal Linking Automation

**Problem**: Poor internal linking contributes to "discovered - not indexed" status.

**Algorithm**:
```javascript
// When publishing article, automatically link to related articles
async function addInternalLinks(article) {
  // Find related articles by:
  // 1. Same category
  // 2. Same company/stock symbol
  // 3. Related tags

  const relatedArticles = await db.query(`
    SELECT id, article_title_optimised, news_type
    FROM articles
    WHERE (
      news_type = ? OR
      company_name = ? OR
      JSON_CONTAINS(related_tags, ?)
    )
    AND id != ?
    AND status = 'published'
    ORDER BY created_at DESC
    LIMIT 5
  `, [article.news_type, article.company_name, article.related_tags, article.id]);

  return relatedArticles;
}
```

---

## 📊 Success Metrics

Track these metrics weekly to measure improvement:

1. **Indexed Pages**: Target 70%+ of submitted URLs indexed
2. **Crawl Budget**: Reduce "Crawled - not indexed" from 2,659 to <500
3. **404 Errors**: Reduce from 92 to 0
4. **5xx Errors**: Maintain 0 server errors
5. **Average Response Time**: Keep <500ms for all API endpoints
6. **Content Quality Score**: 70%+ of articles scoring >60/100
7. **Page Views per Article**: Average >50 views in first 30 days

---

## 🔧 Tools & Resources Needed

1. **Monitoring**: Sentry, New Relic, or DataDog
2. **Database**: MySQL/PostgreSQL with proper indexing
3. **Caching**: Redis for frequently accessed data
4. **CDN**: Cloudflare or similar for static assets
5. **Google Cloud**: Service account for Indexing API
6. **Analytics**: Integration with Google Analytics 4

---

## 📝 Deliverables to Frontend Team

Once backend fixes are complete, provide:

1. **404 List**: CSV of all broken URLs with redirect mappings
2. **Author Data**: JSON of all authors with bios/credentials
3. **Quality Report**: List of articles flagged for enhancement
4. **API Documentation**: Updated endpoints with new filters
5. **Performance Report**: API response times and error rates

---

## ⏰ Timeline Estimate

| Task | Time Required | Dependencies |
|------|---------------|--------------|
| 5xx Error Monitoring | 1-2 days | DevOps setup |
| API Filtering (404s) | 1 day | None |
| Thin Content Audit | 2-3 days | Database queries |
| Google Indexing API | 2-3 days | Google Cloud account |
| Page View Tracking | 1-2 days | Database migration |
| Author System | 3-4 days | Schema design |
| Content Scoring | 2-3 days | Algorithm development |

**Total Estimated Time**: 2-3 weeks for critical tasks

---

## 📞 Questions for Backend Team

1. Do we have database backups before deleting thin content?
2. What's current API response time? (Need baseline)
3. Do we have soft-delete (deleted_at) or hard delete?
4. Is there a staging environment for testing?
5. What monitoring tools are currently in use?
6. Who has access to Google Search Console for 404 export?
7. What's the current database size and growth rate?

---

**Last Updated**: 2026-02-16
**Prepared By**: SEO Technical Audit
**Priority**: Critical for Google News approval and YMYL compliance
