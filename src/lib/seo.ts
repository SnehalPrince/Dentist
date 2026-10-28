// src/lib/seo.ts
// JSON-LD schema builder functions per 06_SEO_AND_LOCAL_SEARCH.md
import siteConfig from '@content/site.config.json'

const BASE_URL = 'https://topangadentalcare.com'

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'LocalBusiness', 'MedicalOrganization'],
  '@id': `${BASE_URL}/#business`,
  name: siteConfig.name,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/og-image.png`,
  description:
    'General dentistry practice in Woodland Hills, CA — serving families with thorough, comfortable dental care including cleanings, implants, wisdom teeth removal, and root canal therapy.',
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '__GEOCODE_REQUIRED__',
    longitude: '__GEOCODE_REQUIRED__',
  },
  hasMap: siteConfig.googleMapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '__VERIFY__',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(siteConfig.rating),
    reviewCount: String(siteConfig.reviewCount),
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Leyla Mallak' },
      datePublished: '2025-04-15',
      reviewBody:
        "I almost never write reviews, but I just had to for this office. I've truly never experienced a cleaning like the ones I get here — the hygienists are incredibly thorough and professional.",
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Joe Doust' },
      datePublished: '2025-04-15',
      reviewBody:
        'Been going to this dentist for few years and am so happy. He is so dedicated and knowledgeable. I also take my kids there and they love it.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Jack Mahny' },
      datePublished: '2024-06-01',
      reviewBody:
        'Excellent encounter at this dental practice in every way! The personnel exude warmth, skill, and excellent customer service! Dr. Youssef is incredibly kind, understanding, and knowledgeable.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card',
  areaServed: [
    { '@type': 'City', name: 'Woodland Hills' },
    { '@type': 'City', name: 'Calabasas' },
    { '@type': 'City', name: 'West Hills' },
    { '@type': 'City', name: 'Canoga Park' },
    { '@type': 'City', name: 'Tarzana' },
  ],
  medicalSpecialty: 'Dentistry',
  availableService: [
    { '@type': 'MedicalProcedure', name: 'General Dental Cleaning' },
    { '@type': 'MedicalProcedure', name: 'Wisdom Teeth Removal' },
    { '@type': 'MedicalProcedure', name: 'Dental Implants' },
    { '@type': 'MedicalProcedure', name: 'Root Canal Therapy' },
  ],
  sameAs: [],
}

export interface Crumb {
  name: string
  url: string
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function blogPostingSchema(opts: {
  title: string
  description: string
  image: string
  datePublished: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: {
      '@type': 'Organization',
      name: 'Topanga Dental Care',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Topanga Dental Care',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.svg` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${opts.slug}`,
    },
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function medicalProcedureSchema(opts: {
  name: string
  description: string
  procedureType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.name,
    description: opts.description,
    procedureType: opts.procedureType ?? 'https://schema.org/TherapeuticProcedure',
    provider: {
      '@type': 'Dentist',
      name: 'Topanga Dental Care',
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.line1,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.postalCode,
      },
    },
  }
}
