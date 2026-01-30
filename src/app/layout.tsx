import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoogleTagManager, { GTMNoScript } from '@/components/GoogleTagManager'
import OrganizationSchema from '@/components/OrganizationSchema'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://finscann.com'),
  title: 'Finscann - Real-Time Financial News & Market Insights',
  description:
    'Real-time financial news, stock market updates, IPO alerts & investment insights. Stay ahead with Finscann.',
  keywords:
    'financial news, stock market, IPO news, market analysis, investment insights, Finscann, real-time market updates',
  authors: [{ name: 'Finscann' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://finscann.com',
    siteName: 'Finscann',
    title: 'Finscann - Real-Time Financial News & Market Insights',
    description:
      'Real-time financial news, stock market updates, IPO alerts & investment insights. Stay ahead with Finscann.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finscann',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finscann - Real-Time Financial News',
    description:
      'Real-time financial news, stock market updates, IPO alerts & investment insights.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://api.lqtisttist.shop" />
        <link rel="preconnect" href="https://finscann-images.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://api.lqtisttist.shop" />
        <link rel="dns-prefetch" href="https://finscann-images.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <GoogleAnalytics />
        <GoogleTagManager />
        <OrganizationSchema />
      </head>
      <body className="flex flex-col min-h-screen">
        <GTMNoScript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
