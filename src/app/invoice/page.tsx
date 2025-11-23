"use client"

import { useState } from "react"
import { Plus, Download } from 'lucide-react'
import { Navbar } from '@/src/components/navbar'
import { Footer } from '@/src/components/footer'
import { Button } from '@/src/components/ui/button'
import { InvoiceItem, InvoiceData } from '@/src/types/invoice'
import { InvoiceHeader } from '@/src/components/invoice/invoice-header'
import { InvoiceClient } from '@/src/components/invoice/invoice-client'
import { InvoiceItemsTable } from '@/src/components/invoice/invoice-items-table'
import { InvoiceItemsMobile } from '@/src/components/invoice/invoice-items-mobile'
import { InvoiceSummary } from '@/src/components/invoice/invoice-summary'

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

  return (
    <>
      <Navbar />
      <div id="invoice-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:min-h-0 print:overflow-visible bg-background">
        <div className="max-w-4xl mx-auto mb-6 flex justify-end no-print">
          <Button onClick={handlePrint} size="lg">
            <Download className="w-4 h-4" />
            Descargar PDF
          </Button>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl shadow-sm border overflow-hidden print:shadow-none print:border-none print:rounded-none bg-card text-card-foreground border-border">

          <InvoiceHeader
            data={data}
            onIssuerChange={handleIssuerChange}
            onDetailsChange={handleDetailsChange}
          />

          <InvoiceClient
            data={data}
            onReceiverChange={handleReceiverChange}
          />

          <div className="p-4 sm:p-6 md:p-10 print:p-10">
            <InvoiceItemsTable
              items={data.items}
              currency={data.details.currency}
              onItemChange={handleItemChange}
              onRemoveItem={removeItem}
            />

            <InvoiceItemsMobile
              items={data.items}
              currency={data.details.currency}
              onItemChange={handleItemChange}
              onRemoveItem={removeItem}
            />

            <div className="mt-4 no-print">
              <Button onClick={addItem} variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
                Agregar línea
              </Button>
            </div>
          </div>

          <InvoiceSummary
            data={data}
            subtotal={calculateSubtotal()}
            discount={calculateDiscount()}
            tax={calculateTax()}
            total={calculateTotal()}
            onDetailsChange={handleDetailsChange}
            onDiscountChange={handleDiscountChange}
          />

          <div className="p-6 text-center border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              Documento generado electrónicamente. Válido sin firma o sello.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
