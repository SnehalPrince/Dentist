// src/types/index.ts
// TypeScript interfaces for the Topanga Dental Care data layer
// All data shapes match the JSON content files in src/content/

export interface SiteConfig {
  name: string
  phone: string
  phoneDisplay: string
  email: string
  address: {
    line1: string
    line2: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  rating: number
  reviewCount: number
  mapEmbedUrl: string
  googleMapsUrl: string
  social: {
    instagram?: string
    facebook?: string
    google?: string
  }
}

export interface DayHours {
  open: string | null   // "10:00" | null (closed)
  close: string | null  // "18:00" | null
  verified: boolean     // false until client confirms full schedule
}

export interface WeeklyHours {
  _verified: boolean
  _note: string
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface OpenStatus {
  isOpen: boolean
  label: string  // "Open now · Closes at 6:00 PM" | "Closed · Opens at 10:00 AM"
  hoursVerified: boolean
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  category: string  // "PREVENTIVE" | "RESTORATIVE" | "ORAL SURGERY" | "ENDODONTIC" | "COSMETIC" | "ORTHODONTIC"
  teaser: string
  overview: string[]  // paragraphs
  whatToExpect: { step: number; title: string; body: string }[]
  faqs: ServiceFAQ[]
  image: string
  relatedSlugs: string[]
  isInferred: boolean
  isGenerated: boolean
}

export interface Dentist {
  slug: string
  name: string
  role: string
  bio: string | null
  credentials: string | null
  image: string | null
  isPlaceholder: boolean
  isGenerated: boolean
  _note?: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string  // ISO date string "2025-01-15"
  image: string
  isGenerated: boolean
}

export interface Testimonial {
  id: string
  name: string
  meta: string
  quote: string
  stars: number
  initials: string
  isVerified: boolean
}

export interface AppointmentFormData {
  fullName: string
  phone: string
  email: string
  preferredDate: string
  preferredTime: 'morning' | 'afternoon' | 'late-afternoon'
  reasonForVisit: AppointmentReason
  message?: string
  preferredContact: 'phone' | 'email' | 'either'
}

export type AppointmentReason =
  | 'checkup-cleaning'
  | 'tooth-pain-emergency'
  | 'wisdom-teeth'
  | 'implant-consultation'
  | 'root-canal'
  | 'cosmetic-consultation'
  | 'orthodontic-consultation'
  | 'other'

export interface ContactFormData {
  name: string
  phone?: string
  email: string
  subject: string
  message: string
}

// Extend Window for global Lenis access
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __lenis: any
  }
}
