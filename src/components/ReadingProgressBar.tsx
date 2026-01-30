'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      const totalScroll = documentHeight - windowHeight
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0

      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Update on resize
    window.addEventListener('resize', updateProgress, { passive: true })

    // Initial calculation
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 transition-all duration-150 ease-out shadow-lg"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
