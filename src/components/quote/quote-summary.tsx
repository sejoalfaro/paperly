"use client"

import { QuoteState } from '@/src/types/quote'
import { Textarea } from '@/src/components/ui/textarea'
import { Label } from '@/src/components/ui/label'

interface QuoteSummaryProps {
  data: QuoteState
  onFieldChange: (field: keyof QuoteState, value: string) => void
}

export function QuoteSummary({ data, onFieldChange }: QuoteSummaryProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-b border-border">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Resumen Ejecutivo
        </h3>
        <Textarea
          id="executiveSummary"
          value={data.executiveSummary}
          onChange={(e) => onFieldChange('executiveSummary', e.target.value)}
          placeholder="Descripción general del proyecto..."
          className="min-h-24 border-none focus-visible:ring-0 p-0 bg-transparent shadow-none resize-none"
        />
      </div>
    </div>
  )
}
