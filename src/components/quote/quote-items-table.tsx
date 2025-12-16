"use client"

import { QuoteState, QuoteItem } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Button } from '@/src/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface QuoteItemsTableProps {
  data: QuoteState
  onItemChange: (itemId: string, field: keyof QuoteItem, value: string | number | boolean) => void
  onItemToggle: (itemId: string) => void
  onAddItem: () => void
  onRemoveItem: (itemId: string) => void
}

export function QuoteItemsTable({
  data,
  onItemChange,
  onItemToggle,
  onAddItem,
  onRemoveItem
}: QuoteItemsTableProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Inversión Estimada
        </h3>
      </div>

      <div className="overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-8">
                <span className="sr-only">Incluir</span>
              </th>
              <th className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/3">
                Concepto
              </th>
              <th className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Detalle
              </th>
              <th className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right w-1/12">
                Monto
              </th>
              <th className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-8">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.items.map((item) => (
              <tr
                key={item.id}
                className={`group hover:bg-accent/20 transition-colors ${item.included ? '' : 'opacity-50'}`}
              >
                <td className="py-3 pr-2 align-top">
                  <Checkbox
                    className='mt-1.5'
                    checked={item.included}
                    onCheckedChange={() => onItemToggle(item.id)}
                  />
                </td>
                <td className="py-3 pr-4 align-top">
                  <Input
                    type="text"
                    value={item.label}
                    onChange={(e) => onItemChange(item.id, 'label', e.target.value)}
                    placeholder="Concepto"
                    className="text-sm font-medium border-none px-0 h-auto shadow-none"
                  />
                </td>
                <td className="py-3 pr-4 hidden sm:table-cell align-top">
                  <Textarea
                    placeholder="Descripción"
                    className="w-full bg-transparent border-none focus-visible:ring-0 p-0 text-sm text-muted-foreground resize-none h-auto min-h-6 overflow-visible shadow-none print:whitespace-normal"
                    rows={1}
                    value={item.description}
                    onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                </td>
                <td className="py-3 text-right font-mono whitespace-nowrap align-top">
                  {item.price === 0 ? (
                    <span className="text-xs text-muted-foreground">INCLUIDO</span>
                  ) : (
                    <div className="flex items-center justify-end gap-1">
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => onItemChange(item.id, 'price', Number(e.target.value))}
                        className="text-sm text-right border-none px-0 h-auto w-20 font-mono shadow-none"
                      />
                      <span className="text-sm font-mono text-muted-foreground">US$</span>
                    </div>
                  )}
                </td>
                <td className="py-3 pl-2 align-top">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 no-print"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 no-print">
          <Button onClick={onAddItem} variant="ghost" size="sm">
            <Plus className="w-4 h-4" />
            Agregar línea
          </Button>
        </div>
      </div>
    </section>
  )
}
