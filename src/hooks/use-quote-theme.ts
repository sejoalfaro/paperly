import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'

/**
 * Hook personalizado para manejar el tema de la cotización
 * Aplica el tema desde URL si existe
 */
export function useQuoteTheme() {
  const searchParams = useSearchParams()
  const themeParam = searchParams.get('theme')
  const { setTheme } = useTheme()
  const [themeInitialized, setThemeInitialized] = useState(false)
  
  useEffect(() => {
    if (themeParam && !themeInitialized) {
      if (setTheme) {
        setTheme(themeParam)
      }
      setThemeInitialized(true)
    }
  }, [themeParam, setTheme, themeInitialized])
}
