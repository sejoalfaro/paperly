import { NextRequest } from 'next/server'
import { chromium } from 'playwright'
import {
  BROWSER_LAUNCH_OPTIONS,
  PAGE_GOTO_OPTIONS,
  STYLE_LOAD_DELAY,
  PDF_OPTIONS,
} from '@/src/lib/playwright-config'
import { env } from '@/src/env'
import { encodeToBase64 } from '@/src/lib/base64-utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { quoteData, theme = 'light' } = body
    
    if (!quoteData) {
      return new Response(
        JSON.stringify({ error: 'Missing quote data' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const baseUrl = env.NEXT_PUBLIC_APP_URL
    console.log(quoteData)
    const encodedData = encodeToBase64(quoteData)
    const quoteUrl = `${baseUrl}/quote?data=${encodeURIComponent(encodedData)}&print=true&theme=${theme}`

    let browser = null

    try {
      browser = await chromium.launch(BROWSER_LAUNCH_OPTIONS)

      const page = await browser.newPage({
        ignoreHTTPSErrors: true,
      })

      await page.goto(quoteUrl, PAGE_GOTO_OPTIONS)

      await page.waitForTimeout(STYLE_LOAD_DELAY)

      const pdfBuffer = await page.pdf(PDF_OPTIONS)

      await browser.close()

      const quoteNumber = quoteData.quoteNumber || 'quote'

      return new Response(pdfBuffer as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="cotizacion-${quoteNumber}.pdf"`,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    } catch (error) {
      console.error('Error generating PDF:', error)

      if (browser) {
        await browser.close()
      }

      return new Response(
        JSON.stringify({
          error: 'Error generating PDF',
          message: error instanceof Error ? error.message : 'Unknown error'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
  } catch (error) {
    console.error('Error parsing request:', error)
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
