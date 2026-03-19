import { SITE_URL } from '@/lib/config'

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'welomoney',
    alternateName: 'welomoney News',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/finscannlogo.png`,
      width: 512,
      height: 512,
      caption: 'welomoney - Real-Time Financial News'
    },
    description:
      'welomoney is a trusted source for real-time financial news, stock market updates, IPO alerts, cryptocurrency insights, and investment analysis. We deliver timely, accurate financial information to help you stay ahead in the markets.',
    foundingDate: '2024',
    slogan: 'Real-Time Financial News & Market Insights',
    keywords: 'financial news, stock market, IPO news, crypto news, market analysis, investment insights',
    sameAs: [
      'https://x.com/finscann',
      'https://www.linkedin.com/company/finscann',
      'https://t.me/+UkWVI7tLj743NTI1',
      'https://chat.whatsapp.com/E7ilDaGA4yr1wKTYFOQ63q',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'welomoney@gmail.com',
        availableLanguage: ['English', 'en-US'],
        areaServed: ['IN', 'US', 'GB', 'Worldwide'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'India',
    },
    // E-E-A-T Signals
    knowsAbout: [
      'Financial News',
      'Stock Market Analysis',
      'IPO Updates',
      'Cryptocurrency News',
      'Market Trends',
      'Investment Insights',
      'Economic Analysis'
    ],
    // Publishing principles for transparency
    publishingPrinciples: `${SITE_URL}/about-us`,
    correctionsPolicy: `${SITE_URL}/disclaimer`,
    // Diversity and inclusion statement
    diversityPolicy: `${SITE_URL}/about-us`,
    // Ethics policy
    ethicsPolicy: `${SITE_URL}/disclaimer`,
    // Mission statement
    missionCoveragePrioritiesPolicy: 'To democratize access to financial information by making it easier for everyone to understand what\'s happening in financial markets.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'welomoney',
    url: SITE_URL,
    description:
      'Real-time financial news, stock market updates, IPO alerts & investment insights.',
    publisher: {
      '@type': 'Organization',
      name: 'welomoney',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/finscannlogo.png`,
        width: 600,
        height: 60,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* WebSite Schema with Sitelinks Search Box */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
