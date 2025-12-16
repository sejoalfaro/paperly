"use client"

import { QuoteState, TimelineItem } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface QuoteTimelineProps {
  data: QuoteState
  onTimelineChange: (index: number, field: keyof TimelineItem, value: string) => void
  onAddTimelineItem: () => void
  onRemoveTimelineItem: (index: number) => void
}

export function QuoteTimeline({ 
  data,
  onTimelineChange,
  onAddTimelineItem,
  onRemoveTimelineItem
}: QuoteTimelineProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cronograma Estimado
        </h3>
        <Button onClick={onAddTimelineItem} variant="ghost" size="sm" className="no-print">
          <Plus className="w-4 h-4" />
          Agregar Fase
        </Button>
      </div>
      <div className="space-y-4">
        {data.timeline?.map((item, i) => (
          <div 
            key={i} 
            className="flex flex-col sm:flex-row gap-2 sm:gap-6 pl-4 border-l border-border pb-1 group"
          >
            <Input
              type="text"
              value={item.week}
              onChange={(e) => onTimelineChange(i, 'week', e.target.value)}
              placeholder="Semana/Fase"
              className="!w-1/4 shrink-0 text-xs font-semibold uppercase tracking-wider border-none px-0 h-auto shadow-none"
            />
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="text"
                value={item.task}
                onChange={(e) => onTimelineChange(i, 'task', e.target.value)}
                placeholder="Descripción de la tarea"
                className="text-sm leading-relaxed border-none px-0 h-auto flex-1 shadow-none"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTimelineItem(i)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 no-print"
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
