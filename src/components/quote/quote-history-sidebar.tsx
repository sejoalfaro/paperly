"use client"

import { Trash2, FolderOpen, Plus } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/src/components/ui/sheet'
import { QuoteHistoryEntry } from '@/src/hooks/use-quote-history'
import { QuoteState } from '@/src/types/quote'

interface QuoteHistorySidebarProps {
  readonly history: QuoteHistoryEntry[]
  readonly onNew: () => void
  readonly onLoad: (data: QuoteState) => void
  readonly onDelete: (id: string) => void
  readonly onClear: () => void
  readonly mobileOpen: boolean
  readonly onMobileOpenChange: (open: boolean) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const countLabel = (count: number) =>
  count === 1 ? '1 cotización guardada' : `${count} cotizaciones guardadas`

interface HistoryContentProps {
  readonly history: QuoteHistoryEntry[]
  readonly onNew: () => void
  readonly onLoad: (data: QuoteState) => void
  readonly onDelete: (id: string) => void
  readonly onClear: () => void
  readonly onClose?: () => void
}

function HistoryContent({ history, onNew, onLoad, onDelete, onClear, onClose }: HistoryContentProps) {
  return (
    <>
      <div className="px-4 pt-4 pb-3 border-b border-border shrink-0 space-y-3">
        <Button size="sm" className="w-full gap-2" onClick={() => { onNew(); onClose?.() }}>
          <Plus className="size-4" />
          Crear nueva cotización
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-muted-foreground p-8">
          <FolderOpen className="size-10 opacity-30" />
          <p className="text-sm text-center">Guarda una cotización para verla aquí</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col divide-y divide-border">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
                >
                  <button
                    onClick={() => { onLoad(entry.data); onClose?.() }}
                    className="flex-1 text-left min-w-0"
                  >
                    <p className="text-sm font-medium truncate leading-tight">
                      {entry.projectName || 'Sin nombre'}
                    </p>
                    {entry.clientCompany && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {entry.clientCompany}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        #{entry.quoteNumber}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs font-medium text-foreground">
                        {formatCurrency(entry.total)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatDate(entry.savedAt)}
                    </p>
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground mt-0.5 shrink-0"
                    aria-label="Eliminar cotización"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="px-4 py-3 border-t border-border shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs"
            >
              <Trash2 className="size-3.5" />
              Limpiar historial
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export function QuoteHistorySidebar({
  history,
  onNew,
  onLoad,
  onDelete,
  onClear,
  mobileOpen,
  onMobileOpenChange,
}: QuoteHistorySidebarProps) {
  return (
    <>
      {/* Desktop: always visible */}
      <aside className="hidden lg:flex w-72 shrink-0 border-r border-border bg-background flex-col h-[calc(100svh-4rem)] sticky top-16 no-print">
        <HistoryContent history={history} onNew={onNew} onLoad={onLoad} onDelete={onDelete} onClear={onClear} />
      </aside>

      {/* Mobile: Sheet */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col gap-0 lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Historial de cotizaciones</SheetTitle>
            <SheetDescription>Lista de cotizaciones guardadas</SheetDescription>
          </SheetHeader>
          <HistoryContent
            history={history}
            onNew={onNew}
            onLoad={onLoad}
            onDelete={onDelete}
            onClear={onClear}
            onClose={() => onMobileOpenChange(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
