"use client"


import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Save, History, MoreVertical, Download, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Navbar } from '@/src/components/navbar'
import { QuoteHeader } from '@/src/components/quote/quote-header'
import { QuoteClient } from '@/src/components/quote/quote-client'
import { QuoteSummary } from '@/src/components/quote/quote-summary'
import { QuoteScope } from '@/src/components/quote/quote-scope'
import { QuoteOptionalModules } from '@/src/components/quote/quote-optional-modules'
import { QuoteTimeline } from '@/src/components/quote/quote-timeline'
import { QuoteItemsTable } from '@/src/components/quote/quote-items-table'
import { QuoteTotal } from '@/src/components/quote/quote-total'
import { QuoteMaintenance } from '@/src/components/quote/quote-maintenance'
import { QuoteFooter } from '@/src/components/quote/quote-footer'
import { QuoteHistorySidebar } from '@/src/components/quote/quote-history-sidebar'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { SidebarProvider, useSidebar } from '@/src/components/ui/sidebar'
import { DEFAULT_QUOTE_DATA } from '@/src/lib/quote-defaults'
import { encodeToBase64 } from '@/src/lib/base64-utils'
import { useQuoteData } from '@/src/hooks/use-quote-data'
import { useQuoteCalculations } from '@/src/hooks/use-quote-calculations'
import { useQuoteHandlers } from '@/src/hooks/use-quote-handlers'
import { useQuoteTheme } from '@/src/hooks/use-quote-theme'
import { useQuoteHistory } from '@/src/hooks/use-quote-history'

function HistoryMobileTrigger() {
  const { setOpenMobile } = useSidebar()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setOpenMobile(true)}
      className="gap-2 md:hidden"
    >
      <History className="size-4" />
      Historial
    </Button>
  )
}

