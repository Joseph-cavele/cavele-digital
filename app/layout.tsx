import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Analytics } from "@/components/analytics/Analytics";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.motto}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "web developer Rustenburg",
    "website development South Africa",
    "booking system developer",
    "salon booking system",
    "business automation",
    "custom website",
    "mobile-first website",
    "Joseph Cavele",
    "Rustenburg",
    "North West",
  ],
  authors: [{ name: site.founder }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.motto}`,
    description: site.description,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.motto}`,
    description: site.description,
    images: ["/logo.png"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    other: { "facebook-domain-verification": site.analytics.facebookDomainVerification },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/logo.png`,
  priceRange: "$$",
  areaServed: "ZA",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rustenburg",
    addressRegion: "North West",
    addressCountry: "ZA",
    streetAddress: "Kroondal Ikemeleng",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  founder: { "@type": "Person", name: site.founder },
  sameAs: [site.socials.facebook, site.socials.instagram, site.socials.tiktok],
  slogan: site.motto,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <VisitorTracker />
      </body>
    </html>
  );
}
