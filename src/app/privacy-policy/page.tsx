import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Finscann',
  description: 'Privacy Policy for Finscann - Learn how we collect, use, and protect your information',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-600">
          <strong>Last Updated:</strong> January 29, 2026
        </p>
        <p>
          Finscann.com ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Quick Summary</h2>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>We do NOT sell your personal information</li>
            <li>We collect minimal data (usage statistics via cookies and analytics)</li>
            <li>We do NOT require account registration</li>
            <li>You can use our site without providing personal information</li>
          </ul>
        </div>

        <h2>1. Information We Collect</h2>

        <h3>Automatically Collected Information:</h3>
        <p>When you visit Finscann, we automatically collect certain information through cookies and similar technologies:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website</li>
          <li>Device type (desktop, mobile, tablet)</li>
          <li>General location (country/city level based on IP)</li>
        </ul>

        <h3>Voluntarily Provided Information:</h3>
        <p>If you contact us via email, we collect:</p>
        <ul>
          <li>Your email address</li>
          <li>Any information you include in your message</li>
        </ul>

        <p className="font-semibold">
          We do NOT collect: Names, phone numbers, financial information, or any sensitive personal data.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li><strong>Operate and maintain the website:</strong> Ensure proper functionality and performance</li>
          <li><strong>Analyze usage:</strong> Understand how visitors use our site to improve content and features</li>
          <li><strong>Monitor traffic:</strong> Track website traffic and user behavior patterns</li>
          <li><strong>Respond to inquiries:</strong> Answer questions or provide support when you contact us</li>
          <li><strong>Prevent abuse:</strong> Detect and prevent spam, fraud, or malicious activity</li>
        </ul>
        <p className="font-semibold">
          We do NOT use your information for marketing, advertising, or selling to third parties.
        </p>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience and analyze site usage.
        </p>

        <h3>Types of cookies we use:</h3>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
          <li><strong>Performance Cookies:</strong> Improve site speed and performance</li>
        </ul>

        <p>
          <strong>Managing Cookies:</strong> You can control or disable cookies through your browser settings. Note that disabling cookies may affect site functionality.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>We use third-party services to operate our website:</p>
        <ul>
          <li><strong>Analytics Services:</strong> Google Analytics or similar tools to analyze traffic (these services have their own privacy policies)</li>
          <li><strong>Hosting Providers:</strong> Cloud hosting services to serve our website content</li>
          <li><strong>Content Delivery Networks (CDNs):</strong> To deliver content faster globally</li>
        </ul>
        <p className="font-semibold">
          These third parties may collect information as described in their own privacy policies.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information. However, no internet transmission is 100% secure. We cannot guarantee absolute security of data transmitted to our website.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain usage data for as long as necessary to fulfill the purposes outlined in this policy. Analytics data is typically retained for 12-24 months.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Opt-out of cookies (via browser settings)</li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child, please contact us immediately.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the website after changes constitutes acceptance of the updated policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
        </p>
        <p>
          Email:{' '}
          <a href="mailto:finscannquery@gmail.com" className="text-blue-600 hover:underline font-semibold">
            finscannquery@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
