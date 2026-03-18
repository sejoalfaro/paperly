import { useMemo } from 'react'
import { QuoteState } from '@/src/types/quote'

/**
 * Hook para calcular el subtotal, descuento y total de la cotización
 */
export function useQuoteCalculations(data: QuoteState) {
  const subtotal = useMemo(() => {
    return data.items
      .filter(item => item.included)
      .reduce((sum, item) => sum + item.price, 0)
  }, [data.items])

  const discount = useMemo(() => {
    if (data.discount.value === 0) return 0
    
    if (data.discount.type === "percentage") {
      return subtotal * (data.discount.value / 100)
    }
    
    return data.discount.value
  }, [subtotal, data.discount])

  const total = useMemo(() => {
    return subtotal - discount
  }, [subtotal, discount])

  return { subtotal, discount, total }
}
