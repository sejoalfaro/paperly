import { InvoiceData } from '@/src/types/invoice'
import { encodeToBase64, safeDecodeFromBase64 } from './base64-utils'

/**
 * Codifica los datos de la factura en base64 para incluir en URL
 */
export function encodeInvoiceData(data: InvoiceData): string {
  return encodeToBase64(data)
}

/**
 * Decodifica los datos de la factura desde base64
 * Incluye validación básica de estructura
 */
export function decodeInvoiceData(encoded: string): InvoiceData | null {
  try {
    const data = safeDecodeFromBase64<InvoiceData>(encoded)
    
    if (!data) {
      return null
    }
    
    // Validación básica de estructura
    if (!data.issuer || !data.receiver || !data.details || !data.items) {
      console.error('Invalid invoice data structure')
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error decoding invoice data:', error)
    return null
  }
}

/**
 * Genera una URL compartible para una factura
 */
export function generateShareableUrl(data: InvoiceData, baseUrl?: string, theme?: string): string {
  const encoded = encodeInvoiceData(data)
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  
  // Detectar tema actual si no se especifica
  const currentTheme = theme || (typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  
  return `${origin}/invoice?data=${encodeURIComponent(encoded)}&theme=${currentTheme}`
}

/**
 * Copia la URL compartible al portapapeles
 */
export async function copyShareableUrl(data: InvoiceData): Promise<boolean> {
  try {
    const url = generateShareableUrl(data)
    await navigator.clipboard.writeText(url)
    return true
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return false
  }
}
