"use client"

import React, { useState, useEffect } from "react"
import { Plus, Trash2, Download, FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Types
interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
  taxRate: number
}

interface InvoiceData {
  issuer: {
    name: string
    id: string
    address: string
    phone: string
    email: string
    website: string
  }
  receiver: {
    name: string
    id: string
    address: string
    phone: string
    email: string
  }
  details: {
    number: string
    date: string
    dueDate: string
    currency: string
    notes: string
  }
  items: InvoiceItem[]
  discount: {
    type: "percentage" | "fixed"
    value: number
  }
}

// Initial Data
const initialData: InvoiceData = {
  issuer: {
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
    website: "",
  },
  receiver: {
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
  },
  details: {
    number: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "USD",
    notes: "",
  },
  items: [
    {
      id: "1",
      description: "Servicios de Desarrollo Web",
      quantity: 1,
      price: 0,
      taxRate: 0,
    },
  ],
  discount: {
    type: "percentage",
    value: 0,
  },
}

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(initialData)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const calculateSubtotal = () => {
    return data.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    if (data.discount.type === "percentage") {
      return (subtotal * data.discount.value) / 100
    }
    return data.discount.value
  }

  const calculateTax = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    const subtotalAfterDiscount = subtotal - discount
    return data.items.reduce((acc, item) => {
      const itemSubtotal = item.quantity * item.price
      const itemProportion = subtotal > 0 ? itemSubtotal / subtotal : 0
      const itemAfterDiscount = subtotalAfterDiscount * itemProportion
      return acc + (itemAfterDiscount * item.taxRate) / 100
    }, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax()
  }

  const handleIssuerChange = (field: keyof InvoiceData["issuer"], value: string) => {
    setData((prev) => ({ ...prev, issuer: { ...prev.issuer, [field]: value } }))
  }

  const handleReceiverChange = (field: keyof InvoiceData["receiver"], value: string) => {
    setData((prev) => ({ ...prev, receiver: { ...prev.receiver, [field]: value } }))
  }

  const handleDetailsChange = (field: keyof InvoiceData["details"], value: string) => {
    setData((prev) => ({ ...prev, details: { ...prev.details, [field]: value } }))
  }

  const handleDiscountChange = (field: keyof InvoiceData["discount"], value: string | number) => {
    setData((prev) => ({ ...prev, discount: { ...prev.discount, [field]: value } }))
  }

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      price: 0,
      taxRate: 0,
    }
    setData((prev) => ({ ...prev, items: [...prev.items, newItem] }))
  }

  const removeItem = (id: string) => {
    if (data.items.length === 1) return
    setData((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }))
  }

  const handlePrint = () => {
    window.print()
  }

  if (!isClient) return null

  return (
    <div id="invoice-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:min-h-0 print:overflow-visible bg-background">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Generador de Facturas</h1>
        </div>
        <div className="flex gap-3">
          <ThemeToggle />
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 gap-2 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded-xl shadow-sm border overflow-hidden print:shadow-none print:border-none print:rounded-none bg-card text-card-foreground border-border">

        <div className="p-8 md:p-10 border-b border-border">
          <div className="flex flex-row justify-between gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="NOMBRE DE TU EMPRESA"
                  className="w-full text-2xl md:text-3xl font-bold tracking-tight border-none focus-visible:ring-0 p-0 bg-transparent uppercase shadow-none h-auto"
                  value={data.issuer.name}
                  onChange={(e) => handleIssuerChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Datos del Emisor</h3>
                <div className="grid gap-2">
                  <Input
                    placeholder="Identificación / NIF"
                    value={data.issuer.id}
                    onChange={(e) => handleIssuerChange("id", e.target.value)}
                    className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
                  />
                  <Input
                    placeholder="Dirección completa"
                    value={data.issuer.address}
                    onChange={(e) => handleIssuerChange("address", e.target.value)}
                    className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
                  />
                  <Input
                    placeholder="Teléfono"
                    value={data.issuer.phone}
                    onChange={(e) => handleIssuerChange("phone", e.target.value)}
                    className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
                  />
                  <Input
                    placeholder="Correo electrónico"
                    value={data.issuer.email}
                    onChange={(e) => handleIssuerChange("email", e.target.value)}
                    className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
                  />
                  <div className={data.issuer.website ? "" : "print:hidden"}>
                    <Input
                      placeholder="Sitio web (opcional)"
                      value={data.issuer.website}
                      onChange={(e) => handleIssuerChange("website", e.target.value)}
                      className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 md:max-w-xs space-y-6">
              <div className="text-right">
                <h2 className="text-4xl font-light tracking-widest uppercase text-muted">Factura</h2>
              </div>

              <div className="space-y-4 p-6 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Nº Factura</label>
                  <Input
                    type="text"
                    className="text-right font-mono print:font-mono font-medium bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 w-32 text-sm shadow-none h-auto py-1"
                    value={data.details.number}
                    onChange={(e) => handleDetailsChange("number", e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Fecha Emisión</label>
                  <div>
                    <span className="hidden print:block font-mono">{localeDateString(data.details.date)}</span>
                    <div className="print:hidden block">
                      <Input
                        type="date"
                        className="text-right font-mono bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 w-32 text-sm shadow-none h-auto py-1"
                        value={data.details.date}
                        onChange={(e) => handleDetailsChange("date", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Vencimiento</label>
                  <div>
                    <span className="hidden print:block font-mono">{localeDateString(data.details.dueDate)}</span>
                    <div className="print:hidden block">
                      <Input
                        type="date"
                        className="print:hidden text-right font-mono bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 w-32 text-sm shadow-none h-auto py-1"
                        value={data.details.dueDate}
                        onChange={(e) => handleDetailsChange("dueDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Moneda</label>
                  <select
                    className="text-right font-mono bg-transparent border-b focus:ring-0 w-32 text-sm border-input focus:border-foreground text-foreground"
                    value={data.details.currency}
                    onChange={(e) => handleDetailsChange("currency", e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="CRC">CRC (₡)</option>
                    <option value="MXN">MXN ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 border-b border-border">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Datos del Cliente</h3>
            <div className="grid gap-2 max-w-2xl">
              <Input
                type="text"
                placeholder="NOMBRE DEL CLIENTE / EMPRESA"
                className="text-lg font-semibold border-none focus-visible:ring-0 p-0 bg-transparent shadow-none h-auto"
                value={data.receiver.name}
                onChange={(e) => handleReceiverChange("name", e.target.value)}
              />
              <Input
                placeholder="Identificación / NIF"
                value={data.receiver.id}
                onChange={(e) => handleReceiverChange("id", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Dirección completa"
                value={data.receiver.address}
                onChange={(e) => handleReceiverChange("address", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Teléfono"
                value={data.receiver.phone}
                onChange={(e) => handleReceiverChange("phone", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto"
              />
              <Input
                placeholder="Correo electrónico"
                value={data.receiver.email}
                onChange={(e) => handleReceiverChange("email", e.target.value)}
                className="border-b border-t-0 border-x-0 rounded-none shadow-none px-0 py-1.5 h-auto break-all"
              />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left border-border">
                  <th className="py-4 pl-2 text-xs font-semibold uppercase tracking-wider w-1/2 text-muted-foreground">Descripción</th>
                  <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-24 text-muted-foreground">Cantidad</th>
                  <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-32 text-muted-foreground">Precio Unit.</th>
                  <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider w-24 text-muted-foreground">IVA %</th>
                  <th className="py-4 pr-2 text-right text-xs font-semibold uppercase tracking-wider w-32 text-muted-foreground">Total</th>
                  <th className="py-4 w-10 no-print"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="py-4 pl-2 align-top">
                      <Textarea
                        placeholder="Descripción del servicio o producto..."
                        className="w-full bg-transparent border-none focus-visible:ring-0 p-0 text-sm resize-none h-auto min-h-6 overflow-visible shadow-none print:whitespace-normal"
                        rows={1}
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = target.scrollHeight + 'px';
                        }}
                      />
                    </td>
                    <td className="py-4 align-top">
                      <Input
                        type="number"
                        min="0"
                        className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm shadow-none h-auto"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-4 align-top">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm shadow-none h-auto"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-4 align-top">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full text-right bg-transparent border-none focus-visible:ring-0 p-0 text-sm text-muted-foreground shadow-none h-auto"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(item.id, "taxRate", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-4 pr-2 text-right align-top text-sm font-medium text-foreground">
                      {formatCurrency((item.quantity * item.price), data.details.currency)}
                    </td>
                    <td className="py-4 text-center align-top no-print">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="transition-colors p-1 text-muted hover:text-destructive"
                        disabled={data.items.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 no-print">
            <button
              onClick={addItem}
              className="flex items-center gap-2 text-sm font-medium transition-colors px-2 py-1 rounded-md text-primary hover:bg-accent"
            >
              <Plus className="w-4 h-4" />
              Agregar línea
            </button>
          </div>
        </div>

        <div className="p-8 md:p-10 border-t bg-muted/30 border-border break-inside-avoid">
          <div className="flex flex-row justify-between gap-8">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Observaciones y Condiciones de Pago</label>
              <Textarea
                placeholder="Ej: Gracias por su confianza. El pago debe realizarse en un plazo de 30 días naturales..."
                className="w-full bg-transparent border-none focus-visible:ring-0 p-0 text-sm resize-none text-muted-foreground placeholder:text-muted-foreground/50 shadow-none"
                rows={3}
                value={data.details.notes}
                onChange={(e) => handleDetailsChange("notes", e.target.value)}
              />
            </div>
            <div className="w-80 space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="font-medium">Subtotal</span>
                <span className="font-mono">{formatCurrency(calculateSubtotal(), data.details.currency)}</span>
              </div>

              {/* Descuento - controles siempre visibles, línea oculta en impresión si es 0 */}
              <div className={`space-y-2 pb-2 border-b border-border ${data.discount.value === 0 ? 'print:hidden' : ''}`}>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Descuento</span>
                    <select
                      className="text-xs bg-transparent border rounded px-1 py-0.5 focus:ring-1 focus:ring-primary text-muted-foreground no-print border-input"
                      value={data.discount.type}
                      onChange={(e) => handleDiscountChange("type", e.target.value as "percentage" | "fixed")}
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">{getCurrencySymbol(data.details.currency)}</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-20 text-right text-sm h-7 no-print"
                      value={data.discount.value}
                      onChange={(e) => handleDiscountChange("value", parseFloat(e.target.value) || 0)}
                    />
                    <span className="font-mono">
                      -{formatCurrency(calculateDiscount(), data.details.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="font-medium">Impuestos</span>
                <span className="font-mono">{formatCurrency(calculateTax(), data.details.currency)}</span>
              </div>
              <div className="pt-4 border-t-2 flex justify-between items-center border-border">
                <span className="text-base font-bold uppercase tracking-wide text-foreground">Total a <br />Pagar</span>
                <span className="text-2xl font-bold text-foreground">{formatCurrency(calculateTotal(), data.details.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 text-center border-t border-border">
          <p className="text-xs text-muted-foreground italic">
            Documento generado electrónicamente. Válido sin firma o sello.
          </p>
        </div>
      </div>
    </div>
  )
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

function getCurrencySymbol(currency: string) {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    CRC: "₡",
    MXN: "$",
  }
  return symbols[currency] || currency
}

function localeDateString(dateString: string) {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString("es-ES")
}
