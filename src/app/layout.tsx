import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/src/components/theme-provider'
import { appConfig } from '@/src/lib/config'
import './globals.css'
import { Toaster } from "@/src/components/ui/sonner"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.description,
  description: appConfig.description,
}

export const viewport: Metadata['viewport'] = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <meta name="apple-mobile-web-app-title" content="Paperly" />
      <html lang="es" suppressHydrationWarning>
        <body className={`font-sans antialiased print:overflow-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
