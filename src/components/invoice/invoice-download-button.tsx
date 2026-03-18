'use client'

import React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { InvoiceData } from '@/src/types/invoice'
import { toast } from 'sonner'
import { encodeToBase64 } from '@/src/lib/base64-utils'

type Props = {
  invoiceData: InvoiceData
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export function InvoiceDownloadButton({
  invoiceData,
  variant = 'default',
  size = 'lg',
  className = ''
}: Props) {
  const [loading, setLoading] = React.useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)

      // Detectar tema actual
      const isDark = document.documentElement.classList.contains('dark')
      const theme = isDark ? 'dark' : 'light'

      // Codificar datos en base64
      const encodedData = encodeToBase64(invoiceData)

      const res = await fetch(`/api/invoice/pdf?data=${encodeURIComponent(encodedData)}&theme=${theme}`)

      if (!res.ok) {
        throw new Error('Error al generar PDF')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `factura-${invoiceData.details.number}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)

      toast.success('PDF descargado', {
        description: 'La factura se ha descargado correctamente.',
      })
    } catch (err) {
      console.error(err)
      toast.error('Error al descargar', {
        description: 'No se pudo descargar el PDF. Por favor, intenta de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      <Download className="w-4 h-4" />
      {loading ? 'Generando PDF...' : 'Descargar PDF'}
    </Button>
  )
}
