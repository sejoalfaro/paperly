import { Suspense } from 'react'
import { QuoteGenerator } from '@/src/components/quote/quote-generator'
import { QuoteSkeleton } from '@/src/components/quote/quote-skeleton'

export default function QuotePage() {
  return (
    <Suspense fallback={<QuoteSkeleton />}>
      <QuoteGenerator />
    </Suspense>
  )
}
