"use client"

interface QuoteTotalProps {
  total: number
}

export function QuoteTotal({ total }: QuoteTotalProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-y bg-muted/30 border-border break-inside-avoid print:-mt-5">
      <div className="flex flex-col md:flex-row print:flex-row justify-end gap-6 md:gap-8 print:gap-8">
        <div className="w-full md:w-80 print:w-80 space-y-4">
          <div className="pt-3 px-2 border-t-2 flex justify-between items-center border-border">
            <span className="text-base font-bold uppercase tracking-wide text-foreground">
              Total Estimado
            </span>
            <span className="text-2xl font-bold text-foreground font-mono">
              {total.toLocaleString()} US$
            </span>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            * Precios en USD, impuestos no incluidos
          </div>
        </div>
      </div>
    </div>
  )
}
