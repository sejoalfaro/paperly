import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { QuoteState } from '@/src/types/quote'
import { DEFAULT_QUOTE_DATA } from '@/src/lib/quote-defaults'

/**
 * Migra datos antiguos al nuevo formato
 */
function migrateQuoteData(oldData: Partial<QuoteState>): QuoteState {
  return {
    ...DEFAULT_QUOTE_DATA,
    ...oldData,
    issuer: oldData.issuer || DEFAULT_QUOTE_DATA.issuer,
    scopeSections: oldData.scopeSections || DEFAULT_QUOTE_DATA.scopeSections,
    optionalModules: oldData.optionalModules || DEFAULT_QUOTE_DATA.optionalModules,
    timeline: oldData.timeline || DEFAULT_QUOTE_DATA.timeline,
    maintenancePlans: oldData.maintenancePlans || DEFAULT_QUOTE_DATA.maintenancePlans,
    assumptions: oldData.assumptions || DEFAULT_QUOTE_DATA.assumptions,
    nextSteps: oldData.nextSteps || DEFAULT_QUOTE_DATA.nextSteps,
  }
}

/**
 * Hook personalizado para manejar los datos de la cotización
 * Carga datos desde localStorage o usa valores por defecto
 */
export function useQuoteData() {
  const searchParams = useSearchParams()
  const dataParam = searchParams.get('data')
  
  const [data, setData] = useState<QuoteState>(() => {
    // Primero intentar cargar desde URL
    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(dataParam))
        return migrateQuoteData(decoded)
      } catch (error) {
        console.error('Error decoding quote data:', error)
      }
    }
    
    // Luego intentar cargar desde localStorage
    if (typeof globalThis.window !== 'undefined') {
      const saved = localStorage.getItem('quote-data')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return migrateQuoteData(parsed)
        } catch (error) {
          console.error('Error parsing saved quote data:', error)
        }
      }
    }
    
    return DEFAULT_QUOTE_DATA
  })
  
  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    if (typeof globalThis.window !== 'undefined') {
      localStorage.setItem('quote-data', JSON.stringify(data))
    }
  }, [data])

  return [data, setData] as const
}
