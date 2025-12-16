"use client"

import { Share2 } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { QuoteState } from '@/src/types/quote'

interface QuoteShareButtonProps {
  quoteData: QuoteState
}

export function QuoteShareButton({ quoteData }: QuoteShareButtonProps) {
  const handleShare = () => {
    const encoded = btoa(JSON.stringify(quoteData))
    const url = `${globalThis.location.origin}/quote?data=${encoded}`
    
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Link copiado al portapapeles!')
    }).catch(() => {
      alert('Error al copiar el link')
    })
  }

  return (
    <Button onClick={handleShare} variant="outline">
      <Share2 className="w-4 h-4" />
      Compartir
    </Button>
  )
}
