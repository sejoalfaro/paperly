import { useMemo } from 'react'
import { QuoteState } from '@/src/types/quote'

/**
 * Hook para calcular el total de la cotización
 */
export function useQuoteCalculations(data: QuoteState) {
  const total = useMemo(() => {
    return data.items
      .filter(item => item.included)
      .reduce((sum, item) => sum + item.price, 0)
  }, [data.items])

  return { total }
}
