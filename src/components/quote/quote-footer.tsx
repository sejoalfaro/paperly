"use client"

import { QuoteState } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Plus, X } from 'lucide-react'

interface QuoteFooterProps {
  data: QuoteState
  onAssumptionChange: (index: number, value: string) => void
  onAddAssumption: () => void
  onRemoveAssumption: (index: number) => void
  onNextStepChange: (index: number, value: string) => void
  onAddNextStep: () => void
  onRemoveNextStep: (index: number) => void
}

export function QuoteFooter({ 
  data,
  onAssumptionChange,
  onAddAssumption,
  onRemoveAssumption,
  onNextStepChange,
  onAddNextStep,
  onRemoveNextStep
}: QuoteFooterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-border break-inside-avoid">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Supuestos y Exclusiones
          </h3>
          <Button onClick={onAddAssumption} variant="ghost" size="sm" className="no-print">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <ul className="space-y-2">
          {data.assumptions?.map((assumption, i) => (
            <li key={i} className="text-xs flex gap-2 group">
              <span className="text-muted-foreground mt-0.5">•</span>
              <Textarea
                value={assumption}
                onChange={(e) => onAssumptionChange(i, e.target.value)}
                placeholder="Supuesto o exclusión"
                className="text-xs border-none px-0 h-auto flex-1 py-0 shadow-none resize-none min-h-[1.5rem]"
                rows={1}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveAssumption(i)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 no-print"
              >
                <X className="w-3 h-3 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Próximos Pasos
          </h3>
          <Button onClick={onAddNextStep} variant="ghost" size="sm" className="no-print">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <ul className="space-y-3">
          {data.nextSteps?.map((step, i) => (
            <li key={i} className="flex gap-3 text-xs group">
              <span className="font-semibold font-mono shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Textarea
                value={step}
                onChange={(e) => onNextStepChange(i, e.target.value)}
                placeholder="Descripción del paso"
                className="text-xs border-none px-0 h-auto flex-1 py-0 shadow-none resize-none min-h-[1.5rem]"
                rows={1}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveNextStep(i)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 no-print"
              >
                <X className="w-3 h-3 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
