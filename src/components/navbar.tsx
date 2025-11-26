"use client"

import Link from 'next/link'
import { FileText } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { appConfig } from '@/src/lib/config'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <Link href={appConfig.routes.home} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                {appConfig.name}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {appConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              id="navbar-create-invoice-button"
              href={appConfig.routes.invoice} 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:block"
            >
              Crear Factura
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
