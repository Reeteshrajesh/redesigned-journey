import { SITE_URL } from '@/lib/config'

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Finscann',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/finscannlogo.png`,
      width: 600,
      height: 60,
    },
    description:
      'Real-time financial news, stock market updates, IPO alerts & investment insights. Stay ahead with Finscann.',
    foundingDate: '2024',
    sameAs: [
      'https://x.com/finscann',
      'https://www.linkedin.com/company/finscann',
      'https://t.me/+UkWVI7tLj743NTI1',
      'https://chat.whatsapp.com/E7ilDaGA4yr1wKTYFOQ63q',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '',
        contactType: 'Customer Service',
        email: 'contact@finscann.com',
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'India',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Finscann',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Finscann',
    url: SITE_URL,
    description:
      'Real-time financial news, stock market updates, IPO alerts & investment insights.',
    publisher: {
      '@type': 'Organization',
      name: 'Finscann',
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
