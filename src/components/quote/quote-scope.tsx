"use client"

import { QuoteState, ScopeSection } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { Plus, Trash2, X } from 'lucide-react'

interface QuoteScopeProps {
  data: QuoteState
  onScopeSectionChange: (index: number, field: keyof ScopeSection, value: string) => void
  onScopeContentChange: (sectionIndex: number, contentIndex: number, value: string) => void
  onAddScopeContent: (sectionIndex: number) => void
  onRemoveScopeContent: (sectionIndex: number, contentIndex: number) => void
  onAddScopeSection: () => void
  onRemoveScopeSection: (index: number) => void
}

export function QuoteScope({ 
  data,
  onScopeSectionChange,
  onScopeContentChange,
  onAddScopeContent,
  onRemoveScopeContent,
  onAddScopeSection,
  onRemoveScopeSection
}: QuoteScopeProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Alcance y Entregables
        </h3>
        <Button onClick={onAddScopeSection} variant="ghost" size="sm" className="no-print">
          <Plus className="w-4 h-4" />
          Agregar Sección
        </Button>
      </div>
      <div className="grid gap-8">
        {data.scopeSections?.map((section, idx) => (
          <div key={idx} className="group relative">
            <div className="flex items-start gap-2 mb-3">
              <Input
                type="text"
                value={section.title}
                onChange={(e) => onScopeSectionChange(idx, 'title', e.target.value)}
                placeholder="Título de la sección (ej: 🎨 Diseño)"
                className="font-semibold text-sm border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveScopeSection(idx)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 no-print"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
            <ul className="space-y-2 ml-4">
              {section.content.map((point, pIdx) => (
                <li key={pIdx} className="flex items-center gap-2 group/item break-inside-avoid-page">
                  <span className="text-muted-foreground">•</span>
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="text"
                      value={point}
                      onChange={(e) => onScopeContentChange(idx, pIdx, e.target.value)}
                      placeholder="Descripción del entregable"
                      className="text-sm border-none px-0 h-auto flex-1 shadow-none"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveScopeContent(idx, pIdx)}
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity h-6 w-6 p-0 no-print"
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => onAddScopeContent(idx)} 
              variant="ghost" 
              size="sm"
              className="mt-2 ml-4 text-xs no-print"
            >
              <Plus className="w-3 h-3" />
              Agregar punto
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
