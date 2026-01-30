/**
 * Convert a date string to a human-readable "time ago" format
 * Examples: "2 minutes ago", "3 hours ago", "5 days ago"
 */
export function timeAgo(dateString: string): string {
  const now = new Date()
  const past = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now'
  }

  // Less than an hour (minutes)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`
  }

  // Less than a day (hours)
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`
  }

  // Less than a week (days)
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
  }

  // Less than a month (weeks)
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`
  }

  // Less than a year (months)
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`
  }

  // Years
  const diffInYears = Math.floor(diffInDays / 365)
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`
}

/**
 * Get a more detailed time ago with exact timestamp on hover
 * Returns an object with display text and full date for title attribute
 */
export function timeAgoWithTooltip(dateString: string): {
  display: string
  tooltip: string
} {
  return {
    display: timeAgo(dateString),
    tooltip: new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }),
  }
}
