import { useState, useCallback } from 'react'
import { QuoteState } from '@/src/types/quote'

export interface QuoteHistoryEntry {
  id: string
  savedAt: string
  quoteNumber: string
  projectName: string
  clientCompany: string
  total: number
  data: QuoteState
}

const HISTORY_KEY = 'quote-history'
const MAX_HISTORY = 50

function loadHistory(): QuoteHistoryEntry[] {
  if (globalThis.window === undefined) return []
  try {
    const saved = localStorage.getItem(HISTORY_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function persistHistory(history: QuoteHistoryEntry[]) {
  if (globalThis.window === undefined) return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function useQuoteHistory() {
  const [history, setHistory] = useState<QuoteHistoryEntry[]>(() => loadHistory())

  const saveQuote = useCallback((data: QuoteState, total: number): string => {
    const now = new Date().toISOString()
    setHistory(prev => {
      const existingIndex = prev.findIndex(e => e.quoteNumber === data.quoteNumber)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          savedAt: now,
          projectName: data.projectName,
          clientCompany: data.clientCompany,
          total,
          data,
        }
        persistHistory(updated)
        return updated
      }
      const entry: QuoteHistoryEntry = {
        id: crypto.randomUUID(),
        savedAt: now,
        quoteNumber: data.quoteNumber,
        projectName: data.projectName,
        clientCompany: data.clientCompany,
        total,
        data,
      }
      const updated = [entry, ...prev].slice(0, MAX_HISTORY)
      persistHistory(updated)
      return updated
    })
    return data.quoteNumber
  }, [])

  const deleteQuote = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(e => e.id !== id)
      persistHistory(updated)
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    persistHistory([])
  }, [])

  return { history, saveQuote, deleteQuote, clearHistory }
}
