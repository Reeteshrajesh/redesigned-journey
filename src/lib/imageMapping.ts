// S3 Base URL for default images
const S3_DEFAULT_IMAGES_URL = 'https://finscann-images.s3.ap-south-1.amazonaws.com/default-images'

interface ImageMapping {
  tag: string
  image: string
}

const tagImageMappings: ImageMapping[] = [
  { tag: 'earnings-results', image: `${S3_DEFAULT_IMAGES_URL}/Earnings_results.png` },
  { tag: 'revenue-growth', image: `${S3_DEFAULT_IMAGES_URL}/revenue-growth.png` },
  { tag: 'profit-warning', image: `${S3_DEFAULT_IMAGES_URL}/profit-warning.png` },
  { tag: 'dividend-announcement', image: `${S3_DEFAULT_IMAGES_URL}/Dividend_Announcement.png` },
  { tag: 'share-buyback', image: `${S3_DEFAULT_IMAGES_URL}/share-buyback.png` },
  { tag: 'order-win', image: `${S3_DEFAULT_IMAGES_URL}/order-win.png` },
  { tag: 'new-product-launch', image: `${S3_DEFAULT_IMAGES_URL}/new_product_launch.png` },
  { tag: 'new-plant-launch', image: `${S3_DEFAULT_IMAGES_URL}/new-plant-launch.png` },
  { tag: 'regulatory-warning', image: `${S3_DEFAULT_IMAGES_URL}/regulatory_warning.png` },
  { tag: 'court-case', image: `${S3_DEFAULT_IMAGES_URL}/court-case.png` },
  { tag: 'merger-acquisition', image: `${S3_DEFAULT_IMAGES_URL}/merger_Acquisition.png` },
  { tag: 'ipo-launch', image: `${S3_DEFAULT_IMAGES_URL}/Ipo-launch.png` },
  { tag: 'stock-split', image: `${S3_DEFAULT_IMAGES_URL}/stock-spilit.png` },
  { tag: 'bonus-issue', image: `${S3_DEFAULT_IMAGES_URL}/bonus_issue.png` },
  { tag: 'rights-issue', image: `${S3_DEFAULT_IMAGES_URL}/rights_issue.png` },
  { tag: 'credit-rating', image: `${S3_DEFAULT_IMAGES_URL}/credit-ranking.png` },
  { tag: 'debt-restructuring', image: `${S3_DEFAULT_IMAGES_URL}/Debt_Restructuring.png` },
  { tag: 'management-change', image: `${S3_DEFAULT_IMAGES_URL}/management-Change.png` },
  { tag: 'partnership-deal', image: `${S3_DEFAULT_IMAGES_URL}/Partnership-deal.png` },
  { tag: 'market-expansion', image: `${S3_DEFAULT_IMAGES_URL}/Market_expansion.png` },
  { tag: 'general-news', image: `${S3_DEFAULT_IMAGES_URL}/general-news.png` },
]

// Keyword to tag mapping for intelligent fallback
const keywordMappings: { [key: string]: string } = {
  earnings: 'earnings-results',
  profit: 'earnings-results',
  revenue: 'revenue-growth',
  sales: 'revenue-growth',
  dividend: 'dividend-announcement',
  buyback: 'share-buyback',
  repurchase: 'share-buyback',
  ipo: 'ipo-launch',
  listing: 'ipo-launch',
  merger: 'merger-acquisition',
  acquisition: 'merger-acquisition',
  partnership: 'partnership-deal',
  expansion: 'market-expansion',
  launch: 'new-product-launch',
  product: 'new-product-launch',
  plant: 'new-plant-launch',
  facility: 'new-plant-launch',
  warning: 'profit-warning',
  regulatory: 'regulatory-warning',
  court: 'court-case',
  legal: 'court-case',
  split: 'stock-split',
  bonus: 'bonus-issue',
  rights: 'rights-issue',
  credit: 'credit-rating',
  rating: 'credit-rating',
  debt: 'debt-restructuring',
  restructuring: 'debt-restructuring',
  management: 'management-change',
  ceo: 'management-change',
  order: 'order-win',
  contract: 'order-win',
}

// Get image by tag
function getImageByTag(tag: string): string | null {
  const normalizedTag = tag.toLowerCase().trim()
  const mapping = tagImageMappings.find(
    (m) =>
      m.tag === normalizedTag ||
      m.tag.replace('-', '_') === normalizedTag ||
      m.tag.replace('_', '-') === normalizedTag
  )
  return mapping?.image || null
}

// Get default image mapping
export function getDefaultImageMapping(): string {
  return `${S3_DEFAULT_IMAGES_URL}/general-news.png`
}

// Get diverse image based on article ID for variety
export function getDiverseImageMapping(articleId: number): string {
  const availableMappings = [
    'earnings-results',
    'revenue-growth',
    'dividend-announcement',
    'market-expansion',
    'partnership-deal',
    'new-product-launch',
    'ipo-launch',
    'merger-acquisition',
    'order-win',
    'management-change',
    'general-news',
  ]

  const index = articleId % availableMappings.length
  const selectedTag = availableMappings[index]

  return getImageByTag(selectedTag) || getDefaultImageMapping()
}

// Main function: Get image mapping by related tags
export function getImageMappingByRelatedTags(relatedTags: string, articleId?: number): string {
  if (!relatedTags) {
    return getDiverseImageMapping(articleId || 0)
  }

  const tags = relatedTags
    .toLowerCase()
    .split(/[,;|\s]+/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  // Try exact tag matches
  for (const tag of tags) {
    const image = getImageByTag(tag)
    if (image) return image
  }

  // Try keyword matches
  for (const tag of tags) {
    for (const [keyword, mappingTag] of Object.entries(keywordMappings)) {
      if (tag.includes(keyword)) {
        const image = getImageByTag(mappingTag)
        if (image) return image
      }
    }
  }

  // Use diverse mapping for variety
  return getDiverseImageMapping(articleId || 0)
}

// Get best image URL for an article
export function getBestImageUrl(article: {
  image_data?: {
    sizes?: {
      large?: string
      medium?: string
      thumb?: string
    }
    original?: string
  }
  featured_image?: string
  related_tags?: string
  id?: number
}): string {
  // Priority 1: Use responsive image_data if available
  if (article.image_data?.sizes) {
    const { large, medium, thumb } = article.image_data.sizes
    if (large) return large
    if (medium) return medium
    if (thumb) return thumb
  }

  // Priority 2: Use image_data.original
  if (article.image_data?.original) {
    return article.image_data.original
  }

  // Priority 3: Use featured_image if it's a full URL
  if (article.featured_image && article.featured_image.startsWith('http')) {
    return article.featured_image
  }

  // Priority 4: Use featured_image with S3 prefix
  if (article.featured_image && article.featured_image.trim() !== '') {
    return `https://finscann-images.s3.ap-south-1.amazonaws.com/${article.featured_image}`
  }

  // Priority 5: Fallback to tag-based default image
  return getImageMappingByRelatedTags(article.related_tags || '', article.id || 0)
}
