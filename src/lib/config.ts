/**
 * Application Configuration
 * 
 * This file contains all the app-wide constants to avoid magic strings
 * throughout the codebase. Following industry best practices for maintainability.
 */

export const appConfig = {
  /**
   * Application identity and branding
   */
  name: 'Paperly',
  tagline: 'by Nominar.pro',
  description: 'Generador de facturas profesionales en PDF',
  longDescription: 'Create stunning invoices with minimalist design. Fast, simple, and open source.',
  
  /**
   * Contact information
   */
  contact: {
    email: 'hello@nominar.pro',
    website: 'https://nominar.pro',
  },
  
  /**
   * Social proof and statistics
   */
  stats: {
    users: '5,000+',
    userDescription: 'freelancers',
    rating: 4.9,
    reviewCount: 247,
  },
  
  /**
   * External links
   */
  links: {
    github: 'https://github.com/sejoalfaro/paper-kit',
    linkedin: 'https://www.linkedin.com/company/nominar',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
  },
  
  /**
   * Legal and licensing
   */
  legal: {
    license: 'Apache 2.0 License',
    copyrightOwner: 'Paperly',
    openSource: true,
  },
  
  /**
   * Routes
   */
  routes: {
    home: '/',
    invoice: '/invoice',
  },
} as const

// Type helper for type-safe access
export type AppConfig = typeof appConfig
