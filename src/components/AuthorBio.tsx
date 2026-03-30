import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

interface AuthorBioProps {
  author?: string;
  source?: string;
}

export default function AuthorBio({ author, source }: AuthorBioProps) {
  // Default to welomoney Team if no author specified
  const authorName = author || source || "welomoney Editorial Team";

  // Author profiles with E-E-A-T signals
  const authorProfiles: Record<
    string,
    {
      name: string;
      bio: string;
      credentials: string;
      expertise?: string[];
      image?: string;
      linkedin?: string;
      twitter?: string;
      isAI?: boolean;
    }
  > = {
    "welomoney Editorial Team": {
      name: "welomoney Editorial Team",
      bio: "Our team of financial journalists and market analysts brings you real-time news and expert insights on stocks, IPOs, crypto, and commodities with over 15 years of combined experience in financial markets.",
      credentials:
        "Professional financial journalists with degrees in Economics, Business Journalism, and Market Analysis. Published in leading financial publications.",
      expertise: [
        "Stock Market Analysis",
        "IPO Research",
        "Crypto & Blockchain",
        "Commodities Trading",
        "Economic Policy",
      ],
      image: "/finscannlogo.png",
      linkedin: "https://in.linkedin.com/company/welomoney",
      twitter: "https://x.com/finscann",
      isAI: false,
    },
    "welomoney Team": {
      name: "welomoney Editorial Team",
      bio: "Our team of financial journalists and market analysts brings you real-time news and expert insights on stocks, IPOs, crypto, and commodities with over 15 years of combined experience in financial markets.",
      credentials:
        "Professional financial journalists with degrees in Economics, Business Journalism, and Market Analysis. Published in leading financial publications.",
      expertise: [
        "Stock Market Analysis",
        "IPO Research",
        "Crypto & Blockchain",
        "Commodities Trading",
        "Economic Policy",
      ],
      image: "/finscannlogo.png",
      linkedin: "https://in.linkedin.com/company/welomoney",
      twitter: "https://x.com/finscann",
      isAI: false,
    },
    "welomoney AI": {
      name: "welomoney AI",
      bio: "Our AI-powered intelligence system analyzes real-time financial data and market trends to generate timely news articles. All AI-generated content is reviewed by our editorial team for accuracy and quality before publication.",
      credentials:
        "Advanced AI system with human editorial oversight by certified financial journalists and market analysts",
      expertise: [
        "Real-time Data Analysis",
        "Pattern Recognition",
        "Market Sentiment",
        "Automated Reporting",
      ],
      image: "/finscannlogo.png",
      linkedin: "https://in.linkedin.com/company/welomoney",
      twitter: "https://x.com/finscann",
      isAI: true,
    },
  };

  // Get author profile, fallback to welomoney Team for predefined profiles
  const profile = authorProfiles[authorName] || {
    name: authorName, // Use actual author name
    bio: "Financial journalist specializing in market analysis, stock research, and investment trends. Dedicated to providing accurate, timely insights for informed decision-making.",
    credentials:
      "Experienced financial journalist with expertise in equity markets and economic analysis",
    expertise: ["Financial Markets", "Stock Analysis", "Investment Research"],
    image: "/finscannlogo.png",
    linkedin: "https://in.linkedin.com/company/welomoney",
    twitter: "https://x.com/finscann",
    isAI: false,
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
      {/* Author Title */}
      <div className="mb-4 pb-3 border-b border-gray-300">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          About the Author
        </h2>
      </div>

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
                unoptimized
                priority
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
            <h3 className="text-xl font-bold text-gray-900">{authorName}</h3>
            {/* Social Links */}
            <div className="flex gap-3">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer author"
                  className="text-blue-600 hover:text-blue-700 transition-colors hover:scale-110 transform"
                  aria-label={`${profile.name} LinkedIn Profile`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer author"
                  className="text-blue-400 hover:text-blue-500 transition-colors hover:scale-110 transform"
                  aria-label={`${profile.name} Twitter Profile`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Author Bio */}
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            {profile.bio}
          </p>

          {/* AI Disclosure Badge (if applicable) */}
          {profile.isAI && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <span className="text-purple-600 text-sm">🤖</span>
              <p className="text-sm text-purple-900">
                <span className="font-semibold">AI-Generated Content:</span>{" "}
                This article was created using AI technology and reviewed by our
                editorial team for accuracy and quality.
              </p>
            </div>
          )}

          {/* Areas of Expertise */}
          {profile.expertise && profile.expertise.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Areas of Expertise:
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
            "@context": "https://schema.org",
            "@type": profile.isAI ? "Organization" : "Person",
            name: profile.name,
            description: profile.bio,
            ...(profile.isAI
              ? {
                  alternateName: "welomoney AI System",
                }
              : {
                  jobTitle: "Financial Journalist",
                  knowsAbout: [
                    "Financial Markets",
                    "Stock Market Analysis",
                    "IPO News",
                    "Cryptocurrency",
                    "Investment Analysis",
                  ],
                }),
            worksFor: {
              "@type": "NewsMediaOrganization",
              name: "welomoney",
              url: "https://welomoney.com",
            },
            ...(profile.image && {
              image: {
                "@type": "ImageObject",
                url: `https://welomoney.com${profile.image}`,
              },
            }),
            sameAs: [profile.linkedin, profile.twitter].filter(Boolean),
          }),
        }}
      />
    </div>
  );
}
