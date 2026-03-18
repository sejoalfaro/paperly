"use client"

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { QuoteState } from '@/src/types/quote'
import { toast } from 'sonner'

interface QuoteDownloadButtonProps {
  readonly quoteData: QuoteState
}

export function QuoteDownloadButton({ quoteData }: QuoteDownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)

      // Detectar tema actual
      const isDark = document.documentElement.classList.contains('dark')
      const theme = isDark ? 'dark' : 'light'

      const response = await fetch('/api/quote/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteData, theme }),
      })

      if (!response.ok) throw new Error('Error al generar PDF')

      const blob = await response.blob()
      const url = globalThis.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cotizacion-${quoteData.quoteNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      globalThis.URL.revokeObjectURL(url)
      a.remove()

      toast.success('PDF descargado', {
        description: 'La cotización se ha descargado correctamente.',
      })
    } catch (error) {
      console.error('Error al descargar:', error)
      toast.error('Error al descargar', {
        description: 'No se pudo descargar el PDF. Por favor, intenta de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDownload} variant="default" disabled={loading}>
      <Download className="w-4 h-4" />
      {loading ? 'Generando PDF...' : 'Descargar PDF'}
    </Button>
  )
}
