"use client"

import { QuoteState, MaintenancePlan } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface QuoteMaintenanceProps {
  data: QuoteState
  onMaintenancePlanChange: (index: number, field: keyof MaintenancePlan, value: string | number) => void
  onAddMaintenancePlan: () => void
  onRemoveMaintenancePlan: (index: number) => void
}

export function QuoteMaintenance({ 
  data,
  onMaintenancePlanChange,
  onAddMaintenancePlan,
  onRemoveMaintenancePlan
}: Readonly<QuoteMaintenanceProps>) {
  return (
    <section className="mb-8 break-inside-avoid">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Mantenimiento (Opcional)
        </h3>
        <Button onClick={onAddMaintenancePlan} variant="ghost" size="sm" className="no-print">
          <Plus className="w-4 h-4" />
          Agregar Plan
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.maintenancePlans?.map((plan, i) => (
          <div 
            key={i} 
            className="bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors group relative"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveMaintenancePlan(i)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 no-print"
            >
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
            <div>
              <Input
                type="text"
                value={plan.name}
                onChange={(e) => onMaintenancePlanChange(i, 'name', e.target.value)}
                placeholder="Nombre del plan"
                className="font-semibold !text-xl border-none px-0 h-auto shadow-none w-full"
              />
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground mb-3">
              <Input
                type="number"
                value={plan.price}
                onChange={(e) => onMaintenancePlanChange(i, 'price', Number(e.target.value))}
                className="!text-lg border-none px-0 h-auto font-mono shadow-none text-right field-sizing-content w-fit"
              />
              <span className='mt-1'>US$/month</span>
            </div>
            <Textarea
              value={plan.desc}
              onChange={(e) => onMaintenancePlanChange(i, 'desc', e.target.value)}
              placeholder="Descripción del plan"
              className="text-xs text-muted-foreground leading-relaxed border-none px-0 shadow-none resize-none min-h-[60px]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
