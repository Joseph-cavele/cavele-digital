// Env vars are read with sensible fallbacks so the app runs even without a
// .env file. Set them in .env.local (see .env.example) per environment.
const env = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://caveledigital.co.za",
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "G-CWCNZH1WNC",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "1325835069529734",
  fbVerification:
    process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || "99a7mwepsdfslbua2so76dtenh60x4",
};

export const site = {
  name: "Cavele Digital",
  legalName: "Cavele Digital",
  founder: "Joseph Cavele",
  motto: "Custom websites, booking systems & automation — built from scratch.",
  description:
    "Cavele Digital is a solo web development studio in Rustenburg, South Africa, run by Joseph Cavele. Custom mobile-first websites, booking & management systems, and business automation — built from scratch, with direct access to the developer.",
  // Production domain — override with NEXT_PUBLIC_SITE_URL.
  url: env.url,
  email: "caveledigital@gmail.com",
  phone: "+27 71 083 6571",
  phoneHref: "tel:+27710836571",
  whatsapp: "https://wa.me/27710836571",
  location: "Kroondal, Rustenburg, North West, South Africa",
  geo: { lat: -25.6725, lng: 27.2396 },
  analytics: {
    ga4: env.ga4,
    metaPixel: env.metaPixel,
    facebookDomainVerification: env.fbVerification,
  },
  socials: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "https://facebook.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK || "https://tiktok.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/27710836571",
  },
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
