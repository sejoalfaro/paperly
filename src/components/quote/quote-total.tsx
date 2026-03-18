"use client"

import { Input } from '@/src/components/ui/input'
import { QuoteState } from '@/src/types/quote'

interface QuoteTotalProps {
  readonly data: QuoteState
  readonly subtotal: number
  readonly discount: number
  readonly total: number
  readonly onDiscountChange: (field: keyof QuoteState["discount"], value: string | number) => void
}

export function QuoteTotal({ data, subtotal, discount, total, onDiscountChange }: QuoteTotalProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-y bg-muted/30 border-border break-inside-avoid print:-mt-5">
      <div className="flex flex-col md:flex-row print:flex-row justify-end gap-6 md:gap-8 print:gap-8">
        <div className="w-full md:w-80 print:w-80 space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className="font-medium">Subtotal</span>
            <span className="font-mono">{subtotal.toLocaleString()} US$</span>
          </div>

          {/* Descuento - controles siempre visibles, línea oculta en impresión si es 0 */}
          <div className={`space-y-2 ${data.discount.value === 0 ? 'print:hidden' : ''}`}>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-muted-foreground">Descuento</span>
                <select
                  className="text-xs bg-transparent border rounded px-1 py-0.5 focus:ring-1 focus:ring-primary text-muted-foreground no-print border-input"
                  value={data.discount.type}
                  onChange={(e) => onDiscountChange("type", e.target.value as "percentage" | "fixed")}
                >
                  <option value="percentage">%</option>
                  <option value="fixed">US$</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-20 text-right text-sm h-7 no-print"
                  value={data.discount.value}
                  onChange={(e) => onDiscountChange("value", Number.parseFloat(e.target.value) || 0)}
                />
                <span className="font-mono">
                  -{discount.toLocaleString()} US$
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 px-2 border-t-2 flex justify-between items-center border-border">
            <span className="text-base font-bold uppercase tracking-wide text-foreground">
              Total Estimado
            </span>
            <span className="text-2xl font-bold text-foreground font-mono">
              {total.toLocaleString()} US$
            </span>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            * Precios en USD, impuestos no incluidos
          </div>
        </div>
      </div>
    </div>
  )
}
