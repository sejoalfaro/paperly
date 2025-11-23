import { Input } from '@/src/components/ui/input'
import { InvoiceData } from '@/src/types/invoice'

interface InvoiceClientProps {
  data: InvoiceData
  onReceiverChange: (field: keyof InvoiceData["receiver"], value: string) => void
}

export function InvoiceClient({ data, onReceiverChange }: InvoiceClientProps) {
  return (
    <div className="p-4 sm:p-6 md:p-10 print:p-10 border-b border-border">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Datos del Cliente</h3>
        <div className="grid gap-2 max-w-2xl">
          <Input
            type="text"
            placeholder="NOMBRE DEL CLIENTE / EMPRESA"
            className="text-lg font-semibold border-none focus-visible:ring-0 p-0 bg-transparent shadow-none h-auto"
            value={data.receiver.name}
            onChange={(e) => onReceiverChange("name", e.target.value)}
          />
          <Input
            placeholder="Identificación / NIF"
            value={data.receiver.id}
            onChange={(e) => onReceiverChange("id", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Dirección completa"
            value={data.receiver.address}
            onChange={(e) => onReceiverChange("address", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Teléfono"
            value={data.receiver.phone}
            onChange={(e) => onReceiverChange("phone", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
          />
          <Input
            placeholder="Correo electrónico"
            value={data.receiver.email}
            onChange={(e) => onReceiverChange("email", e.target.value)}
            className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
          />
        </div>
      </div>
    </div>
  )
}
