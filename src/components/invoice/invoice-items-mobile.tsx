import { Trash2 } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { InvoiceItem } from '@/src/types/invoice'
import { formatCurrency } from '@/src/lib/invoice'

interface InvoiceItemsMobileProps {
  items: InvoiceItem[]
  currency: string
  onItemChange: (id: string, field: keyof InvoiceItem, value: string | number) => void
  onRemoveItem: (id: string) => void
}

export function InvoiceItemsMobile({ items, currency, onItemChange, onRemoveItem }: InvoiceItemsMobileProps) {
  return (
    <div className="md:hidden print:hidden space-y-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Items de Factura</div>
      {items.map((item, index) => (
        <div key={item.id} className="p-4 rounded-lg border border-border bg-card space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-muted-foreground">Item #{index + 1}</span>
            <Button
              onClick={() => onRemoveItem(item.id)}
              variant="ghost"
              size="icon-sm"
              disabled={items.length === 1}
              className="text-muted-foreground hover:text-destructive -mt-2 -mr-2 no-print"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Descripción</label>
            <Textarea
              placeholder="Descripción del servicio o producto..."
              className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-1 px-0 py-1 text-sm resize-none min-h-[60px]"
              value={item.description}
              onChange={(e) => onItemChange(item.id, "description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Cantidad</label>
              <Input
                type="number"
                min="0"
                className="w-full text-right border-b border-t-0 border-x-0 rounded-none px-0 py-1 text-sm h-auto"
                value={item.quantity}
                onChange={(e) => onItemChange(item.id, "quantity", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Precio Unit.</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                className="w-full text-right border-b border-t-0 border-x-0 rounded-none px-0 py-1 text-sm h-auto"
                value={item.price}
                onChange={(e) => onItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">IVA %</label>
              <Input
                type="number"
                min="0"
                max="100"
                className="w-full text-right border-b border-t-0 border-x-0 rounded-none px-0 py-1 text-sm text-muted-foreground h-auto"
                value={item.taxRate}
                onChange={(e) => onItemChange(item.id, "taxRate", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Total</label>
              <div className="text-right font-semibold text-foreground py-1">
                {formatCurrency((item.quantity * item.price), currency)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
