"use client"

import { Github, Linkedin, Globe, Mail } from 'lucide-react'
import { appConfig } from '@/src/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-background print:hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          
          {/* Brand & Description */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-semibold text-foreground">{appConfig.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {appConfig.longDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <a 
                  href={appConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 md:gap-1.5 group"
                >
                  <Github className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span>GitHub Repository</span>
                  <svg className="w-3 h-3 opacity-0 -ml-1 transition-all group-hover:opacity-100 group-hover:ml-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={appConfig.links.license}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 md:gap-1.5 group"
                >
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{appConfig.legal.license}</span>
                  <svg className="w-3 h-3 opacity-0 -ml-1 transition-all group-hover:opacity-100 group-hover:ml-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <a
                href={appConfig.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a
                href={appConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a
                href={appConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a
                href={`mailto:${appConfig.contact.email}`}
                className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground/70 pt-2">
              Built by{' '}
              <a 
                href={appConfig.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Nominar.pro
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-3">
            <p className="text-xs text-muted-foreground/70">
              © {currentYear} {appConfig.legal.copyrightOwner}. Open source under {appConfig.legal.license}.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Free & Open Source
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
