import { NextRequest } from 'next/server'
import { chromium } from 'playwright'
import {
  BROWSER_LAUNCH_OPTIONS,
  PAGE_GOTO_OPTIONS,
  STYLE_LOAD_DELAY,
  PDF_OPTIONS,
} from '@/src/lib/playwright-config'
import { env } from '@/src/env'
import { safeDecodeFromBase64 } from '@/src/lib/base64-utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const encodedData = searchParams.get('data')
  const theme = searchParams.get('theme') || 'light'

  if (!encodedData) {
    return new Response(
      JSON.stringify({ error: 'Missing invoice data' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const baseUrl = env.NEXT_PUBLIC_APP_URL

  const invoiceUrl = `${baseUrl}/invoice?data=${encodedData}&print=true&theme=${theme}`

  let browser = null

  try {
    browser = await chromium.launch(BROWSER_LAUNCH_OPTIONS)

    const page = await browser.newPage({
      ignoreHTTPSErrors: true,
    })

    await page.goto(invoiceUrl, PAGE_GOTO_OPTIONS)

    await page.waitForTimeout(STYLE_LOAD_DELAY)

    const pdfBuffer = await page.pdf(PDF_OPTIONS)

    await browser.close()

    let invoiceNumber = 'invoice'
    try {
      const decoded = safeDecodeFromBase64<any>(encodedData)
      if (decoded) {
        invoiceNumber = decoded.details?.number || 'invoice'
      }
    } catch (e) {
      // Error silently - use default invoice number
    }

    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="factura-${invoiceNumber}.pdf"`,
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
}
