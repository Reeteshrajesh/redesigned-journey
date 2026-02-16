import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'

interface AuthorBioProps {
  author?: string
  source?: string
}

export default function AuthorBio({ author, source }: AuthorBioProps) {
  // Default to Finscann Team if no author specified
  const authorName = author || source || 'Finscann Editorial Team'

  // Author profiles with E-E-A-T signals
  const authorProfiles: Record<string, {
    name: string
    bio: string
    credentials: string
    image?: string
    linkedin?: string
    twitter?: string
    isAI?: boolean
  }> = {
    'Finscann Editorial Team': {
      name: 'Finscann Editorial Team',
      bio: 'Our team of financial journalists and market analysts brings you real-time news and expert insights on stocks, IPOs, crypto, and commodities.',
      credentials: 'Experienced financial journalists with backgrounds in economics, business journalism, and market analysis',
      image: '/finscannlogo.png',
      linkedin: 'https://www.linkedin.com/company/finscann',
      twitter: 'https://x.com/finscann',
      isAI: false,
    },
    'Finscann Team': {
      name: 'Finscann Editorial Team',
      bio: 'Our team of financial journalists and market analysts brings you real-time news and expert insights on stocks, IPOs, crypto, and commodities.',
      credentials: 'Experienced financial journalists with backgrounds in economics, business journalism, and market analysis',
      image: '/finscannlogo.png',
      linkedin: 'https://www.linkedin.com/company/finscann',
      twitter: 'https://x.com/finscann',
      isAI: false,
    },
    'Finscann AI': {
      name: 'Finscann AI',
      bio: 'Our AI-powered intelligence system analyzes real-time financial data and market trends to generate timely news articles. All AI-generated content is reviewed by our editorial team for accuracy.',
      credentials: 'AI-powered financial news generation system with human editorial oversight',
      image: '/finscannlogo.png',
      linkedin: 'https://www.linkedin.com/company/finscann',
      twitter: 'https://x.com/finscann',
      isAI: true,
    },
  }

  // Get author profile, fallback to Finscann Team
  const profile = authorProfiles[authorName] || authorProfiles['Finscann Editorial Team']

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
      <div className="flex items-start gap-5">
        {/* Author Image - Logo Only */}
        <div className="flex-shrink-0">
          {profile.image ? (
            <div className="w-20 h-20 rounded-full bg-white border-2 border-blue-600 p-2 flex items-center justify-center shadow-md">
              <Image
                src={profile.image}
                alt={profile.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {profile.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            {/* Social Links */}
            <div className="flex gap-3">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors hover:scale-110 transform"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors hover:scale-110 transform"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Author Bio */}
          <p className="text-gray-700 text-base leading-relaxed mb-4">{profile.bio}</p>

          {/* AI Disclosure Badge (if applicable) */}
          {profile.isAI && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <span className="text-purple-600 text-sm">🤖</span>
              <p className="text-sm text-purple-900">
                <span className="font-semibold">AI-Generated Content:</span> This article was created using AI technology and reviewed by our editorial team for accuracy and quality.
              </p>
            </div>
          )}

          {/* Author Credentials (E-E-A-T Signal) */}
          <div className="bg-white border-l-4 border-blue-600 p-4 rounded-r-lg shadow-sm">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-blue-600">Credentials: </span>
              <span className="text-gray-600">{profile.credentials}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Author Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            description: profile.bio,
            jobTitle: 'Financial Journalist',
            worksFor: {
              '@type': 'Organization',
              name: 'Finscann',
            },
            ...(profile.linkedin && { sameAs: [profile.linkedin] }),
            ...(profile.twitter && { sameAs: [profile.twitter] }),
          }),
        }}
      />
    </div>
  )
}
