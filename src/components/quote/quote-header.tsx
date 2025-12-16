"use client"

import { QuoteState, QuoteIssuer } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'

interface QuoteHeaderProps {
  data: QuoteState
  onFieldChange: (field: keyof QuoteState, value: string) => void
  onIssuerChange: (field: keyof QuoteIssuer, value: string) => void
}

export function QuoteHeader({ data, onFieldChange, onIssuerChange }: QuoteHeaderProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-b border-border">
      <div className="flex flex-col md:flex-row print:flex-row justify-between gap-6 md:gap-8 print:gap-8">
        <div className="flex-1 space-y-4 md:space-y-6 print:space-y-6">
          <div>
            <Input
              type="text"
              placeholder="NOMBRE DE TU EMPRESA"
              className="w-full text-2xl md:text-3xl print:text-3xl font-bold tracking-tight border-none focus-visible:ring-0 p-0 bg-transparent uppercase shadow-none h-auto"
              value={data.issuer.name}
              onChange={(e) => onIssuerChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Datos del Emisor</h3>
            <div className="grid gap-2">
              <Input
                placeholder="Identificación / NIF"
                value={data.issuer.id}
                onChange={(e) => onIssuerChange("id", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Dirección completa"
                value={data.issuer.address}
                onChange={(e) => onIssuerChange("address", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Teléfono"
                value={data.issuer.phone}
                onChange={(e) => onIssuerChange("phone", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Correo electrónico"
                value={data.issuer.email}
                onChange={(e) => onIssuerChange("email", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
              />
              <div className={data.issuer.website ? "" : "print:hidden"}>
                <Input
                  placeholder="Sitio web (opcional)"
                  value={data.issuer.website}
                  onChange={(e) => onIssuerChange("website", e.target.value)}
                  className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 md:max-w-xs print:max-w-xs space-y-4 md:space-y-6 print:space-y-6">
          <div className="text-left md:text-right print:text-right">
            <h2 className="text-3xl md:text-4xl print:text-4xl font-light tracking-widest uppercase text-muted">Cotización</h2>
          </div>

          <div className="space-y-3 md:space-y-4 print:space-y-4 p-4 md:p-6 print:p-6 rounded-lg bg-muted/50">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-muted-foreground">Nº Cotización</label>
              <Input
                type="text"
                value={data.quoteNumber}
                onChange={(e) => onFieldChange('quoteNumber', e.target.value)}
                className="text-right font-mono print:font-mono font-medium bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 w-32 text-sm shadow-none h-auto py-1"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-muted-foreground">Fecha</label>
              <Input
                type="date"
                value={data.startDate}
                onChange={(e) => onFieldChange('startDate', e.target.value)}
                className="text-right font-mono print:font-mono font-medium bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 w-32 text-sm shadow-none h-auto py-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
