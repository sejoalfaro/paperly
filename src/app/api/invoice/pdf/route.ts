import { NextRequest } from 'next/server'
import { chromium } from 'playwright'
import {
  BROWSER_LAUNCH_OPTIONS,
  PAGE_GOTO_OPTIONS,
  STYLE_LOAD_DELAY,
  PDF_OPTIONS,
} from '@/src/lib/playwright-config'
import { env } from '@/src/env'

export const runtime = 'nodejs' // Importante: NO edge
export const dynamic = 'force-dynamic' // No cachear

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

  // Determinar la URL base para Playwright desde variable de entorno
  const baseUrl = env.NEXT_PUBLIC_APP_URL
  
  const invoiceUrl = `${baseUrl}/invoice?data=${encodeURIComponent(encodedData)}&print=true&theme=${theme}`

  let browser = null

  try {
    // Iniciar Chromium headless con configuración optimizada
    browser = await chromium.launch(BROWSER_LAUNCH_OPTIONS)

    const page = await browser.newPage({
      ignoreHTTPSErrors: true, // Ignorar errores HTTPS adicionales
    })

    // Cargar la página de factura con datos en URL
    await page.goto(invoiceUrl, PAGE_GOTO_OPTIONS)

    // Esperar un poco más para asegurar que los estilos se carguen
    await page.waitForTimeout(STYLE_LOAD_DELAY)

    // Generar el PDF con configuración centralizada
    const pdfBuffer = await page.pdf(PDF_OPTIONS)

    await browser.close()

    // Decodificar para obtener el número de factura
    let invoiceNumber = 'invoice'
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(encodedData)))
      invoiceNumber = decoded.details?.number || 'invoice'
    } catch (e) {
      // Si falla, usar nombre genérico
    }

    // Retornar el PDF
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
