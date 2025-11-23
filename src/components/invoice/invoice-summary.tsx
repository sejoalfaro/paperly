import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { InvoiceData } from '@/src/types/invoice'
import { formatCurrency, getCurrencySymbol } from '@/src/lib/invoice'

interface InvoiceSummaryProps {
  data: InvoiceData
  subtotal: number
  discount: number
  tax: number
  total: number
  onDetailsChange: (field: keyof InvoiceData["details"], value: string) => void
  onDiscountChange: (field: keyof InvoiceData["discount"], value: string | number) => void
}

export function InvoiceSummary({
  data,
  subtotal,
  discount,
  tax,
  total,
  onDetailsChange,
  onDiscountChange
}: InvoiceSummaryProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-t bg-muted/30 border-border break-inside-avoid">
      <div className="flex flex-col md:flex-row print:flex-row justify-between gap-6 md:gap-8 print:gap-8">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Observaciones y Condiciones de Pago</label>
          <Textarea
            placeholder="Ej: Gracias por su confianza. El pago debe realizarse en un plazo de 30 días naturales..."
            className="w-full bg-transparent border-none focus-visible:ring-0 p-0 text-sm resize-none text-muted-foreground placeholder:text-muted-foreground/50 shadow-none"
            rows={3}
            value={data.details.notes}
            onChange={(e) => onDetailsChange("notes", e.target.value)}
          />
        </div>
        <div className="w-full md:w-80 print:w-80 space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className="font-medium">Subtotal</span>
            <span className="font-mono">{formatCurrency(subtotal, data.details.currency)}</span>
          </div>

          {/* Descuento - controles siempre visibles, línea oculta en impresión si es 0 */}
          <div className={`space-y-2 pb-2 border-b border-border ${data.discount.value === 0 ? 'print:hidden' : ''}`}>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-muted-foreground">Descuento</span>
                <select
                  className="text-xs bg-transparent border rounded px-1 py-0.5 focus:ring-1 focus:ring-primary text-muted-foreground no-print border-input"
                  value={data.discount.type}
                  onChange={(e) => onDiscountChange("type", e.target.value as "percentage" | "fixed")}
                >
                  <option value="percentage">%</option>
                  <option value="fixed">{getCurrencySymbol(data.details.currency)}</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-20 text-right text-sm h-7 no-print"
                  value={data.discount.value}
                  onChange={(e) => onDiscountChange("value", parseFloat(e.target.value) || 0)}
                />
                <span className="font-mono">
                  -{formatCurrency(discount, data.details.currency)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span className="font-medium">Impuestos</span>
            <span className="font-mono">{formatCurrency(tax, data.details.currency)}</span>
          </div>
          <div className="pt-4 border-t-2 flex justify-between items-center border-border">
            <span className="text-base font-bold uppercase tracking-wide text-foreground">Total a <br />Pagar</span>
            <span className="text-2xl font-bold text-foreground">{formatCurrency(total, data.details.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
