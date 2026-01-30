/**
 * Clean article text by removing unwanted patterns and special characters
 * for display in cards and metadata
 */

// Words/phrases to remove from titles and descriptions
const REMOVAL_PATTERNS = [
  /\b(introduction|synopsis|summary|overview|summury)\b[:\s]*/gi,
  /^[\*\>\<\s]+/g, // Remove leading *, >, < and whitespace
  /[\*\>\<]+$/g, // Remove trailing *, >, <
  /\*\*/g, // Remove markdown bold
  /\*/g, // Remove single asterisks
  /\>{2,}/g, // Remove multiple >
  /\<{2,}/g, // Remove multiple <
]

/**
 * Clean text for display in article cards
 */
export function cleanCardText(text: string): string {
  if (!text) return ''

  let cleaned = text.trim()

  // Apply all removal patterns
  REMOVAL_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, '')
  })

  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()

  // Remove leading/trailing punctuation artifacts
  cleaned = cleaned.replace(/^[:\-\.\,\s]+/, '').replace(/[:\-\s]+$/, '')

  return cleaned
}

/**
 * Clean text for metadata (social sharing, SEO)
 * More aggressive cleaning for optimal display
 */
export function cleanMetadataText(text: string, maxLength: number = 200): string {
  if (!text) return ''

  let cleaned = cleanCardText(text)

  // Additional metadata-specific cleaning
  cleaned = cleaned
    .replace(/\[.*?\]/g, '') // Remove markdown links
    .replace(/\(.*?\)/g, '') // Remove parentheses content if excessive
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\n+/g, ' ') // Convert newlines to spaces
    .trim()

  // Truncate to max length at word boundary
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength)
    const lastSpace = cleaned.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.8) {
      // Only cut at word if we're not losing too much
      cleaned = cleaned.substring(0, lastSpace)
    }
    cleaned = cleaned.trim() + '...'
  }

  return cleaned
}

/**
 * Clean article title specifically
 */
export function cleanArticleTitle(title: string): string {
  if (!title) return ''

  let cleaned = cleanCardText(title)

  // Remove common title prefixes/suffixes
  cleaned = cleaned
    .replace(/^(article|news|update|breaking|exclusive)[:\s]+/gi, '')
    .replace(/\s+(article|news|update)$/gi, '')
    .trim()

  return cleaned
}

/**
 * Extract clean excerpt from article content
 */
export function extractCleanExcerpt(content: string, maxLength: number = 150): string {
  if (!content) return ''

  // Remove all markdown and special formatting
  let excerpt = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to plain text
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Convert newlines to spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Remove introduction/synopsis labels
  REMOVAL_PATTERNS.forEach((pattern) => {
    excerpt = excerpt.replace(pattern, '')
  })

  // Truncate at sentence boundary if possible
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength)
    const lastPeriod = excerpt.lastIndexOf('.')
    const lastExclamation = excerpt.lastIndexOf('!')
    const lastQuestion = excerpt.lastIndexOf('?')
    const lastSentence = Math.max(lastPeriod, lastExclamation, lastQuestion)

    if (lastSentence > maxLength * 0.6) {
      excerpt = excerpt.substring(0, lastSentence + 1)
    } else {
      const lastSpace = excerpt.lastIndexOf(' ')
      if (lastSpace > maxLength * 0.8) {
        excerpt = excerpt.substring(0, lastSpace) + '...'
      } else {
        excerpt = excerpt + '...'
      }
    }
  }

  return excerpt.trim()
}
