"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Save, History } from 'lucide-react'
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
import { QuoteDownloadButton } from '@/src/components/quote/quote-download-button'
import { QuoteShareButton } from '@/src/components/quote/quote-share-button'
import { QuoteHistorySidebar } from '@/src/components/quote/quote-history-sidebar'
import { Button } from '@/src/components/ui/button'
import { DEFAULT_QUOTE_DATA } from '@/src/lib/quote-defaults'
import { useQuoteData } from '@/src/hooks/use-quote-data'
import { useQuoteCalculations } from '@/src/hooks/use-quote-calculations'
import { useQuoteHandlers } from '@/src/hooks/use-quote-handlers'
import { useQuoteTheme } from '@/src/hooks/use-quote-theme'
import { useQuoteHistory } from '@/src/hooks/use-quote-history'

export function QuoteGenerator() {
  const searchParams = useSearchParams()
  const printMode = searchParams.get('print') === 'true'

  // Aplicar tema desde URL
  useQuoteTheme()

  const [data, setData] = useQuoteData()
  const { subtotal, discount, total } = useQuoteCalculations(data)
  const { history, saveQuote, deleteQuote, clearHistory } = useQuoteHistory()
  const [historyOpen, setHistoryOpen] = useState(false)

  const handleNewQuote = () => {
    setData({
      ...DEFAULT_QUOTE_DATA,
      quoteNumber: `QUOTE-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      startDate: new Date().toISOString().split('T')[0],
    })
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
    <>
      {!printMode && <Navbar />}
      <div className="flex print:block">
        {!printMode && (
          <QuoteHistorySidebar
            history={history}
            onNew={handleNewQuote}
            onLoad={setData}
            onDelete={deleteQuote}
            onClear={clearHistory}
            mobileOpen={historyOpen}
            onMobileOpenChange={setHistoryOpen}
          />
        )}
      <div
        id="quote-page"
        className="flex-1 min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:min-h-0 print:overflow-visible bg-background"
      >
        {!printMode && (
          <div className="max-w-4xl mx-auto mb-6 flex justify-between gap-3 no-print">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="gap-2 lg:hidden"
            >
              <History className="size-4" />
              Historial
            </Button>
            <div className="flex gap-3 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveQuote(data, total)}
                className="gap-2"
              >
                <Save className="size-4" />
                Guardar
              </Button>
              <QuoteShareButton quoteData={data} />
              <QuoteDownloadButton quoteData={data} />
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
    </>
  )
}