export function QuoteGenerator() {
  const searchParams = useSearchParams()
  const printMode = searchParams.get('print') === 'true'

  // Aplicar tema desde URL
  useQuoteTheme()

  const [data, setData] = useQuoteData()
  const [downloading, setDownloading] = useState(false)
  const { subtotal, discount, total } = useQuoteCalculations(data)
  const { history, saveQuote, deleteQuote, clearHistory } = useQuoteHistory()

  const handleNewQuote = () => {
    setData({
      ...DEFAULT_QUOTE_DATA,
      quoteNumber: `QUOTE-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      startDate: new Date().toISOString().split('T')[0],
    })
  }

  const handleShare = () => {
    const encoded = encodeToBase64(data)
    const url = `${globalThis.location.origin}/quote?data=${encoded}`
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Link copiado al portapapeles!')
    }).catch(() => {
      alert('Error al copiar el link')
    })
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const isDark = document.documentElement.classList.contains('dark')
      const theme = isDark ? 'dark' : 'light'
      const response = await fetch('/api/quote/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteData: data, theme }),
      })
      if (!response.ok) throw new Error('Error al generar PDF')
      const blob = await response.blob()
      const url = globalThis.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cotizacion-${data.quoteNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      globalThis.URL.revokeObjectURL(url)
      a.remove()
      toast.success('PDF descargado', {
        description: 'La cotización se ha descargado correctamente.',
      })
    } catch (error) {
      console.error('Error al descargar:', error)
      toast.error('Error al descargar', {
        description: 'No se pudo descargar el PDF. Por favor, intenta de nuevo.',
      })
    } finally {
      setDownloading(false)
    }
  }

  const {
    handleFieldChange,
    handleIssuerChange,
    handleItemToggle,
    handleItemChange,
    addItem,
    removeItem,
    handleScopeSectionChange,
    handleScopeContentChange,
    addScopeContent,
    removeScopeContent,
    addScopeSection,
    removeScopeSection,
    handleOptionalModuleChange,
    addOptionalModule,
    removeOptionalModule,
    handleTimelineChange,
    addTimelineItem,
    removeTimelineItem,
    handleMaintenancePlanChange,
    addMaintenancePlan,
    removeMaintenancePlan,
    handleAssumptionChange,
    addAssumption,
    removeAssumption,
    handleNextStepChange,
    addNextStep,
    removeNextStep,
    handleDiscountChange
  } = useQuoteHandlers(setData)

  return (
    <div className="flex flex-col print:block">
      {!printMode && <Navbar />}
      <SidebarProvider>
        {!printMode && (
          <QuoteHistorySidebar
            history={history}
            activeQuoteNumber={data.quoteNumber}
            onNew={handleNewQuote}
            onLoad={setData}
            onDelete={deleteQuote}
            onClear={clearHistory}
          />
        )}
        <div className="flex flex-col flex-1 min-w-0 print:block">
        <div
          id="quote-page"
          className="flex-1 min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:min-h-0 print:overflow-visible bg-background"
        >
        {!printMode && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-between gap-3 no-print">
            <HistoryMobileTrigger />
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveQuote(data, total)}
                className="gap-2"
              >
                <Save className="size-4" />
                Guardar
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDownload} disabled={downloading}>
                    <Download className="size-4 mr-2" />
                    {downloading ? 'Generando PDF...' : 'Descargar PDF'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="size-4 mr-2" />
                    Compartir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto rounded-xl shadow-sm border overflow-hidden print:shadow-none print:border-none print:rounded-none bg-card text-card-foreground border-border">

          {/* Header */}
          <QuoteHeader
            data={data}
            onFieldChange={handleFieldChange}
            onIssuerChange={handleIssuerChange}
          />

          {/* Client */}
          <QuoteClient
            data={data}
            onFieldChange={handleFieldChange}
          />

          {/* Executive Summary */}
          <QuoteSummary
            data={data}
            onFieldChange={handleFieldChange}
          />

          <div className="p-4 sm:p-6 md:p-10 print:p-10">
            {/* Scope */}
            <QuoteScope
              data={data}
              onScopeSectionChange={handleScopeSectionChange}
              onScopeContentChange={handleScopeContentChange}
              onAddScopeContent={addScopeContent}
              onRemoveScopeContent={removeScopeContent}
              onAddScopeSection={addScopeSection}
              onRemoveScopeSection={removeScopeSection}
            />

            {/* Optional Modules */}
            <QuoteOptionalModules
              data={data}
              onOptionalModuleChange={handleOptionalModuleChange}
              onAddOptionalModule={addOptionalModule}
              onRemoveOptionalModule={removeOptionalModule}
            />

            {/* Timeline */}
            <QuoteTimeline
              data={data}
              onTimelineChange={handleTimelineChange}
              onAddTimelineItem={addTimelineItem}
              onRemoveTimelineItem={removeTimelineItem}
            />

            {/* Investment Table */}
            <QuoteItemsTable
              data={data}
              onItemChange={handleItemChange}
              onItemToggle={handleItemToggle}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>

          {/* Total */}
          <QuoteTotal
            data={data}
            subtotal={subtotal}
            discount={discount}
            total={total}
            onDiscountChange={handleDiscountChange}
          />

          <div className="p-4 sm:p-6 md:p-10 print:p-10">
            {/* Maintenance */}
            <QuoteMaintenance
              data={data}
              onMaintenancePlanChange={handleMaintenancePlanChange}
              onAddMaintenancePlan={addMaintenancePlan}
              onRemoveMaintenancePlan={removeMaintenancePlan}
            />

            {/* Footer */}
            <QuoteFooter
              data={data}
              onAssumptionChange={handleAssumptionChange}
              onAddAssumption={addAssumption}
              onRemoveAssumption={removeAssumption}
              onNextStepChange={handleNextStepChange}
              onAddNextStep={addNextStep}
              onRemoveNextStep={removeNextStep}
            />

            {/* Closing Message */}
            <div className="mt-12 pt-8 border-t border-border">
              <textarea
                value={data.closingMessage}
                onChange={(e) => handleFieldChange('closingMessage', e.target.value)}
                className="w-full text-sm text-muted-foreground leading-relaxed bg-transparent border-none outline-none focus:ring-0 p-0 print:border-none resize-none"
                rows={3}
                placeholder="Mensaje de cierre"
              />
            </div>
          </div>

        </div>
      </div>
      </div>
      </SidebarProvider>
    </div>
  )
}
