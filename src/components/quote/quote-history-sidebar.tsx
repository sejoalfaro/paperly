"use client"

import { useState } from 'react'
import { Trash2, FolderOpen, Plus, MoreHorizontal, Share2, Download } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/src/components/ui/sidebar'
import { QuoteHistoryEntry } from '@/src/hooks/use-quote-history'
import { QuoteState } from '@/src/types/quote'
import { encodeToBase64 } from '@/src/lib/base64-utils'
import { toast } from 'sonner'

interface QuoteHistorySidebarProps {
  readonly history: QuoteHistoryEntry[]
  readonly activeQuoteNumber?: string
  readonly onNew: () => void
  readonly onLoad: (data: QuoteState) => void
  readonly onDelete: (id: string) => void
  readonly onClear: () => void
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

export function QuoteHistorySidebar({ history, activeQuoteNumber, onNew, onLoad, onDelete, onClear }: QuoteHistorySidebarProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const handleShare = (data: QuoteState) => {
    const encoded = encodeToBase64(data)
    const url = `${globalThis.location.origin}/quote?data=${encoded}`
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Link copiado', { description: 'El link de la cotización fue copiado al portapapeles.' }))
      .catch(() => toast.error('Error al copiar el link'))
  }

  const handleDownload = async (entry: QuoteHistoryEntry) => {
    try {
      setDownloadingId(entry.id)
      const isDark = document.documentElement.classList.contains('dark')
      const response = await fetch('/api/quote/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteData: entry.data, theme: isDark ? 'dark' : 'light' }),
      })
      if (!response.ok) throw new Error('Error al generar PDF')
      const blob = await response.blob()
      const url = globalThis.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cotizacion-${entry.data.quoteNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      globalThis.URL.revokeObjectURL(url)
      a.remove()
      toast.success('PDF descargado', { description: 'La cotización se ha descargado correctamente.' })
    } catch {
      toast.error('Error al descargar', { description: 'No se pudo generar el PDF. Intenta de nuevo.' })
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <Sidebar collapsible="offcanvas" className="no-print" style={{ top: '4rem', height: 'calc(100svh - 4rem)' }}>
      <SidebarHeader className="border-b border-border p-3">
          <Button size="sm" className="w-full gap-2" onClick={onNew}>
          <Plus className="size-4" />
          Crear nueva cotización
        </Button>
      </SidebarHeader>

      <SidebarContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 text-muted-foreground p-8">
            <FolderOpen className="size-10 opacity-30" />
            <p className="text-sm text-center">Guarda una cotización para verla aquí</p>
          </div>
        ) : (
          <SidebarMenu className="gap-0 px-0">
            {history.map((entry) => (
              <SidebarMenuItem key={entry.id} className="border-b border-border last:border-b-0">
                <SidebarMenuButton
                  size="lg"
                  isActive={activeQuoteNumber === entry.quoteNumber}
                  onClick={() => onLoad(entry.data)}
                  className="h-auto py-3 pl-4 pr-2 rounded-none"
                >
                  <div className="flex flex-col min-w-0 w-full">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="truncate font-medium text-sm leading-tight flex-1 min-w-0">
                        {entry.projectName || 'Sin nombre'}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            aria-label="Opciones de cotización"
                            className="shrink-0 flex items-center justify-center size-6 rounded-sm text-sidebar-foreground opacity-0 group-hover/menu-item:opacity-100 focus:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            disabled={downloadingId === entry.id}
                            onClick={(e) => e.stopPropagation()}
                          >
                              <MoreHorizontal className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start" className="w-44">
                            <DropdownMenuItem onClick={() => handleShare(entry.data)}>
                              <Share2 className="size-4" />
                              Compartir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(entry)} disabled={downloadingId === entry.id}>
                              <Download className="size-4" />
                              {downloadingId === entry.id ? 'Descargando...' : 'Descargar PDF'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onDelete(entry.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="size-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {entry.clientCompany && (
                      <span className="truncate text-xs text-muted-foreground mt-0.5">
                        {entry.clientCompany}
                      </span>
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
                    <span className="text-xs text-muted-foreground/70 mt-1">
                      {formatDate(entry.savedAt)}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarContent>

      {history.length > 0 && (
        <SidebarFooter className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs"
          >
            <Trash2 className="size-3.5" />
            Limpiar historial
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
