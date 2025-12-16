"use client"

import { QuoteState } from '@/src/types/quote'
import { Input } from '@/src/components/ui/input'

interface QuoteClientProps {
  data: QuoteState
  onFieldChange: (field: keyof QuoteState, value: string) => void
}

export function QuoteClient({ data, onFieldChange }: QuoteClientProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-b border-border">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proyecto y Cliente</h3>
        <div className="grid gap-2 max-w-2xl">
          <Input
            type="text"
            placeholder="NOMBRE DEL PROYECTO"
            className="text-lg font-semibold border-none focus-visible:ring-0 p-0 bg-transparent shadow-none h-auto"
            value={data.projectName}
            onChange={(e) => onFieldChange("projectName", e.target.value)}
          />
          <Input
            placeholder="Nombre de la Empresa / Cliente"
            value={data.clientCompany}
            onChange={(e) => onFieldChange("clientCompany", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Persona de Contacto"
            value={data.clientContact}
            onChange={(e) => onFieldChange("clientContact", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Teléfono"
            value={data.clientPhone}
            onChange={(e) => onFieldChange("clientPhone", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Correo electrónico"
            value={data.clientEmail}
            onChange={(e) => onFieldChange("clientEmail", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
          />
        </div>
      </div>
    </div>
  )
}
