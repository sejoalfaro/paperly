import { Trash2 } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { InvoiceItem } from '@/src/types/invoice'
import { formatCurrency } from '@/src/lib/invoice'

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
  currency: string
  onItemChange: (id: string, field: keyof InvoiceItem, value: string | number) => void
  onRemoveItem: (id: string) => void
}

export function InvoiceItemsTable({ items, currency, onItemChange, onRemoveItem }: InvoiceItemsTableProps) {
  return (
    <div className="hidden md:block print:block">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left border-border">
            <th className="py-4 pl-2 text-xs font-semibold uppercase tracking-wider w-1/2 text-muted-foreground">Descripción</th>
            <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-24 text-muted-foreground">Cantidad</th>
            <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-32 text-muted-foreground">Precio Unit.</th>
            <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-24 text-muted-foreground">IVA %</th>
            <th className="py-4 pr-2 text-right text-xs font-semibold uppercase tracking-wider w-32 text-muted-foreground">Total</th>
            <th className="py-4 w-10 no-print"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.id} className="group">
              <td className="py-4 pl-2 align-top">
                <Textarea
                  placeholder="Descripción del servicio o producto..."
                  className="w-full bg-transparent border-none focus-visible:ring-0 p-0 text-sm resize-none h-auto min-h-6 overflow-visible shadow-none print:whitespace-normal"
                  rows={1}
                  value={item.description}
                  onChange={(e) => onItemChange(item.id, "description", e.target.value)}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </td>
              <td className="py-4 align-top">
                <Input
                  type="number"
                  min="0"
                  className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm shadow-none h-auto"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, "quantity", parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="py-4 align-top">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm shadow-none h-auto"
                  value={item.price}
                  onChange={(e) => onItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="py-4 align-top">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm text-muted-foreground shadow-none h-auto"
                  value={item.taxRate}
                  onChange={(e) => onItemChange(item.id, "taxRate", parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="py-4 pr-2 text-right align-top text-sm font-medium text-foreground">
                {formatCurrency((item.quantity * item.price), currency)}
              </td>
              <td className="text-center no-print">
                <Button
                  onClick={() => onRemoveItem(item.id)}
                  variant="ghost"
                  size="icon-sm"
                  disabled={items.length === 1}
                  className="text-muted-foreground hover:text-destructive -mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
