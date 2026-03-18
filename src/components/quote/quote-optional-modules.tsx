"use client"

import { QuoteState, OptionalModule } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface QuoteOptionalModulesProps {
  data: QuoteState
  onOptionalModuleChange: (index: number, field: keyof OptionalModule, value: string) => void
  onAddOptionalModule: () => void
  onRemoveOptionalModule: (index: number) => void
}

export function QuoteOptionalModules({ 
  data,
  onOptionalModuleChange,
  onAddOptionalModule,
  onRemoveOptionalModule
}: QuoteOptionalModulesProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Módulos Opcionales
        </h3>
        <Button onClick={onAddOptionalModule} variant="ghost" size="sm" className="no-print">
          <Plus className="w-4 h-4" />
          Agregar Módulo
        </Button>
      </div>
      <div className="border-t border-b border-border">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-border">
            {data.optionalModules?.map((mod, i) => (
              <tr key={i} className="group hover:bg-accent/50 transition-colors">
                <td className="py-3 pr-4 align-top">
                  <Input
                    type="text"
                    value={mod.name}
                    onChange={(e) => onOptionalModuleChange(i, 'name', e.target.value)}
                    placeholder="Nombre del módulo"
                    className="font-medium border-none px-0 h-auto shadow-none field-sizing-content w-fit"
                  />
                </td>
                <td className="py-3 pr-4 align-top">
                  <Textarea
                    value={mod.desc}
                    onChange={(e) => onOptionalModuleChange(i, 'desc', e.target.value)}
                    placeholder="Descripción del módulo"
                    className="text-muted-foreground border-none px-0 shadow-none min-h-8 resize-none py-0"
                    rows={1}
                  />
                </td>
                <td className="py-3 w-12 align-top">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveOptionalModule(i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 no-print"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
